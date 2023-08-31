import * as R from 'ramda'
import { scheduleJob } from 'node-schedule'
import {
  handleUpdated,
  handleNew,
  handleSalesStartingSoon
} from './discord/handlers'
import { fetchConfiguredProducts } from './kide/api'
import { KideProduct } from './kide/models'
import { productCache, reminderTaskCache } from './store'

type Partitioned = [old: KideProduct[], new: KideProduct[]]

const toPartitioned = R.partition((product: KideProduct) =>
  productCache.has(product.id)
)

const getUpdatedProducts = ([oldProducts]: Partitioned) =>
  oldProducts.filter(
    (product) =>
      product.dateSalesFrom.getTime() !==
      productCache.get(product.id)!.dateSalesFrom.getTime()
  )

const getNewProducts = ([_, newProducts]: Partitioned) => newProducts

const getUpcomingProducts = (partitionedProducts: Partitioned): KideProduct[] =>
  partitionedProducts
    .flat()
    .filter((product) => product.dateSalesFrom.getTime() > Date.now())

const notifyOfUpdatedProducts = R.pipe(getUpdatedProducts, handleUpdated)
const notifyOfNewProducts = R.pipe(getNewProducts, handleNew)

const upsertProductsToStore = (partitioned: Partitioned) =>
  partitioned.flat().forEach((product) => productCache.set(product.id, product))

export const clearSalesStartingSoonJobs = () => {
  for (const task of reminderTaskCache.values()) {
    task.cancel()
  }
  reminderTaskCache.clear()
}

const TWENTY_MIN_IN_MS = 1000 * 60 * 20

const scheduleSalesStartingSoonJobs = (products: KideProduct[]) => {
  for (const product of products) {
    const task = scheduleJob(
      new Date(product.dateSalesFrom.getTime() - TWENTY_MIN_IN_MS),
      () => {
        handleSalesStartingSoon(product)
      }
    )
    reminderTaskCache.set(product.id, task)
  }
}

const handleSalesStartingSoonJobs = R.pipe(
  getUpcomingProducts,
  R.tap(clearSalesStartingSoonJobs),
  scheduleSalesStartingSoonJobs
)

export const mainTask = () =>
  fetchConfiguredProducts()
    .then(toPartitioned)
    .then(
      R.juxt([
        notifyOfNewProducts,
        notifyOfUpdatedProducts,
        upsertProductsToStore,
        handleSalesStartingSoonJobs
      ])
    )
    .then(R.always(true))
    .catch(R.pipe(R.tap(console.error), R.always(false)))

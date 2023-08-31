import { Job } from 'node-schedule'
import { KideProduct } from './kide/models'

const productCache = new Map<string, KideProduct>()
const reminderTaskCache = new Map<string, Job>()

export const initializeProductCache = (products: KideProduct[]) => {
  productCache.clear()
  for (const product of products) {
    productCache.set(product.id, product)
  }
}

export { productCache, reminderTaskCache }

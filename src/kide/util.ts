import * as R from 'ramda'
import {
  KideFetchParams,
  BASE_URL,
  KideProductType,
  KideProduct
} from './models'

export const createDefaultProductImageUrl = (product: KideProduct) => {
  const type = product.productType
  let typeString
  if (type === KideProductType.Event) {
    typeString = 'event'
  } else if (type === KideProductType.Membership) {
    typeString = 'membership'
  } else if (type === KideProductType.Product) {
    typeString = 'product'
  } else {
    typeString = 'event'
  }

  return `https://kide.app/content/images/themes/kide/${typeString}/product_default.jpg?v=020221` as const
}

export const createProductImageUrl = (product: KideProduct) =>
  product.mediaFilename
    ? (`https://portalvhdsp62n0yt356llm.blob.core.windows.net/bailataan-mediaitems/${product.mediaFilename}` as const)
    : createDefaultProductImageUrl(product)

export const createProductUrl = (product: KideProduct) => {
  const type = product.productType
  let typeString
  if (type === KideProductType.Event) {
    typeString = 'events'
  } else if (type === KideProductType.Membership) {
    typeString = 'memberships'
  } else if (type === KideProductType.Product) {
    typeString = 'products'
  } else {
    typeString = 'events'
  }
  return `https://kide.app/${typeString}/${product.id}` as const
}

const nullToEmptyString = (s: string | null) => (s === null ? '' : s)
const mapNullsToEmptyStrings = R.map(nullToEmptyString)

export const createProductFetchUrl = (params: KideFetchParams) => {
  const url = new URL(BASE_URL)
  url.search = new URLSearchParams(mapNullsToEmptyStrings(params)).toString()
  return url.toString()
}

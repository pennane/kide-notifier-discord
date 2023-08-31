import {
  KideFetchParams,
  KideProductsResponseSchema,
  KideProduct
} from './models'
import axios from 'axios'
import { createProductFetchUrl } from './util'
import { PRODUCT_FETCH_PARAMS } from '../config/kide'

const fetchProducts = async (
  params: KideFetchParams
): Promise<KideProduct[]> => {
  const url = createProductFetchUrl(params)
  const response = await axios.get(url)
  const data = KideProductsResponseSchema.parse(response.data)
  return data.model
}

export const fetchConfiguredProducts = () => fetchProducts(PRODUCT_FETCH_PARAMS)

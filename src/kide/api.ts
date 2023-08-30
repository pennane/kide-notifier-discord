import {
  KideFetchParams,
  KideProductsResponseSchema,
  KideProduct,
  KideProductLocation,
  KideProductType
} from './models'
import axios from 'axios'
import { createProductFetchUrl } from './util'

const fetchProducts = async (
  params: KideFetchParams
): Promise<KideProduct[]> => {
  const url = createProductFetchUrl(params)
  const response = await axios.get(url)
  const data = KideProductsResponseSchema.parse(response.data)
  return data.model
}

export const fetchCapitalAreaKideEvents = () =>
  fetchProducts({
    categoryId: null,
    city: KideProductLocation.Pääkaupunkiseutu,
    companyId: null,
    productType: KideProductType.Event
  })

import {
  KideFetchParams,
  KideProductLocation,
  KideProductType
} from '../kide/models'

// Used to determine what kind of events / products / membershis the bot searches for
export const PRODUCT_FETCH_PARAMS: KideFetchParams = {
  categoryId: null,
  city: KideProductLocation.Pääkaupunkiseutu,
  companyId: null,
  productType: KideProductType.Event
}

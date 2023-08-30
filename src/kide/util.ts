import * as R from 'ramda'
import { KideFetchParams, BASE_URL } from './models'

export const createDefaultEventImageUrl = () =>
  'https://kide.app/content/images/themes/kide/event/product_default.jpg?v=020221' as const

export const createEventImageUrl = (mediaFileName?: string) =>
  mediaFileName
    ? (`https://portalvhdsp62n0yt356llm.blob.core.windows.net/bailataan-mediaitems/${mediaFileName}` as const)
    : createDefaultEventImageUrl()

export const createEventUrl = (id: string) =>
  `https://kide.app/events/${id}` as const

const nullToEmptyString = (s: string | null) => (s === null ? '' : s)
const mapNullsToEmptyStrings = R.map(nullToEmptyString)

export const createProductFetchUrl = (params: KideFetchParams) => {
  const url = new URL(BASE_URL)
  url.search = new URLSearchParams(mapNullsToEmptyStrings(params)).toString()
  return url.toString()
}

import { z } from 'zod'

export const BASE_URL = 'https://api.kide.app/api/products' as const

export enum KideProductLocation {
  Pääkaupunkiseutu = 'Pääkaupunkiseutu'
}
export enum KideProductType {
  Event = '1',
  Product = '2',
  Membership = '3'
}

export enum KideCategory {
  'Opiskelijatapahtumat' = '39b8cb1f-e0c3-4d4e-ab09-b80958ab1cf8',
  'Sitsit' = 'f143a329-9a7f-4531-9819-961e19248e07',
  'Approt' = 'af5d7749-740e-47f4-8a83-e5113cfa4eb2',
  'Vuosijuhlat' = 'a974a342-d8b5-4a52-a39e-a0c1e30ac0c1',
  'Festarit' = '20063bae-67f8-4f7c-bba4-eecd59dfdc0c',
  'Risteilyt' = '27fcfcc3-2f3b-4658-b981-e21d66cf8cef',
  'Klubit ja keikat' = '2aadb757-91a1-4bd4-948a-bd54b2ed20f0',
  'Teatteri ja elokuvat' = '728ff1a7-5692-4284-9c66-edd572a0ffd1',
  'Liikunta ja urheilu' = '69e2a284-7af2-4e76-b446-5ecfad3e218c',
  'Merkit' = '50fa48b1-c677-4579-ba26-8b6648eaf0bc',
  'Haalarit' = '6949ce25-c53c-456e-a15e-f79e5b2c77f5',
  'Vaatteet' = '1b891853-df51-4457-be36-b0b230a04479',
  'Media' = '315afa9d-34c7-4f70-b5e1-dd357b604693',
  'Tarvikkeet' = '28fd1ae2-f914-4962-9a5b-5bb3fbce1cf9',
  'Elektroniikka' = '1e74a236-2691-42ae-a7fb-88029e5f9d23',
  'Ruoka ja juoma' = 'c58f86e8-247d-4577-aa67-0fa07600664f',
  'Excursiot ja seminaarit' = '90217dc6-15af-43d2-a3e6-bf8811b93870',
  'Palvelut' = '5fb7c710-a09a-4a28-90cc-70cb1b514ec6',
  'Kurssit ja koulutukset' = '6112528f-31db-4cd6-8ead-b4dcf3dc557e',
  'Kannatustuotteet' = 'ea560dcd-dfa5-4de8-98e5-55772ef61f24',
  'Muut' = '0137accd-d575-4132-96c8-830675bc5482',
  'Onlinetapahtumat' = 'acbc1cb4-0f58-47c5-8831-0d9e2a76aedd',
  'Opiskelijakunnat' = 'e5a27d6c-5d01-4422-a432-5fbe3226a5a5',
  'Ammattiliitot' = '7ec124bc-7935-4f0f-a64b-531ae5c38aa2',
  'Ainejärjestöt' = '3ef6e145-7ca0-4288-b66b-7ab8724a7b46',
  'Kansainvälisyys' = 'f31e481b-da54-4ad3-ad64-2d9b1ea4b0df',
  'Urheiluseurat' = 'ba3168a2-8a02-4467-9b42-c3dc045cae2c',
  'Muut opiskelijajärjestöt' = '84e501cd-41c1-4c45-9257-f7fa2a4e8bc7',
  'Muut jäsenyydet' = '96f7ebe1-e391-4ca6-82fe-6376be4c7736'
}

export type KideFetchParams = {
  city: KideProductLocation | null
  productType: KideProductType
  categoryId: KideCategory | null
  companyId: string | null
}

export const KideProductSchema = z.object({
  id: z.string(),
  productType: z.string({ coerce: true }).pipe(z.nativeEnum(KideProductType)),
  companyName: z.string(),
  companyMediaFilename: z.string().optional(),
  name: z.string(),
  mediaFilename: z.string().optional(),
  place: z.string(),
  dateSalesFrom: z.string().pipe(z.coerce.date()),
  dateSalesUntil: z.string().pipe(z.coerce.date()),
  dateActualFrom: z.string().pipe(z.coerce.date()),
  dateActualUntil: z.string().pipe(z.coerce.date()),
  datePublishFrom: z.string().pipe(z.coerce.date()),
  maxPrice: z.object({ eur: z.number().optional() }),
  minPrice: z.object({ eur: z.number().optional() }),
  hasFreeInventoryItems: z.boolean(),
  hasInventoryItems: z.boolean(),
  availability: z.number(),
  isFavorited: z.boolean(),
  isLong: z.boolean(),
  isActual: z.boolean(),
  salesStarted: z.boolean(),
  salesEnded: z.boolean(),
  salesOngoing: z.boolean(),
  salesPaused: z.boolean()
})

export const KideProductsResponseSchema = z.object({
  model: z.array(KideProductSchema)
})

export type KideProduct = z.infer<typeof KideProductSchema>

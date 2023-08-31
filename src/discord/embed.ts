import { KideProduct, KideProductType } from '../kide/models'
import { APIEmbedField, EmbedBuilder } from 'discord.js'
import { createProductImageUrl, createProductUrl } from '../kide/util'
import { dateToFinnishLocale, durationToFinishLocale } from '../date/util'

const createDefaultTitle = (product: KideProduct) => {
  const type = product.productType
  let typeString
  if (type === KideProductType.Event) {
    typeString = 'tapahtuma'
  } else if (type === KideProductType.Membership) {
    typeString = 'jäsenyys'
  } else if (type === KideProductType.Product) {
    typeString = 'tuote'
  } else {
    typeString = 'tapahtuma'
  }
  return `Uusi ${typeString}: ${product.name}`
}

const createCustomTitle = (product: KideProduct, title: string) =>
  `${product.name}: ${title}`

export const createProductEmbed = (product: KideProduct, title?: string) => {
  const embed = new EmbedBuilder()

  embed.setTitle(
    title ? createCustomTitle(product, title) : createDefaultTitle(product)
  )
  embed.setImage(createProductImageUrl(product))
  embed.setURL(createProductUrl(product))

  const timeUntil = product.dateSalesFrom.getTime() - Date.now()
  const fields: APIEmbedField[] = []

  if (timeUntil > 0) {
    fields.push({
      name: 'Lipunmyynnin alkuun',
      value: durationToFinishLocale(timeUntil),
      inline: true
    })
  } else {
    fields.push({
      name: 'Lipunmyynti on alkanut',
      value: 'Lipunmyynti jo on alkanut!',
      inline: true
    })
  }
  fields.push({
    name: 'Lipunmyynti alkaa',
    value: dateToFinnishLocale(product.dateSalesFrom)
  })

  embed.addFields(fields)
  embed.setTimestamp()
  return embed
}

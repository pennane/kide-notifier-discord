import { KideProduct } from '../kide/models'
import { APIEmbedField, EmbedBuilder } from 'discord.js'
import { createEventImageUrl, createEventUrl } from '../kide/util'
import { dateToFinnishLocale, durationToFinishLocale } from '../date/util'

export const createProductEmbed = (event: KideProduct, title?: string) => {
  const embed = new EmbedBuilder()

  embed.setTitle(
    title ? `${event.name}: ${title}` : `Uusi tapahtuma: ${event.name}`
  )
  embed.setImage(createEventImageUrl(event.mediaFilename))
  embed.setURL(createEventUrl(event.id))

  const timeUntil = event.dateSalesFrom.getTime() - Date.now()
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
    value: dateToFinnishLocale(event.dateSalesFrom)
  })

  embed.addFields(fields)
  embed.setTimestamp()
  return embed
}

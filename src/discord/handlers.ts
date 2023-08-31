import * as R from 'ramda'
import { KideProduct } from '../kide/models'
import { getDiscordClient } from './client'
import { createProductEmbed } from './embed'
import { getAllMessagingChannels } from './util'

export const handleNew = async (products: KideProduct[]): Promise<void> => {
  const client = getDiscordClient()
  const channels = getAllMessagingChannels(client)
  const embeds = products.map((product) => createProductEmbed(product))
  const chunks = R.splitEvery(7, embeds)

  for (const embeds of chunks) {
    for (const channel of channels) {
      channel.send({ embeds })
    }
  }
}

export const handleUpdated = async (products: KideProduct[]): Promise<void> => {
  const client = getDiscordClient()
  const channels = getAllMessagingChannels(client)
  const embeds = products.map((product) =>
    createProductEmbed(product, 'Myyntiajankohta muuttunut')
  )
  const chunks = R.splitEvery(7, embeds)

  for (const embeds of chunks) {
    for (const channel of channels) {
      channel.send({ embeds })
    }
  }
}

export const handleSalesStartingSoon = async (
  product: KideProduct
): Promise<void> => {
  const client = getDiscordClient()
  const channels = getAllMessagingChannels(client)
  const embed = createProductEmbed(product, 'Myynti alkaa pian')

  for (const channel of channels) {
    channel.send({ embeds: [embed] })
  }
}

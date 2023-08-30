import * as R from 'ramda'
import { KideProduct } from '../kide/models'
import { getDiscordClient } from './client'
import { createProductEmbed } from './embed'
import { getAllMessagingChannels } from './util'

export const handleNewEvents = async (events: KideProduct[]): Promise<void> => {
  const client = getDiscordClient()
  const channels = getAllMessagingChannels(client)
  const embeds = events.map((event) => createProductEmbed(event))
  const chunks = R.splitEvery(7, embeds)

  for (const embeds of chunks) {
    for (const channel of channels) {
      channel.send({ embeds })
    }
  }
}

export const handleUpdatedEvents = async (
  events: KideProduct[]
): Promise<void> => {
  const client = getDiscordClient()
  const channels = getAllMessagingChannels(client)
  const embeds = events.map((event) =>
    createProductEmbed(event, 'Myyntiajankohta muuttunut')
  )
  const chunks = R.splitEvery(7, embeds)

  for (const embeds of chunks) {
    for (const channel of channels) {
      channel.send({ embeds })
    }
  }
}

export const handleSalesStartingSoonEvent = async (
  event: KideProduct
): Promise<void> => {
  const client = getDiscordClient()
  const channels = getAllMessagingChannels(client)
  const embed = createProductEmbed(event, 'Myynti alkaa pian')

  for (const channel of channels) {
    channel.send({ embeds: [embed] })
  }
}

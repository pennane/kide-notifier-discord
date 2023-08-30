import * as R from 'ramda'
import {
  ChannelType,
  Client,
  Guild,
  GuildMember,
  GuildTextBasedChannel
} from 'discord.js'
import { CONFIG } from '../config/env'

export const isAdminAuthorized = (member: GuildMember) =>
  member.id === CONFIG.DISCORD_DEVELOPER_USER_ID ||
  member.permissions.has('Administrator')

const getDevMessagingChannel = (client: Client) => {
  const channel = client.channels.cache.get(CONFIG.DISCORD_TEST_CHANNEL_ID)
  if (!channel) throw new Error('Dev channel missing')
  if (!channel?.isTextBased()) throw new Error('Dev channel not text based')
  return [channel as GuildTextBasedChannel]
}

export const getMessagingChannel = (guild: Guild) =>
  guild.channels.cache.find(
    (channel) =>
      channel.name === CONFIG.DISCORD_MESSAGING_CHANNEL_NAME &&
      channel.type === ChannelType.GuildText
  ) as GuildTextBasedChannel | undefined

export const hasTargetChannel = (guild: Guild) => !!getMessagingChannel(guild)

export const getAllMessagingChannels = (client: Client) =>
  (CONFIG.NODE_ENV === 'production'
    ? client.guilds.cache.map(getMessagingChannel)
    : getDevMessagingChannel(client)
  ).filter(R.isNotNil)

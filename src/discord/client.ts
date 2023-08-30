import { Client, Events, GatewayIntentBits } from 'discord.js'
import { CONFIG } from '../config/env'

let client: Client | null = null

export const initializeDiscordClient = (): Promise<Client> =>
  new Promise((resolve) => {
    if (client) {
      return resolve(client)
    }
    console.log('Getting client for the first time')

    client = new Client({ intents: [GatewayIntentBits.Guilds] })

    client.once(Events.ClientReady, (client) => {
      console.log(`Discord client ready. Logged in as ${client.user.tag}`)
      resolve(client)
    })

    // Log in to Discord with your client's token
    client.login(CONFIG.DISCORD_TOKEN)
  })

export const getDiscordClient = () => client!

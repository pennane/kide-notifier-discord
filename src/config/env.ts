import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const EnvVariablesSchema = z.object({
  DISCORD_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_DEVELOPER_USER_ID: z.string(),
  DISCORD_MESSAGING_CHANNEL_NAME: z.string().default('kide-helper'),
  DISCORD_TEST_CHANNEL_ID: z.string(),
  NODE_ENV: z.union([z.literal('production'), z.literal('development')])
})

export const CONFIG = EnvVariablesSchema.parse(process.env)

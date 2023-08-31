import { scheduleJob } from 'node-schedule'

import { fetchCapitalAreaKideEvents } from './kide/api'
import { initializeDiscordClient } from './discord/client'
import { mainTask } from './mainTask'
import { initializeKnownEvents } from './store'

initializeDiscordClient()
  .then(fetchCapitalAreaKideEvents)
  .then(initializeKnownEvents)
  .then(() => scheduleJob('1,31 * * * *', mainTask))

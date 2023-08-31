import { scheduleJob } from 'node-schedule'

import { fetchConfiguredProducts } from './kide/api'
import { initializeDiscordClient } from './discord/client'
import { mainTask } from './mainTask'
import { initializeProductCache } from './store'

initializeDiscordClient()
  .then(fetchConfiguredProducts)
  .then(initializeProductCache)
  .then(() => scheduleJob('1,31 * * * *', mainTask))

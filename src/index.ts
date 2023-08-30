import {
  handleNewEvents,
  handleSalesStartingSoonEvent,
  handleUpdatedEvents
} from './discord/handlers'
import { fetchCapitalAreaKideEvents } from './kide/api'
import { KideProduct } from './kide/models'
import { scheduleJob } from 'node-schedule'
import * as R from 'ramda'
import { gKnownEvents, gReminderTasks, initializeKnownEvents } from './store'
import { initializeDiscordClient } from './discord/client'

const TWENTY_MIN_IN_MS = 1000 * 60 * 20

initializeDiscordClient()
  .then(fetchCapitalAreaKideEvents)
  .then(initializeKnownEvents)
  .then(() => scheduleJob('1,31 * * * *', mainTask))

const mainTask = async () => {
  console.log('Fetching events')

  const events = await fetchCapitalAreaKideEvents()
  const [oldEvents, newEvents] = R.partition(
    (event: KideProduct) => gKnownEvents.has(event.id),
    events
  )

  console.log('Got', oldEvents.length, 'old and', newEvents.length, 'new')

  const updatedEvents = oldEvents.filter(
    (event) =>
      event.dateSalesFrom.getTime() !==
      gKnownEvents.get(event.id)!.dateSalesFrom.getTime()
  )

  console.log(updatedEvents.length, ' of old events were updated')

  await Promise.all([
    handleNewEvents(newEvents),
    handleUpdatedEvents(updatedEvents)
  ])

  for (const event of events) {
    gKnownEvents.set(event.id, event)
  }

  for (const task of gReminderTasks.values()) {
    task.cancel()
  }

  gReminderTasks.clear()

  const upcomingSalesEvents = [...gKnownEvents.values()].filter(
    (event) => event.dateSalesFrom.getTime() > Date.now()
  )

  for (const event of upcomingSalesEvents) {
    const task = scheduleJob(
      new Date(event.dateSalesFrom.getTime() - TWENTY_MIN_IN_MS),
      () => {
        handleSalesStartingSoonEvent(event)
      }
    )
    gReminderTasks.set(event.id, task)
  }

  console.log('scheduled reminder tasks for upcoming events')
}

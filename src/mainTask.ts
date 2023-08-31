import * as R from 'ramda'
import { scheduleJob } from 'node-schedule'
import {
  handleUpdatedEvents,
  handleNewEvents,
  handleSalesStartingSoonEvent
} from './discord/handlers'
import { fetchCapitalAreaKideEvents } from './kide/api'
import { KideProduct } from './kide/models'
import { gKnownEvents, gReminderTasks } from './store'

type Partitioned = [oldEvents: KideProduct[], newEvents: KideProduct[]]

const toPartitioned = R.partition((event: KideProduct) =>
  gKnownEvents.has(event.id)
)

const getUpdatedEvents = ([oldEvents]: Partitioned) =>
  oldEvents.filter(
    (event) =>
      event.dateSalesFrom.getTime() !==
      gKnownEvents.get(event.id)!.dateSalesFrom.getTime()
  )

const getNewEvents = ([_, newEvents]: Partitioned) => newEvents

const getUpcomingEvents = (partitionedEvents: Partitioned): KideProduct[] =>
  partitionedEvents
    .flat()
    .filter((event) => event.dateSalesFrom.getTime() > Date.now())

const notifyOfUpdatedEvents = R.pipe(getUpdatedEvents, handleUpdatedEvents)
const notifyOfNewEvents = R.pipe(getNewEvents, handleNewEvents)

const upsertEventsToStore = (partitioned: Partitioned) =>
  partitioned.flat().forEach((event) => gKnownEvents.set(event.id, event))

export const clearSalesStartingSoonJobs = () => {
  for (const task of gReminderTasks.values()) {
    task.cancel()
  }
  gReminderTasks.clear()
}

const TWENTY_MIN_IN_MS = 1000 * 60 * 20

const scheduleSalesStartingSoonJobs = (events: KideProduct[]) => {
  for (const event of events) {
    const task = scheduleJob(
      new Date(event.dateSalesFrom.getTime() - TWENTY_MIN_IN_MS),
      () => {
        handleSalesStartingSoonEvent(event)
      }
    )
    gReminderTasks.set(event.id, task)
  }
}

const handleSalesStartingSoonJobs = R.pipe(
  getUpcomingEvents,
  R.tap(clearSalesStartingSoonJobs),
  scheduleSalesStartingSoonJobs
)

export const mainTask = () =>
  fetchCapitalAreaKideEvents()
    .then(toPartitioned)
    .then(
      R.juxt([
        notifyOfNewEvents,
        notifyOfUpdatedEvents,
        upsertEventsToStore,
        handleSalesStartingSoonJobs
      ])
    )
    .then(R.always(true))
    .catch(R.pipe(R.tap(console.error), R.always(false)))

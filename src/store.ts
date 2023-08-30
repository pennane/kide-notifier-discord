import { Job } from 'node-schedule'
import { KideProduct } from './kide/models'

const knownEvents = new Map<string, KideProduct>()
const reminderTasks = new Map<string, Job>()

export const initializeKnownEvents = (events: KideProduct[]) => {
  knownEvents.clear()
  for (const event of events) {
    knownEvents.set(event.id, event)
  }
}

export { knownEvents as gKnownEvents, reminderTasks as gReminderTasks }

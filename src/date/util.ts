export const dateToFinnishLocale = (date: Date) => {
  return date.toLocaleDateString('fi-Fi', {
    minute: '2-digit',
    hour: '2-digit',
    timeZone: 'Europe/Helsinki'
  })
}

const SECONDS_IN_A_MINUTE = 60
const MINUTES_IN_AN_HOUR = 60
const HOURS_IN_A_DAY = 24
const MILLISECONDS_IN_A_SECOND = 1000

export const parseDurationParts = (duration: number) => {
  const totalSeconds = Math.floor(duration / MILLISECONDS_IN_A_SECOND)
  const totalMinutes = Math.floor(totalSeconds / SECONDS_IN_A_MINUTE)
  const totalHours = Math.floor(totalMinutes / MINUTES_IN_AN_HOUR)

  const days = Math.floor(totalHours / HOURS_IN_A_DAY)
  const seconds = totalSeconds % SECONDS_IN_A_MINUTE
  const minutes = totalMinutes % MINUTES_IN_AN_HOUR
  const hours = totalHours % HOURS_IN_A_DAY

  return { seconds, minutes, hours, days }
}

const pluralize = (unit: string, count: number, pluralSuffix: string) =>
  `${count} ${unit}${count === 1 ? '' : pluralSuffix}`

export const durationToFinishLocale = (duration: number) => {
  const { seconds, minutes, hours, days } = parseDurationParts(duration)
  const parts = []

  if (days > 0) {
    parts.push(pluralize('päivä', days, 'ä'))
    parts.push(pluralize('tunti', hours, 'a'))
    parts.push(pluralize('minuutti', minutes, 'a'))
  } else if (hours > 0) {
    parts.push(pluralize('tunti', hours, 'a'))
    parts.push(pluralize('minuutti', minutes, 'a'))
    parts.push(pluralize('sekunti', seconds, 'a'))
  } else if (minutes > 0) {
    parts.push(pluralize('minuutti', minutes, 'a'))
    parts.push(pluralize('sekunti', seconds, 'a'))
  } else {
    parts.push(pluralize('sekunti', seconds, 'a'))
  }

  return parts.join(', ').replace(/, ([^,]*)$/, ' ja $1') // replace last comma with "ja"
}

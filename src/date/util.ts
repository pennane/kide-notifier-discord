export const dateToFinnishLocale = (date: Date) => {
  return date.toLocaleDateString('fi-Fi', {
    minute: '2-digit',
    hour: '2-digit',
    timeZone: 'Europe/Helsinki'
  })
}

export const parseDurationParts = (duration: number) => {
  const totalS = Math.round(Math.floor(duration / 1000))
  const totalM = Math.round(Math.floor(totalS / 60))
  const totalH = Math.round(Math.floor(totalM / 60))

  const d = Math.round(Math.floor(totalH / 24))
  const s = Math.round(totalS % 60)
  const m = Math.round(totalM % 60)
  const h = Math.round(totalH % 24)

  return {
    s,
    m,
    h,
    d
  }
}

export const durationToFinishLocale = (duration: number) => {
  const { s, m, h, d } = parseDurationParts(duration)
  if (d > 0) {
    return `${d === 1 ? '1 päivä' : d + ' päivää'}, ${
      h === 1 ? '1 tunti' : h + ' tuntia'
    } ja ${m === 1 ? '1 minuutti' : m + ' minuuttia'}`
  } else if (h > 0) {
    return `${h === 1 ? '1 tunti' : h + ' tuntia'}, ${
      m === 1 ? '1 minuutti' : m + ' minuuttia'
    } ja ${s === 1 ? 's sekunti' : s + ' sekuntia'}`
  } else if (m > 0) {
    return `${m === 1 ? '1 minuutti' : m + ' minuuttia'} ja ${
      s === 1 ? 's sekunti' : s + ' sekuntia'
    }`
  }
  return `${s === 1 ? 's sekunti' : s + ' sekuntia'}`
}

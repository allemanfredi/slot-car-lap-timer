const pad = require('pad/dist/pad.cjs')

const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const toHHMMSS = _ms => {
  const dateObj = new Date(_ms * 1000)
  const hours = dateObj.getUTCHours()
  const minutes = dateObj.getUTCMinutes()
  const seconds = dateObj.getSeconds()

  return (
    pad(2, hours.toString(), '0') +
    ':' +
    pad(2, minutes.toString(), '0') +
    ':' +
    pad(2, seconds.toString(), '0')
  )
}

const toSSMM = _ms => {
  if (_ms === 0) return '00:00'

  const milliseconds = _ms % 1000
  _ms = Math.floor(_ms / 1000)

  const seconds = _ms % 60
  _ms = Math.floor(_ms / 60)

  return (
    pad(2, seconds.toString(), '0') +
    ':' +
    pad(2, Math.round(milliseconds / 10).toString(), '0')
  )
}

const getSum = _array => {
  let sum = 0
  for (let v of _array) sum = sum + v
  return sum
}

export { groupBy, toHHMMSS, toSSMM, getSum }

import {
  UPDATE_SESSION_TIME,
  L1_END_LAP,
  UPDATE_L1_LAP_TIME,
  L2_END_LAP,
  UPDATE_L2_LAP_TIME,
  L3_END_LAP,
  UPDATE_L3_LAP_TIME,
  L4_END_LAP,
  UPDATE_L4_LAP_TIME,
  RESET,
  SET_RACE_STATUS,
  SET_RACE_OPTIONS,
} from '../constants/'
import Artyom from 'artyom.js/build/artyom'
import firebase from '../lib/firebase'

const { ipcRenderer } = window.require('electron')

const INTERVAL_SESSION_TIME = 1000
const ACTIVE = 1
const NOT_ACTIVE = 0
const MINIMUN_TIME_LAP = 5000

const artyom = new Artyom()
artyom.initialize({
  lang: 'it-IT',
})

let reset = {
  L1: true,
  L2: true,
  L3: true,
  L4: true,
}

let startTime = {
  L1: 0,
  L2: 0,
  L3: 0,
  L4: 0,
}

let endTime = {
  L1: 0,
  L2: 0,
  L3: 0,
  L4: 0,
}

let lapTime = {
  L1: 0,
  L2: 0,
  L3: 0,
  L4: 0,
}

let intervals = {
  L1: null,
  L2: null,
  L3: null,
  L4: null,
}

const actionType = {
  L1: {
    endLap: L1_END_LAP,
    updateTime: UPDATE_L1_LAP_TIME,
  },
  L2: {
    endLap: L2_END_LAP,
    updateTime: UPDATE_L2_LAP_TIME,
  },
  L3: {
    endLap: L3_END_LAP,
    updateTime: UPDATE_L3_LAP_TIME,
  },
  L4: {
    endLap: L4_END_LAP,
    updateTime: UPDATE_L4_LAP_TIME,
  },
}

//practise
let sessionTime = 0
//race
let raceType = 'Free Practise'

let intervalSessionTime = null
let raceIsStopped = false
let stoppingStartTime = 0
let stoppingEndTime = 0
let stoppingTime = 0

const start = () => {
  return (dispatch) => {
    if (raceIsStopped) {
      stoppingEndTime = new Date().getTime()
      stoppingTime = stoppingEndTime - stoppingStartTime
    }

    raceIsStopped = false

    dispatch({
      type: SET_RACE_STATUS,
      payload: 'running',
    })

    firebase
      .ref(`race/status`)
      .set({
        running: true,
        raceType,
      })
      .catch(console.error)

    ipcRenderer.on('speed', (_e, _data) => {
      const { lane, value } = _data
      firebase
        .ref(`speeds/${lane}`)
        .set({
          value,
        })
        .catch(console.error)
    })

    ipcRenderer.on('data', (_e, _data) => {
      //console.log(_data)
      handleData(_data, dispatch)
    })
    ipcRenderer.send('start')

    intervalSessionTime = setInterval(() => {
      if (raceType === 'Free Practise') {
        sessionTime = sessionTime + 1
      } else if (
        (raceType === 'Timed Practise' || raceType === 'Race') &&
        sessionTime > 0
      ) {
        sessionTime = sessionTime - 1
      }

      firebase
        .ref(`race/status/sessiontime`)
        .set(sessionTime)
        .catch(console.error)

      //end race
      if (
        (raceType === 'Timed Practise' || raceType === 'Race') &&
        sessionTime <= 0
      ) {
        console.log('race terminated')
        dispatch({
          type: SET_RACE_STATUS,
          payload: 'terminated',
        })

        dispatch({
          type: UPDATE_SESSION_TIME,
          payload: 0,
        })

        raceIsStopped = true

        ipcRenderer.send('stop')

        firebase
          .ref(`race/status`)
          .set({
            running: false,
            raceType,
          })
          .catch(console.error)

        clearInterval(intervalSessionTime)
        return
      }

      dispatch({
        type: UPDATE_SESSION_TIME,
        payload: sessionTime,
      })
    }, INTERVAL_SESSION_TIME)
  }
}

const stop = () => {
  return (_dispatch) => {
    try {
      console.log('Stopped')
      ipcRenderer.send('stop')

      _dispatch({
        type: SET_RACE_STATUS,
        payload: 'stopped',
      })

      firebase
        .ref(`race/status`)
        .set({
          running: false,
        })
        .catch(console.error)

      Array(...['L1', 'L2', 'L3', 'L4']).forEach((_lane) => {
        firebase.ref(`lanes/${_lane}`).set({
          action: 'stopped',
        })
        firebase.ref(`live/${_lane}`).set(null).catch(console.error)
        firebase.ref(`speeds/${_lane}`).set(null).catch(console.error)
      })

      clearInterval(intervalSessionTime)

      raceIsStopped = true
      stoppingStartTime = new Date().getTime()
    } catch (_err) {
      console.error(_err.message)
    }
  }
}

const restart = () => {
  return (_dispatch) => {
    clearInterval(intervals.L1)
    clearInterval(intervals.L2)
    clearInterval(intervals.L3)
    clearInterval(intervals.L4)

    _resetData()

    _dispatch({
      type: SET_RACE_STATUS,
      payload: 'stopped',
    })

    _dispatch({
      type: RESET,
      payload: 0,
    })
  }
}

const handleData = (_data, _dispatch) => {
  try {
    const { lane, value } = _data

    if (value === NOT_ACTIVE) {
      reset[lane] = true
    }

    if (value === ACTIVE && reset[lane]) {
      endTime[lane] = new Date().getTime()

      if (startTime[lane] !== 0) {
        if (endTime[lane] - startTime[lane] - stoppingTime < MINIMUN_TIME_LAP) {
          console.log('Rumor detected')
          return
        }

        // prettier-ignore
        console.log(`terminated ${lane} : ${endTime[lane] - startTime[lane] - stoppingTime}`)

        firebase
          .ref(`lanes/${lane}`)
          .set({
            action: 'terminated',
            time: endTime[lane] - startTime[lane] - stoppingTime,
            when: new Date().getTime(),
          })
          .catch(console.error)

        const words = ((endTime[lane] - startTime[lane] - stoppingTime) / 1000)
          .toString()
          .split('.')
        artyom.say(`Corsia ${lane.substr(1)}: ${words} secondi`)

        clearInterval(intervals[lane])
        lapTime[lane] = 0

        _dispatch({
          type: actionType[lane].endLap,
          payload: {
            time: endTime[lane] - startTime[lane] - stoppingTime,
            when: new Date().getTime(),
          },
        })

        stoppingStartTime = 0
        stoppingEndTime = 0
        stoppingTime = 0
      }

      console.log(`started ${lane}`)
      startTime[lane] = new Date().getTime()

      firebase
        .ref(`lanes/${lane}`)
        .set({
          action: 'started',
          time: null,
          when: startTime[lane],
        })
        .catch(console.error)

      intervals[lane] = setInterval(() => {
        if (!raceIsStopped) {
          _dispatch({
            type: actionType[lane].updateTime,
            payload: lapTime[lane],
          })
          lapTime[lane] = new Date().getTime() - startTime[lane] - stoppingTime
        }
      }, 1)

      reset[lane] = false
    }
  } catch (_err) {
    console.error(_err.message)
  }
}

const _resetData = () => {
  sessionTime = 0
  stoppingStartTime = 0
  stoppingEndTime = 0
  stoppingTime = 0
  raceIsStopped = false

  reset = {
    L1: true,
    L2: true,
    L3: true,
    L4: true,
  }

  startTime = {
    L1: 0,
    L2: 0,
    L3: 0,
    L4: 0,
  }

  endTime = {
    L1: 0,
    L2: 0,
    L3: 0,
    L4: 0,
  }

  lapTime = {
    L1: 0,
    L2: 0,
    L3: 0,
    L4: 0,
  }

  intervals = {
    L1: null,
    L2: null,
    L3: null,
    L4: null,
  }
}

const setRaceOptions = (_options) => {
  try {
    firebase
      .ref(`race/options/`)
      .set({
        ..._options,
      })
      .catch(console.error)
    sessionTime = _options.duration
    raceType = _options.type

    return {
      type: SET_RACE_OPTIONS,
      payload: _options,
    }
  } catch (_err) {
    console.error(_err.message)
  }
}

const setRaceStatus = (_status) => {
  try {
    firebase
      .ref(`race/status/`)
      .set({
        ..._status,
        sessionTime,
        running: false,
      })
      .catch(console.error)

    return {
      type: SET_RACE_STATUS,
      payload: _status,
    }
  } catch (_err) {
    console.error(_err.message)
  }
}

export { start, stop, restart, setRaceOptions, setRaceStatus }

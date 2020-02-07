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
  SET_RACE_OPTIONS
} from '../constants/'
import Artyom from 'artyom.js/build/artyom'

const { ipcRenderer } = window.require('electron')

const INTERVAL_SESSION_TIME = 1000
const ACTIVE = 1
const NOT_ACTIVE = 0
const MINIMUN_TIME_LAP = 5000

const artyom = new Artyom()
artyom.initialize({
  lang: 'it-IT'
})

let reset = {
  L1: true,
  L2: true,
  L3: true,
  L4: true
}

let startTime = {
  L1: 0,
  L2: 0,
  L3: 0,
  L4: 0
}

let endTime = {
  L1: 0,
  L2: 0,
  L3: 0,
  L4: 0
}

let lapTime = {
  L1: 0,
  L2: 0,
  L3: 0,
  L4: 0
}

let intervals = {
  L1: null,
  L2: null,
  L3: null,
  L4: null
}

const actionType = {
  L1: {
    endLap: L1_END_LAP,
    updateTime: UPDATE_L1_LAP_TIME
  },
  L2: {
    endLap: L2_END_LAP,
    updateTime: UPDATE_L2_LAP_TIME
  },
  L3: {
    endLap: L3_END_LAP,
    updateTime: UPDATE_L3_LAP_TIME
  },
  L4: {
    endLap: L4_END_LAP,
    updateTime: UPDATE_L4_LAP_TIME
  }
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
  return dispatch => {
    if (raceIsStopped) {
      stoppingEndTime = new Date().getTime()
      stoppingTime = stoppingEndTime - stoppingStartTime
    }

    raceIsStopped = false

    dispatch({
      type: SET_RACE_STATUS,
      payload: 'running'
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

      //end race
      if (
        (raceType === 'Timed Practise' || raceType === 'Race') &&
        sessionTime <= 0
      ) {
        console.log('race terminated')
        dispatch({
          type: SET_RACE_STATUS,
          payload: 'terminated'
        })

        dispatch({
          type: UPDATE_SESSION_TIME,
          payload: 0
        })

        raceIsStopped = true

        ipcRenderer.send('stop')

        clearInterval(intervalSessionTime)
        return
      }

      dispatch({
        type: UPDATE_SESSION_TIME,
        payload: sessionTime
      })
    }, INTERVAL_SESSION_TIME)
  }
}

const stop = () => {
  return _dispatch => {
    console.log('Stopped')
    ipcRenderer.send('stop')

    _dispatch({
      type: SET_RACE_STATUS,
      payload: 'stopped'
    })

    clearInterval(intervalSessionTime)

    raceIsStopped = true
    stoppingStartTime = new Date().getTime()
  }
}

const restart = () => {
  return _dispatch => {
    clearInterval(intervals.L1)
    clearInterval(intervals.L2)
    clearInterval(intervals.L3)
    clearInterval(intervals.L4)

    _resetData()

    _dispatch({
      type: SET_RACE_STATUS,
      payload: 'stopped'
    })

    _dispatch({
      type: RESET,
      payload: 0
    })
  }
}

const handleData = (_data, _dispatch) => {
  if (_data.value === NOT_ACTIVE) {
    reset[_data.lane] = true
  }

  if (_data.value === ACTIVE && reset[_data.lane]) {
    endTime[_data.lane] = new Date().getTime()

    if (startTime[_data.lane] !== 0) {
      if (
        endTime[_data.lane] - startTime[_data.lane] - stoppingTime <
        MINIMUN_TIME_LAP
      ) {
        console.log('Rumor detected')
        return
      }

      console.log(
        `terminated ${_data.lane} : ${endTime[_data.lane] -
          startTime[_data.lane] -
          stoppingTime}`
      )

      const words = (
        (endTime[_data.lane] - startTime[_data.lane] - stoppingTime) /
        1000
      )
        .toString()
        .split('.')
      artyom.say(`Corsia ${_data.lane.substr(1)}: ${words} secondi`)

      clearInterval(intervals[_data.lane])
      lapTime[_data.lane] = 0

      _dispatch({
        type: actionType[_data.lane].endLap,
        payload: {
          time: endTime[_data.lane] - startTime[_data.lane] - stoppingTime,
          when: new Date().getTime()
        }
      })

      stoppingStartTime = 0
      stoppingEndTime = 0
      stoppingTime = 0
    }

    console.log(`started ${_data.lane}`)

    startTime[_data.lane] = new Date().getTime()

    intervals[_data.lane] = setInterval(() => {
      if (!raceIsStopped) {
        _dispatch({
          type: actionType[_data.lane].updateTime,
          payload: lapTime[_data.lane]
        })
        lapTime[_data.lane] =
          new Date().getTime() - startTime[_data.lane] - stoppingTime
      }
    }, 1)

    reset[_data.lane] = false
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
    L4: true
  }

  startTime = {
    L1: 0,
    L2: 0,
    L3: 0,
    L4: 0
  }

  endTime = {
    L1: 0,
    L2: 0,
    L3: 0,
    L4: 0
  }

  lapTime = {
    L1: 0,
    L2: 0,
    L3: 0,
    L4: 0
  }

  intervals = {
    L1: null,
    L2: null,
    L3: null,
    L4: null
  }
}

const setRaceOptions = _options => {
  sessionTime = _options.duration
  raceType = _options.type

  return {
    type: SET_RACE_OPTIONS,
    payload: _options
  }
}

const setRaceStatus = _status => {
  return {
    type: SET_RACE_STATUS,
    payload: _status
  }
}

export { start, stop, restart, setRaceOptions, setRaceStatus }

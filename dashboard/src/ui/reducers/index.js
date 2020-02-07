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
  SET_NAMES,
  SET_RACE_STATUS,
  SET_RACE_OPTIONS
} from '../constants'

const initialState = {
  sessionTime: 0,
  l1LapTime: 0,
  l1Laps: [],
  l2LapTime: 0,
  l2Laps: [],
  l3LapTime: 0,
  l3Laps: [],
  l4LapTime: 0,
  l4Laps: [],
  names: {
    l1: '',
    l2: '',
    l3: '',
    l4: ''
  },
  raceStatus: 'stopped',
  raceOptions: {
    duration: 0,
    type: 'Free Practise',
    whenStarted: 0
  }
}

const rootReducer = (_state = initialState, _action) => {
  if (_action.type === UPDATE_SESSION_TIME) {
    return Object.assign({}, _state, {
      sessionTime: _action.payload
    })
  }

  if (_action.type === L1_END_LAP) {
    return Object.assign({}, _state, {
      l1LapTime: 0,
      l1Laps: [_action.payload, ..._state.l1Laps]
    })
  }

  if (_action.type === UPDATE_L1_LAP_TIME) {
    return Object.assign({}, _state, {
      l1LapTime: _action.payload
    })
  }

  if (_action.type === L2_END_LAP) {
    return Object.assign({}, _state, {
      l2LapTime: 0,
      l2Laps: [_action.payload, ..._state.l2Laps]
    })
  }

  if (_action.type === UPDATE_L2_LAP_TIME) {
    return Object.assign({}, _state, {
      l2LapTime: _action.payload
    })
  }

  if (_action.type === L3_END_LAP) {
    return Object.assign({}, _state, {
      l3LapTime: 0,
      l3Laps: [_action.payload, ..._state.l3Laps]
    })
  }

  if (_action.type === UPDATE_L3_LAP_TIME) {
    return Object.assign({}, _state, {
      l3LapTime: _action.payload
    })
  }

  if (_action.type === L4_END_LAP) {
    return Object.assign({}, _state, {
      l4LapTime: 0,
      l4Laps: [_action.payload, ..._state.l4Laps]
    })
  }

  if (_action.type === UPDATE_L4_LAP_TIME) {
    return Object.assign({}, _state, {
      l4LapTime: _action.payload
    })
  }

  if (_action.type === RESET) {
    return Object.assign({}, _state, {
      sessionTime: _state.raceOptions.duration,
      l1LapTime: 0,
      l1Laps: [],
      l2LapTime: 0,
      l2Laps: [],
      l3LapTime: 0,
      l3Laps: [],
      l4LapTime: 0,
      l4Laps: [],
      names: {
        l1: '',
        l2: '',
        l3: '',
        l4: ''
      },
      raceStatus: 'stopped',
      raceOptions: Object.assign({}, _state.raceOptions, {
        duration: _state.raceOptions.duration,
        whenStarted: 0
      })
    })
  }

  if (_action.type === SET_NAMES) {
    return Object.assign({}, _state, {
      names: _action.payload
    })
  }

  if (_action.type === SET_RACE_STATUS) {
    return Object.assign({}, _state, {
      raceStatus: _action.payload
    })
  }

  if (_action.type === SET_RACE_OPTIONS) {
    return Object.assign({}, _state, {
      raceOptions: _action.payload,
      sessionTime: _action.payload.duration
    })
  }

  return _state
}

export default rootReducer

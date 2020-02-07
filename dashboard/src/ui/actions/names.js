import { SET_NAMES } from '../constants/'

const setNames = _names => {
  return {
    type: SET_NAMES,
    payload: _names
  }
}

export { setNames }

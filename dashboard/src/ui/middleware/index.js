const middleware = ({ _dispatch }) => {
  return _next => {
    return _action => {
      return _next(_action)
    }
  }
}

export { middleware }

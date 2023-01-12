import React from 'react'
import Controller from './Controller'
import Podium from './Podium'
import Race from './Race'

const App = () => {
  return (
    <div className="wrapper">
      <div className="race">
        <Race />
      </div>
      <div className="controller">
        <Controller />
      </div>
      <Podium />
    </div>
  )
}

export default App

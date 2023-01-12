import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/ui/containers/App'
import { Provider } from 'react-redux'
import store from '../src/ui/store'
import './ui/assets/styles/index.css'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

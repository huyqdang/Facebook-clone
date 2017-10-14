import { applyMiddleware, createStore } from 'redux'
import reducer from './reducer'
import promise from 'redux-promise-middleware'
// import logger from 'redux-logger'

const middleware = applyMiddleware(promise())

export default createStore(reducer, middleware)

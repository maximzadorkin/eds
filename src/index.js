import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { navigationware } from './redux/middlewares/navigationware.js'
import { specificationware } from './redux/middlewares/specificationware.js'
import reportWebVitals from './reportWebVitals'
import rootReducer from './redux/reducers/rootReducer.js'
import { applyMiddleware, createStore } from 'redux'
import App from './App'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'


export const store = createStore(
    rootReducer,
    applyMiddleware(
        navigationware,
        specificationware,
        reduxThunk
    )
)

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

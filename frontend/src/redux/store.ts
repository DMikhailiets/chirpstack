import { devicesReducer } from './reducers/devicesReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { loginReducer, organizationsReducer, serviceProfileReducer } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

let rootReducer = combineReducers({
  loginReducer,
  organizationsReducer,
  devicesReducer,
  serviceProfileReducer,
})

type RootReducer = typeof rootReducer
export type AppState = ReturnType<RootReducer>

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  ));

export default store;
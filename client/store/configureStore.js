import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import contactsReducer from '../reducers/contacts';
import filtersReducer from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({contacts: contactsReducer, filters: filtersReducer}),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
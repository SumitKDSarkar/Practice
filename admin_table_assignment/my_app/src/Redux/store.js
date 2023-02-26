
import {
    combineReducers,
    legacy_createStore,
    applyMiddleware,
    compose
  } from "redux";
  import thunk from "redux-thunk";
import { tableReducer } from "./table.reducer";

  const rootReducer = combineReducers({
   
  
    table:tableReducer
     
    });
    
    const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
    
    export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
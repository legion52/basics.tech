
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import thunk from 'redux-thunk';
import { initState } from "./initState";
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunk)))

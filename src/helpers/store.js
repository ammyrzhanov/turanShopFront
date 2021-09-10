import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as localforage from "localforage";
import offlineConfig from "redux-offline/lib/defaults";
// import { offline } from "redux-offline";
// import logger  from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

offlineConfig.persistOptions = { storage: localforage };

export const store = createStore(
    rootReducer,
    compose(
        composeWithDevTools(
            applyMiddleware(
                thunkMiddleware,
                // logger
            )
        )
        // , offline()
    )
);
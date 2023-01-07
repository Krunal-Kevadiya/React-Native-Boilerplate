import { reduxBatch } from '@manaflair/redux-batch';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { {% if cookiecutter.state_management == 'saga' -%}createNetworkMiddleware,{% endif -%} reducer as NetworkReducer } from 'react-native-offline';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
{% if cookiecutter.state_management == 'saga' -%}
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@saga';
{% endif -%}
import { MMKVKeyConst, AppConst } from '@constants';
import { reduxStorage } from '@utils';
import { AppRequestReducer } from './app-request';
import { AuthReducer } from './auth';
import { socketMiddleware } from './middleware';

{% if cookiecutter.state_management == 'saga' -%}
const sagaMiddleware = AppConst.isDevelopment
  ? createSagaMiddleware({
      sagaMonitor: require('../configs/ReactotronConfig').default.createSagaMonitor()
    })
  : createSagaMiddleware();
const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200
});
{% endif -%}

/**
 * The Configuring persistConfig object for ReduxStorage.
 * @type {object}
 * @property {string} key - The key to use for persisting the state.
 * @property {number} version - The version of the state to persist.
 * @property {object} storage - The storage object to use for persisting the state.
 * @property {string[]} whitelist - The list of reducers to persist.
 * @property {string[]} blacklist - The list of reducers to not persist.
 */
const persistConfig = {
  key: MMKVKeyConst.redux,
  version: 1,
  storage: reduxStorage,
  whitelist: ['auth'], // Whitelist (Save Specific Reducers)
  blacklist: ['nav', 'navigation', 'appRequest', 'network'] // Blacklist (Don't Save Specific Reducers)
};

/**
 * Combining all the reducers into one reducer.
 * @returns {Object} The new reducers of the application.
 */
const rootReducer = combineReducers({
  network: NetworkReducer,
  appRequest: AppRequestReducer,
  auth: AuthReducer
});

/**
 * Creates a persisted reducer that can be used in a Redux store.
 * @param {PersistConfig} persistConfig - The configuration object for the persisted reducer.
 * @param {Reducer} rootReducer - The reducer to be persisted.
 * @returns {Reducer} - The persisted reducer.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareList: Array<any> = [socketMiddleware];
if (AppConst.isDevelopment) {
  /* Adding the redux-flipper middleware to the middleware list. */
  const createDebugger = require('redux-flipper').default;
  middlewareList.push(createDebugger());
}
{% if cookiecutter.state_management == 'saga' -%}
middlewareList.push(sagaMiddleware);
middlewareList.push(networkMiddleware);
{% endif -%}

/* Creating a store with the persisted reducer. */
/**
 * Configure the redux store.
 * This is a function that takes in the default redux store and returns a new store.
 * It is used to configure the store with middleware and reducer.
 * The default store is configured with thunk, which allows for asynchronous actions.
 * The default store is configured with the serializableCheck middleware,
 * which allows for actions to be serialized and deserialized.
 */
const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {% if cookiecutter.state_management == 'thunk' -%}true{% else -%}false{%- endif -%},
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(middlewareList),
  enhancers: [reduxBatch]
});

/**
 * Persists the store to local storage.
 * @param {Store} store - The redux store.
 * @returns None
 */
const persistor = persistStore(store);

{% if cookiecutter.state_management == 'saga' -%}
/**
 * Runs the root saga.
 */
sagaMiddleware.run(rootSaga);
{% endif -%}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch;

// Enable persistence
export default { store, persistor };

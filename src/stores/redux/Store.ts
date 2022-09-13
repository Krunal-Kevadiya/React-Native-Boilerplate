import { reduxBatch } from '@manaflair/redux-batch';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createNetworkMiddleware, reducer as NetworkReducer } from 'react-native-offline';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { AppConst } from '@constants';
import rootSaga from '@stores-saga';
import { ReduxStorage } from '@utils';
import { AppRequestReducer } from './app_request';
import { AuthReducer } from './auth';
import { socketMiddleware } from './middleware';

const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200
});

const persistConfig = {
  key: '@ReactNativeStructure',
  version: 1,
  storage: ReduxStorage,
  whitelist: ['auth'], // Whitelist (Save Specific Reducers)
  blacklist: ['nav', 'navigation', 'appRequest', 'network'] // Blacklist (Don't Save Specific Reducers)
};

const rootReducer = combineReducers({
  network: NetworkReducer,
  appRequest: AppRequestReducer,
  auth: AuthReducer
});

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewareList: Array<any> = [sagaMiddleware, socketMiddleware, networkMiddleware];

if (AppConst.isDevelopment) {
  const createDebugger = require('redux-flipper').default;
  middlewareList.push(createDebugger());
}

const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(middlewareList),
  enhancers: [reduxBatch]
});

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch;

// Enable persistence
export default { store, persistor };

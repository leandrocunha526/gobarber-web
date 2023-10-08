import persistStore from "redux-persist/es/persistStore";
import createSagaMiddleware from "redux-saga";
import createStore from "./createStore";
import persistedReducer from "./persistReducers";
import rootSaga from "./modules/rootSaga";
import rootReducer from "./modules/rootReducer";

const sagaMonitor =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "development"
        ? console.tron.createSagaMonitor() : null
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistedReducer(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };

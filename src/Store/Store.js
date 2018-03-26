import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from '../Reducers/index';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../Sagas/index'
import { autoRehydrate } from 'redux-persist'
import RehydrationServices from '../Services/RehydrationServices'
import ReduxPersist from '../Configs/ReduxPersist'

export default (onComplete) => {
    /* ------------- Redux Configuration ------------- */
    const middleware = []
    const enhancers = []

    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);
    // const logger = createLogger();
    // middleware.push(logger);

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware))

    // add the autoRehydrate enhancer
    if (ReduxPersist.active) {
        enhancers.push(autoRehydrate())
    }
    const store = createStore(rootReducer, compose(...enhancers))
    // configure persistStore and check reducer version number
    if (ReduxPersist.active) {
        RehydrationServices.updateReducers(store, onComplete)
    }
    sagaMiddleware.run(rootSaga)
    return store
}
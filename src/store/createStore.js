import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
    const enhancer =
        // eslint-disable-next-line no-undef
        process.env.NODE_ENV === 'development'
        ? compose(
            console.tron.createEnhancer(),
            applyMiddleware(...middlewares)
        )
        : applyMiddleware(...middlewares);

    return createStore(reducers, enhancer);
};

import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";
import reactotronReduxSaga from "reactotron-redux-saga";

if (process.env.NODE_ENV === "development") {
    const tron = Reactotron.configure({name: "React JS App"})
        .use(reactotronRedux())
        .use(reactotronReduxSaga())
        .connect();

    console.tron = tron;
    window.tron = tron;

    // Let's clear Reactotron on every time we load the app
    tron.clear();
}

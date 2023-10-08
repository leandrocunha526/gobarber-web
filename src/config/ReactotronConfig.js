import Reactostron from "reactotron-react-js"
import { reactotronRedux } from "reactotron-redux";
import reactotronSaga from "reactotron-redux-saga";

// eslint-disable-next-line no-undef
if(process.env.NODE_ENV === 'development'){
  const tron = Reactostron.configure({host: '0.0.0.0'})
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  console.tron = tron

  // Let's clear Reactotron on every time we load the app
  tron.clear();
}

// eslint-disable-next-line no-unused-vars
import { React } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./config/ReactotronConfig";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./routes";
import { store, persistor } from "./store";
import history from "./services/history";
import GlobalStyle from "./styles/global";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>
                    <Routers />
                    <GlobalStyle />
                    <ToastContainer autoClose={3000} />
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;

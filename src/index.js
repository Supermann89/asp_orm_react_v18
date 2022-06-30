import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "@fontsource/roboto/cyrillic.css";
import "./css/styles.css";
import { store, persistor } from "./store";
import App from "./components/App";

import interceptors from "./api/axiosConfig.interceptor";

interceptors(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
// @ts-ignore
import React from 'react'
// @ts-ignore
import ReactDOM from 'react-dom/client'
// @ts-ignore
import App from './App.tsx'
import './index.css'
// @ts-ignore
import GlobalStyle from "./styles/GlobalStyles.styles.ts";
import {BrowserRouter} from "react-router-dom";
import {store} from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <React.StrictMode>
        <GlobalStyle/>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
    </Provider>
)

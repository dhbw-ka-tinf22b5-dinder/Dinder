import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import GlobalStyle from "./styles/GlobalStyles.styles";
import {BrowserRouter} from "react-router-dom";
import {store} from './app/store'
import { Provider } from 'react-redux'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Provider store={store}>
    <React.StrictMode>
        <GlobalStyle/>
            <App/>
    </React.StrictMode>
    </Provider>
    </BrowserRouter>
)

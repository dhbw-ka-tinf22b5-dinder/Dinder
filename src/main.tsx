import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import GlobalStyle from "./styles/GlobalStyles.styles.ts";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GlobalStyle/>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
)

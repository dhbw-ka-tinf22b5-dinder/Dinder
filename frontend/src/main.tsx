import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalStyle from "./styles/GlobalStyles.styles.ts";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Provider store={store}>
			<React.StrictMode>
				<GlobalStyle />
				<App />
			</React.StrictMode>
		</Provider>
	</BrowserRouter>,
);

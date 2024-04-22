import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./app/store";
import "./index.css";
import GlobalStyle from "./styles/GlobalStyles.styles.ts";

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

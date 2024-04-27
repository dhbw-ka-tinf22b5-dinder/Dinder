import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import ErrorComponent from "./components/pages/404.component";
import Page from "./app/login/page.tsx";
import MainPageComponent from "./components/pages/mainPage.component";
import Page from "./app/registration/page.tsx";
import NavBarComponent from "./components/universal/navBar.component";
import { APP_ROUTES } from "./routes/routes";

import SwipePage from "./components/pages/SwipePage";

function App() {
	return (
		<Routes>
			<Route path={APP_ROUTES.home} element={<NavBarComponent />}>
				<Route index element={<MainPageComponent />} />
				<Route path={APP_ROUTES.login} element={<Page />} />
				<Route
					path={APP_ROUTES.registration}
					element={<Page />}
				/>
				<Route path={APP_ROUTES.error} element={<ErrorComponent />} />
				<Route element={<PrivateRoutes />}>
					<Route path={APP_ROUTES.swipepage} element={<SwipePage />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;

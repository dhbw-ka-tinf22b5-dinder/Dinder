import {Route, Routes} from "react-router-dom";
import MainPageComponent from "./components/pages/mainPage.component.tsx";
import NavBarComponent from "./components/universal/navBar.component.tsx";
import LoginComponent from "./components/pages/login.component.tsx";
import ErrorComponent from "./components/pages/404.component.tsx";
import {APP_ROUTES} from "./routes/routes.ts";

function App() {

    return (
        <Routes>
            <Route path={APP_ROUTES.home} element={<NavBarComponent/>}>
                <Route index element={<MainPageComponent/>}/>
                <Route path={APP_ROUTES.login} element={<LoginComponent />} />
                <Route path={APP_ROUTES.error} element={<ErrorComponent />} />
            </Route>
        </Routes>
    )
}

export default App

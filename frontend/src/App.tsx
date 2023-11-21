import {Route, Routes} from "react-router-dom";
import MainPageComponent from "./components/pages/mainPage.component";
import NavBarComponent from "./components/universal/navBar.component";
import LoginComponent from "./components/pages/login.component";
import ErrorComponent from "./components/pages/404.component";
import {APP_ROUTES} from "./routes/routes";
import RegistrationComponent from "./components/pages/registration.component";
import {createContext} from "react";
import HttpClient from "./clients/http-client";

export const HttpContext= createContext(null)
import {Provider} from "react-redux";

function App() {

    return (
        <HttpContext.Provider value={new HttpClient()}>
        <Routes>
            <Route path={APP_ROUTES.home} element={<NavBarComponent/>}>
                <Route index element={<MainPageComponent/>}/>
                <Route path={APP_ROUTES.login} element={<LoginComponent />} />
                <Route path={APP_ROUTES.registration} element={<RegistrationComponent/>} />
                <Route path={APP_ROUTES.error} element={<ErrorComponent />} />
            </Route>
        </Routes>
    </HttpContext.Provider>
    )
}

export default App

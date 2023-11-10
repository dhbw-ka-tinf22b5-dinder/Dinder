import {Route, Routes} from "react-router-dom";
import MainPageComponent from "./components/pages/mainPage.component";
import NavBarComponent from "./components/universal/navBar.component";
import LoginComponent from "./components/pages/login.component";
import ErrorComponent from "./components/pages/404.component";
import {APP_ROUTES} from "./routes/routes";
import {Button} from "./styles/buttons.styles";

function App() {

    return (
        <Routes>
            <Route path={APP_ROUTES.home} element={<NavBarComponent/>}>
                <Route index element={<MainPageComponent/>}/>
                <Route path={APP_ROUTES.login} element={<LoginComponent />} />
                <Route path={APP_ROUTES.error} element={<ErrorComponent />} />
                <Route path={APP_ROUTES.button} element={<Button/>}/>
            </Route>
        </Routes>
    )
}

export default App

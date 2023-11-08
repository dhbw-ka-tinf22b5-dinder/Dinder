import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainPage from "./pages/mainPage/mainPage";
import Login from "./pages/loginAndRegistration/login";
import Registration from "./pages/loginAndRegistration/registration";
import {Logo} from "./styled-components/home.styles";
function App() {
  return (

    <div className="App">
        <BrowserRouter>
            <nav className='nav'>
                <Logo src={"https://www.hdg.de/lemo/img/galeriebilder/biografien/merkel-angela_foto_LEMO-F-5-052_bbst.jpg"} />
            </nav>
            <Routes>
                <Route path='/' element={<MainPage />}/>
                <Route path='/registrationAndLogin/login' element={<Login/>}/>
                <Route path='/registrationAndLogin/registration' element={<Registration/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

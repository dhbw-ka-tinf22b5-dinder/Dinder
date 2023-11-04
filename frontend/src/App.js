import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainPage from "./pages/mainPage/mainPage";
import Login from "./pages/loginAndRegistration/login";
import Registration from "./pages/loginAndRegistration/registration";
function App() {
  return (

    <div className="App">
        <BrowserRouter>
            <nav className='nav'>
                <Link to='/'>Dinder</Link>
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

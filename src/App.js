import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useLogin } from './context/LoginContext';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Login from './features/auth/Login/Login'
import LoggedLayout from './components/Layout/LoggedLayout'
import Home from './Pages/Home'
import PlayersList from './Pages/PlayersList'
import PlayerProfile from './Pages/PlayerProfile'



axios.defaults.withCredentials = true

function App() {

    const { loggedIn } = useLogin()

    return (
        <BrowserRouter>
            <Routes>
                {
                    loggedIn === false
                        ? <Route path='*' element={<Login />} />
                        : <Route path='/' element={
                            <>
                                <Header />
                                <LoggedLayout />
                            </>
                        }>
                            <Route path="/" element={<Home />} />
                            <Route path="/jugador/listado" element={<PlayersList />} />
                            <Route path="/jugador/listado/:id" element={<PlayerProfile />} />
                        </Route>
                }
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

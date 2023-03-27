import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useLogin } from './context/LoginContext';

import Loading from './Pages/Loading'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Login from './features/auth/Login/Login'
import LoggedLayout from './components/Layout/LoggedLayout'
import Home from './Pages/Home'
import PlayersPage from './Pages/PlayersPage'
import PlayerProfile from './Pages/PlayerProfile'



axios.defaults.withCredentials = true

function App() {

    const { loggedIn } = useLogin()

    return (
        <BrowserRouter>
            <Routes>
                {
                    loggedIn
                        ? (<Route path='/' element={
                            <>
                                <Header />
                                <LoggedLayout />
                            </>
                           }>
                            <Route path="/" element={<Home />} />
                            <Route path="/jugador/listado" element={<PlayersPage />} />
                            <Route path="/jugador/listado/:id" element={<PlayerProfile />} />
                        </Route>)
                        
                        : loggedIn === undefined 
                        ? <Route path='*' element={<Loading />} />

                        : <Route path='*' element={<Login />} />
                }
            </Routes>
            {
                loggedIn !== undefined
                ? <Footer />
                : ''
            }
        </BrowserRouter>
    );
}

export default App;

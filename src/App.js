import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer'
import Login from './features/auth/Login/Login'
import LoggedLayout from './components/Layout/LoggedLayout'

import Home from './Pages/Home'
import PlayerProfile from './Pages/PlayerProfile';
import PlayersList from './Pages/PlayersList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Layout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path='/' element={<LoggedLayout />}>
           <Route index element={<Home />} />
           <Route path='/jugador/listado' element={<PlayersList />} />
           <Route path='/jugador/listado/:id' element={<PlayerProfile />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

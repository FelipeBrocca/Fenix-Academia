import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer'
import Login from './features/auth/Login/Login'
import LoggedLayout from './components/Layout/LoggedLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Layout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path='/' element={<LoggedLayout />}>

        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

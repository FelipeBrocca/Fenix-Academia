import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route exact path='/' element={<Home />} />
        {/* <Route exact /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

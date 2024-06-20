import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componentes/Home';
import RestaurantRouters from './componentes/RestaurantRouters'; 
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import LoginUsersRouters from './componentes/Login';
import UserRouters from './componentes/UserRouters';
import HomesRouters from './componentes/HomesRouters';
import Login from './componentes/Login';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path="/restaurantes" element={<RestaurantRouters />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/usuario" element={<UserRouters />} />
        <Route path="/casas" element={<HomesRouters />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

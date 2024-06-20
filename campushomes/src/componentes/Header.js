import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/inicio">Inicio</Link></li>
          <li><Link to="/restaurantes">Restaurantes</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/usuario">Usuario</Link></li>
          <li><Link to="/casas">Casas</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
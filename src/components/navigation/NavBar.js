import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavStyle.scss';


const NavBar = (props) => (
  <div className="navbar">

    <div className="leftside">
      <ul className="navlist">
        <li> <NavLink to="/home">Fourier.</NavLink> </li>
      </ul>
    </div>

    <div className="rightside">
      <ul className="navlist">
        <li> <NavLink activeClassName="selected" to="/documentation">Documentation</NavLink> </li>
      </ul>
    </div>

  </div>

);




export default NavBar;

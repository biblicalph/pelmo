import React from 'react';
import { Link } from 'react-router-dom';
import 'App/components/Header/header.css';
import { routeList } from 'App/utils';

const MenuItem = ({ url, title }) => {
  return (
    <li className="navbar-menu-item">
      <Link to={url} className="navbar-menu-item-link">{title}</Link>
    </li>
  );
};

const Header = () => {
  return (
    <nav className="navbar">
      <Link className="logo" to={routeList.homePage}>Weather App</Link>
      <ul className="navbar-menu">
        <MenuItem url={routeList.gallery} title="Gallery" />
        <MenuItem url={routeList.contactUs} title="Contact Us" />
      </ul>
    </nav>
  )
};

export default Header;
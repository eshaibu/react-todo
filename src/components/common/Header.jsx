import React from 'react';
import { Link } from 'react-router-dom';


export const Header = () => {
  return (
    <nav className="navbar bg-light fixed-top">
      <div className="container">
        <div className="navbar-header navbar-light row">
          <Link className="navbar-brand" to="/">TodoApp</Link>
        </div>
      </div>
    </nav>
  );
};

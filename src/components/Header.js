import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const titles = () => {
    switch (pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default: return '';
    }
  };

  const searchIconToggle = () => {
    const link = (
      <NavLink
        to="/"
        data-testid="search-top-btn"
        src={ searchIcon }
      />
    );
    switch (pathname) {
    case '/meals':
      return link;
    case '/drinks':
      return link;
    default: return '';
    }
  };

  return (
    <header>
      <h1
        data-testid="page-title"
      >
        {titles()}
      </h1>
      <NavLink
        to="/"
        activeClassName="active"
        data-testid="profile-top-btn"
        src={ profileIcon }
      />
      {searchIconToggle()}
    </header>
  );
}

Header.propTypes = {
  NavLink: PropTypes.any,
}.isRequired;

export default Header;

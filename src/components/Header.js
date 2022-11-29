import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesAppContext from '../context/RecipesAppContext';

function Header() {
  const { btnSearch, setBtnSearch } = useContext(RecipesAppContext);
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
      <button
        type="button"
        onClick={ () => {
          setBtnSearch(!btnSearch);
        } }
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="searchIcon"
        />
      </button>
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
        to="/profile"
        activeClassName="active"
        data-testid="profile-top-btn"
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="profileIcon" />
      </NavLink>
      {searchIconToggle()}
    </header>
  );
}

Header.propTypes = {
  NavLink: PropTypes.any,
}.isRequired;

export default Header;

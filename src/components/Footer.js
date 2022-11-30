import React from 'react';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();
  const btnDrinks = () => {
    history.push('/drinks');
  };
  const btnMeals = () => {
    history.push('/meals');
  };

  return (
    <footer className="footer" data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ btnDrinks }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="Icon Drinks" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        type="button"
        onClick={ btnMeals }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="Icon Meals" />
      </button>
    </footer>
  );
}

export default Footer;

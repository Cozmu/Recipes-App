import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';
import RecipesAppContext from '../context/RecipesAppContext';

function Footer() {
  const { setRecipes } = useContext(RecipesAppContext);
  const history = useHistory();
  const btnDrinks = () => {
    history.push('/drinks');
    setRecipes([]);
  };
  const btnMeals = () => {
    history.push('/meals');
    setRecipes([]);
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

import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import RequestMealsAPI from '../services/RequestMealsAPI';
import RequestDrinksAPI from '../services/RequestDrinksAPI';

function SearchBar() {
  const [category, setCategory] = useState('Ingredient');
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(true);
  const { location: { pathname } } = history;
  const {
    btnSearch,
    searchRequired,
    setSearchRequired,
    setMealsArr,
    setDrinksArr,
    mealsArr,
    drinksArr,
  } = useContext(RecipesAppContext);

  useEffect(() => {
    if (mealsArr?.length === 1) {
      history.push(`/meals/${+mealsArr[0].idMeal}`);
    }
  }, [mealsArr, history]);

  useEffect(() => {
    if (drinksArr?.length === 1) {
      history.push(`/drinks/${+drinksArr[0].idDrink}`);
    }
  }, [drinksArr, history]);

  useEffect(() => {

  }, []);

  const sendDrinks = () => {
    let url = '';
    if (searchRequired.category === 'Ingredient') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchRequired.searchText}`;
    } else if (searchRequired.category === 'Name') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchRequired.searchText}`;
    } else if (searchRequired.category === 'First Letter') {
      if (searchRequired.searchText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchRequired.searchText}`;
      }
    }
    RequestDrinksAPI(url).then((drinks) => setDrinksArr(drinks));
  };

  const sendMeal = () => {
    let url = '';
    if (searchRequired.category === 'Ingredient') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchRequired.searchText}`;
    } else if (searchRequired.category === 'Name') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchRequired.searchText}`;
    } else if (searchRequired.category === 'First Letter') {
      if (searchRequired.searchText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchRequired.searchText}`;
      }
    }
    RequestMealsAPI(url).then((meals) => setMealsArr(meals));
  };

  useEffect(() => {
    if (searchRequired.category !== '') {
      setIsDisabled(false);
    }
  }, [searchRequired]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearchRequired({
      ...searchRequired,
      [name]: value,
    });
  };

  return (
    <div>
      {btnSearch && (
        <>
          <label htmlFor="searchInput">
            <input
              data-testid="search-input"
              id="searchInput"
              type="text"
              name="searchText"
              onChange={ handleChange }
              value={ searchRequired.searchText }
            />
          </label>
          <label htmlFor="ingredientSearchRadio">
            <input
              name="category"
              data-testid="ingredient-search-radio"
              id="ingredientSearchRadio"
              type="radio"
              onChange={ ({ target }) => {
                setCategory(target.value);
              } }
              value="Ingredient"
              checked={ ({ target }) => category === target.value }
            />
            Ingredient
          </label>
          <label htmlFor="nameSearchRadio">
            <input
              name="category"
              type="radio"
              data-testid="name-search-radio"
              id="nameSearchRadio"
              onChange={ handleChange }
              value="Name"
            />
            Name
          </label>
          <label htmlFor="firstLetterSearchRadio">
            <input
              name="category"
              data-testid="first-letter-search-radio"
              id="firstLetterSearchRadio"
              type="radio"
              onChange={ handleChange }
              value="First Letter"
            />
            First Letter
          </label>
          <button
            data-testid="exec-search-btn"
            type="button"
            disabled={ isDisabled }
            onClick={ pathname === '/meals' ? sendMeal : sendDrinks }
          >
            SEARCH
          </button>
        </>
      )}
    </div>
  );
}

export default SearchBar;

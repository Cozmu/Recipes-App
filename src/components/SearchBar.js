import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import RequestMealsAPI from '../services/RequestMealsAPI';
import RequestDrinksAPI from '../services/RequestDrinksAPI';

function SearchBar() {
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;
  const {
    btnSearch,
    searchRequired,
    setSearchRequired,
    setMealsArr,
    setDrinksArr } = useContext(RecipesAppContext);

  const sendDrinks = () => {
    if (searchRequired.category === 'Ingredient') {
      const url1 = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchRequired.searchText}`;
      RequestDrinksAPI(url1).then((drinks) => setDrinksArr(drinks));
    }
    if (searchRequired.category === 'Name') {
      const url2 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchRequired.searchText}`;
      RequestDrinksAPI(url2).then((drinks) => setDrinksArr(drinks));
    }
    if (searchRequired.category === 'First Letter') {
      console.log('entrou');
      if (searchRequired.searchText.length > 1) {
        console.log('maior q 1');
        global.alert('Your search must have only 1 (one) character');
      } else {
        console.log('fetch');
        const url3 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchRequired.searchText}`;
        RequestDrinksAPI(url3).then((drinks) => setDrinksArr(drinks));
      }
    }
  };

  const sendMeal = () => {
    if (searchRequired.category === 'Ingredient') {
      const url1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchRequired.searchText}`;
      RequestMealsAPI(url1).then((meals) => setMealsArr(meals));
    }
    if (searchRequired.category === 'Name') {
      const url2 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchRequired.searchText}`;
      RequestMealsAPI(url2).then((meals) => setMealsArr(meals));
    }
    if (searchRequired.category === 'First Letter') {
      if (searchRequired.searchText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const url3 = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchRequired.searchText}`;
        RequestMealsAPI(url3).then((meals) => setMealsArr(meals));
      }
    }
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
            />
          </label>
          <label htmlFor="ingredientSearchRadio">
            <input
              name="category"
              data-testid="ingredient-search-radio"
              id="ingredientSearchRadio"
              type="radio"
              onChange={ handleChange }
              value="Ingredient"
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

import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';

function SearchBar() {
  const [category, setCategory] = useState('');
  const [searchFor, setSearchFor] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;
  const {
    btnSearch,
    recipes,
    setRecipes,
  } = useContext(RecipesAppContext);

  useEffect(() => {
    if (recipes && recipes.length === 1) {
      const path = pathname.includes('meals')
        ? `/meals/${recipes[0].idMeal}`
        : `/drinks/${recipes[0].idDrink}`;
      history.push(path);
    }
  }, [recipes, history, pathname]);

  const firstLetter = 'First Letter';
  const sendDrinks = async () => {
    let url = '';
    if (category === 'Ingredient') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFor}`; // quebra em erro de busca
    } else if (category === 'Name') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchFor}`;
    } else if (category === firstLetter) {
      if (searchFor.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchFor}`;
      }
    }
    const result = await requestRecipesFromAPI(url);
    if (result.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipes(result);
  };

  const sendMeal = async () => {
    let url = '';
    if (category === 'Ingredient') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFor}`;
    } else if (category === 'Name') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFor}`;
    } else if (category === firstLetter) {
      if (searchFor.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFor}`;
      }
    }
    const result = await requestRecipesFromAPI(url);
    if (result.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipes(result);
  };

  // const handleClick = async () => {
  //   let url = '';
  //   const path = pathname.includes('meals');
  //   if (!path && category === 'Ingredient') {
  //     url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFor}`;
  //   }
  //   if (!path && category === 'Name') {
  //     url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchFor}`;
  //   }
  //   if (!path && category === firstLetter) {
  //     if (category.length > 1) {
  //       global.alert('Your search must have only 1 (one) character');
  //     } else {
  //       url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchFor}`;
  //     }
  //   }
  //   if (path && category === 'Ingredient') {
  //     url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFor}`;
  //   }
  //   if (path && category === 'Name') {
  //     url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFor}`;
  //   }
  //   if (path && category === firstLetter) {
  //     if (category.length > 1) {
  //       global.alert('Your search must have only 1 (one) character');
  //     } else {
  //       url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFor}`;
  //     }
  //   }
  //   const result = await requestRecipesFromAPI(url);
  //   setRecipes(result);
  // };

  useEffect(() => {
    if (category !== '') {
      setIsDisabled(false);
    }
  }, [category]);

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
              onChange={ ({ target }) => setSearchFor(target.value) }
              value={ searchFor }
            />
          </label>
          <label htmlFor="ingredientSearchRadio">
            <input
              name="category"
              data-testid="ingredient-search-radio"
              id="ingredientSearchRadio"
              type="radio"
              value="Ingredient"
              onChange={ ({ target }) => setCategory(target.value) }
              checked={ category === 'Ingredient' }
            />
            Ingredient
          </label>
          <label htmlFor="nameSearchRadio">
            <input
              name="category"
              type="radio"
              data-testid="name-search-radio"
              id="nameSearchRadio"
              value="Name"
              onChange={ ({ target }) => setCategory(target.value) }
              checked={ category === 'Name' }
            />
            Name
          </label>
          <label htmlFor="firstLetterSearchRadio">
            <input
              name="category"
              data-testid="first-letter-search-radio"
              id="firstLetterSearchRadio"
              type="radio"
              value="First Letter"
              onChange={ ({ target }) => setCategory(target.value) }
              checked={ category === 'First Letter' }
            />
            First Letter
          </label>
          <button
            data-testid="exec-search-btn"
            type="button"
            disabled={ isDisabled }
            onClick={ pathname === '/meals' ? sendMeal : sendDrinks }
            // onClick={ handleClick }
          >
            SEARCH
          </button>
        </>
      )}
    </div>
  );
}

export default SearchBar;

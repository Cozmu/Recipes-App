import { useEffect, useState, useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import requestAPIFetch from '../services/RequestAPIFetch';

function SearchBar() {
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    btnSearch,
    searchRequired,
    setSearchRequired,
    setMelsArr } = useContext(RecipesAppContext);

  const handleSubmite = async () => {
    if (searchRequired.category === 'Ingredient') {
      const url1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchRequired.searchText}`;
      requestAPIFetch(url1).then((meals) => setMelsArr(meals));
    }
    if (searchRequired.category === 'Name') {
      const url2 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchRequired.searchText}`;
      requestAPIFetch(url2).then((meals) => setMelsArr(meals));
    }
    if (searchRequired.category === 'First Letter') {
      if (searchRequired.searchText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const url3 = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchRequired.searchText}`;
        requestAPIFetch(url3).then((meals) => setMelsArr(meals));
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
            onClick={ () => handleSubmite() }
          >
            SEARCH
          </button>
        </>
      )}
    </div>
  );
}

export default SearchBar;

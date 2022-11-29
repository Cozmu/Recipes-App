import { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function SearchBar() {
  const { btnSearch } = useContext(RecipesAppContext);
  return (
    <div>
      {btnSearch && (
        <>
          <label htmlFor="searchInput">
            <input
              data-testid="search-input"
              id="searchInput"
              type="text"
            />
          </label>
          <label htmlFor="ingredientSearchRadio">
            <input
              name="search-radio"
              data-testid="ingredient-search-radio"
              id="ingredientSearchRadio"
              type="radio"
            />
          </label>
          <label htmlFor="nameSearchRadio">
            <input
              name="search-radio"
              type="radio"
              data-testid="name-search-radio"
              id="nameSearchRadio"
            />
          </label>
          <label htmlFor="firstLetterSearchRadio">
            <input
              name="search-radio"
              data-testid="first-letter-search-radio"
              id="firstLetterSearchRadio"
              type="radio"
            />
          </label>
          <button
            data-testid="exec-search-btn"
            type="button"
          >
            SEARCH
          </button>
        </>
      )}
    </div>
  );
}

export default SearchBar;

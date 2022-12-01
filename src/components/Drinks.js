import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';

function Drinks() {
  const [firstDrinks, setFirstDrinks] = useState([]);
  const [drinksCategorys, setDrinksCategorys] = useState([]);
  const [filtersCollection, setFiltersCollection] = useState([]);
  const TWELVE = 12;
  const FIVE = 5;
  const {
    recipes,
    setRecipes,
  } = useContext(RecipesAppContext);

  const displaysDrinks = (drinks) => {
    const arr = [];
    for (let index = 0; index < TWELVE; index += 1) {
      if (drinks[index]) {
        arr.push(drinks[index]);
      }
    }
    return arr;
  };

  const displaysCategorys = (categorys) => {
    const arr = [];
    for (let index = 0; index < FIVE; index += 1) {
      if (categorys[index]) {
        arr.push(categorys[index]);
      }
    }
    return arr;
  };

  const firstRecipes = async () => {
    const result = await requestRecipesFromAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setFirstDrinks(result);
  };

  const categorys = async () => {
    const resultCategory = await requestRecipesFromAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    setDrinksCategorys(resultCategory);
  };

  const filters = async (filterParam) => {
    setRecipes([]);
    if (filtersCollection.length > 1) {
      return setFiltersCollection([]);
    }
    if (filterParam === 'Cocktail') {
      const resultCocktail = await requestRecipesFromAPI('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
      setFiltersCollection(resultCocktail);
    }
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterParam}`;
    const result = await requestRecipesFromAPI(endPoint);
    setFiltersCollection(result);
  };

  useEffect(() => {
    categorys();
    firstRecipes();
  }, []);

  const display = (filtersCollection.length === 0
    ? displaysDrinks(firstDrinks).map(({ strDrinkThumb, strDrink, idDrink }, index) => (
      <NavLink
        to={ `/drinks/${idDrink}` }
        key={ index }
        data-testid={ `${index}-recipe-card` }
      >
        <h3
          data-testid={ `${index}-card-name` }
        >
          {strDrink}
        </h3>
        <img
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          width="250"
          alt={ strDrink }
        />
      </NavLink>
    )) : displaysDrinks(filtersCollection)
      .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
        <NavLink
          to={ `/drinks/${idDrink}` }
          key={ idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <h3
            data-testid={ `${index}-card-name` }
          >
            {strDrink}
          </h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt={ idDrink }
            width="250"
          />
        </NavLink>
      )));

  return (
    <div>
      <button
        onClick={ () => {
          setRecipes([]);
          setFiltersCollection([]);
        } }
        data-testid="All-category-filter"
        type="button"
      >
        All
      </button>
      {displaysCategorys(drinksCategorys).map(({ strCategory }) => (
        <section key={ strCategory }>
          <button
            type="button"
            onClick={ () => filters(strCategory) }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        </section>
      ))}
      {recipes?.length > 1 ? (recipes?.length > 1
      && displaysDrinks(recipes).map(({ strDrink, strDrinkThumb, idDrink }, i) => (
        <NavLink
          to={ `/drinks/${idDrink}` }
          key={ i }
          data-testid={ `${i}-recipe-card` }
        >
          <h3
            data-testid={ `${i}-card-name` }
          >
            {strDrink}
          </h3>
          <img
            data-testid={ `${i}-card-img` }
            src={ strDrinkThumb }
            width="250"
            alt={ strDrink }
          />
        </NavLink>
      ))) : display}
    </div>
  );
}

export default Drinks;

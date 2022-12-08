import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';
import display from '../helpers/display';

function Meals() {
  const [firstMeals, setFirstMeals] = useState([]);
  const [mealsCategorys, setMealsCategorys] = useState([]);
  const [filtersCollection, setFiltersCollection] = useState([]);
  const TWELVE = 12;
  const FIVE = 5;
  const {
    recipes,
    setRecipes,
  } = useContext(RecipesAppContext);

  const firstRecipes = async () => {
    const result = await requestRecipesFromAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setFirstMeals(result);
  };

  const categorys = async () => {
    const resultCategory = await requestRecipesFromAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    setMealsCategorys(resultCategory);
  };

  const filters = async (filterParam) => {
    setRecipes([]);
    if (filtersCollection.length > 1) {
      setFiltersCollection([]);
    } else if (filterParam === 'Beef') {
      const resultBeef = await requestRecipesFromAPI('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
      setFiltersCollection(resultBeef);
    } else {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterParam}`;
      const result = await requestRecipesFromAPI(endPoint);
      setFiltersCollection(result);
    }
  };

  useEffect(() => {
    categorys();
    firstRecipes();
  }, []);

  const rendeizacao = (filtersCollection.length === 0
    ? display(TWELVE, firstMeals).map(({ strMealThumb, strMeal, idMeal }, index) => (
      <NavLink
        to={ `/meals/${idMeal}` }
        key={ index }
        data-testid={ `${index}-recipe-card` }
      >
        <h3
          data-testid={ `${index}-card-name` }
        >
          {strMeal}
        </h3>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          width="250"
          alt={ strMeal }
        />
      </NavLink>
    )) : display(TWELVE, filtersCollection)
      .map(({ strMeal, strMealThumb, idMeal }, index) => (
        <NavLink
          to={ `/meals/${idMeal}` }
          key={ idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <h3
            data-testid={ `${index}-card-name` }
          >
            {strMeal}
          </h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ idMeal }
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
        className="buttonsMeals"
      >
        All
      </button>
      {display(FIVE, mealsCategorys).map(({ strCategory }) => (
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
      {recipes?.length > 1
        ? display(TWELVE, recipes).map(({ strMeal, strMealThumb, idMeal }, i) => (
          <NavLink
            to={ `/meals/${idMeal}` }
            key={ i }
            data-testid={ `${i}-recipe-card` }
          >
            <h3
              data-testid={ `${i}-card-name` }
            >
              {strMeal}
            </h3>
            <img
              data-testid={ `${i}-card-img` }
              src={ strMealThumb }
              width="250"
              alt={ strMeal }
            />
          </NavLink>
        ))
        : rendeizacao}
    </div>
  );
}

export default Meals;

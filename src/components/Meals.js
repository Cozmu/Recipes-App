import { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function Meals() {
  const TWELVE = 12;
  const {
    mealsArr,
  } = useContext(RecipesAppContext);

  const displaysMeals = () => {
    const arr = [];
    for (let index = 0; index < TWELVE; index += 1) {
      if (mealsArr[index]) {
        arr.push(mealsArr[index]);
      }
    }
    return arr;
  };

  return (
    <div>
      {mealsArr?.length > 1
        && displaysMeals().map(({ strMeal, strMealThumb }, i) => (
          <section
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
          </section>
        ))}
    </div>
  );
}

export default Meals;

import { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function Drinks() {
  const TWELVE = 12;
  const {
    recipes,
  } = useContext(RecipesAppContext);

  const displaysDrinks = () => {
    const arr = [];
    for (let index = 0; index < TWELVE; index += 1) {
      if (recipes[index]) {
        arr.push(recipes[index]);
      }
    }
    return arr;
  };

  return (
    <div className="drinks">
      {recipes?.length > 1
      && displaysDrinks().map(({ strDrink, strDrinkThumb }, i) => (
        <section
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
        </section>
      ))}

    </div>
  );
}

export default Drinks;

import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';

function DetailsDrinks() {
  const [recipePhoto, setRecipePhoto] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeAlcoholic, setRecipeAlcoholic] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const { idDaReceita } = useParams();

  const handleFilter = (receita) => {
    const FIFTEEN = 15;
    const arr = [];
    for (let index = 1; index <= FIFTEEN; index += 1) {
      if (receita[0][`strIngredient${index}`] !== null) {
        arr.push(`${receita[0][`strIngredient${index}`]} ${receita[0][`strMeasure${index}`
        ]}`);
      }
    }
    setIngredientAndMeasure(arr);
  };

  const displayDetails = async () => {
    const result = await requestRecipesFromAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`);
    handleFilter(result);
    setRecipePhoto(result[0].strDrinkThumb);
    setRecipeTitle(result[0].strDrink);
    setRecipeAlcoholic(result[0].strAlcoholic);
    setInstructions(result[0].strInstructions);
  };

  useEffect(() => {
    displayDetails();
  }, []);

  return (
    <div>
      <NavLink
        to="/drinks"
      >
        Voltar
      </NavLink>
      <img
        width="250"
        data-testid="recipe-photo"
        src={ recipePhoto }
        alt={ idDaReceita }
      />
      <h3
        data-testid="recipe-title"
      >
        {recipeTitle}
      </h3>
      <h4
        data-testid="recipe-category"
      >
        {recipeAlcoholic}
      </h4>
      <ul>
        {ingredientAndMeasure.map((e, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
            {e}
          </li>
        ))}
      </ul>
      <p
        data-testid="instructions"
      >
        {instructions}

      </p>
    </div>
  );
}

export default DetailsDrinks;

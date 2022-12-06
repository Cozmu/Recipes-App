import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';

function DetailsMeals() {
  const [recipePhoto, setRecipePhoto] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [video, setVideo] = useState('');
  const { idDaReceita } = useParams();

  const handleFilter = (receita) => {
    const TWENTY = 20;
    const arr = [];
    for (let index = 1; index <= TWENTY; index += 1) {
      if (receita[0][`strIngredient${index}`] !== ''
       && receita[0][`strIngredient${index}`] !== null) {
        arr.push(`${receita[0][`strIngredient${index}`]} 
          ${receita[0][`strMeasure${index}`]}`);
      }
    }
    setIngredientAndMeasure(arr);
  };

  const displayDetails = async () => {
    const result = await requestRecipesFromAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`);
    handleFilter(result);
    setRecipePhoto(result[0].strMealThumb);
    setRecipeTitle(result[0].strMeal);
    setRecipeCategory(result[0].strCategory);
    setInstructions(result[0].strInstructions);
    const ytLink = result[0].strYoutube;
    const YT = ytLink.split('watch?v=');
    setVideo(YT);
  };

  const displayRecommendations = async () => {
    const result = await requestRecipesFromAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setRecommendations(result);
  };

  useEffect(() => {
    displayDetails();
    displayRecommendations();
  }, []);

  return (
    <div>
      <NavLink
        to="/meals"
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
        {recipeCategory}
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
      <iframe
        data-testid="video"
        src={ `${video[0]}embed/${video[1]}` }
        title={ recipeTitle }
        frameBorder="0"
        allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default DetailsMeals;

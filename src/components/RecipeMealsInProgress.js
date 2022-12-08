import { useState, useEffect, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';
import handleFilter from '../helpers/handleFilter';
import InteractionBtns from './InteractionBtns';

function RecipeMealsInProgress() {
  const [newFav, setNewFav] = useState({});
  const [recipePhoto, setRecipePhoto] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const { inProgressRecipes } = useContext(RecipesAppContext);
  const { idDaReceita } = useParams();

  const requestDetails = async () => {
    const TWENTY = 20;
    const request = await requestRecipesFromAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`);
    const result = {
      id: request[0].idMeal,
      type: 'meal',
      nationality: request[0].strArea,
      category: request[0].strCategory,
      alcoholicOrNot: '',
      name: request[0].strMeal,
      image: request[0].strMealThumb,
    };
    setNewFav(result);
    const filtro = handleFilter(request, TWENTY);
    setIngredientAndMeasure(filtro);
    setRecipePhoto(request[0].strMealThumb);
    setRecipeTitle(request[0].strMeal);
    setRecipeCategory(request[0].strCategory);
    setInstructions(request[0].strInstructions);
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    requestDetails();
  }, []);

  return (
    <div>
      <NavLink
        to={ `/meals/${idDaReceita}` }
      >
        Voltar
      </NavLink>
      <img
        width="250"
        data-testid="recipe-photo"
        src={ recipePhoto }
        alt={ idDaReceita }
      />
      <h1
        data-testid="recipe-title"
      >
        {recipeTitle}
      </h1>
      <h4
        data-testid="recipe-category"
      >
        {recipeCategory}
      </h4>
      <InteractionBtns
        idDaReceita={ idDaReceita }
        newFav={ newFav }
      />
      <p
        data-testid="instructions"
      >
        {instructions}
      </p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipeMealsInProgress;

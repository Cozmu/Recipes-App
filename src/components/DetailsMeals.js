import { useEffect, useState, useContext } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';
import display from '../helpers/display';
import '../style/Details.css';
import RecipesAppContext from '../context/RecipesAppContext';
import InteractionBtns from './InteractionBtns';
import handleFilter from '../helpers/handleFilter';

function DetailsMeals() {
  const [newFav, setNewFav] = useState({});
  const { inProgressRecipes, setInProgressRecipes } = useContext(RecipesAppContext);
  const history = useHistory();
  const SIX = 6;
  const [recipePhoto, setRecipePhoto] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [video, setVideo] = useState('');
  const { idDaReceita } = useParams();

  const displayDetails = async () => {
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
    const ytLink = request[0].strYoutube;
    const YT = ytLink.split('watch?v=');
    setVideo(YT);
  };

  const requestRecommendations = async () => {
    const result = await requestRecipesFromAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setRecommendations(result);
  };

  useEffect(() => {
    displayDetails();
    requestRecommendations();
  }, []);

  const rrp = () => { // redirect to recipe in progress
    setInProgressRecipes({
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
        [idDaReceita]: [],
      },
    });
    history.push(`/meals/${idDaReceita}/in-progress`);
  };

  const toggleInProgress = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: {}, meals: {} };
    const recipesID = Object.keys(storage.meals);
    return recipesID.includes(idDaReceita) ? 'Continue Recipe' : 'Start Recipe';
  };

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
      <InteractionBtns
        newFav={ newFav }
        idDaReceita={ idDaReceita }
        dataTestid="favorite-btn"
      />
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
      <section
        className="recommendationCard-container"
      >
        {display(SIX, recommendations)
          .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
            <NavLink
              to={ `/drinks/${idDrink}` }
              className="recommendationCard"
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {strDrink}
              </p>
              <img src={ strDrinkThumb } alt={ strDrink } />
            </NavLink>
          ))}
      </section>
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ rrp } // redirect to recipe in progress
      >
        { toggleInProgress() }
      </button>
    </div>
  );
}

export default DetailsMeals;

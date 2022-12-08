import { useEffect, useState, useContext } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';
import display from '../helpers/display';
import '../style/Details.css';
import RecipesAppContext from '../context/RecipesAppContext';
import shareIncon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DetailsMeals() {
  const [toggleShare, setToggleShare] = useState(false);
  const [resultAPI, setResultAPI] = useState([]);
  const { inProgressRecipes, setInProgressRecipes,
    favorites, setFavorites, isFavorite, setIsFavorite } = useContext(RecipesAppContext);
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
    setResultAPI(result);
    handleFilter(result);
    setRecipePhoto(result[0].strMealThumb);
    setRecipeTitle(result[0].strMeal);
    setRecipeCategory(result[0].strCategory);
    setInstructions(result[0].strInstructions);
    const ytLink = result[0].strYoutube;
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
    const storeFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storeFav?.some((e) => e.id === idDaReceita)) {
      setIsFavorite(blackHeartIcon);
    } else {
      setIsFavorite(whiteHeartIcon);
    }
  }, []);

  useEffect(() => {
    if (favorites?.some((e) => e.id === idDaReceita)) {
      setIsFavorite(blackHeartIcon);
    } else {
      setIsFavorite(whiteHeartIcon);
    }
  }, [favorites]);

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

  const toggleFavorite = () => {
    const newFav = {
      id: resultAPI[0].idMeal,
      type: 'meal',
      nationality: resultAPI[0].strArea,
      category: resultAPI[0].strCategory,
      alcoholicOrNot: '',
      name: resultAPI[0].strMeal,
      image: resultAPI[0].strMealThumb,
    };
    if (favorites.some((e) => e.id === newFav.id)) {
      const deteleFav = favorites.filter((e) => e.id !== newFav.id);
      setFavorites(deteleFav);
    } else {
      setFavorites([...favorites, newFav]);
    }
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
      <button
        type="button"
        onClick={ toggleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite }
          alt="Favorite"
        />
      </button>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          const TIME = 3000;
          copy(`http://localhost:3000/meals/${idDaReceita}`);
          setToggleShare(true);
          setTimeout(() => {
            setToggleShare(false);
          }, TIME);
        } }
      >
        <img src={ shareIncon } alt="Compartilhar" />
      </button>
      {toggleShare && <span>Link copied!</span>}
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

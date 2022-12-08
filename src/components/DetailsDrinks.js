import { useEffect, useState, useContext } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';
import display from '../helpers/display';
import '../style/Details.css';
import RecipesAppContext from '../context/RecipesAppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DetailsDrinks() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [toggleShare, setToggleShare] = useState(false);
  const [resultAPI, setResultAPI] = useState([]);
  const { inProgressRecipes, setInProgressRecipes,
    favorits, setFavorits } = useContext(RecipesAppContext);
  const history = useHistory();
  const SIX = 6;
  const [recipePhoto, setRecipePhoto] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeAlcoholic, setRecipeAlcoholic] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
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
    setResultAPI(result);
    handleFilter(result);
    setRecipePhoto(result[0].strDrinkThumb);
    setRecipeTitle(result[0].strDrink);
    setRecipeAlcoholic(result[0].strAlcoholic);
    setInstructions(result[0].strInstructions);
  };

  const requestRecommendations = async () => {
    const result = await requestRecipesFromAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setRecommendations(result);
  };

  useEffect(() => {
    displayDetails();
    requestRecommendations();
  }, []);

  const rrp = () => { // redirect to recipe in progress
    setInProgressRecipes({
      ...inProgressRecipes,
      drinks: {
        ...inProgressRecipes.drinks,
        [idDaReceita]: [],
      },
    });
    history.push(`/drinks/${idDaReceita}/in-progress`);
  };

  const toggleInProgress = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'))
     || { drinks: {}, meals: {} };
    const recipesID = Object.keys(storage.drinks);
    return recipesID.includes(idDaReceita) ? 'Continue Recipe' : 'Start Recipe';
  };

  useEffect(() => {
    setIsFavorite(!isFavorite);
  }, [favorits]);

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
      <button
        src={ isFavorite ? whiteHeartIcon : blackHeartIcon }
        data-testid="favorite-btn"
        type="button"
        onClick={ () => {
          const newFav = {
            id: resultAPI[0].idDrink,
            type: 'drink',
            nationality: '',
            category: resultAPI[0].strCategory,
            alcoholicOrNot: resultAPI[0].strAlcoholic,
            name: resultAPI[0].strDrink,
            image: resultAPI[0].strDrinkThumb,
          };
          if (!favorits.some((e) => e.id === newFav.id)) {
            setFavorits([...favorits, newFav]);
          }
        } }

      >
        <img src={ isFavorite ? whiteHeartIcon : blackHeartIcon } alt="Favorite" />
      </button>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          const TIME = 3000;
          setToggleShare(true);
          copy(`http://localhost:3000/drinks/${idDaReceita}`);
          setTimeout(() => {
            setToggleShare(false);
          }, TIME);
        } }
      >
        <img src={ shareIcon } alt="Compartilhar" />
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
      <section
        className="recommendationCard-container"
      >
        {display(SIX, recommendations)
          .map(({ strMeal, strMealThumb, idMeal }, index) => (
            <NavLink
              to={ `/meals/${idMeal}` }
              className="recommendationCard"
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {strMeal}
              </p>
              <img src={ strMealThumb } alt={ strMeal } />
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

export default DetailsDrinks;

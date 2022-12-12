import { useState, useEffect, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';
import handleFilter from '../helpers/handleFilter';
import InteractionBtns from './InteractionBtns';
import '../style/RecipeInProgress.css';

function RecipeMealsInProgress() {
  const { idDaReceita } = useParams();
  const [itsFinished, setItsFinished] = useState(false);
  const store = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipeKey = store?.meals[idDaReceita];
  const [isChecked, setIsChecked] = useState(recipeKey || []);
  const [newFav, setNewFav] = useState({});
  const [recipePhoto, setRecipePhoto] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [tags, setTags] = useState();
  const { inProgressRecipes, setInProgressRecipes } = useContext(RecipesAppContext);

  useEffect(() => {
    setInProgressRecipes({
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
        [idDaReceita]: isChecked,
      },
    });
    console.log(isChecked.length, ingredientAndMeasure.length);
    if (isChecked.length === ingredientAndMeasure.length) {
      setItsFinished(false);
    } else {
      console.log('entrou');
      setItsFinished(true);
    }
  }, [isChecked]);

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
    console.log(isChecked.length, filtro.length);
    if (isChecked.length !== filtro.length) {
      setItsFinished(true);
    }
    setIngredientAndMeasure(filtro);
    setRecipePhoto(request[0].strMealThumb);
    setRecipeTitle(request[0].strMeal);
    setRecipeCategory(request[0].strCategory);
    setInstructions(request[0].strInstructions);
    setTags(request[0].strTags);
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    requestDetails();
  }, []);

  const itsChecked = (ingrediente) => {
    if (isChecked.includes(ingrediente)) {
      return 'ingredient-step';
    }
    return '';
  };

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
      {ingredientAndMeasure.map((e, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          htmlFor="ingredient-step"
          key={ index }
          className={ itsChecked(e) }
        >
          <input
            id="ingredient-step"
            type="checkbox"
            value={ e }
            onChange={ ({ target }) => {
              if (isChecked.some((ingredient) => ingredient === target.value)) {
                const newChecked = isChecked.filter((el) => el !== target.value);
                setIsChecked(newChecked);
              } else {
                setIsChecked([...isChecked, target.value]);
              }
            } }
            checked={ isChecked.includes(e) }
          />
          {e}
        </label>
      ))}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="finish-recipe-btn"
        disabled={ itsFinished }
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipeMealsInProgress;

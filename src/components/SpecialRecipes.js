import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import InteractionBtns from './InteractionBtns';

function SpecialRecipes({ localRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [toggleShare, setToggleShare] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    setRecipes(localRecipe);
  }, [localRecipe]);

  const handleCopy = (elemento) => {
    const TIME = 3000;
    setToggleShare(elemento.id);
    copy(`http://localhost:3000/${elemento.type === 'meal' ? 'meals' : 'drinks'}/${elemento.id}`);
    setTimeout(() => {
      setToggleShare('');
    }, TIME);
  };

  const filterMeals = () => {
    const newRecipes = localRecipe.filter((e) => e.type === 'meal');
    setRecipes(newRecipes);
  };

  const filterDrinks = () => {
    const newRecipes = localRecipe.filter((e) => e.type === 'drink');
    setRecipes(newRecipes);
  };

  const allFilter = () => {
    setRecipes(localRecipe);
  };

  if (localRecipe.length === 0) {
    return (
      <div>
        <h1>
          { pathname === '/favorite-recipes' ? 'Não há receitas favoritadas'
            : 'Não há receitas finalizafas' }
        </h1>
      </div>
    );
  }

  return (
    <div>
      <NavLink
        to="/meals"
      >
        Voltar
      </NavLink>
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ allFilter }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ filterMeals }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterDrinks }
        >
          Drinks
        </button>
      </section>
      {recipes?.map((element, index) => (
        <section
          key={ index }
        >
          <NavLink
            to={ `${element.type === 'meal' ? 'meals' : 'drinks'}/${element.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              width="250px"
              src={ element.image }
              alt={ element.id }
            />
          </NavLink>
          <h4
            data-testid={ `${index}-horizontal-top-text` }
          >
            {element.type === 'drink'
              ? `${element.alcoholicOrNot}`
              : `${element.nationality} - ${element.category}`}
          </h4>
          <NavLink
            to={ `${element.type === 'meal' ? 'meals' : 'drinks'}/${element.id}` }
          >
            <h1
              data-testid={ `${index}-horizontal-name` }
            >
              {element.name}
            </h1>
          </NavLink>
          <h4
            data-testid={ `${index}-horizontal-done-date` }
          >
            {element.doneDate}
          </h4>
          <button
            type="button"
            onClick={ () => handleCopy(element) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Compartilhar"
            />
          </button>
          {toggleShare === element.id && <span>Link copied!</span>}

          { pathname === '/favorite-recipes'
          && <InteractionBtns
            idDaReceita={ element.id }
            newFav={ element }
            dataTestid={ `${index}-horizontal-favorite-btn` }
          />}

          {element?.tags
          && element?.tags.map((tagName, i) => (
            <div key={ i }>
              <p
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

SpecialRecipes.propTypes = {
  localRecipe: PropTypes.shape({
    filter: PropTypes.func,
  }),
}.isRequired;

export default SpecialRecipes;

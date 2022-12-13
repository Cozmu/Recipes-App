import { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [toggleShare, setToggleShare] = useState(false);
  const { doneRecipes } = useContext(RecipesAppContext);

  const handleCopy = (elemento) => {
    console.log(elemento.type === 'meal');
    const TIME = 3000;
    setToggleShare(true);
    copy(`http://localhost:3000/${elemento.type === 'meal' ? 'meals' : 'drinks'}/${elemento.id}`);
    setTimeout(() => {
      setToggleShare(false);
    }, TIME);
  };

  return (
    <div>
      <Header />
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
      </section>
      {doneRecipes?.map((element, index) => (
        <section
          key={ index }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            width="250px"
            src={ element.image }
            alt={ element.id }
            id={ element.tags[0] }
          />
          <h4
            data-testid={ `${index}-horizontal-top-text` }
          >
            {element.type === 'drink'
              ? `${element.alcoholicOrNot}`
              : `${element.nationality} - ${element.category}`}
          </h4>
          <h1
            data-testid={ `${index}-horizontal-name` }
          >
            {element.name}
          </h1>
          <h4
            data-testid={ `${index}-horizontal-done-date` }
          >
            {element.doneDate}
          </h4>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleCopy(element) }
          >
            <img src={ shareIcon } alt="Compartilhar" />
          </button>
          {toggleShare && <span>Link copied!</span>}
          {element.tags.length > 1
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

export default DoneRecipes;

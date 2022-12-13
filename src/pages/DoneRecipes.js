import { useState, useEffect } from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const [finishedRecipes, setFinishedRecipes] = useState([]);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem('doneRecipes'));
    setFinishedRecipes(store);
  }, []);

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
      {finishedRecipes?.map((element, index) => (
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
            {element.category}
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
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
          >
            Compartilhar
          </button>
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

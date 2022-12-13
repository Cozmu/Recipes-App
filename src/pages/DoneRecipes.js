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

    </div>
  );
}

export default DoneRecipes;

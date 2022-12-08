import { useEffect, useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeDrinksInProgress() {
  const { inProgressRecipes } = useContext(RecipesAppContext);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, []);

  return (
    <div>RecipeDrinksInProgress</div>
  );
}

export default RecipeDrinksInProgress;

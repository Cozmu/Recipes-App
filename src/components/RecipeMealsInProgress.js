import { useEffect, useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeMealsInProgress() {
  const { inProgressRecipes } = useContext(RecipesAppContext);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, []);

  return (
    <div>RecipeMealsInProgress</div>
  );
}

export default RecipeMealsInProgress;

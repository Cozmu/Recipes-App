import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [btnSearch, setBtnSearch] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const values = useMemo(() => ({
    btnSearch,
    setBtnSearch,
    recipes,
    setRecipes,
  }), [
    btnSearch,
    recipes,
  ]);

  return (
    <RecipesAppContext.Provider value={ values }>
      {children}
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default RecipesAppProvider;

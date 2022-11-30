import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [btnSearch, setBtnSearch] = useState(false);
  const [searchRequired, setSearchRequired] = useState({
    searchText: '', category: 'Ingredient' });
  const [mealsArr, setMealsArr] = useState([]);
  const [drinksArr, setDrinksArr] = useState([]);

  useEffect(() => {
    if (mealsArr === null || drinksArr === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    // setSearchRequired({ searchText: '', category: '' });
  }, [mealsArr, drinksArr]);

  const values = useMemo(() => ({
    btnSearch,
    setBtnSearch,
    setSearchRequired,
    searchRequired,
    setMealsArr,
    setDrinksArr,
    mealsArr,
    drinksArr,

  }), [
    mealsArr,
    drinksArr,
    btnSearch,
    searchRequired,
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

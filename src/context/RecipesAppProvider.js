import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [btnSearch, setBtnSearch] = useState(false);
  const [searchRequired, setSearchRequired] = useState({ searchText: '', category: '' });
  const [mealsArr, setMealsArr] = useState([]);
  const [drinksArr, setDrinksArr] = useState([]);

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
    setSearchRequired,
    setBtnSearch,
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

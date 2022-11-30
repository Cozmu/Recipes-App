import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [btnSearch, setBtnSearch] = useState(false);
  const [searchRequired, setSearchRequired] = useState({ searchText: '', category: '' });
  const [mealsArr, setMelsArr] = useState([]);

  // useEffect(() => {
  //   requestAPIFetch().then((result) => setData(result));
  // }, [mealsArr]);

  const values = useMemo(() => ({
    btnSearch,
    setBtnSearch,
    setSearchRequired,
    searchRequired,
    setMelsArr,
    mealsArr,
  }), [
    btnSearch,
    setSearchRequired,
    setBtnSearch,
    searchRequired,
    mealsArr,
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

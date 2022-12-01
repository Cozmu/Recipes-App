import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';

function DetailsDrinks() {
  const [detailsDrinks, setDetailsDrinks] = useState([]);
  const { idDaReceita } = useParams();

  useEffect(() => {
    const result = requestRecipesFromAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`);
    setDetailsDrinks(result);
  }, []);

  return (
    <div>DetailsDrinks</div>
  );
}

export default DetailsDrinks;

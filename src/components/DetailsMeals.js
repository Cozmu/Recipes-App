import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';

function DetailsMeals() {
  const [detailsMeals, setDetailsMeals] = useState([]);
  const { idDaReceita } = useParams();

  useEffect(() => {
    const result = requestRecipesFromAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`);
    setDetailsMeals(result);
  }, []);

  return (
    <div>DetailsMeals</div>
  );
}

export default DetailsMeals;

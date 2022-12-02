import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';

function DetailsDrinks() {
  const [detailsDrinks, setDetailsDrinks] = useState([]);
  const { idDaReceita } = useParams();

  const displayDetails = async () => {
    const result = requestRecipesFromAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`);
    setDetailsDrinks(result);
  };

  useEffect(() => {
    displayDetails();
  }, []);

  return (
    <div>
      {/* {detailsDrinks
      .map(({ }) => (

    ))} */}
    </div>
  );
}

export default DetailsDrinks;

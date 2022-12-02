import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';

function DetailsMeals() {
  const [detailsMeals, setDetailsMeals] = useState([]);
  const { idDaReceita } = useParams();

  const displayDetails = async () => {
    const result = await requestRecipesFromAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`);
    const ytLink = result[0].strYoutube;
    const arrYT = ytLink.split('watch?v=');
    console.log(arrYT);
    setDetailsMeals(result);
  };

  useEffect(() => {
    displayDetails();
  }, []);

  return (
    <div>
      {detailsMeals
        .map(({
          strMeal, strCategory, strInstructions,
          strMealThumb, idMeal,
        }) => (
          <section
            key={ idMeal }
          >
            <img
              width="250"
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt={ idMeal }
            />
            <h3
              data-testid="recipe-title"
            >
              {strMeal}
            </h3>
            <h4
              data-testid="recipe-category"
            >
              {strCategory}
            </h4>
            <p>{strInstructions}</p>
            {/* <iframe
              data-testid="video"
              src={ strYoutube }
              title={ strMeal }
              frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}
            <iframe width="853" height="480" src="https://www.youtube.com/embed/ub68OxEypaY" title="Easy Authentic Sushi Hand Rolls At Home (Temaki)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </section>
        ))}
    </div>
  );
}

export default DetailsMeals;

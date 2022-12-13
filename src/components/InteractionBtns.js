import PropTypes from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesAppContext from '../context/RecipesAppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function InteractionBtns({ idDaReceita, newFav, dataTestid }) {
  const [toggleShare, setToggleShare] = useState(false);
  const { isFavorite, setIsFavorite,
    favorites, setFavorites } = useContext(RecipesAppContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const storeFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storeFav?.some((e) => e.id === idDaReceita)) {
      setIsFavorite(blackHeartIcon);
    } else {
      setIsFavorite(whiteHeartIcon);
    }
  }, []);

  useEffect(() => {
    if (favorites?.some((e) => e.id === idDaReceita)) {
      setIsFavorite(blackHeartIcon);
    } else {
      setIsFavorite(whiteHeartIcon);
    }
  }, [favorites]);

  const toggleFavorite = () => {
    if (favorites.some((e) => e.id === newFav.id)) {
      const deteleFav = favorites.filter((e) => e.id !== newFav.id);
      setFavorites(deteleFav);
    } else {
      setFavorites([...favorites, newFav]);
    }
  };

  return (
    <section>
      <button
        type="button"
        onClick={ () => toggleFavorite() }
      >
        <img
          data-testid={ dataTestid }
          src={ isFavorite }
          alt="Favorite"
        />
      </button>
      {pathname !== '/favorite-recipes'
       && (
         <button
           type="button"
           data-testid="share-btn"
           onClick={ () => {
             const TIME = 3000;
             setToggleShare(true);
             copy(`http://localhost:3000/${pathname.includes('meals') ? 'meals' : 'drinks'}/${idDaReceita}`);
             setTimeout(() => {
               setToggleShare(false);
             }, TIME);
           } }
         >
           <img src={ shareIcon } alt="Compartilhar" />
         </button>)}
      {toggleShare && <span>Link copied!</span>}

    </section>
  );
}

InteractionBtns.propTypes = {
  idDaReceita: PropTypes.any,
  newFav: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
}.isRequired;

export default InteractionBtns;

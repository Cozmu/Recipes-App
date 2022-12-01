const requestRecipesFromAPI = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks ? data.drinks : data.meals || [];
  } catch (error) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export default requestRecipesFromAPI;

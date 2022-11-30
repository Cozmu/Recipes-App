const RequestDrinksAPI = async (url) => {
  try {
    const response = await fetch(url);
    if (response.drinks) {
      const data = await response.json();
      const { drinks } = data;
      return drinks;
    }
    return null;
  } catch (e) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export default RequestDrinksAPI;

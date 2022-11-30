const RequestMealsAPI = async (url) => {
  try {
    const response = await fetch(url);
    console.log(response);
    // if (!response.ok) {
    //   throw new Error();
    // }
    const data = await response.json();
    const { meals } = data;
    return meals;
  } catch (e) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};
export default RequestMealsAPI;

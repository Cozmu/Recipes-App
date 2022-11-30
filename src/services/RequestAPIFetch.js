const requestAPIFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { meals } = data;
    return meals;
  } catch (e) {
    throw new Error(e.message);
  }
};
export default requestAPIFetch;

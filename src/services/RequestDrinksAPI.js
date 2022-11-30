const RequestDrinksAPI = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { drinks } = data;
    return drinks;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default RequestDrinksAPI;

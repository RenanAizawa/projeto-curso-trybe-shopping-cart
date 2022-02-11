const fetchProducts = async (id) => {
  // seu código aqui
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
fetchProducts('computador');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

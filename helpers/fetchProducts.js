const fetchProducts = async (id) => {
  // seu código aqui
  const produto = id;
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

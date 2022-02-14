const getSavedCartItems = () => {
  // seu código aqui
  const cartSalvo = localStorage.getItem('cartItems');
  return cartSalvo;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

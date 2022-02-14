// const getSavedCartItems = require("./helpers/getSavedCartItems");

const implementItem = document.querySelector('.items');
const olCart = document.querySelector('ol.cart__items');
const esvaziarCArt = document.querySelector('.empty-cart'); 

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// Função para implementar os produtos na section items
const resultadoProdutos = async () => {
  const resultadoFetch = await fetchProducts('computador');
  resultadoFetch.results.forEach((elementoCorr) => {
    const obj = {
      sku: elementoCorr.id,
      name: elementoCorr.title,
      image: elementoCorr.thumbnail,
    };
   implementItem.appendChild(createProductItemElement(obj));
  });
};

// Função destinada a salvar o carrinho de compras no localStorege
const saveCart = async () => {
  const liCart = document.querySelector('.cart__items').innerHTML;
  await saveCartItems(liCart);
  console.log(liCart);
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  olCart.removeChild(event.target);
  saveCart();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Função destinada a criação dos elementos no carrinho de compras
const addItemCart = async (event) => {
  const sku = getSkuFromProductItem(event.target.parentElement);
  const data = await fetchItem(sku);
  const obgItem = {
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  };
  olCart.appendChild(createCartItemElement(obgItem));
  saveCart();
};

// Função destinada a esvaziar o carrinho de compras.
const zeroCart = () => {
  olCart.innerHTML = ' ';
  totalPrice = 0;
  saveCart();
};

// Botão para esvaziar o cart
esvaziarCArt
    .addEventListener('click', zeroCart);

// Função para colocar o cart salvo no ol
const implementaSaveCart = async () => {
  olCart.innerHTML = getSavedCartItems();
};

window.onload = async () => { 
  await resultadoProdutos();
  
// Implementação do escutador do botão adicionar ao carrinho
  const addButton = document.querySelectorAll('.item__add');
  addButton.forEach((butao) => {
    butao
      .addEventListener('click', addItemCart);
  });
  implementaSaveCart();
  document.querySelector('ol.cart__items').addEventListener('click', cartItemClickListener);
};

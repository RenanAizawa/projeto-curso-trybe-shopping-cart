const implementItem = document.querySelector('.items');
const olCart = document.querySelector('ol.cart__items');
let totalPrice = 0;

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  olCart.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// Função destinada a criação dos elementos do carrinho de compras
const addItemCart = async (event) => {
  const sku = getSkuFromProductItem(event.target.parentElement);
  const data = await fetchItem(sku);
  console.log(data);
  const obgItem = {
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  };
  olCart.appendChild(createCartItemElement(obgItem));
};

window.onload = async () => { 
  await resultadoProdutos();
  
// Implementação do escutador do botão adicionar ao carrinho
  const addButton = document.querySelectorAll('.item__add');
  addButton.forEach((butao) => {
    butao
      .addEventListener('click', addItemCart);
  });
};

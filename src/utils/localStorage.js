var products = [];

export function addProduct(product) {
  products.push(product);
  localStorageCart(products);
}

export function deleteProduct(item) {
  products.splice(item, 1);
  localStorageCart(products);
}

export function getProduct() {
  var storedProduct = localStorage.getItem("localProducts");
  if (storedProduct === null) {
    products = [];
  } else {
    products = JSON.parse(storedProduct);
  }
  return products;
}

function localStorageCart(products) {
  localStorage.setItem("localProducts", JSON.stringify(products));
}

export function deleteStorage() {
  localStorage.removeItem("localProducts");
}

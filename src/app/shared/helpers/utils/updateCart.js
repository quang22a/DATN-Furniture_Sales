export const updateCart = (cart, product, quantity) => {
  let productInCart = cart.find((item) => item._id === product._id);
  if (productInCart) {
    productInCart.quantity = quantity;
  } else {
    let productAdd = { ...product, quantity: quantity };
    cart.push(productAdd);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

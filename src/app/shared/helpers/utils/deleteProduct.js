export const deleteProduct = (cart, id) => {
  cart = cart.filter((item) => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

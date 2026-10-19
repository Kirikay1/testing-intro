function validateQuantity(quantity, stock) {
  if (!Number.isInteger(quantity) || quantity <= 0 || quantity > stock) {
    throw new RangeError('Количество товара должно быть положительным и не превышать остаток на складе.');
  }
}

function addToCart(cart, product, quantity) {
  const cartItem = cart.find((item) => item.id === product.id);
  const nextQuantity = (cartItem?.quantity || 0) + quantity;

  validateQuantity(nextQuantity, product.stock);

  if (cartItem) {
    return cart.map((item) => (
      item.id === product.id ? { ...item, quantity: nextQuantity } : item
    ));
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  const cartItem = cart.find((item) => item.id === productId);

  if (!cartItem) return [...cart];

  validateQuantity(quantity, cartItem.stock);

  return cart.map((item) => (
    item.id === productId ? { ...item, quantity } : item
  ));
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promoCode === 'SAVE10' && subtotal >= 20000
    ? Math.round(subtotal * 0.1)
    : 0;
  const delivery = subtotal < 50000 ? 30000 : 0;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;

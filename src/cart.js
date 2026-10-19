function validateQuantity(quantity, stock) {
  if (!Number.isInteger(quantity) || quantity <= 0 || quantity > stock) {
    throw new RangeError('Количество товара должно быть положительным и не превышать остаток на складе.');
  }
}

function notImplemented() {
  throw new Error('Расчёт стоимости корзины ещё не реализован.');
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

function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;

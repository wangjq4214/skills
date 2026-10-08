const products = new Map([
  ['notebook', { price: 1000, discount: 0 }],
  ['pencil', { price: 200, discount: 0.1 }],
]);
const rates = { USD: 1, EUR: 0.9, GBP: 0.8 };

export function createShop() {
  const cache = new Map();
  const state = { currency: 'USD', quantity: 1 };
  function quote(sku) {
    const product = products.get(sku);
    if (!product) throw new Error('Unknown product');
    if (!cache.has(sku)) {
      cache.set(sku, {
        currency: state.currency,
        unitPrice: Math.round(product.price * (1 - product.discount) * rates[state.currency]),
      });
    }
    const unit = cache.get(sku);
    return { ...unit, quantity: state.quantity, total: unit.unitPrice * state.quantity };
  }
  return {
    setCurrency(currency) {
      if (!(currency in rates)) throw new Error('Unsupported currency');
      state.currency = currency;
    },
    setQuantity(quantity) {
      if (!Number.isInteger(quantity) || quantity < 1) throw new Error('Invalid quantity');
      state.quantity = quantity;
    },
    quote,
  };
}

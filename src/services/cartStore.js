import { computed, reactive } from 'vue';

const cartState = reactive({
  items: [],
});

export function useCart() {
  const addToCart = (item) => {
    cartState.items.push({
      ...item,
      cartId: Date.now() + Math.random(), // Unique ID for cart item
    });
  };

  const removeFromCart = (cartId) => {
    const index = cartState.items.findIndex((item) => item.cartId === cartId);
    if (index > -1) {
      cartState.items.splice(index, 1);
    }
  };

  const clearCart = () => {
    cartState.items = [];
  };

  const getCartItems = computed(() => cartState.items);

  const getCartCount = computed(() => cartState.items.length);

  const getCartTotal = computed(() => {
    return cartState.items.reduce((total, item) => {
      return total + (item.price || 0);
    }, 0);
  });

  return {
    addToCart,
    removeFromCart,
    clearCart,
    getCartItems,
    getCartCount,
    getCartTotal,
  };
}

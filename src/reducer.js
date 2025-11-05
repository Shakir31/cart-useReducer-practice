import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

const reducer = (state, action) => {
  if (action.type == CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type == REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return {
      ...state,
      cart: newCart,
    };
  }
  if (action.type == INCREASE) {
    const id = action.payload.id;
    const newCart = new Map(state.cart);
    const value = newCart.get(id);
    // state.cart.set(id, (state.cart.get(id).amount = 5));
    const newValue = { ...value, amount: value.amount + 1 };
    // console.log(cart.get(id), value);
    newCart.set(id, newValue);
    return { ...state, cart: newCart };
  }
  if (action.type == DECREASE) {
    const newCart = new Map(state.cart);
    const id = action.payload.id;
    const item = newCart.get(id);
    if (item.amount <= 1) {
      // return { ...state };
      newCart.delete(id);
      return { ...state, cart: newCart };
    }
    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(id, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type == LOADING) {
    return { ...state, loading: true };
  }
  if (action.type == DISPLAY_ITEMS) {
    const data = action.payload.data;
    const newCart = new Map(data.map((item) => [item.id, item]));
    return { ...state, loading: false, cart: newCart };
  }
  throw new Error(`No matching action type: ${action.type}`);
};

export default reducer;

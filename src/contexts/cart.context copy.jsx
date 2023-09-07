import { createContext, useEffect, useState, useReducer} from "react";  

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

  const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
      );
    
      if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
      }

      return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

  const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setisCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const cartActions = {
  IS_CART_OPEN: 'IS_CART_OPEN',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_TO_CART: 'REMOVE_ITEM_TO_CART',
  CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL'
}

const cartReducer = (state, action) => {
  const {type, payload} = action

  switch(type) {
    case(cartActions.IS_CART_OPEN):
    return {
      ...state,
      isCartOpen: payload
    }

    case(cartActions.ADD_ITEM_TO_CART):
    return {
      ...state,
      cartItems :payload
    }

    case(cartActions.REMOVE_ITEM_TO_CART):
    return {
      ...state,
      cartItems :payload
    }

    case(cartActions.CLEAR_ITEM_FROM_CART):
    return {
      ...state,
      cartItems :payload
    }

    case(cartActions.SET_CART_COUNT):
    return {
      ...state,
      cartCount :payload
    }

    case(cartActions.SET_CART_TOTAL):
    return {
      ...state,
      cartTotal :payload
    }
    
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}

export const CartProvider = ({children}) => {

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
const {isCartOpen, cartItems, cartCount, cartTotal} = state

const setisCartOpen = (isCartOpen) => {
  dispatch({type: cartActions.IS_CART_OPEN , payload: !isCartOpen})
}

const setCartCount = (newCartCount) => {
  dispatch({type: cartActions.SET_CART_COUNT , payload: newCartCount })
}

const setCartTotal = (newCartTotal) => {
  dispatch({type: cartActions.SET_CART_TOTAL , payload: newCartTotal })
}

const setCartItems = (type, cartItemsArray) => {
  dispatch({type: type, payload: cartItemsArray})
}


useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
       return total + cartItem.quantity
    }, 0)
    setCartCount(newCartCount)
}, [cartItems])

useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => {
       return total + cartItem.quantity * cartItem.price
    }, 0)
    setCartTotal(newCartTotal)
}, [cartItems])

const addItemToCart = (productToAdd) => {
    setCartItems(cartActions.ADD_ITEM_TO_CART, addCartItem(cartItems, productToAdd))
}

const removeItemToCart = (cartItemToRemove) => {
    setCartItems(cartActions.REMOVE_ITEM_TO_CART, removeCartItem(cartItems, cartItemToRemove))
}

const clearItemFromCart = (cartItemToClear) => {
    setCartItems(cartActions.CLEAR_ITEM_FROM_CART, clearCartItem(cartItems, cartItemToClear))
}

const value = {isCartOpen, setisCartOpen, cartItems, addItemToCart, removeItemToCart, cartCount, clearItemFromCart, cartTotal}

return<CartContext.Provider value={value} >{children}</CartContext.Provider>
}
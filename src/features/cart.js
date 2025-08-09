import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coins: localStorage.getItem('coins') !== null ? parseFloat(localStorage.getItem('coins')) : 500,
    cartItems: localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [],
    purchasedItems: localStorage.getItem('purchasedItems') !== null ? JSON.parse(localStorage.getItem('purchasedItems')) : [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            state.cartItems = [...state.cartItems, payload]
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeFromCart: (state, { payload }) => {
            state.cartItems = state.cartItems.filter(item => item.name !== payload.name)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        checkout: (state, { payload }) => {
            state.purchasedItems = state.purchasedItems?.length ? [...state.purchasedItems, ...state.cartItems] : [...state.cartItems]
            state.cartItems = []
            state.coins = state.coins - payload.cost < 0 ? 0 : state.coins - payload.cost
            localStorage.setItem('purchasedItems', JSON.stringify(state.purchasedItems))
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            localStorage.setItem('coins', state.coins)
        }
    }
})

export const { addToCart, removeFromCart, checkout } = cartSlice.actions
export default cartSlice.reducer
import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQty: 0,
        // cartPrice: 0
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id) //是否已經有加入此商品
            state.totalQty++
            if(!existingItem) {
                // must NOT do in Redux, but Redux-toolkit is fine 
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    qty: 1,
                    totalPrice: newItem.price,
                })
            } else {
                existingItem.qty++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            state.totalQty--
            if (existingItem.qty === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.qty--
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice
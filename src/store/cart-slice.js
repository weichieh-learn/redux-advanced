import { createSlice } from "@reduxjs/toolkit"

createSlice({
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
            if(!existingItem) {
                // must NOT do in Redux, but Redux-toolkit is fine 
                state.items.push({
                    itemId: newItem.id,
                    name: newItem.title,
                    price: newItem.price,
                    qty: 1,
                    totalPrice: newItem.price,
                })
            } else {
                existingItem.qty++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        removeItemFromCart() {}
    }
})
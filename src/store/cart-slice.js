import { createSlice } from '@reduxjs/toolkit'

import { uiActions } from './ui-slice'

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
      const existingItem = state.items.find((item) => item.id === newItem.id) //是否已經有加入此商品
      state.totalQty++
      if (!existingItem) {
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
      const existingItem = state.items.find((item) => item.id === id)
      state.totalQty--
      if (existingItem.qty === 1) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        existingItem.qty--
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price
      }
    },
  },
})

export const sendCartData = (cart) => {
  // return a async function
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    )

    // create another async function(send Http req)
    const sendRequest = async () => {
      const res = await fetch(
        'https://redux-advanced-476ea-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT', // PUT: overwrtite existing cart
          body: JSON.stringify(cart),
        }
      )
      if (!res.ok) {
        throw new Error('Sending cart data failed.')
      }
    }

    try {
      //execute (send Http req)
      await sendRequest()
      //if no error
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sending data successfully!',
        })
      )
    } catch (error) {
      //if error
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending data failed!',
        })
      )
    }
  }
}

export const cartActions = cartSlice.actions

export default cartSlice

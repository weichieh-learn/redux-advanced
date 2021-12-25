import { uiActions } from './ui-slice'
import { cartActions } from './cart-slice'

export const fetchCartData = () => {
  // 撈出購物車的資料
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        'https://redux-advanced-476ea-default-rtdb.firebaseio.com/cart.json'
      )
      if (!res.ok) {
        throw new Error('Could not fetch cart data!')
      }

      const data = await res.json()
      return data
    }

    try {
      const cartData = await fetchData() //cartData = 上面return的data
      dispatch(cartActions.replaceCart({
          items: cartData.items || [], //修正購物車為0時的error
          totalQty: cartData.totalQty
      }))
    } catch (error) {
      //if error
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching data failed!',
        })
      )
    }
  }
}

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
          body: JSON.stringify({
            items: cart.items,
            totalQty: cart.totalQty,
          }),
          //   body: JSON.stringify(cart),
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

import { uiActions } from './ui-slice'

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

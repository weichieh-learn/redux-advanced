import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { uiActions } from './store/ui-slice'

import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import Notification from './components/UI/Notification'

// 定義在App元件之外，不會被改變，也不會在component被重新render的時候被重置
// 只會在file被第一次打開的時候被重置
let isInitial = true

function App() {
  const dispatch = useDispatch()
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)

  useEffect(() => {
    // 當cart改變的時候，會觸發useEffect去送http req把cart更新到firebase
    // PUT: overwrtite existing cart
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      )
      const res = await fetch(
        'https://redux-advanced-476ea-default-rtdb.firebaseio.com/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      )
      if(!res.ok) {
        throw new Error('Sending cart data failed.')
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sending data successfully!',
        })
      )
    }

    if(isInitial) {
      // 如果網頁第一次打開，不要執行sendCartData()
      isInitial = false
      return
    }

    sendCartData().catch(error => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending data failed!',
        })
      )
    })
  }, [cart, dispatch])

  return (
    <>
      {notification && (
        <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  )
}

export default App

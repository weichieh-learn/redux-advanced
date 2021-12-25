import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import Notification from './components/UI/Notification'
import { sendCartData } from './store/cart-slice'

// 定義在App元件之外，不會被改變，也不會在component被重新render的時候被重置
// 只會在file被第一次打開的時候被重置
let isInitial = true

function App() {
  const dispatch = useDispatch()
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)

  useEffect(() => {
    if(isInitial) {
      // 如果網頁第一次打開，不要執行sendCartData()
      isInitial = false
      return
    }

    dispatch(sendCartData(cart))
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

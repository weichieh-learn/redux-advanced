import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    // 當cart改變的時候，會觸發useEffect去送http req把cart更新到firebase
    // PUT: overwrtite existing cart
    fetch(
      'https://redux-advanced-476ea-default-rtdb.firebaseio.com/cart.json',
      { method: 'PUT', body: JSON.stringify(cart) }
    )
  }, [cart])

  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  )
}

export default App

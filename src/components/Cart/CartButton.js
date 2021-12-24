import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/ui-slice'
import classes from './CartButton.module.css'

const CartButton = (props) => {

  const dispatch = useDispatch()
  const cartQty = useSelector((state => state.cart.totalQty))
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQty}</span>
    </button>
  );
};

export default CartButton;

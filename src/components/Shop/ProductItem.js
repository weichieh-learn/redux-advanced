import { useDispatch } from 'react-redux'
import {cartActions} from '../../store/cart-slice'

import Card from '../UI/Card'
import classes from './ProductItem.module.css'

const ProductItem = ({ title, price, description, id }) => {
  const dispatch = useDispatch()
  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({
      id, // id: id,(modern JS shortcut)
      title,
      price,
    }))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

import {useContext} from 'react'
import OrderContext from '../../context/OrderContext'
import './index.css'

const CartItemList = props => {
  const {dishDetails} = props
  const {dishId, dishName, dishImage, dishPrice, qty} = dishDetails
  const {
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(OrderContext)

  const onClickRemoveBtn = () => removeCartItem(dishId)
  const onClickIncreaseBtn = () => incrementCartItemQuantity(dishId)
  const onClickDecrementBtn = () => decrementCartItemQuantity(dishId)

  return (
    <li className="cart-list-item">
      <div className="cart-item-container">
        <div>
          <img src={dishImage} alt="cart-list-img" className="cart-item-img" />
        </div>
        <div className="cart-qty-and-name-container">
          <p className="cart-item-name">{dishName}</p>
          <div className="cart-qty-container">
            <button
              type="button"
              onClick={onClickDecrementBtn}
              className="cart-qty-btn"
            >
              -
            </button>
            <span className="cart-qty">{qty}</span>
            <button
              type="button"
              onClick={onClickIncreaseBtn}
              className="cart-qty-btn"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <p className="cart-item-price">{qty * dishPrice}</p>
      <button
        type="button"
        className="cart-item-remove-btn"
        onClick={onClickRemoveBtn}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItemList

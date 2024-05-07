import {useContext} from 'react'
import Header from '../../components/Header'
import CartItemList from '../../components/CartItemList'
import OrderContext from '../../context/OrderContext'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(OrderContext)
  const onClickRemoveAllBtn = () => removeAllCartItems()
  const renderCartContainer = () => (
    <div className="cart-main-container">
      <button
        type="button"
        onClick={onClickRemoveAllBtn}
        className="remove-all-btn"
      >
        Remove All
      </button>
      <div className="cart-list-container">
        <ul className="cart-list">
          {cartList.map(eachItem => (
            <CartItemList key={eachItem.dishId} dishDetails={eachItem} />
          ))}
        </ul>
      </div>
    </div>
  )
  const renderEmptyCartView = () => (
    <div className="empty-cart-container">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png"
        alt="empty-cart-img"
        className="empty-cart-img"
      />
    </div>
  )
  return (
    <div>
      <Header />
      {cartList.length > 0 ? renderCartContainer() : renderEmptyCartView()}
    </div>
  )
}

export default Cart

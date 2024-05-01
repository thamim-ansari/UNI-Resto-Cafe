import {useContext} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import OrderContext from '../../context/OrderContext'

import './index.css'

const Header = ({restaurantName}) => {
  const {orderList} = useContext(OrderContext)
  let orderQty = 0
  orderList.forEach(eachCartItem => {
    orderQty += eachCartItem.qty
  })

  return (
    <nav className="nav-container">
      <div className="nav-responsive-container ">
        <h1 className="app-logo">{restaurantName}</h1>
        <div className="my-orders-container">
          <p className="my-orders">My Orders</p>
          <div className="cart-icon-container">
            <AiOutlineShoppingCart color="#555555" className="cart-icon" />
            <div className="order-qty-container">
              <span className="order-qty">{orderQty}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header

import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import OrderContext from '../../context/OrderContext'

import './index.css'

const Header = props => {
  const {history, restaurantName} = props
  const {orderList} = useContext(OrderContext)
  let orderQty = 0
  orderList.forEach(eachCartItem => {
    orderQty += eachCartItem.qty
  })
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-responsive-container ">
        <h1 className="app-logo">{restaurantName}</h1>
        <div className="logout-and-cart-container">
          <div className="my-orders-container">
            <p className="my-orders">My Orders</p>
            <div className="cart-icon-container">
              <AiOutlineShoppingCart color="#555555" className="cart-icon" />
              <div className="order-qty-container">
                <span className="order-qty">{orderQty}</span>
              </div>
            </div>
          </div>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)

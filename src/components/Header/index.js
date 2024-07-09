import {useState, useEffect, useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import OrderContext from '../../context/OrderContext'

import './index.css'

const Header = props => {
  const {history} = props
  const [restaurantName, setRestaurantName] = useState('')
  const {cartList} = useContext(OrderContext)
  const cartListQty = cartList.length

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  useEffect(() => {
    const getRestaurantName = async () => {
      const restaurantApiUrl =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const restaurantApiResponse = await fetch(restaurantApiUrl)
      const fetchedRestaurantData = await restaurantApiResponse.json()
      const resName = fetchedRestaurantData.map(
        eachItem => eachItem.restaurant_name,
      )
      setRestaurantName(resName)
    }
    getRestaurantName()
  }, [])

  return (
    <nav className="nav-container">
      <div className="nav-responsive-container ">
        <Link to="/" className="link-style">
          <h1 className="app-logo">{restaurantName}</h1>
        </Link>
        <div className="logout-and-cart-container">
          <Link to="/cart" className="link-style">
            <button type="button" className="my-orders-btn" data-testid="cart">
              <span className="my-orders">My Orders</span>
              <span className="cart-icon-container">
                <AiOutlineShoppingCart color="#555555" className="cart-icon" />
                <span className="order-qty-container">
                  <span className="order-qty">{cartListQty}</span>
                </span>
              </span>
            </button>
          </Link>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)

import {useContext} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import OrderContext from '../../context/OrderContext'
import {
  NavContainer,
  NavResponsiveContainer,
  AppLogo,
  MyOrdersContainer,
  MyOrders,
  CartIconContainer,
  OrderQtyContainer,
  OrderQty,
} from './styledComponents'
import './index.css'

const Header = () => {
  const {orderList} = useContext(OrderContext)
  const orderListLength = orderList.length
  let orderQty = 0
  orderList.forEach(eachCartItem => {
    orderQty += eachCartItem.qty
  })

  return (
    <NavContainer>
      <NavResponsiveContainer>
        <AppLogo>UNI Resto Cafe</AppLogo>
        <MyOrdersContainer>
          <MyOrders>My Orders</MyOrders>
          <CartIconContainer>
            <AiOutlineShoppingCart color="#555555" className="cart-icon" />
            {orderListLength > 0 ? (
              <OrderQtyContainer>
                <OrderQty>{orderQty}</OrderQty>
              </OrderQtyContainer>
            ) : (
              ''
            )}
          </CartIconContainer>
        </MyOrdersContainer>
      </NavResponsiveContainer>
    </NavContainer>
  )
}

export default Header

import React from 'react'

const CartContext = React.createContext({
  orderList: [],
  incrementOrderItemQuantity: () => {},
  decrementOrderItemQuantity: () => {},
})

export default CartContext

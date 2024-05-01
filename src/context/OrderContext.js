import React from 'react'

const OrderContext = React.createContext({
  orderList: [],
  incrementOrderItemQuantity: () => {},
  decrementOrderItemQuantity: () => {},
})

export default OrderContext

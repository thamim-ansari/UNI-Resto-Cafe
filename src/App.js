import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import OrderContext from './context/OrderContext'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => {
  const [orderList, addOrderData] = useState([])

  const onIncrementOrderItemQuantity = dish => {
    const existingDishIndex = orderList.findIndex(
      item => item.dishId === dish.dishId,
    )
    if (existingDishIndex !== -1) {
      addOrderData(prev =>
        prev.map((item, index) => {
          if (index === existingDishIndex) {
            return {...item, qty: item.qty + 1}
          }
          return item
        }),
      )
    } else {
      addOrderData(prev => [...prev, {...dish, qty: 1}])
    }
  }
  const onRemoveOrderItem = id => {
    const filteredDish = orderList.filter(eachDish => eachDish.dishId !== id)
    addOrderData(filteredDish)
  }

  const onDecrementOrderItemQuantity = dish => {
    addOrderData(prev =>
      prev.map(eachItem => {
        if (eachItem.dishId === dish.dishId) {
          if (eachItem.qty > 1) {
            const updatedQuantity = eachItem.qty - 1
            return {...eachItem, qty: updatedQuantity}
          }
          onRemoveOrderItem(dish.dishId)
        }
        return eachItem
      }),
    )
  }
  return (
    <OrderContext.Provider
      value={{
        orderList,
        incrementOrderItemQuantity: onIncrementOrderItemQuantity,
        decrementOrderItemQuantity: onDecrementOrderItemQuantity,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </OrderContext.Provider>
  )
}

export default App

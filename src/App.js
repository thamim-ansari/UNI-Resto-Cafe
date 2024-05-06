import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import OrderContext from './context/OrderContext'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => {
  const [cartList, addCartListData] = useState([])

  const onRemoveAllCartItems = () => {
    addCartListData([])
  }
  const onRemoveCartItem = id => {
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.dishId !== id,
    )
    addCartListData(updatedCartList)
  }

  const onAddCartItem = dish => {
    const existingCakeIndex = cartList.findIndex(
      item => item.dishId === dish.dishId,
    )
    if (existingCakeIndex !== -1) {
      addCartListData(prev =>
        prev.map((item, index) => {
          if (index === existingCakeIndex) {
            return {...item, qty: item.qty + dish.qty}
          }
          return item
        }),
      )
    } else {
      addCartListData(prev => [...prev, dish])
    }
  }
  const onIncreaseCartQty = id => {
    addCartListData(prev =>
      prev.map(eachCartItem => {
        if (id === eachCartItem.dishId) {
          const updatedQuantity = eachCartItem.qty + 1
          return {...eachCartItem, qty: updatedQuantity}
        }
        return eachCartItem
      }),
    )
  }
  const onDecrementCartItemQuantity = id => {
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dishId === id,
    )
    if (productObject.qty > 1) {
      addCartListData(prev =>
        prev.map(eachCartItem => {
          if (id === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.qty - 1
            return {...eachCartItem, qty: updatedQuantity}
          }
          return eachCartItem
        }),
      )
    } else {
      onRemoveCartItem(id)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        cartList,
        addCartItem: onAddCartItem,
        incrementCartItemQuantity: onIncreaseCartQty,
        decrementCartItemQuantity: onDecrementCartItemQuantity,
        removeCartItem: onRemoveCartItem,
        removeAllCartItems: onRemoveAllCartItems,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </OrderContext.Provider>
  )
}

export default App

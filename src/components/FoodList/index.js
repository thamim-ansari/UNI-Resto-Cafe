import {useState, useContext} from 'react'
import OrderContext from '../../context/OrderContext'
import './index.css'

const FoodList = props => {
  const {foodDetails} = props
  const {
    dishId,
    dishImage,
    dishName,
    dishCurrency,
    dishPrice,
    dishDescription,
    addonCat,
    dishCalories,
    dishType,
    dishAvailability,
  } = foodDetails
  const {cartList, addCartItem} = useContext(OrderContext)
  const [qty, setQty] = useState(0)

  const distTypeImg =
    dishType === 1
      ? 'https://foodsafetyhelpline.com/wp-content/uploads/2013/05/non-veg-300x259.jpg'
      : 'https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png'
  const inCartList = cartList.find(eachItem => eachItem.dishId === dishId)

  const onClickIncreaseQtyBtn = () => {
    setQty(prev => prev + 1)
  }
  const onClickDecreaseQtyBtn = () => {
    if (qty > 0) {
      setQty(prev => prev - 1)
    }
  }
  const onClickAddToCart = () => {
    addCartItem({...foodDetails, qty})
  }

  const renderAddQtyContainer = () => {
    if (dishAvailability) {
      return (
        <div className="dish-qty-container">
          <button
            type="button"
            className="dish-qty-btn"
            onClick={onClickDecreaseQtyBtn}
          >
            -
          </button>
          <p className="dish-qty">{qty}</p>
          <button
            type="button"
            className="dish-qty-btn"
            onClick={onClickIncreaseQtyBtn}
          >
            +
          </button>
        </div>
      )
    }
    return <p className="not-available">Not available</p>
  }

  return (
    <li className="food-items">
      <div className="dish-type-and-details-container">
        <img
          src={distTypeImg}
          alt="dist-type-img"
          className="dish-type-image"
        />
        <div className="dish-details-container">
          <p className="dish-name">{dishName}</p>
          <p className="dish-price">{`${dishCurrency} ${dishPrice}`}</p>
          <p className="dish-description">{dishDescription}</p>
          {renderAddQtyContainer()}
          {qty > 0 ? (
            <button
              type="button"
              className="add-to-cart-btn"
              onClick={onClickAddToCart}
              disabled={inCartList}
            >
              ADD TO CART
            </button>
          ) : (
            ''
          )}
          {addonCat.length > 0 ? (
            <p className="dish-customization">Customizations available</p>
          ) : (
            ''
          )}
        </div>
      </div>
      <p className="dish-calories">{`${dishCalories} calories`}</p>
      <img src={dishImage} alt="dish-img" className="dish-image" />
    </li>
  )
}

export default FoodList

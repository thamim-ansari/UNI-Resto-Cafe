import {useState, useEffect, useContext} from 'react'
import {MdAdd, MdRemove} from 'react-icons/md'
import OrderContext from '../../context/OrderContext'
import './index.css'

import {
  FoodItems,
  DishTypeAndDetailsContainer,
  DishTypeImage,
  DishDetailsContainer,
  DishName,
  DishPrice,
  DishDescription,
  DishCustomization,
  DishQtyContainer,
  DishQty,
  DishQtyBtn,
  NotAvailable,
  DishCalories,
  DishImage,
} from './styledComponents'

const FoodList = props => {
  const {foodDetails, onClickIncreaseOrderQty, onClickDecreaseOrderQty} = props
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
  const {orderList} = useContext(OrderContext)
  const [qty, setQty] = useState(() => {
    const orderItem = orderList.find(item => item.dishId === dishId)
    return orderItem ? orderItem.qty : 0
  })

  useEffect(() => {
    const orderItem = orderList.find(item => item.dishId === dishId)
    if (orderItem) {
      setQty(orderItem.qty)
    } else {
      setQty(0)
    }
  }, [orderList, dishId])

  const distTypeImg =
    dishType === 1
      ? 'https://foodsafetyhelpline.com/wp-content/uploads/2013/05/non-veg-300x259.jpg'
      : 'https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png'
  const onClickIncrease = () => {
    onClickIncreaseOrderQty(dishId)
  }

  const onClickDecrease = () => {
    if (qty > 0) {
      setQty(prev => prev - 1)
      onClickDecreaseOrderQty(dishId)
    }
  }

  const renderAddQtyContainer = () => {
    if (dishAvailability) {
      return (
        <DishQtyContainer>
          <DishQtyBtn onClick={onClickDecrease}>
            <MdRemove className="plus-minus-icons" />
          </DishQtyBtn>
          <DishQty>{qty}</DishQty>
          <DishQtyBtn onClick={onClickIncrease}>
            <MdAdd className="plus-minus-icons" />
          </DishQtyBtn>
        </DishQtyContainer>
      )
    }
    return <NotAvailable>Not available</NotAvailable>
  }

  return (
    <FoodItems>
      <DishTypeAndDetailsContainer>
        <DishTypeImage src={distTypeImg} alt="dist-type-img" />
        <DishDetailsContainer>
          <DishName>{dishName}</DishName>
          <DishPrice>{`${dishCurrency} ${dishPrice}`}</DishPrice>
          <DishDescription>{dishDescription}</DishDescription>
          {renderAddQtyContainer()}
          {addonCat.length > 0 ? (
            <DishCustomization>Customizations available</DishCustomization>
          ) : (
            ''
          )}
        </DishDetailsContainer>
      </DishTypeAndDetailsContainer>
      <DishCalories>{`${dishCalories} calories`}</DishCalories>
      <DishImage src={dishImage} alt="dish-img" />
    </FoodItems>
  )
}

export default FoodList

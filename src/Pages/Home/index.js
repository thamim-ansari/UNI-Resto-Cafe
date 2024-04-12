import {useState, useEffect, useContext} from 'react'

import Header from '../../components/Header'
import CategorySliderItem from '../../components/CategorySliderItem'
import FoodList from '../../components/FoodList'
import OrderContext from '../../context/OrderContext'

import {
  HomeContainer,
  CategorySliderListContainer,
  CategorySliderList,
  DishListContainer,
  DishList,
} from './styledComponents'

const Home = () => {
  const [restaurantData, setRestaurantData] = useState([])
  const [activeTabId, setActiveTabId] = useState(0)
  const [activeFoodList, setActiveFoodList] = useState([])
  const {incrementOrderItemQuantity, decrementOrderItemQuantity} = useContext(
    OrderContext,
  )

  const getFormattedData = data => ({
    categoryDishes: data.category_dishes.map(eachCategoryDishes => ({
      addonCat: eachCategoryDishes.addonCat.map(eachAddonCat => ({
        addonCategory: eachAddonCat.addon_category,
        addonCategory_id: eachAddonCat.addon_category_id,
        addonSelection: eachAddonCat.addon_selection,
        addons: eachAddonCat.addons.map(eachAddons => ({
          dishAvailability: eachAddons.dish_Availability,
          dishType: eachAddons.dish_Type,
          dishCalories: eachAddons.dish_calories,
          dishCurrency: eachAddons.dish_currency,
          dishDescription: eachAddons.dish_description,
          dishId: eachAddons.dish_id,
          dishImage: eachAddons.dish_image,
          dishName: eachAddons.dish_name,
          dishPrice: eachAddons.dish_price,
        })),
        nextUrl: eachAddonCat.nexturl,
      })),
      dishAvailability: eachCategoryDishes.dish_Availability,
      dishType: eachCategoryDishes.dish_Type,
      dishCalories: eachCategoryDishes.dish_calories,
      dishCurrency: eachCategoryDishes.dish_currency,
      dishDescription: eachCategoryDishes.dish_description,
      dishId: eachCategoryDishes.dish_id,
      dishImage: eachCategoryDishes.dish_image,
      dishName: eachCategoryDishes.dish_name,
      dishPrice: eachCategoryDishes.dish_price,
      nexturl: eachCategoryDishes.nexturl,
    })),
    menuCategory: data.menu_category,
    menuCategoryId: data.menu_category_id,
    menuCategoryImage: data.menu_category_image,
    nextUrl: data.nexturl,
  })

  useEffect(() => {
    const getItemsList = async () => {
      const restaurantApiUrl =
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      const restaurantApiResponse = await fetch(restaurantApiUrl)
      const fetchedRestaurantData = await restaurantApiResponse.json()
      const formattedRestaurantData = fetchedRestaurantData[0].table_menu_list.map(
        eachItem => getFormattedData(eachItem),
      )
      setRestaurantData(formattedRestaurantData)
    }

    getItemsList()
  }, [])

  useEffect(() => {
    if (restaurantData.length > 0) {
      setActiveTabId(restaurantData[0].menuCategoryId)
    }
  }, [restaurantData])

  useEffect(() => {
    const activeFoods = restaurantData.filter(
      eachItem => eachItem.menuCategoryId === activeTabId,
    )
    setActiveFoodList(activeFoods)
  }, [activeTabId, restaurantData])

  const onChangeActiveTab = id => setActiveTabId(id)

  const onClickIncreaseOrderQty = id => {
    const activeTabListData = restaurantData.filter(
      eachItem => eachItem.menuCategoryId === activeTabId,
    )
    const selectedDish = activeTabListData[0].categoryDishes.find(
      dish => dish.dishId === id,
    )
    incrementOrderItemQuantity(selectedDish)
  }
  const onClickDecreaseOrderQty = id => {
    const activeTabListData = restaurantData.filter(
      eachItem => eachItem.menuCategoryId === activeTabId,
    )
    const selectedDish = activeTabListData[0].categoryDishes.find(
      dish => dish.dishId === id,
    )
    decrementOrderItemQuantity(selectedDish)
  }
  const renderCategorySlider = () => (
    <CategorySliderListContainer>
      <CategorySliderList>
        {restaurantData.map(eachItem => (
          <CategorySliderItem
            key={eachItem.menuCategoryId}
            category={eachItem}
            activeTab={activeTabId === eachItem.menuCategoryId}
            onChangeActiveTab={onChangeActiveTab}
          />
        ))}
      </CategorySliderList>
    </CategorySliderListContainer>
  )
  const renderDishListContainer = () => (
    <DishListContainer>
      <DishList>
        {activeFoodList.map(category =>
          category.categoryDishes.map(foodItem => (
            <FoodList
              key={foodItem.dishId}
              foodDetails={foodItem}
              onClickIncreaseOrderQty={onClickIncreaseOrderQty}
              onClickDecreaseOrderQty={onClickDecreaseOrderQty}
            />
          )),
        )}
      </DishList>
    </DishListContainer>
  )
  return (
    <HomeContainer>
      <Header />
      {renderCategorySlider()}
      {renderDishListContainer()}
    </HomeContainer>
  )
}

export default Home

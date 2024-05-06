import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../../components/Header'
import CategorySliderItem from '../../components/CategorySliderItem'
import FoodList from '../../components/FoodList'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [restaurantData, setRestaurantData] = useState([])
  const [restaurantApiStatus, setApiStatus] = useState(
    apiStatusConstants.initial,
  )
  const [activeTabId, setActiveTabId] = useState(0)
  const [activeFoodList, setActiveFoodList] = useState([])

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
      setApiStatus(apiStatusConstants.inProgress)
      const restaurantApiUrl =
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      const restaurantApiResponse = await fetch(restaurantApiUrl)
      if (restaurantApiResponse.ok) {
        const fetchedRestaurantData = await restaurantApiResponse.json()

        const formattedRestaurantData = fetchedRestaurantData[0].table_menu_list.map(
          eachItem => getFormattedData(eachItem),
        )
        setRestaurantData(formattedRestaurantData)

        setApiStatus(apiStatusConstants.success)
      }
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

  const renderCategorySlider = () => (
    <div className="category-slider-list-container">
      <ul className="category-slider-List">
        {restaurantData.map(eachItem => (
          <CategorySliderItem
            key={eachItem.menuCategoryId}
            category={eachItem}
            activeTab={activeTabId === eachItem.menuCategoryId}
            onChangeActiveTab={onChangeActiveTab}
          />
        ))}
      </ul>
    </div>
  )
  const renderDishListContainer = () => (
    <div className="dish-list-container ">
      <ul className="dish-list">
        {activeFoodList.map(category =>
          category.categoryDishes.map(foodItem => (
            <FoodList key={foodItem.dishId} foodDetails={foodItem} />
          )),
        )}
      </ul>
    </div>
  )
  const renderRestaurantAppContainer = () => (
    <>
      <Header />
      {renderCategorySlider()}
      {renderDishListContainer()}
    </>
  )
  const renderLoaderContainer = () => (
    <div className="loader-container">
      <Loader
        type="ThreeDots"
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
      />
    </div>
  )
  const renderRestaurantAppView = () => {
    switch (restaurantApiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderContainer()
      case apiStatusConstants.success:
        return renderRestaurantAppContainer()
      default:
        return null
    }
  }
  return <div className="home-container">{renderRestaurantAppView()}</div>
}

export default Home

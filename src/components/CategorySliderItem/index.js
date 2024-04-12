import {CategorySliderListItem, CategoryBtn} from './styledComponents'

const CategorySliderItem = props => {
  const {category, activeTab, onChangeActiveTab} = props
  const {menuCategoryId, menuCategory} = category
  const onClickTab = () => {
    onChangeActiveTab(menuCategoryId)
  }
  return (
    <CategorySliderListItem>
      <CategoryBtn type="button" activeTab={activeTab} onClick={onClickTab}>
        {menuCategory}
      </CategoryBtn>
    </CategorySliderListItem>
  )
}

export default CategorySliderItem

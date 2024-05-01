import './index.css'

const CategorySliderItem = props => {
  const {category, activeTab, onChangeActiveTab} = props
  const {menuCategoryId, menuCategory} = category
  const onClickTab = () => {
    onChangeActiveTab(menuCategoryId)
  }
  const activeTabClassName = activeTab
    ? 'category-btn active-category-btn'
    : 'category-btn'
  return (
    <li className="category-slider-list-item">
      <button type="button" className={activeTabClassName} onClick={onClickTab}>
        {menuCategory}
      </button>
    </li>
  )
}

export default CategorySliderItem

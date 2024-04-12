import {styled} from 'styled-components'

export const FoodItems = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 5px #d3d3d3;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
`
export const DishTypeAndDetailsContainer = styled.div`
  display: flex;
  width: 50%;
`
export const DishTypeImage = styled.img`
  width: 25px;
  height: 25px;
`
export const DishDetailsContainer = styled.div`
  font-family: 'Roboto';
  margin-left: 10px;
`
export const DishName = styled.p`
  color: #000000;
  font-family: 'Roboto';
  font-weight: 900;
  font-size: 16px;
  margin: 0px 0px 10px;
  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
`
export const DishPrice = styled.p`
  color: #555555;
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 13px;
  margin: 0px 0px 10px;
  @media screen and (min-width: 768px) {
    font-size: 15px;
  }
`
export const DishDescription = styled.p`
  color: #a9a9a9;
  font-family: 'Roboto';
  font-size: 12px;
  margin: 0px 0px 10px;
  @media screen and (min-width: 768px) {
    font-size: 15px;
  }
`
export const DishCustomization = styled.p`
  color: #7644c3;
  font-family: 'Roboto';
  font-size: 13px;
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 15px;
  }
`
export const DishQtyContainer = styled.div`
  background-color: #299617;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 35px;
  border-radius: 30px;
  margin: 0px 0px 10px;
  @media screen and (min-width: 768px) {
    width: 120px;
    height: 40px;
  }
`
export const DishQty = styled.p`
  color: #ffffff;
  margin: 0px;
  font-size: 14px;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`
export const DishQtyBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`

export const DishCalories = styled.p`
  color: #f79002;
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 14px;
  align-self: center;
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`
export const DishImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  @media screen and (min-width: 768px) {
    width: 145px;
    height: 135px;
    align-self: center;
  }
`
export const NotAvailable = styled.p`
  color: #e3242b;
  font-family: 'Roboto';
  font-size: 13px;
  margin: 0px 0px 10px;
  @media screen and (min-width: 768px) {
    font-size: 15px;
  }
`

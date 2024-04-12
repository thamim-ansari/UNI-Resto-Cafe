import {styled} from 'styled-components'

export const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 5px #d3d3d3;
`
export const NavResponsiveContainer = styled.nav`
  width: 90%;
  font-family: 'Roboto';
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  @media screen and (min-width: 768px) {
    width: 95%;
  }
`
export const AppLogo = styled.h1`
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 28px;
  }
`
export const MyOrdersContainer = styled.div`
  display: flex;
  align-items: center;
`
export const MyOrders = styled.p`
  font-family: 'Roboto';
  font-weight: 600;
  color: #555555;
  font-size: 17px;
  margin-right: 5px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
export const CartIconContainer = styled.div`
  font-family: 'Roboto';
  display: flex;
`
export const OrderQtyContainer = styled.div`
  background-color: #ff4433;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 10px;
  @media screen and (min-width: 768px) {
    top: 18px;
    right: 16px;
  }
  @media screen and (min-width: 1200px) {
    right: 30px;
  }
`
export const OrderQty = styled.div`
  color: #ffffff;
  font-size: 12px;
`

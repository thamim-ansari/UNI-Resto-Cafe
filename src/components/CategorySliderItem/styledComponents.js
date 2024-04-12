import {styled} from 'styled-components'

export const CategorySliderListItem = styled.li`
  list-style-type: none;
`
export const CategoryBtn = styled.button`
  color: ${props => (props.activeTab ? '#e3242b' : '#000')};
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  border: none;
  border-bottom: ${props => (props.activeTab ? '3px solid #d03120' : 'none')};
  width: 200px;
  height: 50px;
  @media screen and (min-width: 768px) {
    font-size: 16px;
    width: 240px;
    height: 60px;
  }
`

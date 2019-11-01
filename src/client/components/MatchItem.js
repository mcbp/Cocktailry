import React, { Component } from 'react'
import styled from 'styled-components'

const ListItem = styled.div`
 display: flex;
 justify-content: space-between;
 padding: 10px 15px;
 border-top: 0.8px solid rgba(0,0,0,0.14);
 &:first-child {
   border-top: 0;
 }
 &.match-item {
   background-color: ${props => props.theme.primary};
   color: #fff;
 }
`

class MatchItem extends Component {

  render() {
    const ingredients = this.props.selectedIngredients
    const currentIngredient = this.props.currentIngredient
    const currentMeasure = this.props.currentMeasure

    return (
        <ListItem className={ingredients.includes(currentIngredient)
          ? 'match-item' : ''}>
          <span>{currentIngredient}</span>
          <span>{currentMeasure}</span>
        </ListItem>
    )
  }

}

export default MatchItem

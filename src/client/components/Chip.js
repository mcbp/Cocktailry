import React, { Component } from 'react'
import styled from 'styled-components'

const ChipDiv = styled.div`
  background-color: ${props => props.theme.tertiary};
  font-size: 14px;
  display: inline-block;
  height: 36px;
  line-height: 32px;
  padding: 2px 12px;
  border-radius: 18px;
  margin: 0 5px 15px 0;
  cursor: pointer;
`
const ChipImg = styled.i`
  padding-left: 8px;
  float: right;
  font-size: 16px;
  line-height: 32px;
  cursor: pointer;
`

class Chip extends Component {

  callUpdateSelectedIngredients = event => {
    this.props.callUpdateSelectedIngredients(this.props.ingredient)
  }

  render() {
    return (
      <ChipDiv
        onClick={this.callUpdateSelectedIngredients}
      >
        {this.props.ingredient}
        <ChipImg className="close material-icons">close</ChipImg>
      </ChipDiv>
    )
  }

}

export default Chip

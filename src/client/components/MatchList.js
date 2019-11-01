import React, { Component } from 'react'
import MatchItem from './MatchItem'

class MatchList extends Component {

  render() {
    const cd = this.props.cocktailDetails
    const ingredients = this.props.selectedIngredients

    return (
      <ul>
        {cd.strIngredient1 !== null &&
        <MatchItem selectedIngredients={ingredients}
          currentIngredient={cd.strIngredient1}
          currentMeasure={cd.strMeasure1}
        />}
        {cd.strIngredient2 !== null &&
        <MatchItem selectedIngredients={ingredients}
          currentIngredient={cd.strIngredient2}
          currentMeasure={cd.strMeasure2}
        />}
        {cd.strIngredient3 !== null &&
        <MatchItem selectedIngredients={ingredients}
          currentIngredient={cd.strIngredient3}
          currentMeasure={cd.strMeasure3}
        />}
        {cd.strIngredient4 !== null &&
        <MatchItem selectedIngredients={ingredients}
          currentIngredient={cd.strIngredient4}
          currentMeasure={cd.strMeasure4}
        />}
        {cd.strIngredient5 !== null &&
        <MatchItem selectedIngredients={ingredients}
          currentIngredient={cd.strIngredient5}
          currentMeasure={cd.strMeasure5}
        />}
        {cd.strIngredient6 !== null &&
        <MatchItem selectedIngredients={ingredients}
          currentIngredient={cd.strIngredient6}
          currentMeasure={cd.strMeasure6}
        />}
      </ul>
    )
  }

}

export default MatchList

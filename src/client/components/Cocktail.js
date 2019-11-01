import React, { Component } from 'react'
import MatchList from './MatchList'
import CocktailInstructions from './CocktailInstructions'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const CoktailTitle = styled.span`
  font-family: monospace;
  font-size: 20px;
  background-color: rgba(0,0,0,0.65);
  color: white;
  padding: 8px 20px !important;
`
const CocktailImageContainer = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`
const CocktailImage = styled.img`
  position: absolute !important;
`
const CocktailViewRecipe = styled.div`
  color: #ffab40;
  text-transform: uppercase;
  cursor: pointer;
`
class Cocktail extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isExpanded: false,
      cocktailDetails: {}
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.getCocktailDetails()
  }

  componentWillReceiveProps(nextProps) {
    this.getCocktailDetails(nextProps.id)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getCocktailDetails = (id = this.props.id) => {
    fetch(`/api/cocktail/${id}`)
      .then(res => res.json())
      .then(cocktailDetails => {
        if (this._isMounted) this.setState({cocktailDetails, isLoading: false})
      })
  }

  setIsExpanded = () => {
    this.setState({isExpanded: !this.state.isExpanded})
  }

  render() {
    return (
      <CSSTransition
        in={!this.state.isLoading}
        timeout={800}
        classNames="move"
        unmountOnExit
      >
      <div className="Cocktail">

        {!this.state.isLoading &&
            <div className="card">
              <div className="card-image">
                <CocktailImageContainer>
                  <CocktailImage src={this.state.cocktailDetails.strDrinkThumb}/>
                </CocktailImageContainer>
                <CoktailTitle className="card-title">{this.state.cocktailDetails.strDrink}</CoktailTitle>
              </div>
              <div className="card-content">
                <MatchList
                  selectedIngredients={this.props.selectedIngredients}
                  cocktailDetails={this.state.cocktailDetails}
                />
              </div>
              <div className="card-action">
                <CocktailInstructions
                  isExpanded={this.state.isExpanded}
                  cocktailDetails={this.state.cocktailDetails}
                />
                <CocktailViewRecipe
                  onClick={this.setIsExpanded}>
                  {this.state.isExpanded ? 'Hide Recipe' : 'View Recipe' }
                </CocktailViewRecipe>
              </div>
            </div>
        }

      </div>
      </CSSTransition>
    )
  }

}

export default Cocktail

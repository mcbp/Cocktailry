import React, { Component } from 'react'
import Home from './Home'
import Cocktail from './Cocktail'
import CocktailControls from './CocktailControls'
import MasonryLayout from 'react-masonry-layout'
import Masonry from 'react-masonry-css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class CocktailResults extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cocktails: [],
      showResults: false,
      showHome: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cocktails.length > 0 && this.state.showResults === false) {
      this.setState({showResults: true})
    } else if (this.state.cocktails.length === 0 && this.state.showResults === true) {
      this.setState({showResults: false})
    }
  }

  searchCocktails = () => {
    if(this.props.selectedIngredients.length !== 0) {
      this.setState({cocktails: []}, this.callSearchAPI())
    } else {
      this.setState({cocktails: []})
    }
  }

  callSearchAPI = () => {
    fetch(`/api/search?i=${this.props.selectedIngredients.toString()}`)
      .then(res => res.json())
      .then(cocktails => this.searchPostProcessing(cocktails))
  }

  searchPostProcessing = cocktails => {
    this.setState({cocktails})
  }

  setResults = bool => {
    this.setState({showResults: bool})
  }

  setHome = bool => {
    this.setState({showHome: bool})
  }

  render() {

    const breakpointColumnsObj = {
      default: 3,
      1300: 2,
      992: 3,
      850: 2,
      600: 1
    }

    let cocktails = this.state.cocktails.map(cocktail =>
      <Cocktail key={cocktail.id} id={cocktail.id}  selectedIngredients={cocktail.ingredients}/>
    )

    return(
      <div>

        <CocktailControls
          callSearch={this.searchCocktails}
          selectedIngredients={this.props.selectedIngredients}
          callUpdateSelectedIngredients={this.props.callUpdateSelectedIngredients}
        />

        <CSSTransition
          in={!this.state.showResults}
          timeout={800}
          classNames="move"
          unmountOnExit
        >
          <Home />
        </CSSTransition>

        <CSSTransition
          in={this.state.showResults}
          timeout={800}
          classNames="move"
          unmountOnExit
          onEnter={() => this.setHome(false)}
          onExited={() => this.setHome(true)}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="cocktail-masonry-grid"
            columnClassName="cocktail-masonry-grid_column"
          >
            {cocktails}
          </Masonry>
        </CSSTransition>

      </div>
    )
  }

}

export default CocktailResults

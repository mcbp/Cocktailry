import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import MenuButton from './MenuButton'

const SearchBarInput = styled.input`
  &&& {
    width: 100%;
    padding: 0 50px 0 30px;
    height: 4rem;
    box-sizing: border-box;
    border: none;
    border-top: 0.8px solid rgba(0,0,0,0.14);
    border-bottom: 0.8px solid rgba(0,0,0,0.14);
  }
`
const SearchBarIcon = styled.i`
  position: absolute;
  top: 1.3rem;
  right: 15px;
  cursor: pointer;
  color: #777;
`
const ListItem = styled.li`
  position: relative;
  padding: 0 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: rgba(0,0,0,0.05);
  }
  &.selected {
    background-color: ${props => props.theme.secondary};
    color: #fff;
  }
`
const ListItemCheck = styled.i`
  position: absolute;
  top: 12px;
  right: 24px;
  color: #fff;
  opacity: 0;
  &.selected {
    opacity: 1;
  }
`
class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loadingIngredients: true,
      allIngredients: [],
      matchingIngredients: [],
      selectedIngredients: [],
      currentIngredient: ""
    }
  }

  componentDidMount() {
    this.getAllIngredients()
  }

  getAllIngredients = () => {
    fetch('/api/ingredients')
      .then(res => res.json())
      .then(ingredients => this.setState({
        allIngredients: ingredients.ingredients.sort(),
        matchingIngredients: ingredients.ingredients,
        loadingIngredients: false}))
  }

  getIngredientMatches = e => {
    let currentIngredient = e.target.value
    let matchingIngredients = this.state.allIngredients.filter(
      ingr => ingr.toLowerCase().includes(currentIngredient.toLowerCase())
    )
    this.setState({ currentIngredient, matchingIngredients })
  }

  updateSelectedIngredients = ingr => {
    let selectedIngredients = this.state.selectedIngredients
    if (selectedIngredients.includes(ingr)) {
      selectedIngredients = selectedIngredients.filter(item => item !== ingr)
    } else {
      selectedIngredients = [...selectedIngredients, ingr]
    }
    this.setState({selectedIngredients})
    this.props.getSelectedIngredients(selectedIngredients)
  }

  render() {

    return (
      <div className="Search">

        <ul id="slide-out" className="sidenav sidenav-fixed">
          <Logo />
          <div className="input-field col s12">
            <SearchBarInput
              type="text"
              placeholder="Search ingredients..."
              className="browser-default"
              value={this.state.currentIngredient}
              onChange={this.getIngredientMatches}
            />
            <SearchBarIcon className="material-icons">search</SearchBarIcon>
          </div>
          {this.state.matchingIngredients.map(ingr =>
            <ListItem
              key={ingr}
              className={this.state.selectedIngredients.includes(ingr)
                        ? 'selected' : '' }
              onClick={() => this.updateSelectedIngredients(ingr)}
            >{ingr}
              <ListItemCheck className={this.state.selectedIngredients.includes(ingr)
                                      ? 'material-icons selected' : 'material-icons' }
              >check</ListItemCheck>
            </ListItem>
          )}
          {!this.state.loadingIngredients &&
           this.state.matchingIngredients.length === 0 &&
            <ListItem>No ingredients found...</ListItem>
          }
        </ul>

        <MenuButton />

      </div>
    )
  }

}

export default Search

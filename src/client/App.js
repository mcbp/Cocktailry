import React, { Component } from 'react'
import './app.css'
import M from 'materialize-css';
import Search from './components/Search'
import Header from './components/Header'
import CocktailResults from './components/CocktailResults'
import Footer from './components/Footer'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedIngredients: []
    }
  }

  componentDidMount() {
    M.AutoInit()
  }

  updateIngredients = selectedIngredients => {
    this.setState({selectedIngredients})
  }

  updateSelectedIngredients = ingr => {
    this.refs.search.updateSelectedIngredients(ingr)
  }

  render() {
    return (
      <div className="App">

        <header>
          <Header />
          <Search
            ref="search"
            getSelectedIngredients={this.updateIngredients}
          />
        </header>

        <main>
          <div className="container" style={{position: "relative"}}>
            <CocktailResults
              selectedIngredients={this.state.selectedIngredients}
              callUpdateSelectedIngredients={this.updateSelectedIngredients}
            />
          </div>
        </main>

        <Footer/>

      </div>
    )
  }
}

export default App

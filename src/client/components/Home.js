import React, { Component } from 'react'
import M from 'materialize-css'
import styled from 'styled-components'

const HomeContainer = styled.div`
  position: absolute;
  width: 100%;
`
const HomeText = styled.div`
  background-color: #fff;
  position: relative;
  margin: 30px 0;
  padding: 25px 20px 10px;
  text-align: center;
  font-size: 20px;
  border-radius: 3px;
  border: 4px solid ${props => props.theme.tertiary}
`
const HomeIcon = styled.i`
  color: ${props => props.theme.secondary}
  background-color: #fff;
  position: absolute;
  padding: 0 15px;
  font-size: 50px;
  top: -30px; left: 50%;
  transform: translateX(-50%);
`
const Carousel = styled.div`
  min-height: 400px;
  margin: 30px 0;
`
const CarouselItem = styled.a`
  width: 33.33% !important;
  height: auto !important;
  @media (max-width: 800px) {width: 50% !important;}
  @media (max-width: 420px) {width: 100% !important;}
`
const CarouselCaption = styled.span`
  position: absolute;
  bottom: 7px; left: 0;
  font-family: monospace;
  font-size: 20px;
  padding: 8px 20px !important;
  background-color: rgba(0,0,0,0.65);
  color: white;
  box-sizing: border-box;
`
class Home extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      cocktails: [],
      ids: [11001, 11000, 11002, 11004, 11009, 11011],
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.getHomeCocktails()
  }

  componentDidUpdate(prevProps, prevState) {
    let ids = this.state.ids
    if (this.state.cocktails.length === ids.length &&
        prevState.cocktails.length !== ids.length) {

          let elems = document.querySelectorAll('.carousel');
          M.Carousel.init(elems, {fullWidth: true})
          let elem = document.querySelector('.carousel');
          M.Carousel.getInstance(elem).next()
          let intervalId = setInterval(() => {
            M.Carousel.getInstance(elem).next()
          }, 4500)
          this.setState({intervalId})
        }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
    this._isMounted = false
  }

  getHomeCocktails() {
    let ids = this.state.ids
    for (let i = 0; i < ids.length; i++) {
      fetch(`/api/cocktail/${ids[i]}`)
        .then(res => res.json())
        .then(cocktailDetails => {
          if (this._isMounted) this.setState({cocktails: [...this.state.cocktails, cocktailDetails]})
        })
    }
  }

  render() {
    let cocktails = this.state.cocktails.map(cocktail =>
      <CarouselItem className="carousel-item" href="#five!">
        <img src={cocktail.strDrinkThumb}/>
        <CarouselCaption>{cocktail.strDrink}</CarouselCaption>
      </CarouselItem>
    )
    return (
      <HomeContainer>
        <HomeText>
          <HomeIcon className="material-icons">local_bar</HomeIcon>
          <p>There's a drink for every occasion.</p>
          <p>Discover new cocktail recipes by selecting your favorite ingredients from the sidebar.</p>
        </HomeText>
        { cocktails.length === this.state.ids.length &&
        <Carousel className="carousel">
          {cocktails}
        </Carousel> }

      </HomeContainer>
    )
  }

}

export default Home

import React, { Component } from 'react'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Chip from './Chip'
import EmptyChips from './EmptyChips'

const ControlContainer = styled.div`
  margin: 40px 0;
  min-height: 55px;
`
const ControlButton = styled.div`
  background-color: ${props => props.theme.secondary};
  float: right;
  display: block;
  height: auto;
  min-height: 36px;
  padding: 10px 16px;
  line-height: 1.5em;
  &:hover {
    background-color: ${props => props.theme.secondaryAccent};
  }
`

class CocktailControls extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showChips: false,
      showEmpty: true
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedIngredients.length === 0 && prevProps !== this.props) {
      this.setState({showChips: false},
        () => setTimeout(() => this.setState({showEmpty: true}), 800))
    } else if (this.props.selectedIngredients.length > 0 && prevProps !== this.props) {
      this.setState({showEmpty: false},
        () => setTimeout(() => this.setState({showChips: true}), 800))
    }
  }

  render() {
    return (
      <ControlContainer className="row">

        <div className="col s12 m8 l9">

          <TransitionGroup>
          {this.state.showChips && (
            this.props.selectedIngredients.map(ingr =>
              <CSSTransition key={ingr} timeout={800} classNames="move" unmountOnExit>
                <Chip
                  key={ingr}
                  ingredient={ingr}
                  callUpdateSelectedIngredients={this.props.callUpdateSelectedIngredients}
                />
              </CSSTransition>
            )
          )}
          {this.state.showEmpty && (
            <CSSTransition timeout={800} classNames="fade">
              <EmptyChips />
            </CSSTransition>
          )}
          </TransitionGroup>
        </div>

        <div className="col s12 m4 l3">
          <ControlButton className="btn"
            onClick={this.props.callSearch}
          >What can i make?</ControlButton>
        </div>

      </ControlContainer>
    )
  }

}

export default CocktailControls

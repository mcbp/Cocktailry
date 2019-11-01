import React, { Component } from 'react'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const InstructionContainer = styled.div`
  max-height: 0;
  overflow: hidden;
  margin-bottom: ${props => props.isExpanded ? '30px' : '0'}
`
const InstructionItem = styled.div`
  position: relative;
`
const InstructionIcon = styled.i`
  position: absolute;
  top: 15px;
  font-size: 14px;
  color: ${props => props.theme.secondary}
`
const InstructionText = styled.li`
  padding: 10px 0 10px 15px;
  margin-left: 6px;
  border-left: 3px solid ${props => props.theme.secondary};
  list-style-type: none;
`

class CocktailInstructions extends Component {

  formatInstructionsText = () => {
    let instructions = this.props.cocktailDetails.strInstructions.replace(/([^z])\./g, '$1\u000B').split('\u000B')
    let markup = instructions.map((inst, index) => {
      if (inst.length !== 0)
        return (
            <InstructionItem key={index}>
              <InstructionIcon className='material-icons'>brightness_1</InstructionIcon>
              <InstructionText>{this.capitalizeFirstLetter(inst)}</InstructionText>
            </InstructionItem>
        )
    })
    return markup
  }

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1) + ".";
  }

  render() {
    return (
      <CSSTransition
        in={this.props.isExpanded}
        out={!this.props.isExpanded}
        timeout={0}
        classNames="height"
      >
        <InstructionContainer isExpanded={this.props.isExpanded}>
          {this.formatInstructionsText()}
        </InstructionContainer>
      </CSSTransition>
    )
  }

}

export default CocktailInstructions

import React from 'react'
import styled from 'styled-components'

function MenuButton() {

  const MenuContainer = styled.a`
    position: absolute;
    width: 32px;
    height: 32px;
    top: 34px;
    left: 32px;
  `
  const MenuIcon = styled.i`
    font-size: 32px;
    color: ${props => props.theme.primary}
  `

  return(
    <MenuContainer href="#" data-target="slide-out" className="sidenav-trigger hide-on-large-only">
      <MenuIcon className="material-icons">menu</MenuIcon>
    </MenuContainer>
  )
}

export default MenuButton

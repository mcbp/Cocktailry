import React from 'react'
import styled from 'styled-components'

function Header() {

  const HeaderContainer = styled.nav`
    background-color: #fff;
    height: 100px;
    border-bottom: 0.8px solid rgba(0,0,0,0.14);
    box-shadow: none;
  `
  const Title = styled.h2`
    margin: 0 auto;
    text-align: center;
	  letter-spacing: 0.2em;
    color: ${props => props.theme.secondary}
  `
  return(
    <HeaderContainer className="valign-wrapper">
      <div className="container">
        <Title>Cocktailry</Title>
      </div>
    </HeaderContainer>
  )
}

export default Header

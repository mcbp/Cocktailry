import React from 'react'
import logoImage from '../../../public/margarita-color.png'
import styled from 'styled-components'

function Logo() {

  const LogoContainer = styled.li`
    padding: 20px 75px 5px;
  `
  const LogoImage = styled.img`
    width: 100%;
  `

  return (
    <LogoContainer className="valign-wrapper">
      <LogoImage src={logoImage}/>
    </LogoContainer>
  )

}

export default Logo

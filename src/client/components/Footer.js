import React, { Component } from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.8px solid rgba(0,0,0,0.14);
`
const FooterLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
`
const FooterIcon = styled.i`
  font-size: 20px;
  padding-right: 4px;
`
class Footer extends Component {

	render() {
		return (
			<FooterContainer>
				<FooterLink href="https://github.com/mcbp">
          <FooterIcon className="material-icons">code</FooterIcon>
          mcbp</FooterLink>
				<FooterLink href="https://www.thecocktaildb.com/">
          <FooterIcon className="material-icons">local_drink</FooterIcon>
          made with the CocktailDB API</FooterLink>
			</FooterContainer>
		)
	}
}

export default Footer

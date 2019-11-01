import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from 'styled-components'

const theme = {
  //primary: "#61a0af",
  primary: "#66b2b2",
  secondary: "#F06c9b",
  tertiary: "#F5d491",
  //primaryAccent: "#96c9d9",
  primaryAccent: "#b2d8d8",
  secondaryAccent: "#f498b8"
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

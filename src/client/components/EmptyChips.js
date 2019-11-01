import React from 'react'
import styled from 'styled-components'

const Message = styled.div`
  width: 100%;
  font-style: italic;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 41px;
  border-radius: 2px;
  border-bottom: 1px solid rgba(0,0,0,0.14);
  margin-bottom: 10px;
`

function EmptyChips() {

    return (
      <Message>
        Add cocktail ingredients from the sidebar
      </Message>
    )
}

export default EmptyChips

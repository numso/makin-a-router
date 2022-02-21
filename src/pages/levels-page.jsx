import React from 'react'
import styled from 'styled-components'

import { useAlerts } from '../alerts'

export default function LevelsPage () {
  const alerts = useAlerts()
  return (
    <Wrapper>
      <FunButton
        onClick={() => {
          if (Math.random() < 0.5) {
            alerts.create('You did the thing')
          } else {
            alerts.create("Uh oh, it didn't work", true)
          }
        }}
      >
        Do the thing
      </FunButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 100px;
`

const FunButton = styled.button`
  background-color: coral;
  width: 500px;
  height: 200px;
  &:hover {
    background-color: blue;
  }
  &:active {
    background-color: black;
    color: white;
  }
`

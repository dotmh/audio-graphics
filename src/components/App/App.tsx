import { FC } from 'react'
import styled from 'styled-components'
import { AudioContextProvider } from '../../contexts/audio-context'
import { InputSelector } from '../InputSelector'

export const App: FC = () => {
  return <AppWrapper>
    <AudioContextProvider>
      <InputSelector />
    </AudioContextProvider>
  </AppWrapper>
}

const AppWrapper = styled.div`
  
`
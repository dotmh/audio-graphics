import {FC} from 'react';
import styled from 'styled-components';
import {AudioContextProvider} from '../../contexts/audio-context';
import {InputSelector} from '../InputSelector';
import {VisualIzerWrapper} from '../VisualizerWrapper';

export const App: FC = () => {
  return (
    <AppWrapper>
      <AudioContextProvider>
        <InputSelector />
        <VisualIzerWrapper name="scope" inputNode="input" />
      </AudioContextProvider>
    </AppWrapper>
  );
};

const AppWrapper = styled.div``;

import {FC} from 'react';
import {useAudioContext} from '../../contexts/audio-context';
import {Visualizer} from '../Visualizer';

export const VisualIzerWrapper: FC = () => {
  const audioContextContext = useAudioContext();

  const audioContext = audioContextContext?.audioContext;
  const audioInput = audioContextContext?.getNode('input');

  return (
    <>
      {audioContext && audioInput && (
        <Visualizer audioNodeIn={audioInput} audioContext={audioContext} />
      )}
    </>
  );
};

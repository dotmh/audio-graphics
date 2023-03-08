import {FC, useEffect, useState} from 'react';
import {useAudioContext} from '../../contexts/audio-context';
import {Visualizer} from '../Visualizer';
export interface VisualIzerWrapperProps {
  name: string;
  inputNode: string;
}

export const VisualIzerWrapper: FC<VisualIzerWrapperProps> = ({
  name,
  inputNode,
}) => {
  const audioContextContext = useAudioContext();
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>(
    undefined
  );
  const [audioInput, setAudioInput] = useState<AudioNode | undefined>(
    undefined
  );

  const [gain, setGain] = useState<GainNode | undefined>(undefined);

  useEffect(() => {
    if (audioContextContext?.audioContext) {
      const audioContext = audioContextContext?.audioContext;

      setAudioContext(audioContext);
      setAudioInput(audioContextContext?.getNode(inputNode));

      const gain = audioContext?.createGain();
      gain?.gain.setValueAtTime(1, audioContext?.currentTime);
      audioContextContext.addNode(name, gain);

      setGain(gain);
    }
  }, [audioContextContext?.audioContext]);

  return (
    <>
      {audioContext && audioInput && gain && (
        <Visualizer
          audioNodeIn={audioInput}
          audioContext={audioContext}
          audioNodeOut={gain}
        />
      )}
    </>
  );
};

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

export type AudioSource = AudioNode | undefined;
export type AudioCtx = AudioContext | undefined;

export interface AudioGraphNode {
  name: string;
  node: AudioNode;
}

export interface AudioContextContextValue {
  audioContext: AudioCtx;
  addNode: (name: string, node: AudioNode) => void;
  getNode: (name: string) => AudioSource;
}

export const AudioContextContext = createContext<
  AudioContextContextValue | undefined
>(undefined);

export const useAudioContext = () => useContext(AudioContextContext);

export interface AudioContextProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: FC<AudioContextProviderProps> = ({
  children,
}) => {
  const audioContext = useMemo(() => new AudioContext(), []);

  const [audioGraph, setAudioGraph] = useState<AudioGraphNode[]>([]);

  const addNode = (name: string, node: AudioNode) => {
    const newGraph = [...audioGraph];
    newGraph.push({name, node});
    setAudioGraph(newGraph);
  };

  const getNode = (name: string): AudioNode | undefined => {
    const node = audioGraph.find(({name: nodeName}) => name === nodeName);
    return node ? node.node : undefined;
  };

  return (
    <AudioContextContext.Provider value={{audioContext, addNode, getNode}}>
      {children}
    </AudioContextContext.Provider>
  );
};

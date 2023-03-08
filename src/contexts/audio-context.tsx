import { createContext, FC, ReactNode, useContext, useState } from "react";

export interface AudioContextContextValue {
    audioContext: AudioNode | undefined;
    setAudioContext: React.Dispatch<React.SetStateAction<AudioNode | undefined>>;
}

export const AudioContextContext = createContext<AudioContextContextValue | undefined>(undefined)

export const useAudioContext = () => useContext(AudioContextContext);

export interface AudioContextProviderProps {
    children: ReactNode;
}

export const AudioContextProvider: FC<AudioContextProviderProps> = ({children}) => {
    const [audioContext, setAudioContext] = useState<AudioNode | undefined>(undefined);

    return <AudioContextContext.Provider value={{audioContext, setAudioContext}}>
        {children}
    </AudioContextContext.Provider>
}
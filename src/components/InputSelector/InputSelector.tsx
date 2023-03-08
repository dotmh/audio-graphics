import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useAudioContext } from "../../contexts/audio-context";
import { Option, Select } from "../Select";
import { Error } from "../Error";

const AUDIO_INPUT: MediaDeviceKind = 'audioinput';

export const InputSelector: FC = () => {
    const audioContextContext = useAudioContext();

    const [audioInputs, setAudioInputs] = useState<Option[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            await navigator.mediaDevices.getUserMedia({audio: true, video: false});
            const audioIns = [...await navigator.mediaDevices.enumerateDevices()]
                .filter(device => device.kind === AUDIO_INPUT)
                .map(({deviceId, label}) => ({
                    value: deviceId,
                    label: label
                }))
            setAudioInputs(audioIns);
        })();
    }, [])

    if (!(audioContextContext)) {
        return <Error>Input Selector Component must be inside an AudioContextProvider</Error>
    }

    const setAudioContext = (deviceId: string) => {
        (async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {deviceId}
            })

            if(!audioContextContext.audioContext) {
                return;
            }

            const source = audioContextContext.audioContext.createMediaStreamSource(stream);
            audioContextContext.addNode('input' , source);
        })()
    }
    
    return <InputSelectorWrapper>
        {audioInputs && <Select label="Please Select a device" options={audioInputs} selected={setAudioContext} defaultLabel="from the following devices" />}
    </InputSelectorWrapper>
}

const InputSelectorWrapper = styled.div``; 
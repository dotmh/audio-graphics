import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Error as ErrorMessage } from "../Error";
import { renders, Renders } from "./Renders";

type RenderNames = keyof Renders;

export interface VisualizerProps {
    audioNodeIn: AudioNode;
    audioNodeOut?: AudioNode;
    audioContext: AudioContext;
    fttSize?: number;
    type?: RenderNames
}

const DEFAULT_FTT_SIZE = 2048;
const DEFAULT_TYPE: RenderNames = 'scope';

export const Visualizer: FC<VisualizerProps> = (
    {
        audioContext,
        audioNodeIn, 
        audioNodeOut, 
        fttSize = DEFAULT_FTT_SIZE, 
        type = DEFAULT_TYPE 
    }
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const analyser = audioContext.createAnalyser();
        
        analyser.fftSize = fttSize;

        const bufferLength = analyser.frequencyBinCount;

        const data = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(data);

        audioNodeIn.connect(analyser);
        
        if(!canvasRef.current) {
            setError('Can not get Canvas Context');
            throw new Error('Can not get Canvas Context');
        }

        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');

        if (!canvasContext) {
            setError('Failed to get 2D context from Canvas');
            throw new Error('Can not get 2D canvas context');
        }

        renders[type](canvasContext, {width: canvas.width, height: canvas.height}, analyser, data, {})
    }, [])

    return <VisualizerWrapper>
        {error === undefined && <canvas width={800} height={600} ref={canvasRef}></canvas>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
    </VisualizerWrapper>
}

const VisualizerWrapper = styled.div``;
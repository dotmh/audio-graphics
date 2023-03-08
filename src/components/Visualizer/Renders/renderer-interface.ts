export interface RendererConfig {
    [name: string]: string;
}

export interface Dimensions {
    width: number;
    height: number;
}

export type Renderer<C = RendererConfig> = (
    canvas: CanvasRenderingContext2D,
    dimensions: Dimensions,
    analyser: AnalyserNode,
    audioData: Uint8Array,
    config: C
) => void;
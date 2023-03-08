import { Renderer } from "./renderer-interface";

export const DEFAULT_BACKGROUND_COLOR = "rgba(31,31,31)";
export const DEFAULT_FORGROUND_COLOR = 'rgba(38,160,0)';
export const DEFAULT_LINE_WIDTH = 1;

export interface ScopeConfig {
    backgroundColor?: string;
    lineColor?: string;
    lineWidth?: number;
}

export const ScopeRenderer: Renderer<ScopeConfig> = (
    canvas,
    { width, height },
    analyser,
    data,
    {
        backgroundColor = DEFAULT_BACKGROUND_COLOR,
        lineColor = DEFAULT_FORGROUND_COLOR,
        lineWidth = DEFAULT_LINE_WIDTH
    }
) => {
    const draw = () => {
        requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(data);

        canvas.fillStyle = backgroundColor;
        canvas.fillRect(0, 0, width, height);

        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = lineColor;

        canvas.beginPath();

        const sliceWidth = width * 1.0 / data.length;
        let x = 0;

        for (let i = 0; i < data.length; i++) {

            let v = data[i] / 128.0;
            let y = v * height / 2;

            if (i === 0) {
                canvas.moveTo(x, y);
            } else {
                canvas.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvas.lineTo(width, height / 2);
        canvas.stroke();
    }

    draw();
}
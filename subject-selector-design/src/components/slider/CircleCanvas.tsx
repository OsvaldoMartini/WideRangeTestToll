import React, {FC, useRef, useEffect} from "react";

export const CircleCanvas: FC<{}> = props => {
    const canvasRef = useRef <HTMLCanvasElement |null>(null);
    const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
        
            let ctx = canvasCtxRef.current;
            let canvas = canvasRef.current;
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 30;
            ctx!.beginPath();
            ctx!.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx!.fillStyle = '#005eb8';
            ctx!.fill();
            ctx!.lineWidth = 4;
            //ctx.strokeStyle = gradient
            ctx!.stroke();
        }
    },[])
    return <canvas ref={canvasRef} {...props}/>
}


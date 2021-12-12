import React, {useRef, useEffect} from "react";

const CircleCanvas = props => {
    const canvasRef = useRef ("canvas");

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2D");
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 30;
        if (context){
            alert("")
                context.beginPath();
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                context.fillStyle = '#005eb8';
                context.fill();
                context.lineWidth = 4;
                //context.strokeStyle = gradient
                context.stroke();
        }
    },[])
    return <canvas ref={canvasRef} {...props}/>
}

export default CircleCanvas;
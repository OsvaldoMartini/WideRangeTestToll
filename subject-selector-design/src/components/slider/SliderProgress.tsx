import React, {FC, useRef, useEffect, useState} from "react";

export const SliderProgress: FC<{}> = props => {
    const canvasRef = useRef <HTMLCanvasElement |null>(null);
    const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
    const [valueRange, onChange] = useState(0)


    const drawMove =  (canvasCtxRef: { current: any; }, canvasRef: { current: any; }) => {
        let ctx = canvasCtxRef.current;
        let canvas = canvasRef.current;
        ctx!.clearRect(0, 0, canvas.width, canvas.height)
        // var rad = valueRange * (Math.PI / 180)
        // console.log("ValueRange: " , valueRange)
        // // move the context so its center be at 0,0
        // ctx!.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2)
        // // rotate it so we face the required angle
        // ctx!.rotate(rad)
        // var stepAngle = (Math.PI * 2) / 14,
        //   innerRad = canvas.width / 2.8,
        //   outerRad = canvas.width / 2.5
        // ctx!.beginPath()
        // for (var i = 0; i < 12; i++) {
        //   ctx!.moveTo(0, innerRad) // move vertically
        //   ctx!.lineTo(0, outerRad) // draw line vertically
        //   ctx!.rotate(stepAngle) // rotate by fixed increment
        // }
    }


 
    useEffect(() => {
        const elAnimed = document.getElementById('canvasAnimed');
        if (elAnimed){
            elAnimed.style.left = `${200 + Number(valueRange/2)}px`;
        }

            // elem!.oninput = function (el) {
            //     var value = ((el.value - this.min) / (this.max - this.min)) * 100
            //     this.style.background =
            //       'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' +
            //       value +
            //       '%, #fff ' +
            //       value +
            //       '%, white 100%)'
            //   }

        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');

            // 0deg   - 1.5 * Pi,
            // 90deg  - 0   * Pi,
            // 180deg - 0.5 * Pi,
            // 270deg - 1   * Pi,
            // let angleStart = 1.5 * Math.PI;
            // let angleEnd = 0.7 * Math.PI;

            let ctx = canvasCtxRef.current;
            let canvas = canvasRef.current;
            
            // Create gradient
            var gradient = ctx!.createLinearGradient(0,500,0,0);
            gradient.addColorStop(0, '#3258a8');
            gradient.addColorStop(1, '#a83244');
            // gradient.addColorStop(2, '#a83266');
            // gradient.addColorStop(3, '#a8325a');
            // gradient.addColorStop(4, '#a83244');



            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 20;
            ctx!.beginPath();
            ctx!.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            //ctx!.globalAlpha = valueRange - 200;
            //ctx!.fillStyle = 'blue';
            //ctx!.fill();
            ctx!.lineWidth = 50;
            ctx!.lineCap = "round";
            ctx!.strokeStyle = 'rgba(255,255,255,0)';
            ctx!.stroke();



            ctx!.beginPath();
            ctx!.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            //ctx!.globalAlpha = valueRange - 200;
            ctx!.fillStyle = '#005eb8';
            ctx!.fill();
            ctx!.lineWidth = 4;
            ctx!.lineCap = "round";
            ctx!.strokeStyle = gradient
            ctx!.stroke();


            ctx!.clearRect(0, 0, canvas.width, canvas.height)
           
            var rad = valueRange * (Math.PI / 180)
            console.log("ValueRange: " , valueRange - 200);
            // move the context so its center be at 0,0
            ctx!.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2)
            // rotate it so we face the required angle
            ctx!.rotate(rad)
            var stepAngle = (Math.PI * 2) / 24,
              innerRad = canvas.width / 2.8,
              outerRad = canvas.width / 2.5
            
            ctx!.beginPath()
            for (var i = 0; i < valueRange - 200 ; i++) {
             // ctx!.globalAlpha = valueRange - 200;  
              ctx!.moveTo(0, innerRad) // move vertically
              ctx!.lineTo(0, outerRad) // draw line vertically
              ctx!.rotate(stepAngle) // rotate by fixed increment
            }
            
            //Draw arc
            // ctx!.beginPath();
            // ctx!.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            // //ctx!.arc(centerX, centerY, radius, angleStart, angleEnd);
            // ctx!.strokeStyle = gradient;
            // ctx!.lineWidth = 5;
            // ctx!.lineCap = 'round';
            // ctx!.stroke();
              //ctx.setStyleProp('left', 0);
              //ctx.setStyleProp('top', y_cord*1);
              //ctx.setStyleProp('backgroundColor', "white");
               //canvas1.left = "100px";
              // ctx.style.top = "100px";
              // ctx.style.position = "absolute";
        
                ctx!.stroke() // all drawn, we can stroke
                ctx!.setTransform(1, 0, 0, 1, 0, 0) // reset context's position
              
             drawMove;
        }
    },[drawMove])

    return ( 
        <div {...props}>
            <div id="parent" className="slider-parent-position">
                <input id="angle" type="range" className="slider-position" min="0" max="360" value={valueRange} step={4}
                    onChange={({target:{value:radius}})=> {
                        onChange(Number(radius));
                        }} 
                />
                <canvas id="canvasAnimed"   ref={canvasRef} className="canvas-position" width="100" height="100"></canvas>
            </div>
        </div>
    );
    
}


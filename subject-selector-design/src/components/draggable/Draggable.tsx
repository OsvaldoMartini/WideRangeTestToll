import React, {FC, useState} from "react";
import "./draggable.css";


 export const Draggable: FC<{}> = (props) => {
    const dragItem = document.querySelector('#item')
  
    const [active, setActive] = useState(false)
    const [currentX, setCurrentX] = useState(0)

    const [currentY, setCurrentY] = useState(0)
    const [initialX, setInitialX] = useState(0)
    // const [initialY, setInitialY] = useState(0)
    
    const [xOffset, setXOffset] = useState(0)
    // const [yOffset, setYOffset] = useState(0)
    const dragStart= (e: any) => {
        e.preventDefault();
        console.log("dragStart", currentX, currentY);
        if (e.target === dragItem) {
            setActive(true)
          }

        if (e.type === 'touchstart') {
          setInitialX(e.touches[0].clientX - xOffset);
        //   setInitialY(e.touches[0].clientY); // - yOffset
        } else {
          setInitialX(e.clientX - xOffset);
        //setInitialY(e.clientY - yOffset);
        }

   
      }

      function dragEnd(e:any) {
        e.preventDefault();
      
        console.log("dragEnd", currentX, currentY);
        setInitialX(currentX);
        // setInitialY(currentY);
      //  alert("Stopped");
         setActive(false);
      }

      function drag(e:any) {
        console.log("drag", currentX, currentY);
        e.preventDefault();
 
        if (active) {
          
          if (e.type === 'touchmove') {
            setCurrentX(e.touches[0].clientX - initialX);
            setCurrentY(0); //e.touches[0].clientY - initialY
          } else {
            setCurrentX(e.clientX - initialX);
            setCurrentY(0); //e.clientY - initialY
          }

          setXOffset(currentX);
        //   setYOffset(currentY);
          console.log("draaggggg", currentY)
          setTranslate(currentX, currentY, dragItem)
        }
       // setActive(false);
      }

      function setTranslate(xPos:number, yPos:number, el:any) {
        console.log("seTranslate", currentX, currentY);
 
        el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
      }

    return ( 
        <div {...props}>
            <div id="outerContainer">
                <div id="container"onMouseEnter={e => dragStart(e)}   >
                    <div id="item" onMouseDown={e => {dragStart(e)}}  onMouseUp={e=> {dragEnd(e)}} onMouseMove={e => {drag(e)}}></div>
                 </div>
               </div>
          </div>
    );
    
}


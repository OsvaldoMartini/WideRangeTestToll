import React, { FC, useState } from "react";
import Lottie from 'react-lottie';

/* tslint:disable-next-line:max-line-length */
import animationData from "../../lotties/SliderErrorEllipse_12px.json";


export const SliderAnimated: FC<{}> = (props) => {
  const dragItem = document.querySelector('#item-draggable')
  const [active, setActive] = useState(false)
  const [currentX, setCurrentX] = useState(0)

  // const [currentY, setCurrentY] = useState(0)
  const [initialX, setInitialX] = useState(0)

  const [xOffset, setXOffset] = useState(0)

  const dragStart = (e: any) => {
    e.preventDefault();

    if (e.target === dragItem || e.currentTarget === dragItem) {
      setActive(true)
    }

    if (e.type === 'touchstart') {
      setInitialX(e.touches[0].clientX - xOffset);
    } else {
      setInitialX(e.clientX - xOffset);
    }
    if (!active) {
      setActive(true);
    }
  }

  function dragEnd(e: any) {
    e.preventDefault();

    //console.log("dragEnd", currentX, currentY);
    setInitialX(currentX);
    setActive(false);
  }

  function drag(e: any) {
    e.preventDefault();

    if (active) {
      if (e.clientX - initialX <= 142) {
        setCurrentX(e.clientX - initialX);
        //setCurrentY(0); //e.clientY - initialY
      } else {
        setCurrentX(140);
        //setCurrentY(0); //e.clientY - initialY
      }

      if (e.clientX - initialX <= 0) {
        setCurrentX(0);
        //setCurrentY(0); //e.clientY - initialY
      }

      setXOffset(currentX);
      //          setTranslate(currentX, currentY, dragItem)
    }
  }

  // function setTranslate(xPos:number, yPos:number, el:any) {
  //   el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
  // }

  return (
    <div {...props}>
      <div id="item-draggable" style={{ left: currentX }} className="circular-progress" onMouseDown={e => { dragStart(e) }} onMouseUp={e => { dragEnd(e) }} onMouseMove={e => { drag(e) }}>
        <Lottie
          options={{
            animationData,
            autoplay: true
          }}
          width={36}
          height={36}
          style={{ margin: '0 0 0' }}
          isStopped={false} />
      </div>
    </div>
  );

}


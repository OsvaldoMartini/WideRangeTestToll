import React, { FC, useState } from "react";

export interface ButtonSVGProps {
  title?: string;
  width: number;
  circlePosn?: string;
  parentCallback?: (id: any) => void;
}

export const ButtonSVG: FC<ButtonSVGProps> = ({
  title,
  width,
  circlePosn,
  parentCallback,
  ...buttonProps
}) => {
  var viewBoxPrams = `0 0 ${width} 28`
  var display: React.SVGProps<SVGAElement> = <svg width={width} height="28" viewBox={viewBoxPrams} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <rect x=".5" y=".5" width={width} height="27" rx="4" fill="#005EB8" stroke="#005EB8" />
      <text font-family="FrutigerLTStd-Roman, Frutiger LT Std" font-size="14" fill="#FFF">
        <tspan x="50%" y="50%">{title}</tspan>
      </text>
    </g>
  </svg>

  const [svgDisplay, setSvgDisplay] = useState(display);
  var transform = `translate(${circlePosn} 2)`
  var viewBoxPrams = `0 0 ${width} 28`
  const reducedWidth = Number({ width }.width) - 1



  //const test:number = {width?} - 1;
  //}
  //var reduceWidth:string = ({n});
  const updateStuff = (evt: React.MouseEvent) => {
    setSvgDisplay(display)
    if (evt.type === "mousedown") {

      const thisSvg = <svg width={width} height="28" viewBox={viewBoxPrams} xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <rect x=".5" y=".5" width={reducedWidth} height="27" rx="4" fill="#E8EDEE" stroke="#768692" />
          <text font-family="FrutigerLTStd-Roman, Frutiger LT Std" font-size="14" fill="#212B32">
            <tspan x="50%" y="50%">{title}</tspan>
          </text>""
        </g>
      </svg>
      setSvgDisplay(thisSvg)
    } else if (evt.type === "mouseleave") {

      const thisSvg = <svg width={width} height="28" viewBox={viewBoxPrams} xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <rect x=".5" y=".5" width={reducedWidth} height="27" rx="4" fill="#005EB8" stroke="#005EB8" />
          <text font-family="FrutigerLTStd-Roman, Frutiger LT Std" font-size="14" fill="#FFF">
            <tspan x="50%" y="50%">{title}</tspan>
          </text>
        </g>
      </svg>
      setSvgDisplay(thisSvg)
    } else {//mouseover

      const thisSvg = <svg width={width} height="28" viewBox={viewBoxPrams} xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <rect x=".5" y=".5" width={reducedWidth} height="27" rx="4" fill="#C7DAEC" stroke="#005EB8" />
          <text font-family="FrutigerLTStd-Roman, Frutiger LT Std" font-size="14" fill="#212B32">
            <tspan x="50%" y="50%">{title}</tspan>
          </text>
          <rect x=".5" y=".5" width={reducedWidth} height="27" rx="4" opacity=".5" fill="#C7DAEC" stroke="#005EB8" />
          <g transform={transform}>
            <circle fill="#005EB8" fill-rule="nonzero" cx="12" cy="12" r="9" />
            <path d="M12 8.25v7.5M8.25 12h7.5" stroke="#FFF" stroke-width="2.667" stroke-linecap="round" />
          </g>
        </g>
      </svg>
      setSvgDisplay(thisSvg)
    }
  }

  const buttonClicked = () => {
    //console.log("SCVG clciked")
    { parentCallback!({ title }) }
  }

  return (

    <div className="svg-padding"
      {...buttonProps} onMouseDown={(event) => {
        updateStuff(event)
      }}
      onMouseOver={(event) => {
        updateStuff(event)
      }}
      onMouseLeave={(event) => {
        updateStuff(event)
      }}
      onClick={buttonClicked}>

      {svgDisplay}
    </div>
  );
};
/*
ButtonSVG.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  circlePosn: PropTypes.string
  //sendTitle: PropTypes.string
}*/
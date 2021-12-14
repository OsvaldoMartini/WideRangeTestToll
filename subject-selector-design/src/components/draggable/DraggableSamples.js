import React, {Component} from 'react';
import Draggable from 'react-draggable'; // The default
import './draggable.css';
// import classNames from 'classnames';
// import ProgressBar from "react-bootstrap/ProgressBar";

class DraggableSample extends Component {
 

  state = {
    activeDrags: 0,
    leftPosition: {
      x: 0, y: 0
    },
    rightPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  };

  handleDragLeft = (e, ui) => {
    const {x, y} = this.state.leftPosition;
    this.setState({
      leftPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  handleDragRight = (e, ui) => {
    const {x, y} = this.state.rightPosition;
    this.setState({
      rightPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
  };

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
  };

  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  };

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {rightPosition, leftPosition} = this.state;
    const firstSkew = 61 - rightPosition.x;
    const startOn = "#005eb8";
    const middlOn= "#484d85";
    const stopOn = "#da291c";
    const valueRange = 20;
    
    return (
        <div style= {{position:"absolute", left:"0px", top:"50px"}}>
           <div style={{position:"relative", left:"0px", top:"10px"}} >
              <Draggable  axis="x" bounds={{left:-100, right:30}}onDrag={this.handleDragLeft} {...dragHandlers}>
              <div className="circle-inner-position">
                  <div className="circular-progress">
                    <div className="circular-progress-circle-gr1">
                      
                    </div>
                    <div className="circular-progress-inner"></div>
                  </div>
                  {/* <div>x: {leftPosition.x.toFixed(0)}, y: {leftPosition.y.toFixed(0)}</div> */}
                  {/* <canvas id="canvasAnimed"   ref={canvasRef} className="canvas-position" width="100" height="100"></canvas> */}
                </div>
              </Draggable>
            </div>
            {/* <ProgressBar/> */}
  
            <div style={{position:"relative", left:"120px", top:"10px"}}>
              <Draggable axis="x" bounds={{left:-50, right:150}}onDrag={this.handleDragRight} {...dragHandlers}>
                <div className="circle-inner-position">
                  <div className="circular-progress">
                    <div className="circular-progress-circle-gr2">
                      {firstSkew >= 0 && firstSkew < 89 &&(
                      <div className="segment" style={{backgroundImage: `background-image: linear-gradient(to left, ${startOn}, ${stopOn})`, transform: `rotate(180deg) skew(${firstSkew}deg)`}}></div>
                      )}
                      {firstSkew < 0 && firstSkew < 90 &&(
                        <>
                        <div className="segment" style={{backgroundImage: `background-image: linear-gradient(to left, ${startOn}, ${stopOn})`, transform: `rotate(180deg) skew(0deg)`}}></div>
                        <div className="segment" style={{backgroundImage: `background-image: linear-gradient(to left, ${startOn}, ${stopOn})`, transform: `rotate(-90deg) skew(${firstSkew-90}deg)`}}></div>
                        </>    
                      )}
                    </div>
                    <div className="circular-progress-inner"></div>
                  </div>
                  {/* <div>x: {rightPosition.x.toFixed(0)}, y: {rightPosition.y.toFixed(0)}, FirstSkew: {firstSkew}</div> */}
                  {/* <canvas id="canvasAnimed"   ref={canvasRef} className="canvas-position" width="100" height="100"></canvas> */}
                </div>
              </Draggable>
            </div>
        </div>
    );
  }
}

export default DraggableSample;
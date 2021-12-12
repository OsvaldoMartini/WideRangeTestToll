import React, {Component} from 'react';
import Draggable from 'react-draggable'; // The default
import { SliderProgress } from '../..';
import CircleCanvas from './CircleCanvas';
import './draggable.css';

class DraggableSample extends Component {
 

  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  };

  handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
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
    const {deltaPosition, controlledPosition} = this.state;
    return (
        <div style= {{position:"absolute", left:"500px", top:"50px"}}>
            <div style={{position:"relative", left:"20px", top:"10px"}} >
              <Draggable  axis="x" bounds={{left:-150, right:50}}onDrag={this.handleDrag} {...dragHandlers}>
                <div className="circle">
                  <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
                </div>
              </Draggable>
            </div>
            <div style={{position:"relative", left:"120px", top:"10px"}}>
              <Draggable axis="x" bounds={{left:-50, right:150}}onDrag={this.handleDrag} {...dragHandlers}>
                <div className="circle">
                  <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
                  {/* <canvas id="canvasAnimed"   ref={canvasRef} className="canvas-position" width="100" height="100"></canvas> */}
                </div>
              </Draggable>
            </div>
            <br/>
            <SliderProgress/>
        </div>
    );
  }
}

export default DraggableSample;
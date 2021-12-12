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
    },
    shadowConfig:{
      shadowColor0:"#000",
      // shadowOffset:{
      //   width:0,
      //   heingh:3
      // },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      shadowBlur:"3px",
      shadowSpread:"0px",
      horizontalOffset:"0px",
      verticalOffset:"4px",
      isInset:"inset"
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

    this.setState({
      shadowConfig:{
        horizontalOffset: horizontalOffset + 1,
        verticalOffset: verticalOffset + 1

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
    const {deltaPosition, controlledPosition, shadowConfig} = this.state;


    var shadowCircle = {
        boxShadow: `${shadowConfig.horizontalOffset}px ${shadowConfig.verticalOffset}px ${shadowConfig.shadowBlur}px ${shadowConfig.shadowSpread}px #b81b1b inset`,
        // shadowOffset: {
        //   width:0,
        //   height:3,
        // }
      }
  

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
                <div className="circle" >
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
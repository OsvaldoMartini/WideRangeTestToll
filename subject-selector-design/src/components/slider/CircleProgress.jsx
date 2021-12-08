import React, { useState } from 'react';

import './circle-progress.css';
import ProgressBar from './ProgressBar/ProgressBar';

const CircleProgress = () => {
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState('');
  const colorArray = ['#7ea9e1', "#ed004f", "#00fcf0", "#d2fc00", "#7bff00", "#fa6900"];

  const randomColor = () => {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  const randomProgressValue = () => {
    const progressValue = Math.floor(Math.random() * 101);
    setProgress(progressValue);
    const randomProgressColor = randomColor();
    setColor(randomProgressColor);
  }

  const onChange = e => {
    if (e.target.value) {
      if (e.target.value > 100) {
        progress = 100;
      }
      if (e.target.value < 0) {
          progress = 0;
      }
      setProgress(progress);
      const randomProgressColor = randomColor();
      setColor(randomProgressColor);
    } else {
      setProgress(0);
    }
  }

  return (
    <div className="circleprogress">
      <div className="circleprogress-header">
        <ProgressBar 
          progress={progress}
          size={120}
          strokeWidth={15}
          circleOneStroke='#d9edfe'
          circleTwoStroke={color}
        />
        <p>
          <input
            type="number"
            name="percent"
            placeholder="Add Progress Value"
            onChange={onChange}
          />
        </p>
        <button onClick={randomProgressValue}>
          Random
        </button>
      </div>
    </div>
  );
}

export default CircleProgress;

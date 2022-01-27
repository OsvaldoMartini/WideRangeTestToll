import React , {FC} from 'react';
import Lottie from 'react-lottie';

/* tslint:disable-next-line:max-line-length */
import animationData from "./Lines.json";

export interface AnimationPlaceHolderProps {
  children?: string | React.ReactElement;
  error?: boolean;
  stopAnimation: boolean;  
  disabled?: boolean;
}


export const AnimationPlaceHolder: FC<AnimationPlaceHolderProps> = ({stopAnimation}) => {
 
   return (
    <div className="main-place-holder">
      <Lottie 
        options={{
          animationData,
          autoplay:true
        }}
        width={220}
        height={220}
        style={{margin: '0 0 0'}}
        isStopped={stopAnimation} />
    </div>
  );
};

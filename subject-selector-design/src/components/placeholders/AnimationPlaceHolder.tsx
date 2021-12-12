import React , {FC} from 'react';
import Lottie from 'react-lottie';

/* tslint:disable-next-line:max-line-length */
import animationData from "./Lines.json";

export interface AnimationPlaceHolderProps {
  error?: boolean;
  disabled?: boolean;
}


export const AnimationPlaceHolder: FC<AnimationPlaceHolderProps> = ({}) => {
 
 const  stStopped = false;
 
  return (
    <div className="main-pa-place-holder">
      <Lottie 
        options={{
          animationData,
          autoplay:true
        }}
        width={220}
        height={220}
        style={{margin: '0 0 0'}}
        isStopped={stStopped} />
    </div>
  );
};

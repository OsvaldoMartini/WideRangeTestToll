import React from 'react'
import { Button as Btn, ButtonProps } from 'react-bootstrap'

interface Props {
  timer?: number
  text?: string
}

const TimedButton: React.FC<ButtonProps & Props> = ({ timer, ...props }) => {
  return <Btn {...props} data-timer={timer} className='timedButton'/>
}

/*const TimedButton = (buttonProps:ButtonProps, props:Props ): JSX.Element => {
	return <Btn {...props} disabled={props.isLoading || buttonProps.disabled} />
}*/

export default TimedButton;

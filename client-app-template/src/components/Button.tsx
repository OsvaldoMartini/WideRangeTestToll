import React from 'react'

function Button (props: any) {
    const { variant = 'primary', children, ...rest} = props
    return (
        <button className={`button ${variant}`} {...rest}>
            {children}
        </button>
    )
}

export default Button
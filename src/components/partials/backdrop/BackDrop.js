import React from 'react';
import './backdrop.css'

const BackDrop = props => {
    let backDropClass = ''
    if (props.show) {
        backDropClass = 'backdrop'
    }
    return (
        <div onClick={props.click} className={backDropClass} />

    )
};

export default BackDrop;
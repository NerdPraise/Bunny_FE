import React from "react";
import './tag.css';

const Tag = (props) => {
    let style = {
        backgroundColor: props.color
    }
    return (
        <div className="tag text-left d-flex justify-content-between" onClick={props.click} style={style}>
            <div className="" >
                {props.name}
            </div>
            <div className="icon" >
                <i className="pe-7s-pen" onClick={props.update} />
                <i className="pe-7s-trash ml-2" onClick={props.delete} />
            </div>

        </div>
    );
};
export default Tag;
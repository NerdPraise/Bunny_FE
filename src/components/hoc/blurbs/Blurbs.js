import React from "react";
import "./blurbs.css"

const Blurbs = (props) => {
    return (
        <div className='col-12 col-md-4 mt-4'>
            <div className="blurbs border px-3 text-center py-2">
                <div className="d-flex justify-content-between pb-2  border-b mb-4">
                    <h3>{props.title}</h3>
                    <i className={props.icon} />
                </div>
                {props.children}

            </div>
        </div>
    );
};
export default Blurbs;
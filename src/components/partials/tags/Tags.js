import React from "react";
import Tag from "./tag/Tag";

const Tags = (props) => {
    return (
        props.tags.map((tag, index) => {
            return (
                <div className="pb-2">
                    <Tag name={tag.description} color={props.color} key={tag.id}
                        update={() => props.update(tag.id)}
                        delete={() => props.delete(tag.id)} />
                </div>
            )
        })
    )
};

export default Tags;
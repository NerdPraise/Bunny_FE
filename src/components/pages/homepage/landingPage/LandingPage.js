import React, { useState, useEffect } from "react";
import Tags from '../../../partials/tags/Tags';
import Blurbs from '../../../hoc/blurbs/Blurbs';
import { getUserProfile, getUserToDO } from '../../../utils';


const LandingPage = (props) => {

    const [tags, setTags] = useState([])


    const data = JSON.parse(getUserProfile())
    let username = data.username
    let id = data.id

    const handleUpdate = (id) => {

    }


    useEffect(() => {

        getUserToDO(id).then(data => data.json()).then(data => {
            setTags(data)
        })
    }, [id, setTags])
    return (
        <div className='row'>
            <Blurbs title="DO" icon="<div>jdjd</div>">
                <Tags tags={tags} click={handleUpdate} color="#eb5d66" />
            </Blurbs>
            <Blurbs title="Done" icon="<div>jdjd</div>">
                <Tags tags={tags} click={handleUpdate} color=" rgb(99, 214, 99)" />
            </Blurbs>
            <Blurbs title="DO" click={handleUpdate} icon="<div>jdjd</div>">
                <Tags tags={tags} />
            </Blurbs>
        </div >
    );
};
export default LandingPage;
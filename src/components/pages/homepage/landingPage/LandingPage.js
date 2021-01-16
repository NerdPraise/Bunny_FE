import React, { useState, useEffect } from "react";
import Tags from '../../../partials/tags/Tags';
import Blurbs from '../../../hoc/blurbs/Blurbs';
import { getUserProfile, createNewtask, getUserToDO } from '../../../utils';
import PopUpModal from '../../../partials/popupmodal/PopUpModal';
import { getAllUsers, deleteUser, deleteTask, updateTask, updateUser } from '../../../utils';



const LandingPage = (props) => {
    const [showModal, setshowModal] = useState(false)
    const [popUpdData, setPopUpdData] = useState({
        heading: "",
        fInput: "",
        sInput: ""
    })
    const [tags, setTags] = useState([])


    const data = JSON.parse(getUserProfile())
    let username = data.username
    let id = data.id

    const handleUpdate = (id) => {

    }
    const handleModalShow = () => {
        setshowModal(!showModal)
    }

    const addTaskModalhandler = () => {
        setPopUpdData({
            heading: "Add new Task",
            fInput: "Description",
            onSumbit: addTaskhandler,
            iden: id
        })
        setshowModal(true)
    }

    const addTaskhandler = async (currentUserId, form_data) => {
        await createNewtask(currentUserId, form_data).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            let newTasks = [...tags, data]
            setTags(newTasks)
            setshowModal(false)

        })
    }
    const handleTaskUpdateModal = (task_id) => {
        setPopUpdData({
            heading: "Update Task",
            fInput: "Description",
            onSumbit: updateTaskAction,
            iden: task_id
        })
        setshowModal(true)
    }
    const updateTaskAction = async (task_id, data) => {
        await updateTask(task_id, data)
        const newTags = tags.slice(); //to copy the array
        for (let i of newTags) {
            if (i.id == task_id) {
                let newData = data.split("&")
                i['description'] = newData[0].split("=")[1]
                break;
            }
        }
        setTags(newTags)
        setshowModal(false)
    }
    const handleDeleteTask = async (task_id) => {
        await deleteTask(task_id)
        const newTags = tags.slice(); //to copy the array
        for (let i of newTags) {
            if (i.id == task_id) {
                let index = newTags.indexOf(i)
                newTags.splice(index, 1);
                break;
            }
        }
        setTags(newTags)
    }


    useEffect(() => {

        getUserToDO(id).then(data => data.json()).then(data => {
            setTags(data)
        })
    }, [id, setTags])
    return (
        <div className='row'>
            <PopUpModal show={showModal} heading={popUpdData.heading}
                hide={handleModalShow} fInput={popUpdData.fInput} sInput={popUpdData.sInput}
                submitAction={popUpdData.onSumbit} iden={popUpdData.iden} />
            <Blurbs title="DO" icon="pe-7s-star">
                <Tags tags={tags} click={handleUpdate} update={handleTaskUpdateModal}
                    delete={handleDeleteTask} color="#eb5d66" />
                <i onClick={addTaskModalhandler}> Add tasks</i>
            </Blurbs>
            <Blurbs title="Done" icon="<div>jdjd</div>">
                <Tags tags={tags} click={handleUpdate} update={handleTaskUpdateModal}
                    delete={handleDeleteTask} color=" rgb(99, 214, 99)" />
            </Blurbs>
            <Blurbs title="DO" click={handleUpdate} icon="<div>jdjd</div>">
            </Blurbs>
        </div >
    );
};
export default LandingPage;
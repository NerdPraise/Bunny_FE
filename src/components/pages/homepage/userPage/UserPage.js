import React, { useState, useEffect } from "react";
import Tag from '../../../partials/tags/tag/Tag';
import Tags from '../../../partials/tags/Tags';
import PopUpModal from '../../../partials/popupmodal/PopUpModal';
import Blurbs from '../../../hoc/blurbs/Blurbs';
import './userpage.css';
import { getAllUsers, getUserToDO, deleteUser, deleteTask, updateTask, updateUser } from '../../../utils';
import { createNewtask } from '../../../utils';


const UserPage = (props) => {
    const [users, setUsers] = useState([])
    const [userTask, setUserTask] = useState([])
    const [currentUserId, setCurrentUserId] = useState()
    const [showModal, setshowModal] = useState(false)
    const [popUpdData, setPopUpdData] = useState({
        heading: "",
        fInput: "",
        sInput: ""
    })
    useEffect(() => {

        getAllUsers().then(data => data.json()).then(data => {
            setUsers(data)
        })
    }, [setUsers]
    )

    const handleModalShow = () => {
        setshowModal(!showModal)
    }

    const handleUserTasks = async (id) => {
        getUserToDO(id).then(response => response.json()).then(data => {
            setUserTask(data)
            setCurrentUserId(id)
        })
    }
    const handleDeleteUser = async (user_id) => {
        await deleteUser(user_id)
        const new_users = users.slice(); //to copy the array
        for (let i of users) {
            if (i.id == user_id) {
                let index = new_users.indexOf(i)
                new_users.splice(index, 1);
                break;
            }
        }
        setUsers(new_users)
    }

    const handleDeleteTask = async (task_id) => {
        await deleteTask(task_id)
        const newUserTask = userTask.slice(); //to copy the array
        for (let i of users) {
            if (i.id == task_id) {
                let index = newUserTask.indexOf(i)
                newUserTask.splice(index, 1);
                break;
            }
        }
        setUserTask(newUserTask)
    }
    const handleUserUpdateModal = (user_id) => {
        setPopUpdData({
            heading: "Update User",
            fInput: "Username",
            sInput: "Password",
            onSumbit: updateUserAction,
            iden: user_id
        })
        setshowModal(true)
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
        const newUserTasks = userTask.slice(); //to copy the array
        for (let i of newUserTasks) {
            if (i.id == task_id) {
                let newData = data.split("&")
                i['description'] = newData[0].split("=")[1]
                break;
            }
        }
        setUsers(newUserTasks)
        setshowModal(false)
    }
    const updateUserAction = async (user_id, data) => {
        await updateUser(user_id, data)
        const newUsers = users.slice(); //to copy the array
        for (let i of newUsers) {
            if (i.id == user_id) {
                let newData = data.split("&")
                i['username'] = newData[0].split("=")[1]
                break;
            }
        }
        setUsers(newUsers)
        setshowModal(false)
    }
    const addTaskModalhandler = () => {
        setPopUpdData({
            heading: "Add new Task",
            fInput: "Description",
            onSumbit: addTaskhandler,
            iden: currentUserId
        })
        setshowModal(true)
    }

    const addTaskhandler = async (currentUserId, form_data) => {
        await createNewtask(currentUserId, form_data).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            let newTasks = [...userTask, data]
            setUserTask(newTasks)
            setshowModal(false)

        })
    }




    let userTaskList = <Tags tags={userTask} update={handleTaskUpdateModal}
        delete={handleDeleteTask} color="green" />

    return (
        <div className='row'>
            <PopUpModal show={showModal} heading={popUpdData.heading}
                hide={handleModalShow} fInput={popUpdData.fInput} sInput={popUpdData.sInput}
                submitAction={popUpdData.onSumbit} iden={popUpdData.iden} />
            <Blurbs title="USERS">
                <UserTag tags={users} update={handleUserUpdateModal} click={handleUserTasks} delete={handleDeleteUser} color="purple" />
            </Blurbs>
            <Blurbs title="USER TASK">
                {userTask.length ? userTaskList : <i className="text-secondary">Nothing to see, click on a user with task</i>}
                {userTask.length ? <i onClick={addTaskModalhandler}> Add tasks</i> : ''}
            </Blurbs>
        </div>

    );
};

const UserTag = (props) => {
    return (
        props.tags.map((tag, index) => {
            return (
                <div className="pb-2">
                    <Tag name={tag.username} color={props.color} key={tag.id}
                        click={() => props.click(tag.id)} delete={() => props.delete(tag.id)}
                        update={() => props.update(tag.id)} />
                </div>
            )
        })
    )
}
export default UserPage;
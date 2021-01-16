import React, { useState, useEffect } from "react";
import Tag from '../../../partials/tags/tag/Tag';
import Tags from '../../../partials/tags/Tags';
import Blurbs from '../../../hoc/blurbs/Blurbs';
import { getAllUsers, getUserToDO, deleteUser, deleteTask } from '../../../utils'


const UserPage = (props) => {
    const [users, setUsers] = useState([])
    const [userTask, setUserTask] = useState('')

    const handleUserTasks = async (id) => {
        getUserToDO(id).then(response => response.json()).then(data => {
            setUserTask(data)
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
    const handleUserUpdate = async (task_id) => {

    }

    let userTaskList = <Tags tags={userTask} delete={handleDeleteTask} color="green" />

    useEffect(() => {

        getAllUsers().then(data => data.json()).then(data => {
            setUsers(data)
        })
    }, [setUsers])


    return (
        <div className='row'>
            <Blurbs title="USERS">
                <UserTag tags={users} update={handleUserUpdate} click={handleUserTasks} delete={handleDeleteUser} color="purple" />
            </Blurbs>
            <Blurbs title="USER TASK">
                {userTask ? userTaskList : <i className="text-secondary">Nothing to see, click on a user</i>}
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
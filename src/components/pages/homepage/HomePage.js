import React, { useState, useEffect } from "react";
import SideNav from "../../partials/sidenav/SideNav";
import BackDrop from '../../partials/backdrop/BackDrop'
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../../router/protectedroute/ProtectedRoute';
import './homepage.css';
import { getUserProfile, getUserToDO } from '../../utils';
import LandingPage from './landingPage/LandingPage';
import UserPage from './userPage/UserPage';


const HomePage = (props) => {
    const [show, setShow] = useState(false)

    const [tags, setTags] = useState([])


    const data = JSON.parse(getUserProfile())
    let username = data.username
    let id = data.id


    useEffect(() => {

        getUserToDO(id).then(data => data.json()).then(data => {
            setTags(data)
        })
    }, [id, setTags])

    const handleNavbar = () => {
        setShow(!show)
    }

    return (
        <div className="bg-grey">
            <SideNav show={show} name={username} handleNavbar={handleNavbar} />
            <BackDrop show={show} click={handleNavbar} />

            <div className='site'>
                <div className="container">
                    <Switch>
                        <ProtectedRoute path='/user' exact component={UserPage} />
                        <ProtectedRoute path='/' exact component={LandingPage} />
                    </Switch>

                </div>
            </div>
        </div>


    );
};
export default HomePage;
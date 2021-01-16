import React from "react";
import './sidenav.css';
import { clearUserToken } from '../../utils';
import '../../../assets/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css';
import { useHistory, Link } from "react-router-dom";


const SideNav = (props) => {
    const history = useHistory();
    const redirect = (path) => {
        history.push(path);
    };

    const logOut = () => {
        clearUserToken()
        redirect('/login');
    }
    let navBarclasses = 'sideNav hide-nav text-center'
    if (props.show) {
        navBarclasses = 'sideNav show-nav text-center'
    }

    return (
        <div className={navBarclasses}>
            <div>
                <Link className='hamburger' href='#' onClick={props.handleNavbar}>☰</Link>
            </div>
            <div className="border-w mt-2"></div>

            <div className='mt-4'>
                <div className={!props.show ? 'px-1' : 'hide d-none'}>
                    <ul className="list-none text-light">
                        <li>
                            <Link to="/user">
                                <i className="pe-7s-users  text-light pe-s font-weight-bold" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i className="pe-7s-back-2 my-2 text-light pe-s font-weight-bold" />
                            </Link>
                        </li>
                        <li><i className="pe-7s-science my-2 text-light pe-s font-weight-bold" /></li>
                        <li><i className="pe-7s-graph my-2 text-light pe-s font-weight-bold" /></li>
                    </ul>

                </div>
                <div className={props.show ? 'mx-4' : 'hide d-none'}>
                    <ul className="sidehead text-light">
                        <li>
                            <Link to="/user">
                                <i className="pe-7s-users  text-light pe-s font-weight-bold" />
                                <span className="ml-4 h6 text-light">USERS</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i className="pe-7s-back-2  text-light pe-s font-weight-bold" />
                                <span className="ml-4 h6  text-light">BACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user">
                                <i className="pe-7s-science  text-light pe-s font-weight-bold" />
                                <span className="ml-4 h6  text-light">TEXT</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user" >
                                <i className="pe-7s-graph  text-light pe-s font-weight-bold" />
                                <span className="ml-4 h6  text-light">TEXT</span>
                            </Link>
                        </li>

                    </ul>
                    <h5>
                        <Link href="#" onClick={logOut}>Log out </Link>
                    </h5>
                </div>

            </div>



        </div>
    );
};
export default SideNav;
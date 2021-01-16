import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logInUser, getUserProfile, setUserToken } from '../../utils'


const Login = (props) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    // const history = useHistory();

    const redirect = (path) => {
        props.history.push(path);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {

            const token = await logInUser({
                username, password
            });
            if (!token.access) {
                setError(token.detail)
            } else {
                setUserToken(token)
                await getUserProfile()
                redirect('/')
            }
        } catch (e) {
            setError('Something wrong happened')

        }
    }


    return (
        <div className="container">
            <div className="col-12 col-md-6  mx-auto py-5">
                <div className="container">
                    <div className="row pt-5">
                        <div className="col mt-5 text-center" >
                            <div className="h6 text-muted pb-3 font-weight-light"
                            >
                                <p className='text-warning'> {error}</p>
                                Welcome back! Please login to your account.
                                </div>
                            <div className="mx-auto text-left col-md-7">
                                <form onSubmit={handleSubmit} >
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control border-top-0 rounded-0 border-right-0 border-left-0 mb-5"
                                            name="username" required onChange={e => setUsername(e.target.value)}
                                            placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" required onChange={e => setPassword(e.target.value)}
                                            className="form-control border-top-0 rounded-0 border-right-0 border-left-0 mb-5"
                                            placeholder="Password" />
                                    </div>
                                    <div className="d-flex justify-content-between" >
                                        <div className="form-group form-check mr-4">
                                            <input type="checkbox" className="form-check-input mt-2" id="exampleCheck1" />
                                            <label><small className="form-check-label">Remember me</small></label>
                                        </div>
                                        <div className="form-group form-check float-right">
                                            <small> <a className="form-check-label text-secondary" href="forgot.html">Forgot password?</a></small>
                                        </div>

                                    </div>
                                    <div className="d-flex justify-content-between pt-4">
                                        <button type="submit" className="btn btn-outline-secondary btn-light">Log in</button>
                                        <Link to='/register'
                                            className="btn btn-light btn-outline-secondary ">Sign Up</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>



    );
};
export default Login;
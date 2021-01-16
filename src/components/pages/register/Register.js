import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logInUser, registerUser, getUserProfile, setUserToken } from '../../utils'


const Register = (props) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [error, setError] = useState()
    // const history = useHistory();

    const redirect = (path) => {
        props.history.push(path);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const form = document.getElementById("SignUpForm");
        form.checkValidity()
        if (password != password2) {
            setError("Password is not the same")
            return
        }
        let formData = {
            username,
            password
        }
        try {
            let response = await registerUser(formData)
            if (!response.ok) {
                setError("Username already exists")
                return
            }
            const token = await logInUser({
                username,
                password
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
                    <div className="row ">
                        <div className="col mt-5 text-center" >
                            <div className="h6 text-muted pb-3 font-weight-light"
                            >
                                <h2> Welcome</h2>
                                <p className='text-warning'> {error}</p>
                               Register an account
                                </div>
                            <div className="mx-auto text-left col-md-7">
                                <form onSubmit={handleSubmit} id="SignUpForm">
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control border-top-0 rounded-0 border-right-0 border-left-0 mb-5"
                                            name="username" required onChange={e => setUsername(e.target.value)}
                                            placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" onChange={e => setPassword(e.target.value)} required
                                            className="form-control border-top-0 rounded-0 border-right-0 border-left-0 mb-5"
                                            placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" onChange={e => setPassword2(e.target.value)} required
                                            className="form-control border-top-0 rounded-0 border-right-0 border-left-0 mb-5"
                                            placeholder="Password again" />
                                    </div>

                                    <div className="d-flex justify-content-between pt-4">
                                        <Link to="/login" className="btn btn-outline-secondary btn-light">Log in</Link>
                                        <button type="submit" href="signup.html"
                                            className="btn btn-light btn-outline-secondary ">Sign Up</button>
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
export default Register;
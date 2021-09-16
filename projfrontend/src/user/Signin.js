import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import Base from "../core/base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    const [values, setValues] = useState({
        name: "",
        email: "tarushijauhari@gmail.com",
        password: "tannu",
        error: "",
        success: false,
        loading: false,
        didRedirect: false,
    });
    const { email, password, error, success, loading, didRedirect } =
        values;

    const handleChange = (name) =>
        (event) => {
            setValues({ ...values, error: false, [name]: event.target.value });
        };

    const onSumit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });

        signin({ email, password })
            .then((data) => {
                console.log("DATA", data);
                if (data.token) {
                    //let sessionToken = data.token;
                    authenticate(data, () => {
                        console.log("TOKKEN ADDED");
                        setValues({
                            ...values,
                            didRedirect: true,
                        });
                    });
                } else {
                    setValues({
                        ...values,
                        loading: false,
                        error: true
                    });
                    toast("Check Email Id or password again")
                }
            })
            .catch((e) => console.log(e));
    };

    const performRedirect = () => {
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        New account created successfully. Please <Link
                            to="/signin"
                        >
                            login now.
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            error && toast("Check Email Id or password again")
        );
    };

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={handleChange("email")}
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">password</label>
                            <input
                                name="password"
                                className="form-control"
                                value={password}
                                onChange={handleChange("password")}
                                type="password"
                            />
                        </div>
                        <center>
                            <button
                                onClick={onSumit}
                                className="btn btn-success btn-block mt-3"
                            >Login</button>
                        </center>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base>
            {signInForm()}
            <p className="text-center">{JSON.stringify(values)}</p>
            {performRedirect()}
            <ToastContainer />
        </Base>
    )
}

export default Signin

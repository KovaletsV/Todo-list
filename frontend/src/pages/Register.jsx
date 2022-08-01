import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
    // 1. Create our form
    const [formData, setFormData] = useState({
        // name: "",
        email: "",
        password: ""
        // password2: ""
    });

    //2. Destructing data
    const { email, password } = formData;

    //6. initialize navigate and dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //7. Destructing from authSlice
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        state => state.auth
    );

    //10.
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        // if isSuccess change from false to true or user was loged in and we bring a token
        if (isSuccess || user) {
            navigate("/");
        }
        // reset a state
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    //4. Changing control input
    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    //5. Submit the form
    const onSubmit = e => {
        e.preventDefault();

        //8. Create a user
        const userData = {
            email,
            password
        };
        //9.Dispatch register function and pass a new user
        dispatch(register(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        //3. Create section form
        <>
            <section className="heading">
                <h1>Register</h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    {/* <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                        />
                    </div> */}
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={onChange}
                        />
                    </div>
                    {/* <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Confirm password"
                            onChange={onChange}
                        />
                    </div> */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;

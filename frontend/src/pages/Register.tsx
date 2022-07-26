import { useState, useEffect, FC } from "react";
interface registerProps {}

const Register: FC<registerProps> = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { email, password } = formData;

    const onChange = (e: { target: any; preventDefault: () => void }) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    };
    return (
        <>
            <section className="heading">
                <h1>Register</h1>
                <p>Create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            value={email}
                            name="email"
                            id="email"
                            placeholder="enter your email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            value={password}
                            name="password"
                            id="password"
                            placeholder="enter your password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;

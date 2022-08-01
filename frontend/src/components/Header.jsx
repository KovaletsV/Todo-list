import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout, reset } from "../features/auth/authSlice";

function Header() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const { user } = useSelector(state => state.auth);

    // const onLogout = () => {
    //     // dispatch(logout());
    //     // dispatch(reset());
    //     navigate("/");
    // };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Todo list</Link>
            </div>
            <ul>
                <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </>
            </ul>
        </header>
    );
}

export default Header;

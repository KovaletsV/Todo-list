
import { Link } from "react-router-dom";

const Header = () => {

 
    return (
        <div className="header">
            <div className="logo">
                <Link to="/">Business list</Link>
            </div>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;

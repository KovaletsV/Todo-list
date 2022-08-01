import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TodoForm from "../components/TodoForm";

function Dashboard() {
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <>
            <section className="heading">
                <h1>Welcome</h1>
                <p>Todo Dashboard</p>
            </section>

            <TodoForm />

            <section className="content"></section>
        </>
    );
}

export default Dashboard;

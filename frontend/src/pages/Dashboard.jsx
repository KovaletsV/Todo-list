import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TodoForm from "../components/TodoForm";
// import GoalItem from '../components/GoalItem'
import Spinner from "../components/Spinner";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    //   const { goals, isLoading, isError, message } = useSelector(
    //     (state) => state.goals
    //   )

    useEffect(() => {
        // if (isError) {
        //   console.log(message)
        // }

        if (!user) {
            navigate("/login");
        }

        // dispatch(getGoals())

        // return () => {
        //   dispatch(reset())
        // }
    }, [user, navigate]);

    // if (isLoading) {
    //     return <Spinner />;
    // }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Todo Dashboard</p>
            </section>

            <TodoForm />

            {/* <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section> */}
        </>
    );
}

export default Dashboard;

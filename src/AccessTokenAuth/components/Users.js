import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/get', {
                    signal: controller.signal
                });
                const usernames=response.data.map(user => user.userName)
                console.log("get api user names:"+usernames);
               // isMounted && setUsers(usernames);
               console.log("get api response:"+response);
               console.log("get api response.data:"+response.data);
               isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ol>
                        {/* {users.map((user, i) => <li key={i}>{user}</li>)} */}
                       {users.map((user, i) => <li key={i}>{user?.username}  {user.roles}</li>)}
                    </ol>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;
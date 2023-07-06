import axios from "axios";

const PORT = 3000;
const HOST = "44.195.229.139" //"localhost"

const readTodos = async () => {
    const userId = localStorage.getItem('userId');
    try {
        const res = await axios.get(`http://${HOST}:${PORT}/todos`, {
            params: {
                userId: userId
            }
        });
        console.log("res.data", res.data);

        return res.data;

    } catch (error) {
        console.error("error:", error.message);
        return null
    }

}

const createTodo = async (name) => {
    const userId = localStorage.getItem('userId');
    let res = await axios.post(
        `http://${HOST}:${PORT}/todos`,
        {
            'name': name,
            'userId': userId
        }
    );

    return res.data;
}

const doneTodo = async (id) => {
    let res = await axios.put(
        `http://${HOST}:${PORT}/todos/${id}/done`
    );

    return res.data;
}

const undoneTodo = async (id) => {
    let res = await axios.delete(
        `http://${HOST}:${PORT}/todos/${id}/done`
    );

    return res.data;
}

const registerUser = async (username, password) => {
    let res = await axios.post(
        `http://${HOST}:${PORT}/users/register`,
        {
            'username': username,
            'password': password
        }
    );

    return res.data;
}

const loginUser = async (username, password) => {
    try {
        let res = await axios.post(
            `http://${HOST}:${PORT}/users/login`,
            {
                'username': username,
                'password': password
            }
        );

        return res.data;
    } catch (error) {
        console.error(error.message);
        return null;

    }

}

export {
    readTodos,
    createTodo,
    doneTodo,
    undoneTodo,
    registerUser,
    loginUser
}

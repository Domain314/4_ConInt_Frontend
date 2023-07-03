import axios from "axios";

const PORT = 3000;

const readTodos = async () => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    let res = await axios.get(`http://localhost:${PORT}/todos`, {
        params: {
            userId: userId
        }
    });

    return res.data;
}


const createTodo = async (name) => {
    let res = await axios.post(
        `http://localhost:${PORT}/todos`,
        {
            'name': name,
            'userId': 1
        }
    );

    return res.data;
}

const doneTodo = async (id) => {
    let res = await axios.put(
        `http://localhost:${PORT}/todos/${id}/done`
    );

    return res.data;
}

const undoneTodo = async (id) => {
    let res = await axios.delete(
        `http://localhost:${PORT}/todos/${id}/done`
    );

    return res.data;
}

const registerUser = async (username, password) => {
    let res = await axios.post(
        `http://localhost:${PORT}/users/register`,
        {
            'username': username,
            'password': password
        }
    );

    return res.data;
}

const loginUser = async (username, password) => {
    let res = await axios.post(
        `http://localhost:${PORT}/users/login`,
        {
            'username': username,
            'password': password
        }
    );

    return res.data;
}

export {
    readTodos,
    createTodo,
    doneTodo,
    undoneTodo,
    registerUser,
    loginUser
}

<template>
    <h2>Login</h2>
    <button type="button" @click="goToRegister">Go to Register</button>
    <form @submit.prevent="onSubmit">
        <label for="username">Username:</label>
        <input v-model="username" id="username" required>

        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required>

        <button class='submit' type="submit">Login</button>
    </form>
</template>
  
<script>
import { loginUser } from "@/api";
export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        async onSubmit() {
            const user = await loginUser(this.username, this.password);
            if (user === null) {
                alert('Wrong password');
                return;
            }
            localStorage.setItem('userId', user.id); // Save userId to localStorage
            this.$router.push(`/todos`);
        },
        goToRegister() {
            this.$router.push('/register');
        }
    }
}
</script>

<style scoped>
h2 {
    width: 100%;
    text-align: center;
    margin-bottom: 4rem;

    text-decoration: underline;

    color: #eeeeee;
}

form {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

input {
    width: 400px;
    padding: 10px 20px;
    margin: 10px;

    border: 1px solid grey;
    border-radius: 20px;

    background-color: #282828;
    color: #eeeeee;
    transition: background-color 0.2s;
}

input:hover {
    background-color: #2c3e50;
}

button {
    padding: 10px 20px;
    margin: 10px;

    border: 1px solid grey;
    border-radius: 20px;

    background-color: #282828;
    color: #eeeeee;
}

.submit {
    color: rgb(0, 128, 0);
}

.submit:hover {
    color: rgb(1, 151, 1);
    background-color: #3f3f3f;
}
</style>


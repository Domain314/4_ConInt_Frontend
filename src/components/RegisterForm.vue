<template>
    <h2 v-if="userGroup === 'A'">Register for A</h2>
    <h2 v-else-if="userGroup === 'B'">Register for B</h2>
    <button type="button" @click="goToLogin">Go to Login</button>
    <form @submit.prevent="onSubmit">
        <label for="username">Username:</label>
        <input v-model="username" id="username" required>

        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required>

        <button v-if="userGroup === 'A'" class='submit-a' type="submit">Register for A</button>
        <button v-else-if="userGroup === 'B'" class='submit-b' type="submit">Register for B</button>
    </form>
</template>

  
<script>
import { registerUser } from "@/api";
export default {
    data() {
        return {
            username: "",
            password: "",
            userGroup: null  // Group A or B
        }
    },
    methods: {
        async onSubmit() {
            const user = await registerUser(this.username, this.password);
            localStorage.setItem('userId', user.id); // Save userId to localStorage
            this.$router.push(`/todos`);
        },
        goToLogin() {
            this.$router.push('/login');
        }
    },
    created() {
        this.userGroup = Math.random() < 0.5 ? 'A' : 'B';
    },
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

.submit-a {
    color: rgb(0, 128, 0);
}

.submit-a:hover {
    color: rgb(1, 151, 1);
    background-color: #3f3f3f;
}

.submit-b {
    color: rgb(124, 0, 128);
}

.submit-b:hover {
    color: rgb(133, 1, 151);
    background-color: #eeeeee;
}
</style>


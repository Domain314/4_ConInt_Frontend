<template>
  <div>
    <button type="button" @click="logout">Logout</button>
  </div>

  <ul>
    <li>
      <TodoInput @new-todo="post" />
    </li>
    <li v-for="(todo, i) in todos">
      <Todo :todo="todo" @done="done" @undone="undone" />
    </li>
  </ul>

  <div>
    <button type="button" @click="sort" v-if="config.features.sortButton">Sort</button>
  </div>
</template>

<script>
import Todo from "@/components/Todo.vue";
import TodoInput from "@/components/TodoInput.vue";
import { createTodo, doneTodo, readTodos, undoneTodo } from "@/api";
import config from "../config";

const userID = { id: null }

function checkUserID(userID) {
  userID.id = localStorage.getItem('userId');
  return userID.id === null;
}

export default {
  name: "TodoList",
  components: { TodoInput, Todo },
  data() {
    return {
      todos: [],
      config: config
    }
  },
  methods: {
    async getAll() {
      if (checkUserID(userID)) {
        this.$router.push(`/register`);
        return;
      }
      this.todos = await readTodos(userID);
      if (this.todos === null) {
        this.$router.push(`/register`);
        return;
      }
      console.log(this.todos);

    },
    async post(name) {
      var todo = await createTodo(name);
      this.todos.push(todo);
    },
    async done(id) {
      var todo = await doneTodo(id);
      this.update(id, todo);
    },
    async undone(id) {
      var todo = await undoneTodo(id);
      this.update(id, todo);
    },
    update(id, todo) {
      this.todos.forEach((value, i) => {
        if (value.id === id) {
          this.todos[i] = todo;
        }
      });
    },
    logout() {
      localStorage.removeItem('userId');
      this.$router.push('/login');
    },
    sort() {
      const tomorrow = (date) => {
        const tom = new Date(date);
        tom.setDate(tom.getDate() + 1);
        return tom.toISOString().split('T')[0];
      }

      const today = () => {
        return new Date().toISOString().split('T')[0];
      }

      this.todos.forEach((todo) => {
        if (!todo.done) {
          todo.date = tomorrow(new Date());
        }
      });

      // Sort todos by date.
      this.todos.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }
  },
  created() {
    this.getAll();
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}

div {
  width: 100%;
  display: flex;
}

button {
  padding: 10px 20px;
  margin: 10px;
  margin-left: auto;

  border: 1px solid grey;
  border-radius: 20px;

  background-color: #282828;
  color: rgb(153, 0, 0);
}

button:hover {
  color: rgb(221, 0, 0);
  background-color: #3f3f3f;
}
</style>
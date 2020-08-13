<template>
  <div>

    <Register 
      v-if="page === 'register'"
      @register-submited="register"
      @change-page="changePage"
    ></Register>

    <Login 
      v-else-if="page === 'login'"
      @login-submited="login"
      @change-page="changePage"
    ></Login>

    <Dashboard 
      v-else-if="page === 'dashboard'"
      @logout="logout"
      @delete-task="deleteTask"
      @edit-data="edited"
      @type="type"
      :tasks="tasks"
      :categoriesData="categoriesData"
    ></Dashboard>

    <!-- add task -->
    <addTask
      @add-task="addTask"
      :category="category"
      :code="code"
    ></addTask>

    <!-- edit task -->
    <editTask
      :editData="editData"
      :category="category"
      @edit-task="editTask"
    ></editTask>

  </div>
</template>

<script>
import axios from './config/axios'
import Register from './views/Register'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import addTask from './components/addTask'
import editTask from './components/editTask'

export default {
  name: 'App',
  data() {
    return {
      page: 'login',
      tasks: [],
      editData: {},
      editedId: '',
      category: '',
      code: '',
      categoriesData: [
        {
          title: 'Backlog',
          bg: 'backlog',
          color: '#e84a5f',
          code: 'red'
        },
        {
          title: 'Todo',
          bg: 'todo',
          color: '#ff847c',
          code: 'org'
        },
        {
          title: 'Doing',
          bg: 'doing',
          color: '#feceab',
          code: 'crm'
        },
        {
          title: 'Done',
          bg: 'done',
          color: '#99b898',
          code: 'grn'
        }
      ]
    }
  },
  components: {
    Register, Login, Dashboard, addTask, editTask
  },
  methods: {
    checkAuth() {
      if (localStorage.access_token) {
        this.page = 'dashboard'
        this.fetchTasks()
      }
      else this.page = 'login'
    },
    changePage(page) {
      this.page = page
    },
    type(name) {
      this.category = name
      this.categoriesData.forEach(element => {
        if (element.title == name) this.code = element.code
      });
    },
    login(payload) {
      console.log(payload, '+++++++++++++payload');
      axios({
        url: '/users/login',
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data, '+++++ data login');
          localStorage.setItem('access_token', data.token)
          this.checkAuth()
        })
        .catch(err => {
          console.log(err, '+++++ error login');
        })
    },
    register(payload) {
      console.log(payload, '+++++++++++++payload');
      axios({
        url: '/users/register',
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data, '+++++ data register');
          this.page = 'login'
        })
        .catch(err => {
          console.log(err, '+++++ error register');
        })
    },
    logout() {
      localStorage.clear()
      this.checkAuth()
    },
    fetchTasks() {
      axios({
        url: '/tasks',
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data.tasks);
          this.tasks = data.tasks
        })
        .catch(err => {
          console.log(err, '+++++ error fetch');
        })

    },
    addTask(data) {
      axios({
        url: '/tasks',
        method: 'post',
        data: {
          title: data.title,
          description: data.description,
          category: data.category
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          console.log(data);
          this.title = ''
          this.description = ''
          this.checkAuth()
        })
        .catch(err => {
          console.log(err);
        })
    },
    editTask(data) {
      axios({
        url: `/tasks/${this.editedId}`,
        method: 'put',
        data: {
          title: data.title,
          description: data.description,
          category: data.category
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          console.log(data);
          this.title = ''
          this.description = ''
          this.checkAuth()
        })
        .catch(err => {
          console.log(err);
        })
    },
    edited(id) {
      this.tasks.forEach(element => {
        if (element.id == id) {
          this.editData = element
          this.editedId = id
        }
      });
    },
    deleteTask(id) {
      axios({
        url: `/tasks/${id}`,
        method: 'delete',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          this.checkAuth()
        })
        .catch(err => {
          console.log(err, '+++++ error delete');
        })
    }
  },
  created() {
    this.checkAuth()
  }
}
</script>

<style>

</style>
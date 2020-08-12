const host = 'http://localhost:3000'


var app = new Vue ({
  el: '#app',
  data: {
    page: 'login',
    email: '',
    password: '',
    title: '',
    description: '',
    category: '',
    tasks: []
  },
  methods: {
    login() {
      // console.log(this.email);
      // console.log(this.password);
      axios({
        method: 'post',
        url: `${host}/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) => {
          // console.log({data}, 'ini data login');
          localStorage.setItem('access_token', data.token)
          this.checkAuth()
        })
        .catch(err => {
          console.log(err, '>>>>>>>>> err login');
        })
    },
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("id_token",id_token);
      $.ajax({
        method:'post',
        url:`${host}/users/googlelogin`,
        data:{token:id_token},
        success: function(response){
        //console.log(response.data);
        localStorage.setItem('access_token', response.access_token);
        //console.log(localStorage.getItem('access_token'));
        }
      })
    },
    register() {
      axios({
        method: 'post',
        url: `${host}/users/register`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) => {
          console.log({data}, 'ini data register');
          this.page = 'login'
        })
        .catch(err => {
          console.log(err, '>>>>>>>>> err login');
        })
    },
    logout() {
      // console.log("ini token", localStorage.getItem('access_token'));
      // var auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function () {
      //   console.log('User signed out.');
      // });
      localStorage.clear()
      this.checkAuth()
    },
    checkAuth() {
      if (localStorage.access_token) {
        this.page = 'dashboard'
        this.fetchTasks()
      }
      else this.page = 'login'
    },
    fetchTasks() {
      axios({
        method: 'get',
        url: `${host}/tasks`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({data}) => {
          console.log(data);
          this.tasks = data.tasks
        })
        .catch(err => {
          console.log(err);
        })
    },
    addTaskBl() {
      axios({
        method: 'post',
        url: `${host}/tasks`,
        data: {
          title: this.title,
          description: this.description,
          category: 'Backlog'
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({data}) => {
          console.log({data}, 'ini data add task');
          this.checkAuth()
        })
        .catch(err => {
          console.log(err, '>>>>>>>>> err add task');
        })
    },
    editTask(id) {
      axios({
        method: 'put',
        url: `${host}/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({data}) => {
          console.log({data}, 'ini data edit');
        })
        .catch(err => {
          console.log(err, '>>>>>>>>> err login');
        })
    },
    deleteTask(id) {
      axios({
        method: 'delete',
        url: `${host}/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({data}) => {
          console.log({data}, 'ini data delete');
        })
        .catch(err => {
          console.log(err, '>>>>>>>>> err login');
        })
    }
  },
  created() {
    this.checkAuth()
  }
})



// function 

function signOut() {
  console.log("ini token", localStorage.getItem('access_token'));
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem('access_token');
  console.log("ini token", localStorage.getItem('access_token'));
}
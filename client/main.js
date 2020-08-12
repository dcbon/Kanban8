const host = 'http://localhost:3000'


var app = new Vue ({
  el: '#app',
  data: {
    page: 'login',
    email: '',
    password: ''
  },
  methods: {
    login() {
      console.log(this.email);
      console.log(this.password);
      axios({
        method: 'post',
        url: `${host}/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) => {
          console.log({data}, 'ini data login');
          localStorage.setItem('access_token', data.token)
          checkAuth()
        })
        .catch(err => {
          console.log(err, '>>>>>>>>> err login');
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
        })
        .catch(err => {
          console.log(err, '>>>>>>>>> err login');
        })
    },
    checkAuth() {
      if (localStorage.access_token) this.page = 'dashboard'
      else this.page = 'login'
    }
  },
  created() {
    this.checkAuth()
  }
})



function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("id_token",id_token);
  $.ajax({
    method:'POST',
    url:`${host}/users/googlelogin`,
    data:{token:id_token},
    success: function(response){
    //console.log(response.data);
    localStorage.setItem('access_token', response.access_token);
    //console.log(localStorage.getItem('access_token'));
    }
  })
}

function signOut() {
  console.log("ini token", localStorage.getItem('access_token'));
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem('access_token');
  console.log("ini token", localStorage.getItem('access_token'));
}
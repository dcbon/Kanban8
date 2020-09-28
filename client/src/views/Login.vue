<template>
    <!-- login -->
    <section  class="container" id="login-page">
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-8 justify-content-around">
          <div class="card p-3 my-2 shadow">
            <div class="card-body">
              <img src="../assets/people.svg" alt="" class="card-img-top">
              <h2 class="card-title text-center txt-red p-2">KANBAN8
                <br>
                <span>
                  <h4 class="text-muted text-center">Login</h4>
                </span>
              </h2>
              <form id="login-form" @submit.prevent="login">
                <div class="mb-3">
                  <input 
                    type="email" 
                    class="form-control" 
                    id="login-email" 
                    placeholder="Email address"
                    v-model="email"
                  >
                </div>
                <div class="mb-3">
                  <input 
                    type="password" 
                    class="form-control" 
                    id="login-password" 
                    placeholder="Password"
                    v-model="password"
                  >
                </div>
                <button type="submit" class="btn btn-red btn-block mb-1 text-light">Sign In</button>
              </form>
              <GoogleLogin 
                :params="params"
                :onSuccess="onSuccess" 
                :onFailure="onFailure"
                data-longtitle="true"
                class="btn btn-red btn-block mb-1 text-light"
              >
                Sign in with Google <span class="fab fa-google"></span>
              </GoogleLogin>
              <small id="emailHelp" class="form-text text-muted">Don't have an account? <a class="txt-red" @click.prevent="changePage">Register here.</a></small>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
  name: 'Login',
  components: {
    GoogleLogin
  },
  data() {
    return {
      email: '',
      password: '',
      params: {
        client_id: "42747508098-bq2vi9qvikaqiqjdd6pl0qjouh1ctkek.apps.googleusercontent.com"
      },
      renderParams: {
        width: 287,
        height: 38,
        longtitle: true
      }
    }
  },
  methods: {
    login() {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$emit('login-submited', payload)
    },
    changePage() {
      let page = 'register'
      this.$emit('change-page', page)
    },
    onSuccess(googleUser) {
      let profile = googleUser.getBasicProfile()
      let id_token = googleUser.getAuthResponse().id_token;
      let data = {
        'id_token': id_token,
        'email': profile.getEmail()
      }
      // console.log(data, '+++++++data dari login page');
      this.$emit('glogin', data)
    },
    onFailure() {
      console.error('error sign in with google');
    }
  }
}
</script>

<style>

</style>
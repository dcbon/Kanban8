<template>
    <!-- login -->
    <section  class="container" id="login-page">
      <div class="row justify-content-center">
        <div class="col-4 justify-content-around">
          <div class="card p-3 mt-4 shadow">
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
              <div class="g-signin2" data-onsuccess="onSignIn" data-width="287" data-height="38" data-longtitle="true"></div>
              <small id="emailHelp" class="form-text text-muted">Didn't have an account? <a class="txt-red" @click.prevent="changePage">Register here.</a></small>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
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
    }
  }
}
</script>

<style>

</style>
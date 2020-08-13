<template>
    <!-- register -->
    <section class="container" id="register-page">
      <div class="row justify-content-center">
        <div class="col-4 justify-content-around">
          <div class="card p-3 mt-4 shadow">
            <div class="card-body">
              <img src="../assets/people.svg" alt="" class="card-img-top">
              <h2 class="card-title text-center txt-red p-2">KANBAN8
                <br>
                <span>
                  <h4 class="text-muted text-center">Register</h4>
                </span>
              </h2>
              <form id="register-form" @submit.prevent="register">
                <div class="mb-3">
                  <input 
                    type="email" 
                    class="form-control" 
                    id="register-email" 
                    placeholder="Email address"
                    v-model="email"
                  >
                </div>
                <div class="mb-3">
                  <input 
                    type="password" 
                    class="form-control" 
                    id="register-password" 
                    placeholder="Password"
                    v-model="password"
                  >
                </div>
                <button type="submit" class="btn btn-red btn-block mb-1 text-light">Sign Up</button>
                <small id="emailHelp" class="form-text text-muted">Already have an account? <a href="" @click.prevent="changePage">Login here.</a></small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$emit('register-submited', payload)
    },
    changePage() {
      let page = 'login'
      this.$emit('change-page', page)
    }
  }
}
</script>

<style>

</style>
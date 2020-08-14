<template>  
    <!-- dashboard -->
    <section class="container" id="dashboard">
      <div class="row mt-5">
        <div class="text-c-1">
          <h1 class="p-3"><b>Kanban Board</b>
            <span class="float-right">
              <button class="btn btn-red text-light" type="submit" @click.prevent="logout" >Sign Out</button>
            </span>
          </h1>
          <h4 class="border-btm p-3">August 2020
            <span class="float-right">
              {{ user }}
              <img class="img-fluid avt" 
              :src="`https://avatars.dicebear.com/api/human/${user.split('@')[0] || 'user'}.svg`" 
              alt="">
            </span>
          </h4>
        </div>
        <!-- category -->
        <Categories
          v-for="(category, i) in categoriesData"
          :key='i'
          :category="category"
          :task="tasks"
          v-on="$listeners"
        ></Categories>
      </div>
    </section>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import Categories from '../components/Categories'
export default {
  name: 'Dashboard',
  data() {
    return {
      params: {
        client_id: "42747508098-bq2vi9qvikaqiqjdd6pl0qjouh1ctkek.apps.googleusercontent.com"
      }
    }
  },
  props: ['tasks', 'categoriesData', 'user'],
  components: {
    Categories, GoogleLogin
  },
  methods: {
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style>

</style>
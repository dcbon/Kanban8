<template>  
    <!-- dashboard -->
    <section class="container" id="dashboard">
      <div class="row mt-5">
        <div class="text-c-1">
          <h1 class="p-3"><b>Kanban Board</b>
            <span class="float-right">
              <button class="btn btn-red text-light" type="submit" @click="logout">Sign Out</button>
            </span>
          </h1>
          <h5 class="border-btm p-3">August 2020</h5>
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
import Categories from '../components/Categories'
export default {
  name: 'Dashboard',
  props: ['tasks', 'categoriesData'],
  components: {
    Categories
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
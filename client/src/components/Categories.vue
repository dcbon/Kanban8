<template>
  <div class="col-3">
    <div class="justify-content-between">
      <h5 
        class="badge bg-secondary"
        :class="`${category.bg}`"
      >{{ category.title }}
        <span class="badge bg-secondary">{{ filteredTask.length }}</span>
      </h5>
      <span>
        <a 
          href="" 
          class="btn float-right far fa-plus mr-2"
          :class="`txt-${category.code}`"
          data-toggle="modal" 
          data-target="#addModal"
          @click="type(`${category.title}`)"
        >
        </a>
      </span>
    </div>
    <!-- task list -->
    <div class="mt-2 overflow-auto">
      <TaskList
        v-for="tasks in filteredTask"
        :key="tasks.id"
        :task="tasks"
        :category="category"
        v-on="$listeners"
      ></TaskList>
    </div>
  </div>
</template>

<script>
import TaskList from './TaskList'
export default {
  name: 'Categories',
  props: ['category', 'task'],
  components: {
    TaskList
  },
  methods: {
    type(name) {
      this.$emit('type', name)
    }
  },
  computed: {
    filteredTask() {
      return this.task.filter(el => el.category == this.category.title)
    }
  }
}
</script>

<style>

</style>
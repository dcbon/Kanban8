<template>
  <div class="col-lg-3 col-md-12">
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
          @click.prevent="type(`${category.title}`)"
        >
        </a>
      </span>
    </div>
    <!-- task list -->
    <div class="mt-2 overflow-auto">
      <draggable :list="filteredTask" group="task" :move="onMove" :category="category" @end="updated">
        <TaskList
          v-for="tasks in filteredTask"
          :key="tasks.id"
          :task="tasks"
          :category="category"
          v-on="$listeners"
          :id="tasks.id"
        ></TaskList>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TaskList from './TaskList'
export default {
  name: 'Categories',
  data() {
    return {
      updateId: null,
      updateTitle: null,
      updateDesc: null,
      updateCategory: null
    }
  },
  props: ['category', 'task'],
  components: {
    TaskList, draggable
  },
  methods: {
    type(name) {
      this.$emit('type', name)
    },
    onMove(ev) {
      // console.log(ev.draggedContext.element.id);
      // console.log(ev.relatedContext.element.category);
      this.updateId = ev.draggedContext.element.id
      this.updateTitle = ev.draggedContext.element.title,
      this.updateDesc = ev.draggedContext.element.description,
      this.updateCategory = ev.relatedContext.element.category
      // console.log(ev, '++++++++=ini ev');
    },
    updated() {
      let data = {
        id: this.updateId,
        title: this.updateTitle,
        description: this.updateDesc,
        category: this.updateCategory
      }
      this.$emit('dragged', data)
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
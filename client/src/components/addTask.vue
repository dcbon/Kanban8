<template>
  <section class="container" id="addForm">
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="BackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content p-2">
          <div class="modal-header">
            <h5 class="modal-title" :class="`txt-${code}`" id="BackdropLabel">Add Task to {{category}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form id="add-form" @submit.prevent="addTask">
            <div class="modal-body">
              <div class="mb-3">
                <label for="add-title" class="form-label">Title</label>
                <input type="text" class="form-control" id="add-title" v-model="title">
              </div>
              <div class="mb-3">
                <label for="add-desc" class="form-label">Description</label>
                <textarea class="form-control" id="add-desc" cols="30" rows="8" v-model="description"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn text-light" :class="`btn-${code}`">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'addTask',
  props: ['category', 'code'],
  data() {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    addTask() {
      let data = {
        title: this.title,
        description: this.description,
        category: this.category
      }
      this.$emit('add-task', data)
      this.title = ''
      this.description = ''
    }
  }
}
</script>

<style>

</style>
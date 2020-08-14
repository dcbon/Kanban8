<template>
  <section class="container" id="editForm">
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="BackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content p-2">
          <div class="modal-header">
            <h5 class="modal-title" :class="`txt-${code}`" id="BackdropLabel">Edit Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form id="edit-form" @submit.prevent="editTask">
            <div class="modal-body">
              <div class="mb-3">
                <label for="edit-title" class="form-label">Title</label>
                <input type="text" class="form-control" id="edit-title" v-model="title">
              </div>
              <div class="mb-3">
                <label for="edit-category" class="form-label">Category</label>
                <select class="custom-select form-control" id="edit-category" v-model="category">
                  <option selected disabled>Choose</option>
                  <option>Backlog</option>
                  <option>Todo</option>
                  <option>Doing</option>
                  <option>Done</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="edit-desc" class="form-label">Description</label>
                <textarea class="form-control" id="edit-desc" cols="30" rows="8" v-model="description"></textarea>
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
  name: 'editTask',
  data() {
    return {
      title: '',
      category: '',
      description: ''
    }
  },
  props: ['editData', 'code'],
  methods: {
    editTask() {
      let data = {
        title: this.title,
        description: this.description,
        category: this.category
      }
      console.log(data);
      this.$emit('edit-task', data)
    }
  },
  watch: {
    editData() {
        this.title = this.editData.title
        this.category = this.editData.category
        this.description = this.editData.description
    }
  }
}
</script>

<style>

</style>
<template>
  <section class="container" id="editForm">
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content p-2">
          <div class="modal-header">
            <h5 class="modal-title txt-red" id="staticBackdropLabel">Edit Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form id="edit-form" @submit.prevent="editTask">
            <div class="modal-body">
              <div class="mb-3">
                <label for="edit-title" class="form-label">Title</label>
                <input type="text" class="form-control" id="edit-title">{{ editData.title }}
              </div>
              <div class="mb-3">
                <label for="edit-desc" class="form-label">Description</label>
                <textarea class="form-control" id="edit-desc" cols="30" rows="8"></textarea>{{ editData.description}}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-red text-light">Submit</button>
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
  props: ['editData', 'category'],
  data() {
    return {
      title: 'Title',
      description: 'Description'
    }
  },
  methods: {
    editTask() {
      let data = {
        title: this.title,
        description: this.description,
        category: this.category
      }
      this.$emit('edit-data', data)
    }
  }
}
</script>

<style>

</style>
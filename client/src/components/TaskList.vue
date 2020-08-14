<template>
  <div class="card mb-3 shadow m-1">
    <div class="card-body">
      <div class="dropdown">
        <a class="bg-custom fas fa-ellipsis-v float-right btn" role="button" id="menu" data-toggle="dropdown" aria-expanded="false"></a>
        <ul class="dropdown-menu" aria-labelledby="menu">
          <li><a class="dropdown-item" href="#" 
              @click.prevent="editTask(`${task.id}`)"
              data-toggle="modal" 
              data-target="#editModal">
            <span class="fas fa-edit mr-2" ></span>Edit
          </a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="deleteTask(`${task.id}`)"><span class="fas fa-trash mr-2"></span>Remove</a></li>
        </ul>
      </div>
      <h5 class="card-title" :class="`txt-${category.code}`">{{ task.title }}</h5>
      <p class="card-text">{{ task.description }}</p>
      <div class="justify-content-around profile">
        <img class="img-fluid avt float-left p-1" :src="`https://avatars.dicebear.com/api/human/${task.User.email.split('@')[0]}.svg`" alt="">
        <small class="bg-custom float-left text-muted ml-1">
          {{task.User.email}} <br>
          {{task.User.organization}}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: ['task', 'category'],
  methods: {
    deleteTask(id) {
      this.$emit('delete-task', id)
    },
    editTask(id) {
      this.$emit('edit-data', id)
    }
  }
}
</script>

<style>

</style>
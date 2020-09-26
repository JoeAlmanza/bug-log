<template>
  <div class="note-component row justify-content-center">
    <div class="col-12 d-flex mb-2 justify-content-baseline">
      <div class="card">
        <div class="card-body">
          <p class="m-0"><u class="text-info">{{noteProp.creatorEmail}}</u>: {{noteProp.content}} <i class="fa fa-times-circle-o" aria-hidden="" @click="deleteNote" v-if="noteProp.creatorEmail == this.$auth.userInfo.name"></i>  <i
            class="fa fa-pencil"
            aria-hidden="true"
            @click="editToggle = !editToggle"
            v-if="noteProp.creatorEmail == this.$auth.userInfo.name"
          ></i></p>
          <form class="form d-flex flex-column align-items-center" @submit.prevent="editNote" v-if="editToggle">
          <div class="col-6 d-flex justify-content-center">
          <input
            type="text"
            class="form-control my-1"
            placeholder="Edit Note..."
            aria-describedby="helpId"
            v-model="noteData.content"
          />
          </div>
          <button type="submit" class="btn btn-primary">Post</button>
        </form>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'note-component',
  props: ["noteProp"],
  data(){
    return {
      noteData: {},
      editToggle: false,
    }
  },
  computed:{
  },
  methods:{
    editNote(){
      this.noteData.id = this.noteProp.id;
      this.$store.dispatch("editNote", this.noteData)
      this.noteData = {}
      this.editToggle = false
    },
    deleteNote(){
      this.$store.dispatch("deleteNote", this.noteProp)
    },
  },
  components:{}
}
</script>


<style scoped>

</style>
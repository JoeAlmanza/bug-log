<template>
    <div class="col-11 card d-flex mb-2 justify-content-baseline bg-dark">
        <div class="card-body noteCard text-left">
          <p class="my-2 mx-2"><i class="fa fa-times-circle-o text-danger pointer" aria-hidden="" @click="deleteNote" v-if="noteProp.creatorEmail == this.$auth.userInfo.name"></i>  <i
            class="fa fa-pencil text-primary pointer"
            aria-hidden="true"
            @click="editToggle = !editToggle"
            v-if="noteProp.creatorEmail == this.$auth.userInfo.name"
          ></i> <u class="text-info">{{noteProp.creatorEmail}}:</u> <span class="text-warning"> {{noteProp.content}}</span>  </p>
          <form class="form d-flex flex-column align-items-center" @submit.prevent="editNote" v-if="editToggle">
          <div class="col-6 d-flex justify-content-center">
          <input
            type="text"
            class="form-control my-2 bg-info"
            placeholder="Edit note..."
            aria-describedby="helpId"
            v-model="noteData.content"
          />
          </div>
          <button type="submit" class="btn btn-primary noteButton my-2">
          Post
        </button>
        </form>
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
.noteCard{
  padding: 0;
}
.noteButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px #5881ab, 
            -1px -1px 4px #5881ab;
}
.pointer{
  cursor: pointer;
}
</style>
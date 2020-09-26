<template>
  <div class="bug-details container-fluid">
    <div class="row justify-content-center flex-column align-items-center">
      <div class="col-8 text-center mt-3 p-0">
        <div class="card shadow">
        <div class="card-header bg-info">
          <p class="m-0 d-flex justify-content-between">
            <i
            class="fa fa-pencil text-primary pointer"
            aria-hidden="true"
            @click="editToggle = !editToggle"
            v-if="this.bug.creatorEmail == this.$auth.userInfo.name && this.bug.closed == false">
            </i>
            <button class="btn btn-outline-success shadow" aria-hidden="" @click="deleteBug" v-if="this.bug.creatorEmail == this.$auth.userInfo.name && this.bug.closed == false">Close Bug</button>  
          </p>
        <form @submit.prevent="editBug" class="md-form" v-if="editToggle">
          <h5>Edit Bug Details</h5>
        <input
          v-model="bugEdit.title"
          type="text"
          id="materialSaveFormName"
          class="form-control m-1"
          placeholder="Bug title..."
        />
        <input
          v-model="bugEdit.description"
          type="text"
          id="materialSaveFormName"
          class="form-control m-1"
          placeholder="Bug description..."
        />
        <button class="btn btn-warning shadow" type="submit">Save</button>
      </form>
        <div class="card-body" v-if="this.bug.closed == true">
          <h2 class="text-warning" style="text-decoration: line-through">{{bug.title}}</h2>
          <h3 class="text-danger">Closed</h3>
        </div>
        <div class="card-body p-0" v-else>
          <h2 class="text-warning">{{bug.title}}</h2>
        </div>
        </div>
        <div class="card-body" style="min-height: 100px; display: flex">
          <h5 class="text-primary">{{bug.description}}</h5>
        </div>
        <div v-if="noteToggle && this.bug.closed == false">
          <button class="btn btn-warning mb-2" @click="noteToggle = !noteToggle">Hide</button>
        </div>
        <div v-else-if="!noteToggle && this.bug.closed == false">
          <button class="btn btn-warning mb-2" @click="noteToggle = !noteToggle">Add Note</button>
        </div>
        <div v-if="noteToggle">
        <form class="card-body flex-column align-items-center p-3 mt-3" action="" @submit.prevent="addNote" v-if="this.$auth.isAuthenticated && this.bug.closed == false">
          <div class="form-group">
            <input type="text" class="form-group m-auto" v-model="newNote.content" placeholder="Add a note..."/>
          </div>
          <button class="btn btn-warning shadow" type="submit">Post Note</button>
        </form>
        </div>
        </div>
      <div class="mt-3 row justify-content-center " >
        <note-component v-for="note in notes" :key="note.id" :noteProp="note" />
        </div>
        </div>
      </div>
    </div>
  
</template>


<script>
import NoteComponent from "../components/NoteComponent.vue"
export default {
  name: 'bug-details',
  data(){
    return {
      bugData: {},
      bugEdit: {},
      newNote: {}, 
      noteToggle: false,
      editToggle: false,
    }
  },
  mounted(){
    this.$store.dispatch("getActiveBug", this.$route.params.bugId),
    this.$store.dispatch("getNotes", this.$route.params.bugId)
  },
  computed:{
      bug(){
        return this.$store.state.activeBug
      },
      notes(){
        return this.$store.state.activeNotes || []
      },},
  methods:{
    addNote(){
      let payload = {
        bug: this.$route.params.bugId,
        content: this.newNote.content
      }
      this.$store.dispatch("addNote", payload)
      this.newNote = {}
    },
    editBug(){
      this.bugEdit.id = this.$route.params.bugId;
      this.$store.dispatch("editBug", this.bugEdit);
      this.editToggle = false;
      this.bugData = {}
    },
    deleteBug(){
      let c = confirm("Are you sure you'd like to close this bug?")
      if(c == true){
        this.bugData.id = this.$route.params.bugId;
        this.$store.dispatch("deleteBug", this.bugData)
      }else{
        return
      }
    }
  },
  components:{
    NoteComponent
  }
}
</script>


<style scoped>
h2, h5{
  text-shadow: 1px 1px black;
}
button:active{
  transform: translateY(2px);
}
</style>
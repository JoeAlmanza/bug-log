<template>
  <div class="bug-details container-fluid">
    <div class="row justify-content-center flex-column align-items-center mt-5">
      <div class="col-8 text-center mt-3 p-0">
        <div class="card bg-dark">
        <div class="card-header">
          <p class="m-0 d-flex justify-content-between">
            <button
            class="btn btn-outline-primary fa fa-pencil text-warning toggleEditButton"
            aria-hidden="true"
            @click="editToggle = !editToggle"
            v-if="this.bug.creatorEmail == this.$auth.userInfo.name && this.bug.closed == false">
            </button>
            <button class="btn btn-success closeButton" aria-hidden="" @click="deleteBug" v-if="this.bug.creatorEmail == this.$auth.userInfo.name && this.bug.closed == false">Close <i class="fa fa-bug text-primary" aria-hidden="true"></i></button>  
          </p>
        <form @submit.prevent="editBug" class="md-form text-primary" v-if="editToggle">
          <h5>Edit Bug Details</h5>
        <input
          v-model="bugEdit.title"
          type="text"
          id="materialSaveFormName"
          class="form-control mr-5 my-2"
          placeholder="Bug title..."
        />
        <input
          v-model="bugEdit.description"
          type="text"
          id="materialSaveFormName"
          class="form-control mr-5 my-2"
          placeholder="Bug description..."
        />
        <button class="btn btn-warning saveEditButton my-2" type="submit">Save Edit</button>
      </form>
        <div class="card-body" v-if="this.bug.closed == true">
          <h2 class="text-warning" style="text-decoration: line-through"><i class="fa fa-bug text-primary" aria-hidden="true"></i>{{bug.title}}</h2>
          <h3 class="text-danger">Closed</h3>
        </div>
        <div class="card-body p-0" v-else>
          <h2 class="text-warning"><i class="fa fa-bug text-primary" aria-hidden="true"></i>{{bug.title}}</h2>
          <h3 class="text-success">Open</h3>
        </div>
        </div>
        <div class="card-body" style="min-height: 100px; display: flex">
          <h5 class="text-primary">{{bug.description}}</h5>
        </div>
        <div v-if="noteToggle && this.bug.closed == false">
          <button class="btn btn-outline-warning mb-2 noteButton" @click="noteToggle = !noteToggle">Hide</button>
        </div>
        <div v-else-if="!noteToggle && this.bug.closed == false">
          <button class="btn btn-outline-warning mb-3 noteButton" @click="noteToggle = !noteToggle">Add Note</button>
        </div>
        <div v-if="noteToggle">
        <form class="card-body flex-column align-items-center p-3 mt-3" action="" @submit.prevent="addNote" v-if="this.$auth.isAuthenticated && this.bug.closed == false">
          <div class="form-group">
            <input type="text" class="form-group m-auto bg-light" v-model="newNote.content" placeholder="Add a note..."/>
          </div>
          <button class="btn btn-success postNoteButton" type="submit">Post Note</button>
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
      this.noteToggle = false
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
.noteButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px  #ffe59e, 
            -1px -1px 4px  #ffe59e
}
.postNoteButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px #bceeb2, 
            -1px -1px 4px #bceeb2
}
.toggleEditButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px #5881ab, 
            -1px -1px 4px #5881ab;
}
.saveEditButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px  #ffe59e, 
            -1px -1px 4px  #ffe59e
}
.closeButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px #bceeb2, 
            -1px -1px 4px #bceeb2
}
.card-header{
  border-radius: 15px 15px 3px 3px;
} 
.card{
  border-radius: 15px 15px 3px 3px;
  box-shadow: 6px 6px 12px #343a40;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.pointer{
  cursor: pointer;
}
</style>
<template>
  <div class="bug-details container-fluid">
    <div class="row justify-content-center flex-column align-items-center">
      <div class="col-8 text-center mt-3 p-0">
        <div class="card shadow">
        <div class="card-header">
          <p class="m-0 text-left">
            <i class="fa fa-times-circle-o text-danger pointer" aria-hidden="" @click="deleteBug" v-if="this.bug.creatorEmail == this.$auth.userInfo.name && this.bug.closed == false"></i>  
            <i
            class="fa fa-pencil text-primary pointer"
            aria-hidden="true"
            @click="editToggle = !editToggle"
            v-if="this.bug.creatorEmail == this.$auth.userInfo.name && this.bug.closed == false">
            </i>
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
          <h2 class="text-primary" style="text-decoration: line-through">{{bug.title}}</h2>
          <h3 class="text-danger">Closed</h3>
        </div>
        <div class="card-body" v-else>
          <h2 class="text-primary">{{bug.title}}</h2>
        </div>
        </div>
        <div class="card-body">
          <h5>{{bug.description}}</h5>
        </div>

        <form class="card-body flex-column align-items-center p-3 mt-3" action="" @submit.prevent="addNote" v-if="this.$auth.isAuthenticated && this.bug.closed == false">
          <div class="form-group">
            <input type="text" class="form-group m-auto" v-model="newNote.content" placeholder="Add a note..."/>
          </div>
          <button class="btn btn-primary shadow" type="submit">Post Note</button>
        </form>
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
      console.log(this.bugData);
      this.bugEdit.id = this.$route.params.bugId;
      this.$store.dispatch("editBug", this.bugEdit);
      this.editToggle = false;
      this.bugData = {}
    },
    deleteBug(){
      this.bugData.id = this.$route.params.bugId;
      this.$store.dispatch("deleteBug", this.bugData)
    }
  },
  components:{
    NoteComponent
  }
}
</script>


<style scoped>

</style>
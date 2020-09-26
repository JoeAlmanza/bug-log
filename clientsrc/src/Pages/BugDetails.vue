<template>
  <div class="bug-details container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h1>{{bug.title}}</h1>
      </div>
          <div class="col-12 d-flex flex-column align-items-center">
            <form class="card flex-column align-items-center p-3 mt-3" action="" @submit.prevent="addNote" v-if="this.$auth.isAuthenticated">
              <div class="form-group">
                <input type="text" class="form-group m-auto" v-model="newNote.content" placeholder="Add a note..."/>
              </div>
              <button class="btn btn-primary" type="submit">Post Note</button>
            </form>

        <div class="card p-3 mt-2 align-items-center">
            <button class="btn btn-info"
              aria-hidden="true"
              @click="noteToggle = !noteToggle"
              >Notes - {{notes.length}}</button>
          <div class="mt-3" v-if="noteToggle">
            <note-component v-for="note in notes" :key="note.id" :noteProp="note" />
          </div>
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
      newNote: {}, 
      noteToggle: false,
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
    }
  },
  components:{
    NoteComponent
  }
}
</script>


<style scoped>

</style>
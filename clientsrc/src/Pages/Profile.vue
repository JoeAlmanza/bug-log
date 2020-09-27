<template>
  <div class="about text-center text-primary">
    <h1 class="my-3">Welcome {{ profile.name }}</h1>
    <img class="rounded my-3" :src="profile.picture" alt="" />
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-5 my-3">
          <div class="card bg-dark">
            <div class="card-header">
              <h2 class="text-warning">My Created Bugs <i class="fa fa-bug text-success"   aria-hidden="true"></i></h2>
            </div>
            <ul class="list-group list-group-flush">
            <bug-component v-for="bug in userBugs" :key="bug.id" :bugProp="bug" />
            </ul>
          </div>
        </div>
        <div class="col-5 my-3">
          <div class="card bg-dark p-3">
              <h2 class="text-warning">My Created Notes <i class="fa fa-bug text-success"   aria-hidden="true"></i></h2>
          </div>
            <ul class="list-group list-group-flush mt-2">
              <note-component class="noteCard" v-for="note in userNotes" :key="note.id" :noteProp="note" />
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bugComponent from "../components/BugComponent.vue"
import noteComponent from "../components/NoteComponent.vue"
export default {
  name: "Profile",
  mounted(){
    this.$store.dispatch("getProfile")
    this.$store.dispatch("getAllBugs")
    this.$store.dispatch("getAllNotes")
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    userBugs() {
      return this.$store.state.bugs.filter(b => b.creatorEmail == this.profile.email)
    },
    userNotes() {
      return this.$store.state.activeNotes.filter(n => n.creatorEmail == this.profile.email)
    }
  },
  components: {
    bugComponent,
    noteComponent
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
.card-header{
  border-radius: 15px 15px 3px 3px;
} 

.card{
  border-radius: 15px 15px 15px 15px;
  box-shadow: 6px 6px 12px #343a40;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.noteCard{
  border-top: 1px solid black;
}
</style>

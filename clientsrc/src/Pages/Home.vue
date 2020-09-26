<template>
  <div class="home container-fluid p-4">
    <div class="row my-2">
      <div>
      <button class="btn btn-primary mx-3" v-if="this.$auth.isAuthenticated" @click="createToggle = !createToggle">Create Bug Log</button>
      </div>
      
      <form class="form row bg-success m-0" @submit.prevent="createBug" v-if="createToggle">
      <div class="col-6 form-group p-0">
        <input
            type="text"
            v-model="newBug.title"
            class="form-control mt-1 mb-0"
            placeholder="Title..."
            aria-describedby="helpId"
          />
      </div>
      <div class="col-6 form-group p-0">
        <input
            type="text"
            class="form-control mt-1 mb-0"
            v-model="newBug.description"
            placeholder="Description..."
            aria-describedby="helpId"
          />
      </div>
          <button type="submit" class="btn btn-outline-primary shadow">
          Log Bug
        </button>
      </form>
      
    </div>
    <div class="row justify-content-center">
      <div class="col-9 my-3">
        
        <div class="card shadow">
          <div class="card-header bg-warning">
            <h2>Current Bugs <i class="fa fa-bug text-primary" aria-hidden="true"></i></h2>
            <div class="text-right">
              <button class="m-1 btn btn-danger shadow border border-dark" @click="showClosed = true; showOpen = false; showAll = false">Show Closed</button>
              <button class="m-1 btn btn-success shadow border border-dark" @click="showOpen = true; showClosed = false; showAll = false">Show Open</button>
              <button class="m-1 btn btn-primary shadow border border-dark" @click="showAll = true; showOpen = false; showClosed = false">Show All</button>
            </div>
          </div>

          <ul class="list-group list-group-flush" v-if="showAll">
          <bug-component v-for="bug in bugs" :key="bug.id" :bugProp="bug" />
          </ul>
          <ul class="list-group list-group-flush" v-else-if="showClosed">
          <bug-component v-for="bug in closedBugs" :key="bug.id" :bugProp="bug" />
          </ul>
          <ul class="list-group list-group-flush" v-else-if="showOpen">
          <bug-component v-for="bug in openBugs" :key="bug.id" :bugProp="bug" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BugComponent from "../components/BugComponent.vue"
export default {
  name: "home",
  props: {
  },
  data(){
    return{
      newBug: {},
      createToggle: false,
      showAll: true,
      showClosed: false,
      showOpen: false
    };
  },
  mounted(){
    this.$store.dispatch("getAllBugs")
  },
  computed: {
    bugs() {
      return this.$store.state.bugs
    },
    closedBugs() {
      let res = this.$store.state.bugs.filter(b => b.closed) 
      return res
    },
    openBugs() {
      let res = this.$store.state.bugs.filter(b => !b.closed)
      return res
    }
  },
  methods: {
    createBug(){
      this.$store.dispatch("createBug", this.newBug)
      this.newBug = {}
    }
  },
  components:{
    BugComponent
  }
};
</script>

<style scoped>
h2{
  text-shadow: 1px 1px black;
}
</style>
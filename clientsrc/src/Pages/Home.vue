<template>
  <div class="home container-fluid p-4">
    <div class="row">
      <div>
      <button class="btn btn-primary" v-if="this.$auth.isAuthenticated" @click="createToggle = !createToggle">Create Bug Log</button>
      </div>
      <div class="card m-2">
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
          <button type="submit" class="btn btn-primary">
          Log Bug
        </button>
      </form>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-9">
        <div class="card shadow">
          <div class="card-header bg-warning">
            <h4>Current Bugs <i class="fa fa-bug text-primary" aria-hidden="true"></i></h4>
          </div>
          <ul class="list-group list-group-flush">
          <bug-component v-for="bug in bugs" :key="bug.id" :bugProp="bug" />
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
    };
  },
  mounted(){
    this.$store.dispatch("getAllBugs")
  },
  computed: {
    bugs() {
      return this.$store.state.bugs
    },
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

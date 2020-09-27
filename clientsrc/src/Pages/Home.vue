<template>
  <div class="home container-fluid p-4">
    <div class="row my-2">
      <div>
      <button class="btn btn-primary mx-3 createButton" v-if="this.$auth.isAuthenticated" @click="createToggle = !createToggle"><i class="fa fa-plus text-success" aria-hidden="true"></i> <i class="fa fa-bug text-success" aria-hidden="true"></i></button>
      </div>
      <div class="col-8">
      <form class="form row addCard m-0 flex-column" @submit.prevent="createBug" v-if="createToggle">
      <div class="col-6 form-group p-0">
        <h5 class="text-primary">Add <i class="fa fa-bug text-primary" aria-hidden="true"></i>:</h5>
        <input
            type="text"
            v-model="newBug.title"
            class="form-control mt-1 mb-0 bg-warning text-primary"
            placeholder="Title..."
            aria-describedby="helpId"
          />
      </div>
      <div class="col-6 form-group p-0">
        <input
            type="text"
            class="form-control mt-1 mb-0 bg-warning text-primary"
            v-model="newBug.description"
            placeholder="Description..."
            aria-describedby="helpId"
          />
      </div>
          <button type="submit" class="btn btn-primary col-3 logButton text-success">
          Log <i class="fa fa-bug text-warning" aria-hidden="true"></i>
        </button>
      </form>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-9 my-3">
        <div class="card bg-dark">
          <div class="card-header">
            <h2 class="text-info">Current Bugs <i class="fa fa-bug text-success" aria-hidden="true"></i></h2>
            <div class="text-right">
              <button class="m-1 btn btn-outline-info allButton" @click="showAll = true; showOpen = false; showClosed = false">All <i class="fa fa-bug text-info" aria-hidden="true"></i>'s</button>
              <button class="m-1 btn btn-outline-success openButton" @click="showOpen = true; showClosed = false; showAll = false">Open <i class="fa fa-bug text-success" aria-hidden="true"></i>'s</button>
              <button class="m-1 btn btn-outline-danger closedButton" @click="showClosed = true; showOpen = false; showAll = false">Closed <i class="fa fa-bug text-danger" aria-hidden="true"></i>'s</button>
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
    this.$store.dispatch("getProfile")
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
h2, h5{
  text-shadow: 1px 1px black;
}
button{
  text-shadow: 0px 1px black;
}
input{
  border-radius: 15px;
  box-shadow: 1px 1px 4px  #ffe59e, 
            -1px -1px 4px  #ffe59e
}
.createButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px #5881ab, 
            -1px -1px 4px #5881ab;
}
.closedButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px  #e68484, 
            -1px -1px 4px  #e68484;
}
.openButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px #bceeb2, 
            -1px -1px 4px #bceeb2;
}
.allButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px #b0e0e6, 
            -1px -1px 4px #b0e0e6;
}
.logButton{
  border-radius: 15px;
  box-shadow: 1px 1px 4px #5881ab, 
            -1px -1px 4px #5881ab;
}
.addCard{
  background-color:  #d0ecca;
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

button:active{
  transform: translateY(2px);
}
</style>
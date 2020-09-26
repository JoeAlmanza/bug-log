<template>
  <div class="bug-component">
    <router-link class="list-group-item d-flex justify-content-around border-bottom" :to="{name:'bug-details', params:{bugId: bugProp.id}}">
      <div v-if="bugProp.closed == true">
          <h5 class="text-info" style="text-decoration: line-through">{{bugProp.title}}</h5>
          <h5 class="text-danger">CLOSED</h5>
      </div>
      <div v-else>
          <h5 class="text-info">{{bugProp.title}}</h5>
          <h5 class="text-success">OPEN</h5>
      </div>
          <p class="text-primary m-0">By: {{bugProp.creatorEmail}}</p>
          <p class="text-primary m-0">Last updated: {{bugProp.updatedAt}}</p>
    </router-link>
  </div>
</template>


<script>
export default {
  name: 'bug-component',
  props: ["bugProp"],
  data(){
    return {}
  },
  computed:{},
  methods:{},
  components:{}
}
</script>


<style scoped>
h5{
  text-shadow: 1px 1px black;
}
.bugCard{
  border-bottom: 1px solid black;
}
</style>
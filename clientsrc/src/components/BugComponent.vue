<template>
  <div class="bug-component">
    <router-link class="d-flex justify-content-between bugCard" :to="{name:'bug-details', params:{bugId: bugProp.id}}">
      <div class="displayContents" v-if="bugProp.closed == true">
          <h5 class="text-danger">CLOSED</h5>-
          <h5 class="text-info" style="text-decoration: line-through">{{bugProp.title}}</h5>
      </div>
      <div class="displayContents" v-else>
          <h5 class="text-success">OPEN</h5>-
          <h5 class="text-info">{{bugProp.title}}</h5>
      </div>
          <p class="text-warning m-0">Author: {{bugProp.creatorEmail}}</p>
          <p class="text-primary m-0">Updated: {{bugProp.updatedAt | formatDate('timezone', 'America/Denver')}} MST</p>
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
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top: 1px solid black;
  padding: 8px 5px 8px 5px;
}
.displayContents{
  display: contents;
}

</style>
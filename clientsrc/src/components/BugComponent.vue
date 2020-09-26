<template>
  <div class="bug-component">
      
    <router-link class="border border-dark list-group-item" :to="{name:'bug-details', params:{bugId: bugProp.id}}">
          <h5 class=" text-info">{{bugProp.title}}</h5>
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
</style>
<template>
  <div class="bug-component">
      
    <router-link class="border border-dark list-group-item" :to="{name:'bug-details', params:{bugId: bugProp.id}}">
          <h5 class=" text-dark">{{bugProp.title}}</h5>
          <p class="text-primary">By: {{bugProp.creatorEmail}}</p>
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

</style>
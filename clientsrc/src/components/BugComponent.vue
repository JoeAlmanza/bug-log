<template>
  <div class="bug-component">
    <router-link class="card my-2" :to="{name:'bug-details', params:{bugId: bugProp.id}}">
      <div class="card text-light">
        <div class="card-body">
          <h5 class="card-title text-dark">{{bugProp.title}}</h5>
          <p class="text-light">By: {{bugProp.creatorEmail}}</p>
        </div>
      </div>
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
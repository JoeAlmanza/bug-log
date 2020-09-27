<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img   
          alt="Vue logo" 
          src="../assets/logo.png" 
          style="transform: rotate(-90deg);width: 25px;" />
        <img
          alt="Vue logo"
          src="../assets/logo.png"
          style="transform: rotate(-90deg);width: 25px;margin-top: -10px;"
        />
      </div>
      <div>
        <h2 class="text-info">ug-Log <i class="fa fa-bug text-primary" aria-hidden="true"></i></h2>
      </div>
      </router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <span class="navbar-nav mr-auto">
        <li class="nav-item p-0" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link text-warning"
            >Home</router-link
          >
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link class="nav-link text-warning" :to="{ name: 'Profile' }"
            >Profile</router-link
          >
        </li>
      </span>
      <span class="navbar-text">
        <button
          class="btn btn-success loginButtonShadow text-primary"
          @click="login"
          v-if="!$auth.isAuthenticated">
          Login
        </button>
        <button 
          class="btn btn-warning logoutButtonShadow text-danger" 
          @click="logout" 
          v-else>Logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      if(this.$auth.isAuthenticated){
        this.$store.dispatch("setBearer", this.$auth.bearer);
        this.$store.dispatch("getProfile");
        this.$store.dispatch("getAllBugs")
      }
    },
    async logout() {
      let c = confirm("Are you sure you'd like to log out?")
      if(c == true){
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({returnTo: window.location.origin});
      }else{
        return
      }
    }
  }
};
</script>

<style scoped>
h2{
  text-shadow: 1px 1px black
}
.loginButtonShadow{
  border-radius: 15px;
  box-shadow: 1px 1px 4px #bceeb2, 
            -1px -1px 4px #bceeb2
}
.logoutButtonShadow{
  border-radius: 15px;
  box-shadow: 1px 1px 4px  #ffe59e, 
            -1px -1px 4px  #ffe59e
}
.navbar{
  box-shadow: 0px 2px 4px #343a40
}

</style>

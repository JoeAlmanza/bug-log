<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <!-- <div class="d-flex flex-column align-items-center">
        <img   
          alt="Vue logo" 
          src="../assets/logo.png" 
          style="transform: rotate(-90deg);width: 25px;" />
        <img
          alt="Vue logo"
          src="../assets/logo.png"
          style="transform: rotate(-90deg);width: 25px;margin-top: -10px;"
        />
      </div> -->
      <div>
        <h1 class="text-info">
          Bug-Log <i class="fa fa-bug text-success" aria-hidden="true"></i>
        </h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler btn btn-outline-info"
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
          <router-link :to="{ name: 'Home' }" class="nav-link text-info"
            ><button class="btn btn-outline-warning homeButtonShadow">
              Home
            </button></router-link
          >
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link class="nav-link text-info" :to="{ name: 'Profile' }">
            <button class="btn btn-outline-warning profileButtonShadow">
              Profile
            </button>
          </router-link>
        </li>
      </span>
      <span class="navbar-text">
        <button
          class="btn btn-outline-success loginButtonShadow"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >
          Sign In
        </button>
        <button
          class="btn btn-outline-danger logoutButtonShadow"
          @click="logout"
          v-else
        >
          Sign Out
        </button>
      </span>
    </div>
  </nav>
</template>

<script>
import ns from "../store/NotificationService.js";
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      if (this.$auth.isAuthenticated) {
        this.$store.dispatch("setBearer", this.$auth.bearer);
        this.$store.dispatch("getProfile");
        this.$store.dispatch("getAllBugs");
      }
    },
    async logout() {
      try {
        if (await ns.confirmAction()) {
          this.$store.dispatch("resetBearer");
          await this.$auth.logout({ returnTo: window.location.origin });
          ns.toast("Signed out!", 1500, "success");
        }
      } catch (error) {
        console.error();
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-shadow: 1px 1px black;
}
button {
  text-shadow: 0px 1px black;
}
.homeButtonShadow {
  border-radius: 15px;
  box-shadow: 1px 1px 4px #ffe59e, -1px -1px 4px #ffe59e;
}
.profileButtonShadow {
  border-radius: 15px;
  box-shadow: 1px 1px 4px #ffe59e, -1px -1px 4px #ffe59e;
}
.loginButtonShadow {
  border-radius: 15px;
  box-shadow: 1px 1px 4px #bceeb2, -1px -1px 4px #bceeb2;
}
.logoutButtonShadow {
  border-radius: 15px;
  box-shadow: 1px 1px 4px #e68484, -1px -1px 4px #e68484;
}
.navbar {
  box-shadow: 0px 4px 10px #343a40;
}
</style>

import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    activeNotes:[]
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs;
    },
    setActiveBug(state, bug) {
      state.activeBug = bug
    },
    setNotes(state, note) {
      state.activeNotes = note
    },
    deleteBug(state, bug) {
      state.bugs = bug
    },
    deleteNote(state, note) {
      state.activeNotes = state.activeNotes.filter(c => c.id != note.id)
    }
  },
  actions: {
    // Auth0 actions - DO NOT TOUCH!! 
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    // 
    async getAllBugs({commit}){
      try {
        let res = await api.get("bugs")
        commit("setBugs", res.data)
      } catch (error) {
        console.error(error);
      }
    },

    async createBug({dispatch}, bugData){
      try {
        let res = await api.post("bugs", bugData)
        dispatch("getAllBugs")
        router.push({path: "/bugs/" + res.data.id})
      } catch (error) {
          console.error(error);
      }
    }
  }
});

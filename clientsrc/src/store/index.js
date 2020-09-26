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
    openBugs: [],
    closedBugs: [],
    activeNotes:[]
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
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
      state.activeNotes = state.activeNotes.filter(n => n.id != note.id)
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

    async getActiveBug({commit}, bugId){
      try {
        
        let res = await api.get("bugs/" + bugId)
        console.log(res);
        commit("setActiveBug", res.data)
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
    },

    async editBug({commit}, bugData){
      try {
        let res = await api.put("bugs/" + bugData.id, bugData)
        console.log(res);
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error);
      }
    },

    async deleteBug({commit}, bugData){
      try {
        console.log(bugData);
        let res = await api.delete("bugs/" + bugData.id)
        console.log(res);
        commit("deleteBug", bugData.id)
        commit("setActiveBug", res.data)
      } catch (error) {
        
      }
    },


    async getNotes({commit}, bugId){
      try {
        let res = await api.get("bugs/" + bugId + "/notes" )
        console.log(res.data);
        commit("setNotes", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async addNote({dispatch}, noteData) {
      try {
        console.log(noteData);
        let res = await api.post("notes", noteData)
        dispatch("getNotes", res.data.bug)
      } catch (error) {
        console.error(error);
      }
    },
    async editNote({dispatch}, noteData){
      try {
        let res = await api.put("notes/" + noteData.id, noteData)
        dispatch("getNotes", res.data.bug)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNote({commit, dispatch}, noteData){
      try {
        await api.delete("notes/" + noteData.id)
        commit("deleteNote", noteData.id)
        dispatch("getNotes", noteData.bug)
      } catch (error) {
        console.error(error);
      }
    }
  }
});

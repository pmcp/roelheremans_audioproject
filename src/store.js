import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    safelyStoredNumber: 0,
  },
  getters: {
    safelyStoredNumber: state => state.safelyStoredNumber,
    storedNumberMatches(state) {
      return (matchNumber) => state.safelyStoredNumber === matchNumber;
    },
    // Shorthand:
    // storedNumberMatches: state => matchNumber => state.safelyStoredNumbers === matchNumber
  },
  mutations: {
    incrementStoredNumber(state) {
      state.safelyStoredNumber++;
    },
    setStoredNumber(state, newNumber) {
      // newNumber is the payload passed in.
      state.safelyStoredNumber = newNumber;
    },
  },
});
export { store as default };
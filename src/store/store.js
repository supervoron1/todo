import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todos: [{
      title: 'задача 1',
      done: false,
      id: 1,
      editing: false,
    },
      {
        title: 'задача 2',
        done: false,
        id: 2,
        editing: false,
      },
      {
        title: 'задача 3',
        done: false,
        id: 3,
        editing: false,
      }],
  },
  // getters: {
  //   remaining() {
  //     return this.$store.state.todos.filter(todo => !todo.done).length
  //   },
  //   anyRemaining() {
  //     return this.remaining !== 0
  //   },
  //   completed() {
  //     return this.$store.state.todos.filter(todo => {
  //       return todo.done
  //     })
  //   },
  //   active() {
  //     return this.$store.state.todos.filter(todo => {
  //       return !todo.done
  //     })
  //   },
  // },
});
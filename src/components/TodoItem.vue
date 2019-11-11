<template>
    <div class="todo-item">
       <span
           v-if="!editing"
           @dblclick="editTodo"
           :class="{done: done}">{{index + 1}}) {{title}}
       </span>
        <input class="todo-edit" v-else="" type="text"
               v-model="title"
               @blur="doneEdit"
               @keyup.enter="doneEdit"
               @keyup.esc="cancelEdit" v-focus>
        <div class="popup-menu">
            <input type="checkbox" v-model="done" @change="doneEdit" class="ml-15">
            <button @click="editTodo" type="button" class="close-btn ml-15"><i
                class="fas fa-pen"></i></button>
            <button @click="removeTodo(index)" type="button" class="close-btn ml-15"><i
                class="fas fa-times"></i></button>
        </div>
    </div>
</template>

<script>
    import {eventBus} from "../main";

    export default {
    name: "todo-item",
    props: {
      todo: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      checkAll: {
        type: Boolean,
        required: true
      },
    },
    data() {
      return {
        'id': this.todo.id,
        'title': this.todo.title,
        'done': this.todo.done,
        'editing': this.todo.editing,
        'beforeEditCache': ''
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    watch: {
      checkAll() {
        // if (this.checkAll) {
        //   this.done = true
        // } else {
        //   this.done = this.todo.done
        // }
        this.done = this.checkAll ? true : this.todo.done
      },
    },
    methods: {
      removeTodo(index) {
        eventBus.$emit('removedTodo', index);
      },
      editTodo() {
        this.beforeEditCache = this.title;
        this.editing = true
      },
      doneEdit() {
        if (this.title.trim() === '') {
          this.title = this.beforeEditCache
        }
        this.editing = false;
        eventBus.$emit('finishedEdit', {
          'index': this.index,
          'todo': {
            'id': this.id,
            'title': this.title,
            'done': this.done,
            'editing': this.editing,
          }
        })
      },
      cancelEdit() {
        this.title = this.beforeEditCache;
        this.editing = false
      },
    }
  }
</script>

<style scoped>

</style>
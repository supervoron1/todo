<template>
    <div>
        <div class="wrapper">
            <div class="header">
                <h3>{{ title }}</h3>
                <button class="close-btn"><span class="more">...</span></button>
            </div>
            <label for="newTodo"></label>
            <textarea v-model="newTodo" @keyup.prevent.enter="addTodo" type="text" name="newTodo"
                      id="newTodo" placeholder="Enter a title for this card..." required></textarea>
            <div class="form-btn">
                <div class="sub-btn">
                    <button type="submit" @click="addTodo" name="button" class="add-btn">Add Card
                    </button>
                    <button class="close-btn" @click="clearField"><i class="fas fa-times"></i>
                    </button>
                </div>
                <button class="close-btn" @click="showMenu"
                        @keyup.esc="hideMenu"><span class="more add-more">...</span></button>
                <div class="drop-menu" :class="{show: this.showModal}">
                    <button @click="hideMenu" type="button" class="drop-btn">&times;</button>
                    <button @click="selectAll" type="button" class="drop-btn">
                        {{this.anyRemaining ? 'Select' : 'Unselect'}} All
                    </button>
                    <button @click="removeDone" type="button" class="drop-btn">RemoveDone</button>
                    <button @click="sortReverse" type="button" class="drop-btn">SortReverse</button>
                </div>
            </div>
            <ul>
                <todo-item v-for="(todo, index) in todos" :key="todo.id" :todo="todo" :index="index"
                           :checkAll="!anyRemaining">
                </todo-item>
            </ul>
        </div>
    </div>
</template>

<script>
  import {eventBus} from "../main";
  import TodoItem from "./TodoItem";

  export default {
    name: "todo-list",
    components: {
      TodoItem,
    },
    data() {
      return {
        title: 'Задачи',
        newTodo: '',
        idForTodo: 4,
        beforeEditCache: '',
        showModal: false,
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
      }
    },
    watch: {
      todos: {
        handler() {
          localStorage.todos = JSON.stringify(this.todos);
        },
        deep: true
      }
    },
    // mounted() {
    //   if (localStorage.todos) {
    //     this.todos = JSON.parse(localStorage.todos);
    //   }
    // },
    created() {
      eventBus.$on('removedTodo', (index) => this.removeTodo(index));
      eventBus.$on('finishedEdit', (data) => this.finishedEdit(data));
    },

    computed: {
      remaining() {
        return this.todos.filter(todo => !todo.done).length
      },
      anyRemaining() {
        return this.remaining !== 0
      },
      completed() {
        return this.todos.filter(todo => {
          return todo.done
        })
      },
      active() {
        return this.todos.filter(todo => {
          return !todo.done
        })
      },
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim() === '') {
          return
        }
        this.todos.push({
          title: this.newTodo,
          done: false,
          id: this.idForTodo,
          editing: false,
        });
        this.newTodo = '';
        this.idForTodo++;
      },
      removeTodo(index) {
        this.todos.splice(index, 1);
      },
      selectAll() {
        if (this.anyRemaining) {
          this.todos.forEach(todo => {
            todo.done = true;
          })
        } else {
          this.todos.forEach(todo => {
            todo.done = false;
          })
        }
        this.showModal = false;
      },
      removeDone() {
        this.todos = this.active;
        this.showModal = false;
      },
      clearField() {
        this.newTodo = '';
      },
      showMenu() {
        this.showModal = true;
      },
      hideMenu() {
        this.showModal = false;
      },
      sortReverse() {
        this.todos.reverse();
        this.showModal = false;
      },
      finishedEdit(data) {
        this.todos.splice(data.index, 1, data.todo)
      }
    }
  }
</script>

<style lang="scss">
    .wrapper {
        position: relative;
        max-width: 370px;
        padding: 15px;
        background-color: #e0e3e6;
    }

    .header {
        padding: 0 10px 10px 10px;
        display: flex;
        justify-content: space-between;
        color: #243849;
    }

    .btn-header {
        border: none;
        background-color: #e0e3e6;
    }

    textarea {
        display: block;
        width: 100%;
        height: 100px;
        font-size: 18px;
        padding: 10px;
        margin-bottom: 5px;
        resize: none;
        border: none;
        border-radius: 5px;
        border-bottom: outset;
        outline: none;
        background: #ffffff !important;
    }

    .add-btn {
        padding: 10px;
        margin-right: 20px;
        font-size: 16px;
        font-weight: bold;
        box-shadow: none;
        border: none;
        border-bottom: outset;
        border-radius: 5px;
        outline: none;
        background-color: #7ca65c;
        color: white;
    }

    .close-btn {
        position: relative;
        border: none;
        outline: none;
        background: transparent;
        color: #808d97;
    }

    .done {
        text-decoration: line-through;
    }

    .todo-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        border-bottom: outset;
        padding: 10px;
        border-radius: 5px;
        background-color: #fff;
        list-style-type: none;
    }

    .todo-item:hover {
        background-color: rgba(255, 255, 255, .5);
    }

    .todo-edit {
        border: none;
        font-size: 16px;
        background-color: rgba(255, 255, 255, 0);
        outline: none;
    }

    .fa-times {
        font-size: 18px;
    }

    .more {
        position: absolute;
        bottom: 3px;
        right: 0;
        font-size: 30px;
    }

    .add-more {
        bottom: -10px;
    }

    .fa-pen {
        font-size: 16px;
    }

    .popup-menu {
        display: none;
        justify-content: space-between;
        align-items: center;
    }

    .form-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10px;
    }

    .todo-item:hover .popup-menu {
        display: flex;
    }

    .sub-btn {
        display: flex;
        justify-content: space-between;
    }

    .ml-15 {
        margin-left: 15px;
    }

    .drop-menu {
        position: absolute;
        left: 225px;
        top: 188px;
        width: 130px;
        height: auto;
        display: none;
        z-index: 1;
        flex-direction: column;
        justify-content: space-between;
    }

    .drop-menu:before {
        content: '';
        display: block;
        width: 9px;
        height: 9px;
        background-color: lightgray;
        position: absolute;
        top: -5px;
        right: 17px;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .show {
        display: flex;
    }

    .drop-btn {
        font-size: 14px;
        border: none;
        padding: 5px 10px;
        background-color: lightgray;
        outline: none;
        color: #808d97;
    }

    .drop-btn:first-child {
        border-radius: 5px 5px 0 0;
        padding: 0 15px;
        text-align: end;
    }

    .drop-btn:last-child {
        border-radius: 0 0 5px 5px;
        padding-bottom: 10px;
    }

    .drop-btn:hover {
        color: #000;
    }

    @media (max-width: 320px) {
        .drop-menu {
            left: 145px;
        }
    }

    @media (max-width: 375px) and (min-width: 321px) {
        .drop-menu {
            left: 200px;
        }
    }
</style>
<template>
    <div id="app" class="container">
        <todo-list></todo-list>
    </div>
</template>

<script>
    import TodoList from './components/TodoList.vue'

  export default {
    name: 'app',
    components: {
      TodoList,
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Verdana;
  }

  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 15px;
    background-image: url(assets/bgi.jpg);
  }
</style>

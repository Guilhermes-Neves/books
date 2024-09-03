<template>
  <div id="app">
    <BookGrid />
  </div>
</template>

<script>
import BookGrid from './components/BookGrid.vue';

export default {
  name: 'App',
  components: {
    BookGrid
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

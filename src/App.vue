<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font: 14px/1.5 Helvetica,sans-serif;
  color: #333;
  overflow: auto;
}
#app {
  background-color: #fcfcfd;
  height: 100%;
}
</style>

<template>
  <div id="app">
    <!--<transtion>-->
    <router-view></router-view>
    <!--</transtion>-->

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
  html,body{
    width: 100%;
    height: 100%;
  }
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  width: 100%;
  height: 100%;
}
*{
  margin:0;
  padding:0;
  list-style: none;
}

</style>

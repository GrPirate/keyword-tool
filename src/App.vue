<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/news">News</router-link> |
      <router-link to="/product">Product</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face{
  font-family: 'Nemesis-Grant1';
  src: url('./assets/font/SourceHanSerifSC-Regular.otf');
}
@font-face{
  font-family: 'Nemesis-Grant2';
  src: url('./assets/font/SourceHanSerifSC-ExtraLight.otf');
}
@font-face{
  font-family: 'Nemesis-Grant3';
  src: url('./assets/font/SourceHanSerifSC-Light.otf');
}
@font-face{
  font-family: 'Nemesis-Grant4';
  src: url('./assets/font/SourceHanSerifSC-Medium.otf');
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: 'Nemesis-Grant4';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

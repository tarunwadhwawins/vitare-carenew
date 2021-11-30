<template>
  <div>
  <div v-if="!auth">
    <router-view />
  </div>
  <div v-else>
    <router-view />
  </div>
  </div>
</template>

<script>
// import login from './components/login/login'
// import Dashboard from './components/dashboard/dashboard'
// import {ref} from 'vue'
export default {
  components:{
        // login,
        // Dashboard
    },

    setup () {
      const auth = localStorage.getItem('auth');
      return {
        auth
      }
    }
}
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

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
import {onMounted} from 'vue'
export default {
  components:{
        // login,
        // Dashboard
      
    },

    setup () {
      const auth = localStorage.getItem('auth');
      onMounted(()=>{
         document.body.classList.add('test')
      })
      return {
        auth
      }
    }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>

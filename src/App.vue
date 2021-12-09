<template>
  <div>
    <router-view />
  </div>
</template>

<script>
// import login from './components/login/login'
// import Dashboard from './components/dashboard/dashboard'
import { onMounted } from "vue";
// import Dashboard from './components/dashboard/Dashboard'
// import {ref} from 'vue'
export default {
  components: {
    // login,
    // Dashboard
  },

  setup() {
    const auth = localStorage.getItem("auth");
    onMounted(() => {
      document.body.classList.add("test");
    });
    return {
      auth,
    };
  },
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
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

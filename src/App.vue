<template>
  <div>
    <div class="SelectLanguage">
      <span  for="Select Language">Select Language <SelectLanguage /></span>
    </div>
  <div v-if="!auth">
    <router-view />
    
  </div>
  <div v-else>
    <router-view />
  </div>
  </div>
</template>

<script>

import {onMounted} from 'vue'
import SelectLanguage from "./views/localization/SelectLanguage.vue"
export default {
  components:{
    SelectLanguage
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

.SelectLanguage{
  padding-top:10px;
  text-align: center;
}

</style>

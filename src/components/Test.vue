<template>
  <div class="container">
    

<div>
  <a-button type="primary" @click="showButton1" :class="button==1?'active':''">show-1</a-button>
  <a-button type="primary" @click="showButton2" :class="button==2?'active':''">show-2</a-button>
  <a-button type="primary" @click="showButton3" :class="button==3?'active':''">show-3</a-button>
  <a-button type="primary" @click="showButton4" :class="button==4?'active':''">show-4</a-button>

  <div v-if="button==1" >
    <div>call component-1 here</div>
  </div>
  
  <div v-if="button==2" >
    <div>call component-2 here</div>
  </div>
  
  <div v-if="button==3" >
    <div>call component-3 here</div>
  </div>
  
  <div v-if="button==4" >
    <div>call component-4 here</div>
  </div>
</div>
   
   
 
  </div>
</template>



<script>
 import { ref } from "vue"
 


  export default {

    setup() {
 
      const button = ref(1);

      function showButton1(){
        button.value = 1
      }
      function showButton2(){
        button.value = 2
      }
      function showButton3(){
        button.value = 3
      }
      function showButton4(){
        button.value = 4
      }
      return {
        button,
        showButton1,
        showButton2,
        showButton3,
        showButton4

      };
    },
  }
</script>

<style>
  .active{
    background-color: brown;
  }

  
</style>
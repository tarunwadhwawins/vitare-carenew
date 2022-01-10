

<template>
  <div class="container">
    <div>
      <p v-if="test1">test1   <button @click="close1">X</button></p>
    </div>

    <div>
      <p v-if="test2">test2   <button @click="close2">X</button></p>
    </div>

    <div>
      <p v-if="test3">test3   <button @click="close3">X</button></p>
    </div>
    
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'

  export default {
   
   setup(){

     const test1 = ref(true)
     const test2 = ref(true)
     const test3 = ref(true)
     function close1(){
       test1.value=false
     }
     function close2(){
       test2.value=false
     }
     function close3(){
       test3.value=false
     }
     return{
       test1,
       test2,
       test3,
       close1,
       close2,
       close3,
     }
   }
      
  }
</script>
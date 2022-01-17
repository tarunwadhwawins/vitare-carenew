<template>
    <a-col :span="24">
        <h2 class="pageTittle">
          {{ title}}
          <AddButton :name="button" @click="showModal"/>
        </h2>
      </a-col>
  </template>
  <script>
    import { reactive } from "vue"
  import AddButton from "@/components/common/button/addButton"
    export default {
        components: {
            AddButton,
  },
      props: {
          title:{
              type : String,
          },
          button:{
              type : String,
          },
      },
      setup(props, { emit }){
        const showModal = () => {
            emit("isVisible",true)
    };
      
      return {
        showModal,
      }
    },
    }
  </script>
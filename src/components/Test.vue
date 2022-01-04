<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
    </div>
    <br>
    <div class="large-12 medium-12 small-12 cell">
      <!-- <button v-on:click="addFiles()">Add Files</button> -->
      <h2>This is Employee Dashboard</h2>
    </div>
     <div>
       <a-button type="primary" @click="showModal">Open Modal</a-button>
      <Modal  v-model:visible="visible"   title="Basic Modal" @ok="handleOk"></Modal>
   <!-- <button @click="openModal">Open Modal</button> -->
   
 </div>
    <br>
    <div class="large-12 medium-12 small-12 cell">
      <button v-on:click="logout()">Logout</button>
    </div>
  </div>
</template>



<script>
 import { ref,defineAsyncComponent } from "vue"
 import { useStore } from "vuex"
 import Modal from '@/components/modals/commonModal.vue'

  export default {
    components: {
      Modal
    },
    
    setup() {
      const store = useStore()
      const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      visible.value = false;
    }
      function logout() {
        store.dispatch("logout")
      }
      return {
        logout,
        visible,
        showModal,
        handleOk

      };
    },
  }
</script>

<style>
  input[type="file"]{
    position: absolute;
    top: -500px;
  }
  div.file-listing{
    width: 200px;
  }
  span.remove-file{
    color: red;
    cursor: pointer;
    float: right;
  }
</style>
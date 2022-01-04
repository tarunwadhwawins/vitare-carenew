<template>
    <a-modal >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <a-button type="primary" @click="showModal1">Open Modal</a-button>
      <CopyModal v-if="visible12==true"  v-model:visible="visible12"   title="Basic Modal" @ok="handleOk1"></CopyModal>
    </a-modal>
    
</template>

<script>
import { ref,defineAsyncComponent  } from "vue"
 import { useStore } from "vuex"
// import CopyModal from "./commonModalCopy.vue";
 export default {
     components:{
        CopyModal:defineAsyncComponent(()=> import ("./commonModalCopy.vue"))
     },
     setup() {
      const store = useStore()
      const visible12 = ref(false);

    const showModal1 = () => {
      visible12.value = true;
    };

    const handleOk1 = () => {
      visible12.value = false;
    }
      function logout() {
        store.dispatch("logout")
      }
      return {
        logout,
        visible12,
        showModal1,
        handleOk1

      };
    },
     
 }
</script>
<template>
<div v-if="errorMsg" class=" alert-danger alert-dismissible">
    <button type="button" class="close" @click="closeAlert" data-dismiss="alert">&times;</button>
    {{errorMsg.message}}
</div>

<div v-if="successMsg" class=" alert-success alert-dismissible">
    <button type="button" class="close" @click="closeAlert" data-dismiss="alert">&times;</button>
    {{errorMsg.message}}
</div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "ServerSideMessage",
  setup() {
    const store = useStore();

    const errorMsg = computed(() => {
      return store.state.patients.errorMsg;
    });

    console.log('error',errorMsg)
    console.log('success',successMsg)

    const successMsg = computed(() => {
      return store.state.patients.successMsg;
    });
    function closeAlert() {
      store.state.patients.errorMsg = null;
      store.state.patients.successMsg = null;
    }
    return {
      successMsg,
      errorMsg,
      closeAlert,
    };
  },
};
</script>

<style>
</style>
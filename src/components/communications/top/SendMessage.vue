<template>
  <a-button class="btn primaryBtn" @click="showModal(true)">
    {{ $t('communications.conversation') }}
  </a-button>

  <!-- Modal -->
  <CommunicationsModal v-model:visible="visible" @ok="handleOk" @is-visible="showModal($event)" />
</template>

<script>
import CommunicationsModal from "@/components/modals/CommunicationsModal";
import { ref } from "vue";
export default {
  components: {
    CommunicationsModal,
  },
  setup() {
    const visible = ref(false);
    const showModal = (e) => {
      visible.value = e;
    };

   

    return {
      visible,
      showModal,
      
    }
  }
}
</script>
<template>
  <a-button class="btn primaryBtn" @click="showModal">
    {{ $t('communications.sendMessage') }}
  </a-button>

  <!-- Modal -->
  <CommunicationsModal v-model:visible="CommunicationsModal" @ok="handleOk" />
</template>

<script>
import CommunicationsModal from "@/components/modals/CommunicationsModal";
import { ref } from "vue";
export default {
  components: {
    CommunicationsModal,
  },
  setup() {
    const CommunicationsModal = ref(false);
    const showModal = () => {
      CommunicationsModal.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      CommunicationsModal.value = false;
    };

    return {
      CommunicationsModal,
      showModal,
      handleOk
    }
  }
}
</script>
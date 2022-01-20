<template>
  <a-button class="btn primaryBtn" @click="showModal">
    {{ $t('communications.sendMessage') }}
  </a-button>

  <!-- Modal -->
  <CommunicationsModal v-model:visible="visible" @ok="handleOk" @is-visible="handleOk" />
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
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    return {
      visible,
      showModal,
      handleOk
    }
  }
}
</script>
<template>
  <!-- <a-row class="mb-24"> -->
  <a-col :span="24">
    <h2 class="pageTittle">
      {{ heading }}
      <div class="commonBtn">
        <a-button class="btn primaryBtn" @click.prevent="showModal">{{
          buttonText
        }}</a-button>
      </div>
    </h2>
  </a-col>
  <!-- </a-row> -->

  <!-- Modal -->
  <a-modal
    v-model:visible="visible"
    max-width="1140px"
    width="100%"
    :title="buttonText"
    centered
    @ok="handleOk"
    :footer="null"
  >
    <AddCommunicationModal v-if="modalScreen == 'communication'"></AddCommunicationModal>
    <CareCoordinatorModal v-if="modalScreen == 'coordinator'"></CareCoordinatorModal>
  </a-modal>
</template>

<script>
import { ref } from "vue";
import AddCommunicationModal from "@/components/common/modals/AddCommunicationModal";
import CareCoordinatorModal from "@/components/common/modals/CareCoordinatorModal";
export default {
  props: {
    heading: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
    },
    modalScreen: {
      type: String,
    },
  },
  components: {
    AddCommunicationModal,
    CareCoordinatorModal,
  },

  setup() {
    const visible = ref(false);
    const showModal = () => {
      localStorage.setItem("personalData", true);
      // localStorage.removeItem('personalData');
      localStorage.removeItem("coordinatorId");
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    return {
      visible,
      showModal,
      handleOk,
      handleChange,
      options: [...Array(3)].map((i) => ({
        value: (i + 10).toString(36) + (i + 1),
      })),
    };
  },
};
</script>
<style>
.pageTittle .commonBtn {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

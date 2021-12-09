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

      <div class="filter" v-if="heading === 'Dashboard'">
        <button class="btn active"><span class="btn-content">Day</span></button>
        <button class="btn"><span class="btn-content">Week</span></button>
        <button class="btn"><span class="btn-content">Month</span></button>
      </div>
    </h2>
  </a-col>
  <!-- </a-row> -->

  <!-- Modal -->
  <a-modal v-model:visible="visible" max-width="1140px" width="100%" :title="buttonText" centered @ok="handleOk" @cancel="handleCancel"
    :footer="null">
    <AddCommunicationModal v-if="modalScreen == 'communication'"></AddCommunicationModal>
    <CareCoordinatorModal v-if="modalScreen == 'coordinator'"></CareCoordinatorModal>
  </a-modal>
</template>

<script>
import { ref, watch } from "vue";
import AddCommunicationModal from "@/components/common/modals/AddCommunicationModal";
import CareCoordinatorModal from "@/components/common/modals/CareCoordinatorModal";
export default {
  props: {
    visibility: {
      type: Boolean,
      required: true,
    },
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

  setup(props, {emit}) {
    const visible = ref(false);
    const showModal = () => {
      localStorage.removeItem('is_update_coordinator');
      localStorage.removeItem('personalData');
      visible.value = true;
    };

    const handleCancel = () => {
      visible.value = false;
      localStorage.setItem('is_update_coordinator', false)
      localStorage.removeItem('coordinatorId')
      emit('is-visible', false)
    };

      const handleOk = (e) => {
        console.log(e);
        visible.value = false;
      };

      const handleChange = (value) => {
        console.log(`selected ${value}`);
      };

    watch(() => {
      // localStorage.removeItem('is_update_coordinator');
      // alert('Modal Visibility Props : '+ props.visibility)
      visible.value = props.visibility;
      console.log('In Watch!!!!!!!!!!!!')
    })

    return {
      visible,
      showModal,
      handleCancel,
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
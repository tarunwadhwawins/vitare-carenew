
<template>
<a-modal max-width="1140px" width="70%" title="Patient Details" centered :footer="false" :maskClosable="false" @cancel="handleOk" >
<a-row :gutter="24">
    <a-col :sm="24" :xs="24">
      <ChatRightPanel :idPatient="patientUdid" :communication="communication" :isChat="true" :isDetails ="true" />
    </a-col>
    </a-row>
    <Loader/>
</a-modal>

</template>
<script>

import {
  computed,
  defineComponent,
} from "vue";
import Loader from "@/components/loader/Loader.vue";
import ChatRightPanel from "@/components/common/communications/ChatRightPanel"
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Loader,
    ChatRightPanel
  },
  setup() {
    const store = useStore();
    const patientUdid = computed(() => {
      return store.state.patients.patientUdid;
    });

    const communication = computed(() => {
      return store.state.communications.conversationsList
    })

    function handleOk(){
      store.commit('closeStaffDetailsModal')
      store.commit('closePatientDetailsModal')
    }

    return {
      communication,
      patientUdid,
      handleOk,
    };
  },
});
</script>


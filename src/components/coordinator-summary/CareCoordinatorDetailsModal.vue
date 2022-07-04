
<template>
<a-modal max-width="1140px" width="40%" title="Care-Coordinator Details" centered :footer="false" :maskClosable="false" @cancel="handleOk" >
<a-row :gutter="24">
    <a-col :sm="24" :xs="24">
        <div class="patientInfo">
            <div class="patientImg">
                <img src="@/assets/images/userAvatar.png" alt="image" />
                <div class="info" v-if="getstaffSummary">
                    <p>Name: {{getstaffSummary.fullName}}</p>
                    <p>Designation : {{getstaffSummary.designation}}</p>
                    <p class="overflow-wrap" :title="getstaffSummary.email"><a href="mailto:{{getstaffSummary.email}}">
                            <MailOutlined /> {{ getstaffSummary?getstaffSummary.email.length>15?getstaffSummary.email.substring(0,14)+'...':getstaffSummary.email:'' }}</a></p>
                    <p>
                        <a v-if="getstaffSummary.extension" :href="`tel:${getstaffSummary.phoneNumber+getstaffSummary.extension}`">
                            <PhoneOutlined :rotate="90" /> {{ getstaffSummary.phoneNumber }} {{getstaffSummary?.extension?'('+getstaffSummary.extension+')':''}}
                        </a>
                        <a v-else :href="`tel:${getstaffSummary.phoneNumber}`">
                            <PhoneOutlined :rotate="90" /> {{ getstaffSummary.phoneNumber }}
                        </a>
                    </p>
                </div>

            </div>
            <div class="pat-profile" v-if="getstaffSummary">
                <div class="pat-profile-inner">
                    <div class="thumb-head">Gender</div>
                    <div class="thumb-desc">{{getstaffSummary.gender}}</div>
                </div>
                <div class="pat-profile-inner">
                    <div class="thumb-head">Specialization</div>
                    <div class="thumb-desc">{{getstaffSummary.specialization}}</div>
                </div>
                <div class="pat-profile-inner">
                    <div class="thumb-head">Network</div>
                    <div class="thumb-desc">{{getstaffSummary.network}}</div>
                </div>
                <div class="pat-profile-inner">
                    <div class="thumb-head">Status</div>
                    <div class="thumb-desc">{{getstaffSummary?getstaffSummary.isActive==true?'Active':'Inactive':''}}</div>
                </div>
            </div>
        </div>
    </a-col>
    </a-row>
    <TableLoader/>
</a-modal>

</template>
<script>

import {
  computed,
  defineComponent,
} from "vue";
import {
  // DeleteOutlined,
  
  MailOutlined,
  PhoneOutlined,
  // KeyOutlined
} from "@ant-design/icons-vue";
import TableLoader from "@/components/loader/TableLoader.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    MailOutlined,
    PhoneOutlined,
    TableLoader
  },
  setup() {
    const store = useStore();
    const getstaffSummary = computed(() => {
      return store.state.careCoordinatorSummary.staffSummary;
    });

    function handleOk(){
      store.commit('closeStaffDetailsModal')
    }

    return {
      handleOk,
      getstaffSummary
    };
  },
});
</script>

<style lang="scss">
.resetPass {
  position: absolute;
  right: 40px;
  top: 13px;
  z-index: 1;
}

.editIcon {
  position: absolute;
  right: 10px;
  top: 13px;
  z-index: 1;

  span {
    svg {
      font-size: 22px;
    }
  }
}
</style>

<template>
<a-modal width="45%" title="Appointment Details" centered :footer="null" :maskClosable="false" zIndex="1060">
    <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
            <div class="form-group">
                <div class="calendarDropdown notificationModal">
                    <div class="itemWrapper">
                        <div class="leftWrapper">Appointment Type</div>
                        <div class="rightWrapper">{{appointmentDetails?.appointmentType}}</div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Date Time</div>
                        <div class="rightWrapper">
                            {{ dateAndTimeFormate(appointmentDetails?.startDateTime,'MMM DD, yyyy hh:mm A')}}
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Care Coordinator</div>
                        <div class="rightWrapper">
                            {{appointmentDetails?.staff}}
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Patient</div>
                        <div class="rightWrapper">
                            {{appointmentDetails?.patient}}
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Start Time</div>
                        <div class="rightWrapper">{{ dateAndTimeFormate(appointmentDetails?.startTime,'hh:mm A') }}</div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Duration</div>
                        <div class="rightWrapper">{{ appointmentDetails?.duration }}</div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Status</div>
                        <div class="rightWrapper">{{ appointmentDetails?.status }}</div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">flag</div>
                        <div class="rightWrapper">
                           <a-tooltip placement="top" :title="appointmentDetails?.flagName">
                            <span class="box" :style="{ 'background-color': appointmentDetails?.flagColor}"></span>
                           </a-tooltip>
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Note</div>
                        <div class="rightWrapper">{{ appointmentDetails?.notes }}</div>
                    </div>

                </div>

            </div>
        </a-col>
        <a-col :sm="24" :xs="24">
            <div class="text-right mt-28" v-if="appointmentDetails?.statusId==144">
                <a-button type="primary" style="margin-right: 8px" @click="accept(appointmentDetails?.udid,155)">{{'Accept'}}</a-button>
                <a-button @click="reject()">{{'Reject'}}</a-button>
            </div>
        </a-col>
    </a-row>
    <a-row>
      <RejectAppointment v-if="visibleRejectAppt" v-model:visible="visibleRejectAppt" :Id="appointmentDetails?.udid" :statusId="141" @closeModal="closeInnerModal(event)" />
    </a-row>
    <Loader />
</a-modal>
</template>

<script>
import { ref } from "vue"
import { useStore } from "vuex";
import { dateAndTimeFormate } from "@/commonMethods/commonMethod";
import Swal from "sweetalert2";
import Loader from '@/components/loader/Loader.vue';
// import RejectAppointment from './RejectAppointment.vue';
import { defineAsyncComponent, defineComponent } from "vue-demi";
export default defineComponent({
  name:"AppintmentDetails",
  components: {
    Loader,
    RejectAppointment:defineAsyncComponent(()=>import("@/components/modals/RejectAppointment.vue"))
  },
  setup(props, { emit }) {

    const store = useStore();

    const visibleRejectAppt = ref(false)
   
    function accept(id, statusId) {
      Swal.fire({
        title: "Are you sure want to accept ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((response) => {
        if (response.isConfirmed) {
          store.dispatch("appintmentStatus", { id: id, statusId: statusId,cancellationNote:null });
          emit("closeModal", false);
        }
      });
    }

    function reject() {
      visibleRejectAppt.value=true
    }

    const closeInnerModal=(status)=>{
      visibleRejectAppt.value =status
      emit("closeModal", false);
    }

    return {
      closeInnerModal,
      dateAndTimeFormate,
      appointmentDetails: store.getters.appointmentDetails,
      accept,
      reject,
      visibleRejectAppt
    };
  },
});
</script>
<style lang="scss" scoped>
.notificationModal {
  width: 100%!important;
  .itemWrapper {
    align-items: flex-start!important;
    .leftWrapper {
      padding: 0 10px 0 0;
      width: 35%;
      
    }
    .rightWrapper {
      padding: 0 0 0 10px;
      width: 65%;
      text-align: right;
    }
  }
}

</style>
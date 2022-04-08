<template>
<a-modal width="400px" title="Appointment Details" centered :footer="null" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
            <div class="form-group">
                <div class="calendarDropdown">
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
                        <div class="leftWrapper">Coordinator</div>
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
                          <span class="box" :style="{ 'background-color': appointmentDetails?.flagColor}"></span>
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
                <a-button @click="reject(appointmentDetails?.udid,141)">{{'Reject'}}</a-button>
            </div>
        </a-col>
    </a-row>
</a-modal>
</template>

<script>
import { useStore } from "vuex";
import { dateAndTimeFormate } from "@/commonMethods/commonMethod";
import Swal from "sweetalert2";
export default {
  components: {},
  setup(props, { emit }) {
    const store = useStore();
   

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
          store.dispatch("appintmentStatus", { id: id, statusId: statusId });
          emit("closeModal", false);
        }
      });
    }

    function reject(id, statusId) {
        Swal.fire({
          title: "Are you sure want to reject ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((response) => {
          if (response.isConfirmed) {
            store.dispatch("appintmentStatus", { id: id, statusId: statusId });
            emit("closeModal", false);
          }
        });
      
    }

    return {
      dateAndTimeFormate,
      appointmentDetails: store.getters.appointmentDetails,
      accept,
      reject,
    };
  },
};
</script>

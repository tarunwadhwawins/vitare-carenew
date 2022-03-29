
<template>
<a-modal title="Add New Physician" :maskClosable="maskebale" @cancel="closeModal()">
    <a-form ref="formRef" :model="physicianForm" layout="vertical" @finish="addPhysician" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <a-col :sm="24" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('appointmentCalendar.physician')" name="staffId" :rules="[{ required: true, message: $t('appointmentCalendar.physician')+' '+$t('global.validation')  }]"> 
                        <!-- <a-select ref="select" v-if="staffList.allStaffList" v-model:value="physicianForm.staffId" style="width: 100%" size="large">
                            <a-select-option value="" hidden>{{'Select Staff'}}</a-select-option>
                            <a-select-option v-for="staff in staffList.allStaffList" :key="staff.id" :value="staff.id">{{ staff.fullName }}
                            </a-select-option>
                        </a-select> -->
                        <StaffDropDown v-if="staffList.allStaffList"  v-model:value="physicianForm.staffId" @handleStaffChange="handleStaffChange($event)"/>
                    </a-form-item>
                </div>
            </a-col>
            <a-col>
                <div class="steps-action">
                    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                        <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.add')}}</a-button>
                    </a-form-item>
                </div>
            </a-col>
        </a-row>
    </a-form>
</a-modal>
</template>
<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { arrayToObjact } from "@/commonMethods/commonMethod";
import StaffDropDown from "@/components/modals/search/StaffDropdownSearch.vue";
export default {
  props: {},
  components:{
      StaffDropDown,
  },
  setup(props, { emit }) {
    const options = ref([
      {
        value: "Steve Smith",
        label: "Steve Smith",
      },
      {
        value: "Robert Henry",
        label: "Robert Henry",
      },
      {
        value: "Smith Joseph",
        label: "Smith Joseph",
      },
      {
        value: "Jane Doe",
        label: "Jane Doe",
      },
    ]);
    const store = useStore();
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const handleBlur = () => {
    };

    const handleFocus = () => {
    };

    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const staffList = store.getters.commonRecords.value;

    const physicianForm = reactive({
      staffId: "",
    });
    const addPhysician = () => {
      store.dispatch("staffSummary", physicianForm.staffId).then(() => {
        addStaff(physicianForm.staffId);
      });
    };
    const form = reactive({
      ...physicianForm,
    });

    function addStaff(event) {
      Object.assign(physicianForm, form);
      //console.log(store.getters.appointmentRecords.value.getStaff)
      let objact = arrayToObjact(
        store.getters.appointmentRecords.value.getStaff,
        event
      );
      if (!objact) {
        store.dispatch(
          "getStaffs",
          store.state.careCoordinatorSummary.staffSummary
        );
      }

      emit("is-visible", false);
    }
    function closeModal() {
      Object.assign(physicianForm, form);
      emit("is-visible", false);
    }

    const handleStaffChange = (val) => {
      physicianForm.staffId = val;
    };

    return {
      handleStaffChange,
      value: ref(undefined),
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      options,
      staffList,
      physicianForm,
      addPhysician,
      closeModal,
    };
  },
};
</script>

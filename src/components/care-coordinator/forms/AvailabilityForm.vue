<template>
  <a-form ref="formRef" :rules="rules" :model="availabilityForm">
    <a-row :gutter="24">

      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Start Time</label>
          <a-select v-model:value="availabilityForm.start_time" style="width: 100%" size="large">
            <a-select-option hidden>Choose Start Time</a-select-option>
            <a-select-option value="08:00:00">08:00 AM</a-select-option>
            <a-select-option value="08:30:00">08:30 AM</a-select-option>
            <a-select-option value="09:00:00">09:00 AM</a-select-option>
            <a-select-option value="09:30:00">09:30 AM</a-select-option>
            <a-select-option value="10:00:00">10:00 AM</a-select-option>
            <a-select-option value="10:30:00">10:30 AM</a-select-option>
            <a-select-option value="11:00:00">11:00 AM</a-select-option>
          </a-select>
          <a-form-item name="start_time"/>
        </div>
      </a-col>

      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>End Time</label>
          <a-select v-model:value="availabilityForm.end_time" style="width: 100%" size="large">
            <a-select-option hidden>Choose End Time</a-select-option>
            <a-select-option value="02:00:00">02:00 PM</a-select-option>
            <a-select-option value="02:30:00">02:30 PM</a-select-option>
            <a-select-option value="03:00:00">03:00 PM</a-select-option>
            <a-select-option value="03:30:00">03:30 PM</a-select-option>
            <a-select-option value="04:00:00">04:00 PM</a-select-option>
            <a-select-option value="04:30:00">04:30 PM</a-select-option>
            <a-select-option value="05:00:00">05:00 PM</a-select-option>
            <a-select-option value="05:30:00">05:30 PM</a-select-option>
          </a-select>
          <a-form-item name="end_time"/>
        </div>
      </a-col>
      
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :span="24">
        <button class="btn primaryBtn" @click="addCareCoordinatorAvailability">Add</button>
      </a-col>
    </a-row>
    <loading
      :active="isLoading" 
      loader="bars"
      lock-scroll="true"
      is-full-page="true"
      transition="fade"
      :can-cancel="false"/>
  </a-form>
</template>

<script>
  import { reactive, ref } from 'vue';
  import moment from "moment";
  import { useStore } from "vuex"
  import Loading from 'vue-loading-overlay';
  export default {
    components: {
      Loading,
    },
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    updated() {
      const formData = this.data
      console.log('Updated : ', formData)
      const duration = moment.duration(formData.start_time);
      console.log(duration)
      console.log(duration.hours() + ':' + duration.minutes())
      this.availabilityForm.start_time = formData.start_time;
      this.availabilityForm.end_time = formData.end_time;
      this.availabilityForm.id = formData.id;
    },
    setup() {
      const isLoading = ref(false);
      const store = useStore()
      const formRef = ref();
      const coordinatorId = localStorage.getItem('coordinatorId')
      const rules = {
        start_time: [{
          required: true,
          message: 'Please select Start Time',
          trigger: 'blur',
        }],
        end_time: [{
          required: true,
          message: 'Please select End Time',
          trigger: 'blur',
        }],
      };
      const availabilityForm = reactive({
        start_time: null,
        end_time: null,
        care_coordinator_id: coordinatorId,
      })
      const addCareCoordinatorAvailability = () => {
        formRef.value.validate().then(() => {
          isLoading.value = true
          store.dispatch("addCareCoordinatorAvailability", availabilityForm).then(() => {
            store.dispatch("getCoordinatorAvailabilities", coordinatorId).then(() => {
              localStorage.removeItem('availabilityId')
              formRef.value.resetFields();
              isLoading.value = false
            })
          })
        }).catch(error => {
          console.log('error', error);
        });
      }
      return {
        isLoading,
        formRef,
        rules,
        availabilityForm,
        addCareCoordinatorAvailability
      }
    },
  }
</script>
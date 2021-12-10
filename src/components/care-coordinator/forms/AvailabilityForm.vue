<template>
  <Form :model="availabilityForm" @submit="addCareCoordinatorAvailability" :validation-schema="schema">
    <a-row :gutter="24">

      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Start Time</label>
          <Field as="select"
            class="ant-input ant-input-lg"
            v-model="availabilityForm.start_time"
            name="start_time">
            <option hidden>Choose start Time</option>
            <option value="08:00:00">08:00 AM</option>
            <option value="08:30:00">08:30 AM</option>
            <option value="09:00:00">09:00 AM</option>
            <option value="09:30:00">09:30 AM</option>
            <option value="10:00:00">10:00 AM</option>
            <option value="10:30:00">10:30 AM</option>
            <option value="11:00:00">11:00 AM</option>
          </Field>
          <ErrorMessage class="error" name="start_time" />
        </div>
      </a-col>

      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>End Time</label>
          <Field as="select"
            class="ant-input ant-input-lg"
            v-model="availabilityForm.end_time"
            name="end_time"  >
            <option value="lucy">Choose End Time</option>
            <option value="02:00:00">02:00 PM</option>
            <option value="02:30:00">02:30 PM</option>
            <option value="03:00:00">03:00 PM</option>
            <option value="03:30:00">03:30 PM</option>
            <option value="04:00:00">04:00 PM</option>
            <option value="04:30:00">04:30 PM</option>
            <option value="05:00:00">05:00 PM</option>
            <option value="05:30:00">05:30 PM</option>
          </Field>
          <inut type="hidden" v-model="availabilityForm.id" name="id" value=""/>
          <ErrorMessage class="error" name="end_time" />
        </div>
      </a-col>
      
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :span="24">
        <button class="btn primaryBtn">Add</button>
      </a-col>
    </a-row>
  </Form>
</template>

<script>
  import { reactive } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { configure } from 'vee-validate';
  import moment from "moment";
  import { useStore } from "vuex"
  // Default values
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
  });
  export default {
    components: {
      Form,
      Field,
      ErrorMessage,
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
    data() {
      const schema = yup.object({
        start_time: yup.string().required().label("Start Time"),
        end_time: yup.string().required().label("End Time"),
      });
      return {
        schema,
      }
    },
    setup() {
      const store = useStore()
      const availabilityId = JSON.parse(localStorage.getItem('availabilityId'));
      const availabilityForm = reactive({
        start_time: null,
        end_time: null,
        care_coordinator_id: JSON.parse(localStorage.getItem('coordinatorId')),
        availabilityId: availabilityId ? availabilityId : null,
      })
      const addCareCoordinatorAvailability = () => {
        store.dispatch("addCareCoordinatorAvailability", availabilityForm)
      }
      return {
        availabilityForm,
        addCareCoordinatorAvailability
      }
    },
  }
</script>
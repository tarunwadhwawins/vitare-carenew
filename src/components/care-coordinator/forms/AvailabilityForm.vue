<template>
  <Form :model="availabilityForm" @submit="addCareCoordinatorAvailability" :validation-schema="schema">
    <a-row :gutter="24">

      <a-col :span="12">
        <div class="form-group">
          <label>Start Time</label>
          <Field as="select"
            class="ant-input ant-input-lg"
            v-model="availabilityForm.start_time"
            name="start_time">
            <option hidden>Choose start Time</option>
            <option value="08:00">08:00 AM</option>
            <option value="08:30">08:30 AM</option>
            <option value="09:00">09:00 AM</option>
            <option value="09:30">09:30 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="10:30">10:30 AM</option>
            <option value="11:00">11:00 AM</option>
          </Field>
          <ErrorMessage class="error" name="start_time" />
        </div>
      </a-col>

      <a-col :span="12">
        <div class="form-group">
          <label>End Time</label>
          <Field as="select"
            class="ant-input ant-input-lg"
            v-model="availabilityForm.end_time"
            name="end_time"  >
            <option value="lucy">Choose End Time</option>
            <option value="02:00">02:00 PM</option>
            <option value="02:30">02:30 PM</option>
            <option value="03:00">03:00 PM</option>
            <option value="03:30">03:30 PM</option>
            <option value="04:00">04:00 PM</option>
            <option value="04:30">04:30 PM</option>
            <option value="05:00">05:00 PM</option>
            <option value="05:30">05:30 PM</option>
          </Field>
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
  import { toRaw } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { configure } from 'vee-validate';
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
    data() {
      const schema = yup.object({
        start_time: yup.string().required().label("Start Time"),
        end_time: yup.string().required().label("End Time"),
      });
      return {
        schema,
        availabilityForm: {
          start_time: '',
          end_time: '',
          // care_coordinator_id: 1,
        }
      }
    },
    methods: {
      addCareCoordinatorAvailability() {
        const contact = toRaw(this.availabilityForm);
        this.$store.dispatch("addCareCoordinatorAvailability", { 
          start_time: contact.start_time,
          end_time: contact.end_time,
          care_coordinator_id: 3,
        })
        .then((res) => { 
          console.log(res);
        },
        (error) => {
          this.loading = false;
          this.message = (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) ||
          error.message ||
          error.toString();
        });
      }
    }
  }
</script>
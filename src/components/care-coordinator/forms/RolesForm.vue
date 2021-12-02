<template>
  <Form :model="rolesForm" @submit="addCareCoordinatorRole" :validation-schema="schema">
    <a-row :gutter="24">
      <a-col :span="24">
        <div class="form-group">
          <label>Role</label>
          <Field as="select" class="ant-input ant-input-lg"
            v-model="rolesForm.access_id"
            name="access_id"
            mode="multiple"
            placeholder="Please select">
            <option value="1">Client</option>
          </Field>
          <ErrorMessage class="error" name="access_id" />
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
        access_id: yup.string().required().label("Role"),
      });
      return {
        schema,
        rolesForm: {
          access_id: '',
          // care_coordinator_id: 1,
        }
      }
    },
    methods: {
      addCareCoordinatorRole() {
        const contact = toRaw(this.rolesForm);
        console.log(contact)
        this.$store.dispatch("addCareCoordinatorRole", { 
          access_id: contact.access_id,
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
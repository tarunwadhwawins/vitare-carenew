<template>
  <Form :model="rolesForm" @submit="addCareCoordinatorRole" :validation-schema="schema">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Role</label>
          <Field as="select" class="ant-input ant-input-lg"
            v-model="rolesForm.role_name[0]"
            name="role_name"
            mode="multiple"
            placeholder="Please select">
            <option value="1">Billing</option>
            <option value="2">Messages</option>
          </Field>
          <ErrorMessage class="error" name="role_name" />
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :sm="12" :xs="24">
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
        role_name: yup.string().required().label("Role"),
      });
      return {
        schema,
        rolesForm: {
          role_name: [],
        }
      }
    },
    methods: {
      addCareCoordinatorRole() {
        const roles = toRaw(this.rolesForm);
        this.$store.dispatch("addCareCoordinatorRole", { 
          role: roles.role_name,
          care_coordinator_id: JSON.parse(localStorage.getItem('coordinatorId')),
        })
        .then((res) => { 
          console.log(res);
        },
        (error) => {
          console.log(error)
          this.isLoading = false;
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
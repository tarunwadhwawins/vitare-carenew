<template>
  <Form :model="rolesForm" @submit="addCareCoordinatorRole" :validation-schema="schema">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Role</label>
          <Field as="select" class="ant-input ant-input-lg" multiple="true"
            v-model="rolesForm.role"
            name="role"
            mode="multiple"
            placeholder="Please select">
            <option value="1">Billing</option>
            <option value="2">Messages</option>
          </Field>
          <inut type="hidden" v-model="rolesForm.id" name="id" value=""/>
          <ErrorMessage class="error" name="role" />
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
  import { reactive  } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { configure } from 'vee-validate';
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
    data() {
      const schema = yup.object({
        // role: yup.string().required().label("Role"),
      });
      return {
        schema,
      }
    },
    setup() {
      const store = useStore()
      const roleId = JSON.parse(localStorage.getItem('roleId'));
      const rolesForm = reactive({
        role: [],
        care_coordinator_id: JSON.parse(localStorage.getItem('coordinatorId')),
        roleId: roleId ? roleId : null,
      })
      const addCareCoordinatorRole = () => {
        store.dispatch("addCareCoordinatorRole", rolesForm)
      }
      return {
        rolesForm,
        addCareCoordinatorRole
      }
    },
  }
</script>
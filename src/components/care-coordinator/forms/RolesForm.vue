<template>
  <a-form ref="formRef" :rules="rules" :model="rolesForm" @submit="addCareCoordinatorRole">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Role(s)</label>
          <a-select v-model:value="rolesForm.role" style="width: 100%" size="large">
            <a-select-option hidden>Choose Role</a-select-option>
            <a-select-option value="1">Billing</a-select-option>
            <a-select-option value="2">Messages</a-select-option>
          </a-select>
          <a-form-item name="role"/>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :sm="12" :xs="24">
        <button class="btn primaryBtn">Add</button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
  import { reactive, ref } from 'vue';
  import { useStore } from "vuex"
  export default {
    setup() {
      const store = useStore()
      const formRef = ref();
      const rules = {
        role: [{
          required: true,
          message: 'Please select Role(s)',
          trigger: 'blur',
        }],
      };
      const roleId = JSON.parse(localStorage.getItem('roleId'));
      const rolesForm = reactive({
        role: [],
        care_coordinator_id: JSON.parse(localStorage.getItem('coordinatorId')),
        roleId: roleId ? roleId : null,
      })
      const addCareCoordinatorRole = () => {
        formRef.value.validate().then(() => {
          store.dispatch("addCareCoordinatorRole", rolesForm)
        }).catch(error => {
          console.log('error', error);
        });
      }
      return {
        formRef,
        rules,
        rolesForm,
        addCareCoordinatorRole
      }
    },
  }
</script>
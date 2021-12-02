<template>
  <a-form :model="rolesForm" @submit.prevent="addCareCoordinatorRole">
    <a-row :gutter="24">
      <a-col :span="24">
        <div class="form-group">
          <label>Role</label>
          <select class="ant-input ant-input-lg"
            v-model="rolesForm.access_id"
            mode="multiple"
            style="width: 100%"
            placeholder="Please select"
            :options="options"
            @change="handleChange">
            <option value="1">Client</option>
          </select>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :span="24">
        <button class="btn primaryBtn">Add</button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
  import { toRaw } from 'vue';
  export default {
    data() {
      return {
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
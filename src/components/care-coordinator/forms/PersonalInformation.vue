<template>
  <a-form :model="personalInformationForm" @submit="addCareCoordinator">
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="form-group">
          <label>First Name</label>
          <input class="ant-input ant-input-lg" v-model="personalInformationForm.first_name" size="large" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Last Name</label>
          <input class="ant-input ant-input-lg" v-model="personalInformationForm.last_name" size="large" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Designation</label>
          <input class="ant-input ant-input-lg" v-model="personalInformationForm.designation" size="large" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label> Gender</label>
          <select
            ref="select"
            class="ant-input ant-input-lg" v-model="personalInformationForm.gender_id"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Others</option>
          </select>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Email</label>
          <input class="ant-input ant-input-lg" v-model="personalInformationForm.email" size="large" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Phone No</label>
          <input class="ant-input ant-input-lg" v-model="personalInformationForm.phone_no" size="large" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Specialization</label>
          <select
            ref="select"
            class="ant-input ant-input-lg" v-model="personalInformationForm.specialization_id"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <option value="1">Wellness</option>
            <option value="2">Behavior</option>
          </select>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Network</label>
          <select
            ref="select"
            class="ant-input ant-input-lg" v-model="personalInformationForm.network_id"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <option value="0">In</option>
            <option value="1">Out</option>
          </select>
        </div>
      </a-col>
      <a-col :span="24">
        <button type="primary" class="btn primaryBtn">Add</button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
  import { toRaw } from 'vue';
  export default {
    data() {
      return {
        personalInformationForm: {
          first_name: '',
          last_name: '',
          designation: '',
          gender_id: '',
          email: '',
          phone_no: '',
          specialization_id: '',
          network_id: '',
        }
      }
    },
    methods: {
      addCareCoordinator() {
        const coordinator = toRaw(this.personalInformationForm);
        console.log("Coordinator", coordinator.first_name);
        this.$store.dispatch("addCareCoordinator", { 
          first_name: coordinator.first_name,
          last_name: coordinator.last_name,
          designation: coordinator.designation,
          gender_id: coordinator.gender_id,
          email: coordinator.email,
          phone_no: coordinator.phone_no,
          specialization_id: coordinator.specialization_id,
          network_id: coordinator.network_id
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
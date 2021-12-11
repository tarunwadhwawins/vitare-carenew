<template>
  <a-form ref="formRef" :rules="rules" :model="personalInformationForm" @submit="addCareCoordinator">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>First Name</label>
          <a-input size="large" v-model:value="personalInformationForm.first_name" />
          <a-form-item ref="first_name" name="first_name"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Last Name</label>
          <a-input size="large" v-model:value="personalInformationForm.last_name" />
          <a-form-item ref="name" name="last_name"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Designation</label>
          <a-input size="large" v-model:value="personalInformationForm.designation" />
          <a-form-item ref="name" name="designation"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Gender</label>
          <a-select v-model:value="personalInformationForm.gender" style="width: 100%" size="large">
            <a-select-option hidden>Choose Gender</a-select-option>
            <a-select-option value="1">Male</a-select-option>
            <a-select-option value="2">Female</a-select-option>
            <a-select-option value="3">Other</a-select-option>
          </a-select>
          <a-form-item ref="gender" name="gender"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Email</label>
          <a-input size="large" v-model:value="personalInformationForm.email" />
          <a-form-item ref="name" name="email"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Phone No.</label>
          <a-input size="large" v-model:value="personalInformationForm.phone_no" />
          <a-form-item ref="name" name="phone_no"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Specialization</label>
          <a-select v-model:value="personalInformationForm.specialization" style="width: 100%" size="large">
            <a-select-option hidden>Choose Specialization</a-select-option>
            <a-select-option value="1">Wellness</a-select-option>
            <a-select-option value="2">Behavior</a-select-option>
          </a-select>
          <a-form-item name="specialization"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Network</label>
            <a-select v-model:value="personalInformationForm.network" style="width: 100%" size="large">
              <a-select-option hidden>Choose Network</a-select-option>
              <a-select-option value="1">In</a-select-option>
              <a-select-option value="1">Out</a-select-option>
            </a-select>
          <a-form-item name="network"/>
        </div>
      </a-col>
      
      <a-col :span="24">
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
        first_name: [{
          required: true,
          message: 'Please enter First Name',
          trigger: 'blur',
        }],
        last_name: [{
          required: true,
          message: 'Please enter Last Name',
          trigger: 'blur',
        }],
        designation: [{
          required: true,
          message: 'Please enter Designation',
          trigger: 'blur',
        }],
        gender: [{
          required: true,
          message: 'Please select Gender',
          trigger: 'blur',
        }],
        email: [{
          required: true,
          message: 'Please enter Email',
          trigger: 'blur',
        }],
        phone_no: [{
          required: true,
          message: 'Please enter Phone Number',
          trigger: 'blur',
        }, {
          min: 10,
          max: 13,
          message: 'Phone NUmber Length should be between 10 to 13',
          trigger: 'blur',
        }],
        specialization: [{
          required: true,
          message: 'Please select Specialization',
          trigger: 'blur',
        }],
        network: [{
          required: true,
          message: 'Please select Network',
          trigger: 'blur',
        }],
      };
      const personalInformationForm = reactive({
        first_name: null,
        last_name: null,
        designation: null,
        gender: null,
        email: null,
        phone_no: null,
        specialization: null,
        network: null,
      })
      const addCareCoordinator = () => {
        formRef.value.validate().then(() => {
          store.dispatch("addCareCoordinator", personalInformationForm)
        }).catch(error => {
          console.log('error', error);
        });
      }

      return {
        formRef,
        rules,
        personalInformationForm,
        addCareCoordinator
      }
    },
  }
</script>

<style>
.ant-form-item-control-input {
  display: none !important;
}
</style>

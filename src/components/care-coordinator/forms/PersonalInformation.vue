<template>
  <Form ref="personalInformationForm" :model="personalInformationForm" @submit="addCareCoordinator" :validation-schema="schema">
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="form-group">
          <label>First Name</label>
          <Field class="ant-input ant-input-lg" v-model="personalInformationForm.first_name" :value="firstName" name="first_name" size="large" />
          <ErrorMessage class="error" name="first_name" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Last Name</label>
          <Field class="ant-input ant-input-lg" v-model="personalInformationForm.last_name" name="last_name" size="large" />
          <ErrorMessage class="error" name="last_name" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Designation</label>
          <Field class="ant-input ant-input-lg" v-model="personalInformationForm.designation" name="designation" size="large" />
          <ErrorMessage class="error" name="designation" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label> Gender</label>
          <Field class="ant-input ant-input-lg" name="gender" as="select"
            v-model="personalInformationForm.gender"
            style="width: 100%"
            size="large">
            <option value="" hidden>Choose Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Others</option>
          </Field>
          <ErrorMessage class="error" name="gender" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Email</label>
          <Field class="ant-input ant-input-lg" v-model="personalInformationForm.email" name="email" size="large" />
          <ErrorMessage class="error" name="email" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Phone No</label>
          <Field class="ant-input ant-input-lg" v-model="personalInformationForm.phone_no" name="phone_no" size="large" />
          <ErrorMessage class="error" name="phone_no" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Specialization</label>
          <Field class="ant-input ant-input-lg" name="specialization" as="select"
            v-model="personalInformationForm.specialization"
            style="width: 100%"
            size="large">
            <option value="1">Wellness</option>
            <option value="1">Behavior</option>
          </Field>
          <ErrorMessage class="error" name="specialization" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Network</label>
          <Field class="ant-input ant-input-lg" name="network" as="select"
            v-model="personalInformationForm.network"
            style="width: 100%"
            size="large">
            <option value="1">In</option>
            <option value="1">Out</option>
          </Field>
          <ErrorMessage class="error" name="network" />
        </div>
      </a-col>
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
        first_name: yup.string().required().label("First Name"),
        last_name: yup.string().required().label("Last Name"),
        designation: yup.string().required().label("Designation"),
        gender: yup.string().required().label("Gender"),
        email: yup.string().required().email().label("Email"),
        phone_no: yup.string().required().label("Phone Number"),
        specialization: yup.string().required().label("Specialization"),
        network: yup.string().required().label("Network"),
      });
      return {
        schema,
        personalInformationForm: {
          first_name: this.$store.state.personalData ? this.$store.state.personalData.first_name : '',
          last_name: this.$store.state.personalData ? this.$store.state.personalData.last_name : '',
          designation: this.$store.state.personalData ? this.$store.state.personalData.designation : '',
          gender: this.$store.state.personalData ? this.$store.state.personalData.gender : '',
          email: this.$store.state.personalData ? this.$store.state.personalData.email : '',
          phone_no: this.$store.state.personalData ? this.$store.state.personalData.phone_no : '',
          specialization: this.$store.state.personalData ? this.$store.state.personalData.specialization : '',
          network: this.$store.state.personalData ? this.$store.state.personalData.network : '',
        }
      }
    },
    computed() {
      return this.$store
    },
    methods: {
      addCareCoordinator() {
        alert('from other file')
        const email_verify = JSON.parse(localStorage.getItem('user')).email_verify
        const coordinator = toRaw(this.personalInformationForm);
        this.$store.dispatch("addCareCoordinator", { 
          first_name: coordinator.first_name,
          last_name: coordinator.last_name,
          designation: coordinator.designation,
          gender: coordinator.gender,
          email: coordinator.email,
          phone_no: coordinator.phone_no,
          specialization: coordinator.specialization,
          network: coordinator.network,
          email_verify: email_verify
        })
        .then((res) => {
          localStorage.setItem('personalData', JSON.stringify(res.data));
          this.$store.state.personalData = res.data;
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
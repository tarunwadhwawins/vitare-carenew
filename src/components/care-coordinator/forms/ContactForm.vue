<template>
  <Form :model="contactForm" @submit="addCareCoordinatorContact" :validation-schema="schema">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>First Name</label>
          <Field class="ant-input ant-input-lg" v-model="contactForm.first_name" name="first_name" size="large" />
          <ErrorMessage class="error" name="first_name" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Last Name</label>
          <Field class="ant-input ant-input-lg" v-model="contactForm.last_name" name="last_name" size="large" />
          <ErrorMessage class="error" name="last_name" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Email</label>
          <Field class="ant-input ant-input-lg" v-model="contactForm.email" name="email" size="large" />
          <ErrorMessage class="error" name="email" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Phone No</label>
          <inut type="hidden" v-model="contactForm.id" name="id" value=""/>
          <Field class="ant-input ant-input-lg" v-model="contactForm.phone_no" name="phone_no" size="large" />
          <ErrorMessage class="error" name="phone_no" />
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
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    updated() {
      console.log('Updated : ', this.data)
      const formData = this.data
      this.contactForm.first_name = formData.first_name;
      this.contactForm.last_name = formData.last_name;
      this.contactForm.email = formData.email;
      this.contactForm.phone_no = formData.phone_no;
      this.contactForm.id = formData.id;
    },
    data() {
      const schema = yup.object({
        first_name: yup.string().required().label("First Name"),
        last_name: yup.string().required().label("Last Name"),
        email: yup.string().required().email().label("Email"),
        phone_no: yup.string().required().label("Phone Number"),
      });
      return {
        schema,
        contactForm: {
          first_name: '',
          last_name: '',
          email: '',
          phone_no: '',
          id: '',
        }
      }
    },
    methods: {
      addCareCoordinatorContact() {
        const contact = toRaw(this.contactForm);
        const contactId = contact.id;
        this.$store.dispatch("addCareCoordinatorContact", {
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone_no: contact.phone_no,
          care_coordinator_id: JSON.parse(localStorage.getItem('coordinatorId')),
          contactId: contactId ? contactId : null,
        })
        .then((res) => {
          localStorage.setItem('contactId', res.data.id)
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
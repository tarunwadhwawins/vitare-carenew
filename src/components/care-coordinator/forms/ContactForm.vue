<template>
  <a-form :model="contactForm" @submit.prevent="addCareCoordinatorContact">
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="form-group">
          <label>First Name</label>
          <input class="ant-input ant-input-lg" v-model="contactForm.first_name" size="large" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Last Name</label>
          <input class="ant-input ant-input-lg" v-model="contactForm.last_name" size="large" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Email</label>
          <input class="ant-input ant-input-lg" v-model="contactForm.email" size="large" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Phone No</label>
          <input class="ant-input ant-input-lg" v-model="contactForm.phone_no" size="large" />
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
        contactForm: {
          first_name: '',
          last_name: '',
          email: '',
          phone_no: '',
          // care_coordinator_id: 1,
        }
      }
    },
    methods: {
      addCareCoordinatorContact() {
        const contact = toRaw(this.contactForm);
        console.log(contact)
        this.$store.dispatch("addCareCoordinatorContact", { 
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone_no: contact.phone_no,
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
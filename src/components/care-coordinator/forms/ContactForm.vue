<template>
  <a-form ref="formRef" :rules="rules" :model="contactForm">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>First Name</label>
          <a-input size="large" v-model:value="contactForm.first_name" />
          <a-form-item ref="first_name" name="first_name"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Last Name</label>
          <a-input size="large" v-model:value="contactForm.last_name" />
          <a-form-item ref="name" name="last_name"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Email</label>
          <a-input size="large" v-model:value="contactForm.email" />
          <a-form-item ref="name" name="email"/>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Phone No.</label>
          <a-input size="large" v-model:value="contactForm.phone_no" />
          <a-form-item ref="name" name="phone_no"/>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :span="24">
        <button class="btn primaryBtn" @click="addCareCoordinatorContact">Add</button>
      </a-col>
    </a-row>
    <loading
      :active="isLoading" 
      loader="bars"
      lock-scroll="true"
      is-full-page="true"
      transition="fade"
      :can-cancel="false"/>
  </a-form>
</template>

<script>
  import { reactive, ref } from 'vue';
  import { useStore } from "vuex"
  import Loading from 'vue-loading-overlay';
  export default {
    components: {
      Loading,
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
    setup() {
      const isLoading = ref(false);
      const store = useStore()
      const formRef = ref();
      const coordinatorId = JSON.parse(localStorage.getItem('coordinatorId'))
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
      const contactForm = reactive({
        first_name: null,
        last_name: null,
        email: null,
        phone_no: null,
        care_coordinator_id: coordinatorId,
      })
      const addCareCoordinatorContact = () => {
        formRef.value.validate().then(() => {
          isLoading.value = true
          store.dispatch("addCareCoordinatorContact", contactForm).then(() => {
            store.dispatch("getCoordinatorContacts", coordinatorId).then(() => {
              localStorage.removeItem('contactId')
              formRef.value.resetFields();
              isLoading.value = false
            })
          })
        }).catch(error => {
          console.log('error', error);
        });
      }
      return {
        isLoading,
        formRef,
        rules,
        contactForm,
        addCareCoordinatorContact
      }
    },
  }
</script>
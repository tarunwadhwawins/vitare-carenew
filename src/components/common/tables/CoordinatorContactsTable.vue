<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table :columns="contactColumns" :data-source="contactData" :scroll="{ x: 900 }" />
    </a-col>
  </a-row>
  <loading
    v-model:active="isLoading" 
    loader="bars"
    lock-scroll="true"
    is-full-page="false"
    transition="fade"
    :can-cancel="false"/>
</template>

<script>
const contactColumns = [
  {
    title: "First Name",
    dataIndex: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone No",
    dataIndex: "phone_no",
  },
  /* {
    title: "Actions",
    dataIndex: "actions",
  }, */
];
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      contactData: [{}],
    }
  },
  created() {
    this.isLoading = true;
    this.$store.dispatch("getCoordinatorContacts", JSON.parse(localStorage.getItem('coordinatorId')))
    .then((res) => {
      const response = res.data.data;
      response.forEach((element, index) => {
        this.contactData.push({
          key: index+1,
          first_name: element.first_name,
          last_name: element.last_name,
          email: element.email,
          phone_no: element.phone_no,
          // actions: 'In',
        })
      });
      console.log('Contact Data', this.contactData)
      this.isLoading = false
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
  },
  setup() {
    return {
      contactColumns,
      // contactData
    }
  }
}
</script>
<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table :columns="rolesColumns" :data-source="rolesData" :scroll="{ x: 900 }" />
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
const rolesColumns = [
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Is Active",
    dataIndex: "is_active",
  },
  // {
  //   title: "Actions",
  //   dataIndex: "actions",
  // },
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
      rolesData: [{}],
    }
  },
  created() {
    this.isLoading = true;
    this.$store.dispatch("getCoordinatorRoles", JSON.parse(localStorage.getItem('coordinatorId')))
    .then((res) => {
      const response = res.data.data;
      response.forEach((element, index) => {
        this.rolesData.push({
          key: index+1,
          role: element.role,
          is_active: element.is_active ? 'Yes' : 'No',
          // actions: 'In',
        })
      });
      console.log('Contact Data', this.rolesData)
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
      rolesColumns,
      // rolesData
    }
  }
}
</script>
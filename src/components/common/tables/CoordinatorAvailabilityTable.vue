<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table :columns="availabilityColumns" :data-source="availabilityData" :scroll="{ x: 900 }" />
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
const availabilityColumns = [
  {
    title: "Start Time",
    dataIndex: "start_time",
  },
  {
    title: "End Time",
    dataIndex: "end_time",
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
      availabilityData: [{}],
    }
  },
  created() {
    this.isLoading = true;
    this.$store.dispatch("getCoordinatorAvailabilities", JSON.parse(localStorage.getItem('coordinatorId')))
    .then((res) => {
      const response = res.data.data;
      response.forEach((element, index) => {
        this.availabilityData.push({
          key: index+1,
          start_time: element.start_time,
          end_time: element.end_time,
          // actions: 'In',
        })
      });
      console.log('Contact Data', this.availabilityData)
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
      availabilityColumns,
      // availabilityData
    }
  }
}
</script>
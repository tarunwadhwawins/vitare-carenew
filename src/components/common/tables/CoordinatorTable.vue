<template>
  <a-row>
    <a-col :span="24">
      <a-table :columns="columns" :data-source="coordinatorsList" :scroll="{ x: 1200 }" @change="onChange" />
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'type'">
          <span>
            <smile-outlined />
          </span>
        </template>
      </template>
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
const columns = [
  {
    title: "First Name",
    dataIndex: "first_name",
    sorter: {
      compare: (a, b) => a.first_name - b.first_name,
      multiple: 3,
    },
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    sorter: {
      compare: (a, b) => a.last_name - b.last_name,
      multiple: 3,
    },
  },
  {
    title: "Role",
    dataIndex: "role",
    sorter: {
      compare: (a, b) => a.role - b.role,
      multiple: 3,
    },
  },
  {
    title: "Specialization",
    dataIndex: "specialization",
    sorter: {
      compare: (a, b) => a.specialization - b.specialization,
      multiple: 2,
    },
  },
  {
    title: "Network",
    dataIndex: "network",
    sorter: {
      compare: (a, b) => a.network - b.network,
      multiple: 1,
    },
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    sorter: {
      compare: (a, b) => a.created_at - b.created_at,
      multiple: 1,
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 1,
    },
  },
  /* {
    title: "Action",
    dataIndex: "action",
    sorter: {
      compare: (a, b) => a.action - b.action,
      multiple: 1,
    },
  }, */
];
export default {
  data() {
    return {
      isLoading: false,
      coordinatorsList: [{}],
    }
  },
  setup() {
    return {
      columns,
    };
  },
  created() {
    this.isLoading = true;

    this.$store.dispatch("getCareCoordinatorsList")
    .then((res) => {
      const responseData = res.data.data;
      responseData.forEach((element, index) => 
        this.coordinatorsList.push({
          key: index+1,
          first_name: element.first_name,
          last_name: element.last_name,
          role: element.role,
          specialization: element.specialization,
          network: element.network,
          created_at: element.created_at,
          status: element.status,
          // action: 'In',
        }
      ));
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

    // this.$store.dispatch("getSpecializationsCount", 1)
    // .then((res) => {
    //   const response = res.data.data;
    //   console.log('Dashboard Data', response)
    // },
    // (error) => {
    //   console.log(error)
    //   this.message = (
    //     error.response &&
    //     error.response.data &&
    //     error.response.data.message
    //   ) ||
    //   error.message ||
    //   error.toString();
    // });
  },
  components: {
    Loading,
  },
}
</script>
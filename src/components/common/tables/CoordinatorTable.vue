<template>
  <a-row>
    <a-col :span="24">
      <a-table :columns="columns" :data-source="coordinatorsList" :scroll="{ x: 900 }">
        <template #action>
            <!-- <a class="icons"><EyeOutlined /></a> -->
            <div v-for="coordinator in coordinatorsList" :key="coordinator.id">
              <a class="icons" @click ="onClickViewButton(coordinator.id)"><EditOutlined /></a>
              <a class="icons" @click ="onClickDeleteButton(coordinator.id)"> <DeleteOutlined /></a>
            </div>
        </template>
      </a-table> 
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
import { ref, watch } from 'vue';
import Loading from 'vue-loading-overlay';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import store from '@/store/index';
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
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];
export default {
  data() {
    return {
      isLoading: false,
    }
  },
  setup(props, { emit }) {
    let coordinatorsList = ref()
    watch( () => {
      store.dispatch("getCareCoordinatorsList")
      .then((res) => {
        coordinatorsList.value = res.data.data;
      },
      (error) => {
        console.log(error)
        this.message = (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString();
      });
    })
    
    const onClickViewButton = (rowId) => {
      emit('edit-clicked', rowId)
    }
    const onClickDeleteButton = (rowId) => {
      console.log(rowId)
      store.dispatch("deleteCoordinator", rowId)
      .then((res) => {
        console.log('Res', res)
        // this.isLoading = false
      },
      (error) => {
        console.log(error)
        // this.isLoading = false;
        this.message = (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString();
      });
    }

    return {
      onClickViewButton,
      onClickDeleteButton,
      coordinatorsList,
      columns,
    };
  },
  components: {
    Loading,
    DeleteOutlined,
    EditOutlined,
    // EyeOutlined,
  },
}
</script>
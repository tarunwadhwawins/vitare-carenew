<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table :columns="rolesColumns" :data-source="rolesData" :scroll="{ x: 900 }">
        <template #action="{ record }">
          <a class="icons" @click ="onClickDeleteButton({coordinatorId: record.coordinator_id, roleId: record.id})"><DeleteOutlined /></a>
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
const rolesColumns = [
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Is Active",
    dataIndex: "is_active",
  },
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];
import { ref, watch } from 'vue';
import store from '@/store/index';
import Loading from 'vue-loading-overlay';
import { DeleteOutlined } from "@ant-design/icons-vue";
import swal from 'sweetalert';
export default {
  components: {
    Loading,
    DeleteOutlined
  },
  data() {
    return {
    }
  },
  setup(props, { emit }) {
    let rolesData = ref()
    watch( () => {
      store.dispatch("getCoordinatorRoles", JSON.parse(localStorage.getItem('coordinatorId')))
      .then((res) => {
        rolesData.value = res.data.data;
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
    });
    const onClickDeleteButton = ({coordinatorId, roleId}) => {
      swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete this record?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          let data = {
            coordinatorId: coordinatorId,
            roleId: roleId
          }
          console.log(data)
          store.dispatch("deleteCoordinatorRole", data)
          .then((res) => {
            console.log('Res', res)
            store.dispatch("getCoordinatorRoles", data.coordinatorId).then((res) => {
              rolesData.value = res.data.data;
            },
            (error) => {
              console.log(error)
            });
          },
          (error) => {
            console.log(error)
          });
        }
      });
    }
    return {
      onClickDeleteButton,
      rolesColumns,
      rolesData
    }
  }
}
</script>
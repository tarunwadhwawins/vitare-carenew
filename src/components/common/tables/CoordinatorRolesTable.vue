<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table :columns="rolesColumns" :data-source="rolesData" :scroll="{ x: 900 }">
        <template #action>
          <div v-for="roles in rolesData" :key="roles.key">
            <!-- <a class="icons"><EyeOutlined /></a> -->
            <a class="icons" @click ="onClickViewButton(roles.key)"><EditOutlined /></a>
            <a class="icons" @click ="onClickDeleteButton({coordinatorId: roles.coordinator_id, roleId: roles.key})"><DeleteOutlined /></a>
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
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    Loading,
    DeleteOutlined,
    EditOutlined,
    // EyeOutlined,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  setup(props, { emit }) {
    let rolesData = ref()
    watch( () => {
      store.dispatch("getCoordinatorRoles", JSON.parse(localStorage.getItem('coordinatorId')))
      .then((res) => {
        rolesData.value = res.data.data;
        // response.forEach((element, index) => {
        //   this.rolesData.push({
        //     key: element.id,
        //     coordinator_id: element.coordinator_id,
        //     role: element.role,
        //     is_active: element.is_active ? 'Yes' : 'No',
        //     // actions: 'In',
        //   })
        // });
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
    });
    const onClickViewButton = (rolesId) => {
      // const rowId = JSON.parse(localStorage.getItem('roleId'));
      emit('clicked', rolesId)
    }
    const onClickDeleteButton = ({coordinatorId, roleId}) => {
      let data = {
        coordinatorId: coordinatorId,
        roleId: roleId
      }
      console.log(data)
      store.dispatch("deleteCoordinatorRole", data)
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
      rolesColumns,
      // rolesData
    }
  }
}
</script>
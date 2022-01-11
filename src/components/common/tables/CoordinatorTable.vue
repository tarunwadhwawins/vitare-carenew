<template>
<a-row>
    <a-col :span="24">
        <!-- <a-table :columns="columns" :data-source="coordinatorsList" :scroll="{ x: 900 }">
            <template #action="{ record }">
                <a class="icons" @click="onClickEditButton(record.id)">
                    <EditOutlined /></a>
                <a class="icons" @click="onClickDeleteButton(record.id)">
                    <DeleteOutlined /></a>
            </template>
        </a-table> -->
        <a-table :pagination="false" :columns="columns" :data-source="data" :scroll="{ x: 1200 }" @change="onChange">
            <template #action>
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>{{$t('global.view')}}</span>
                    </template>
                    <a class="icons">
                        <EyeOutlined /></a>
                </a-tooltip>
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>{{$t('global.edit')}}</span>
                    </template>
                    <a class="icons">
                        <EditOutlined /></a>
                </a-tooltip>
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>{{$t('global.delete')}}</span>
                    </template>
                    <a class="icons">
                        <DeleteOutlined /></a>
                </a-tooltip>
            </template>
            <template #first="text">
                <router-link to="corrdinator-summary">{{
                    text.text
                  }}</router-link>
            </template>
            <template #last="text">
                <router-link to="corrdinator-summary">{{
                    text.text
                  }}</router-link>
            </template>
        </a-table>
    </a-col>
</a-row>
<loading v-model:active="isLoading" loader="bars" lock-scroll="true" is-full-page="false" transition="fade" :can-cancel="false" />
</template>

<script>
import { watchEffect, computed } from "vue";
import Loading from "vue-loading-overlay";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import swal from "sweetalert";
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
    return {};
  },
  setup(props, { emit }) {
    const store = useStore();
    watchEffect(() => {
      // store.dispatch("getCareCoordinatorsList")
    });
    const coordinatorsList = computed(() => {
      return 0; //store.state.careCoordinator.coordinatorsList
    });

    const onClickEditButton = (rowId) => {
      localStorage.setItem("is_update_coordinator", true);
      localStorage.setItem("coordinatorId", rowId);
      emit("edit-clicked", rowId);
    };
    const onClickDeleteButton = (rowId) => {
      swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete this record?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          store.dispatch("deleteCoordinator", rowId).then(
            (res) => {
              console.log("Res", res);
              store.dispatch("getCareCoordinatorsList");
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });
    };

    return {
      onClickEditButton,
      onClickDeleteButton,
      coordinatorsList,
      columns,
    };
  },
  components: {
    Loading,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
  },
};
</script>

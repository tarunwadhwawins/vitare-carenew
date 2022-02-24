<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table :columns="availabilityColumns" :data-source="availabilityData" :scroll="{ x: 900 }">
        <template #action="{ record }">
          <a class="icons" @click ="onClickViewButton(record.id)"><EditOutlined /></a>
          <a class="icons" @click ="onClickDeleteButton({coordinatorId: record.coordinator_id, availabilityId: record.id})"><DeleteOutlined /></a>
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
const availabilityColumns = [
  {
    title: "Start Time",
    dataIndex: "start_time",
  },
  {
    title: "End Time",
    dataIndex: "end_time",
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
import swal from 'sweetalert';
export default {
  components: {
    Loading,
    DeleteOutlined,
    EditOutlined,
    // EyeOutlined,
  },
  data() {
    return {
    }
  },
  setup(props, { emit }) {
    let availabilityData = ref()
    watch( () => {
      store.dispatch("getCoordinatorAvailabilities", JSON.parse(localStorage.getItem('coordinatorId'))).then((res) => {
        availabilityData.value = res.data.data;
      },
      (error) => {
        this.message = (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString();
      });
    })
    const onClickViewButton = (availabilityId) => {
      // const rowId = JSON.parse(localStorage.getItem('availabilityId'));
      emit('clicked', availabilityId)
    }
    const onClickDeleteButton = ({coordinatorId, availabilityId}) => {
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
            availabilityId: availabilityId
          }
          store.dispatch("deleteCoordinatorAvailability", data)
          .then((res) => {
            store.dispatch("getCoordinatorAvailabilities", JSON.parse(localStorage.getItem('coordinatorId'))).then((res) => {
              availabilityData.value = res.data.data;
            },
            (error) => {
            });
          },
          (error) => {
          });
        }
      });
    }
    return {
      availabilityColumns,
      onClickViewButton,
      onClickDeleteButton,
      availabilityData
    }
  }
}
</script>
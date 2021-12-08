<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table :columns="availabilityColumns" :data-source="availabilityData" :scroll="{ x: 900 }">
        <template #action>
            <div v-for="availability in availabilityData" :key="availability.key">
              <!-- <a class="icons"><EyeOutlined /></a> -->
              <a class="icons" @click ="onClickViewButton(availability.id)"><EditOutlined /></a>
              <a class="icons" @click ="onClickDeleteButton({coordinatorId: availability.coordinator_id, availabilityId: availability.id})"><DeleteOutlined /></a>
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
    let availabilityData = ref()
    watch( () => {
      store.dispatch("getCoordinatorAvailabilities", JSON.parse(localStorage.getItem('coordinatorId'))).then((res) => {
        availabilityData.value = res.data.data;
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
    })
    const onClickViewButton = (availabilityId) => {
      // const rowId = JSON.parse(localStorage.getItem('availabilityId'));
      emit('clicked', availabilityId)
    }
    const onClickDeleteButton = ({coordinatorId, availabilityId}) => {
      let data = {
        coordinatorId: coordinatorId,
        availabilityId: availabilityId
      }
      console.log(data)
      store.dispatch("deleteCoordinatorAvailability", data)
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
      availabilityColumns,
      onClickViewButton,
      onClickDeleteButton,
      availabilityData
    }
  }
}
</script>
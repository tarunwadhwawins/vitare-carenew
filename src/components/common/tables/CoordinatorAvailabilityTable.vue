<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table :columns="availabilityColumns" :data-source="availabilityList" :scroll="{ x: 900 }">
        <template #action="{ record }">
          <a class="icons" @click ="onClickEditButton(record.id)"><EditOutlined /></a>
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
import { ref, watchEffect, computed } from 'vue';
  import { useStore } from "vuex"
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
    const isLoading = ref(true);
    const store = useStore()
    const coordinatorId = JSON.parse(localStorage.getItem('coordinatorId'))
    watchEffect( () => {
      store.dispatch("getCoordinatorAvailabilities", coordinatorId).then(() => { isLoading.value = false });
    })
    const onClickEditButton = (availabilityId) => {
      localStorage.setItem('availabilityId', availabilityId)
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
          isLoading.value = true;
          let data = {
            coordinatorId: coordinatorId,
            availabilityId: availabilityId
          }
          store.dispatch("deleteCoordinatorAvailability", data).then(() => {
            store.dispatch("getCoordinatorAvailabilities", coordinatorId).then(() => {
              localStorage.removeItem('availabilityId')
              isLoading.value = false;
            })
          })
        }
      });
    }
    const availabilityList = computed(() => {
      return store.state.careCoordinator.availabilityList
    })
    return {
      isLoading,
      availabilityColumns,
      onClickEditButton,
      onClickDeleteButton,
      availabilityList
    }
  }
}
</script>
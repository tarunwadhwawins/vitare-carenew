<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table :columns="contactColumns" :data-source="contactsList" :scroll="{ x: 900 }">
        <template #action="{ record }">
          <a class="icons" @click ="onClickEditButton(record.id)"><EditOutlined /></a>
          <a class="icons" @click ="onClickDeleteButton({coordinatorId: record.coordinator_id, contactId: record.id})"> <DeleteOutlined /></a>
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
const contactColumns = [
  {
    title: "First Name",
    dataIndex: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone No",
    dataIndex: "phone_no",
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
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import swal from 'sweetalert';
export default {
  components: {
    Loading,
    DeleteOutlined,
    EditOutlined,
    // EyeOutlined,
  },
  setup(props, { emit }) {
    const isLoading = ref(true);
    const store = useStore()
    const coordinatorId = JSON.parse(localStorage.getItem('coordinatorId'))
    watchEffect( () => {
      store.dispatch("getCoordinatorContacts", coordinatorId).then(() => { isLoading.value = false });
    })
    const onClickEditButton = (rowId) => {
      localStorage.setItem('contactId', rowId)
      emit('clicked', rowId)
    }
    const onClickDeleteButton = ({coordinatorId, contactId}) => {
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
            contactId: contactId
          }
          store.dispatch("deleteCoordinatorContact", data).then(() => {
            store.dispatch("getCoordinatorContacts", coordinatorId).then(() => {
              localStorage.removeItem('contactId')
              isLoading.value = false;
            })
          })
        }
      });
    }
    const contactsList = computed(() => {
      return store.state.careCoordinator.contactsList
    })

    return {
      onClickEditButton,
      onClickDeleteButton,
      contactColumns,
      contactsList,
      isLoading
    }
  }
}
</script>
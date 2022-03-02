<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table  rowKey="id" :columns="contactColumns" :data-source="contactData" :scroll="{ x: 900 }">
        <template #action="{ record }">
          <a class="icons" @click ="onClickViewButton(record.id)"><EditOutlined /></a>
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
import { ref, watch } from 'vue';
import store from '@/store/index';
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
  data() {
    return {
    }
  },
  setup(props, { emit }) {
    let contactData = ref()
    watch( () => {
      store.dispatch("getCoordinatorContacts", JSON.parse(localStorage.getItem('coordinatorId'))).then((res) => {
        contactData.value = res.data.data;
      },
      (error) => {
      });
    })
    const onClickViewButton = (rowId) => {
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
          let data = {
            coordinatorId: coordinatorId,
            contactId: contactId
          }
          store.dispatch("deleteCoordinatorContact", data)
          .then((res) => {
            store.dispatch("getCoordinatorContacts", JSON.parse(localStorage.getItem('coordinatorId'))).then((res) => {
              contactData.value = res.data.data;
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
      onClickViewButton,
      onClickDeleteButton,
      contactColumns,
      contactData
    }
  }
}
</script>
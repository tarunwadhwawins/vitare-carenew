<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table :columns="contactColumns" :data-source="contactData" :scroll="{ x: 900 }">
        <!-- <span > -->
          <template #action>
            <!-- <a class="icons"><EyeOutlined /></a> -->
            <div v-for="contact in contactData" :key="contact.key">
              <a class="icons" @click ="onClickViewButton(contact.key)"><EditOutlined /></a>
              <a class="icons" @click ="onClickDeleteButton({coordinatorId: contact.coordinator_id, contactId: contact.key})"> <DeleteOutlined /></a>
            </div>
          </template>
        <!-- </span> -->
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
    let contactData = ref()
    watch( () => {
      store.dispatch("getCoordinatorContacts", JSON.parse(localStorage.getItem('coordinatorId'))).then((res) => {
        contactData.value = res.data.data;
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
    const onClickViewButton = (rowId) => {
      emit('clicked', rowId)
    }
    const onClickDeleteButton = ({coordinatorId, contactId}) => {
      let data = {
        coordinatorId: coordinatorId,
        contactId: contactId
      }
      console.log(data)
      store.dispatch("deleteCoordinatorContact", data)
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
      contactColumns,
      // contactData
    }
  }
}
</script>
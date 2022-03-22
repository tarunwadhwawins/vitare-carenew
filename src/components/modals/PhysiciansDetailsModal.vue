<template>
	<a-modal width="80%" title="Physicians" centered>
		<a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-table rowKey="id"
          :columns="physiciansColumns"
          :data-source="physiciansList"
          :pagination="false">
				
          <template #actions="{record}">
            <a class="icons"><EditOutlined @click="editPhysician(record.id)" /></a>
            <a class="icons"><DeleteOutlined @click="deletePhysician(record.id)" /></a>
          </template>

        </a-table>
        <Loader />
      </a-col>
    </a-row>
	</a-modal>
</template>

<script>
import {
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons-vue";
import Loader from "@/components/loader/Loader.vue";
import {warningSwal} from "@/commonMethods/commonMethod"
import { messages } from '@/config/messages';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    Loader,
  },
  props: {
    physiciansList: {
      type: Array
    },
  },
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const patientUdid = route.params.udid

    const physiciansColumns = [
      {
				title: "Name",
				dataIndex: "name",
				key: "name",
			},
			{
				title: "Designation",
				dataIndex: "designation",
				key: "designation",
			},
			{
				title: "Email Address",
				dataIndex: "email",
				key: "email",
			},
			{
				title: "Phone Number",
				dataIndex: "phoneNumber",
				key: "phoneNumber",
			},
			{
				title: "Actions",
				dataIndex: "actions",
				slots: {
          customRender: "actions"
        },
			},
    ]
    
    const editPhysician = (value) => {
      console.log('value', value)
      store.dispatch('physicianDetails', {
				patientUdid: patientUdid,
				physicianUdid: value,
			}).then(() => {
        emit('isPhysicianEdit')
      })
    }
    
    const deletePhysician = (value) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deletePhysician', {
            patientUdid: patientUdid,
            physicianUdid: value,
          }).then(() => {
            if(route.name == 'PatientSummary') {
							store.dispatch('physiciansList', patientUdid);
            }
          });
        }
      })
    }
    
    return {
      physiciansColumns,
      editPhysician,
      deletePhysician,
    }
  }
}
</script>
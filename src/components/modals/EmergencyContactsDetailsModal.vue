<template>
  <a-modal width="90%" title="Emergency Contacts" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-table
          rowKey="id"
          :columns="emergencyContactsColumns"
          :data-source="emergencyContactsList"
          :scroll="{ x: 2100 }"
          :pagination="false"
        >
          <template #contactTime="{ record }">
            <template
              v-for="contactTime in record.contactTime"
              :key="contactTime.id"
            >
              <p v-if="contactTime == '16'">Morning</p>
              <p v-if="contactTime == '17'">Afternoon</p>
              <p v-if="contactTime == '18'">Evening</p>
            </template>
          </template>

          <template #contactType="{ record }">
            <template
              v-for="contactType in record.contactType"
              :key="contactType.id"
            >
              <p v-if="contactType == '13'">Email</p>
              <p v-if="contactType == '14'">Phone</p>
              <p v-if="contactType == '15'">Text</p>
            </template>
          </template>

          <!-- <template #isPrimary="{ record }">
						<a-tooltip v-if="record.isPrimary" placement="right">
							<template #title>Yes</template>
							<span class="circleBox" style="background-color: #3D8116"></span>
						</a-tooltip>
						<a-tooltip v-else placement="right">
							<template #title>No</template>
							<span class="circleBox" style="background-color: #89250B"></span>
						</a-tooltip>
					</template> -->

          <template #action="{ record }">
            <a class="icons"
              ><EditOutlined @click="editEmergencyContact(record.id); actionTrack(paramsId,309,'patient')"
            /></a>
            <a class="icons"
              ><DeleteOutlined @click="deleteEmergencyContact(record.id); actionTrack(paramsId,310,'patient')"
            /></a>
          </template>
        </a-table>
        <Loader />
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import // computed,
// reactive
"vue-demi";
import { useStore } from "vuex";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { warningSwal, actionTrack } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import Loader from "@/components/loader/Loader.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    Loader,
  },
  props: {
    emergencyContactsList: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const patientUdid = route.params.udid;

    const emergencyContactsColumns = [
      {
        title: "Name",
        dataIndex: "fullName",
        key: "fullName",
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
        title: "Preferred Method of Contact",
        dataIndex: "contactType",
        key: "contactType",
        slots: {
          customRender: "contactType",
        },
      },
      {
        title: "Preferred time of day for contact",
        dataIndex: "contactTime",
        key: "contactTime",
        slots: {
          customRender: "contactTime",
        },
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
      // {
      //   title: "Is Primary",
      //   dataIndex: "isPrimary",
      //   key: "isPrimary",
      //   /* slots: {
			// 		customRender: "isPrimary"
			// 	}, */
      // },
      {
        title: "Action",
        dataIndex: "action",
        className: "doc-actions",
        slots: {
          customRender: "action",
        },
      },
    ];

    // const globalCode = computed(() => {
    //   return store.state.common;
    // });

    const editEmergencyContact = (value) => {
      store
        .dispatch("emergencyContactDetails", {
          patientUdid: patientUdid,
          contactUdid: value,
        })
        .then(() => {
          emit("isEmergencyContactEdit");
        });
    };

    const deleteEmergencyContact = (value) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store
            .dispatch("deleteEmergencyContact", {
              patientUdid: patientUdid,
              contactUdid: value,
            })
            .then(() => {
              if (route.name == "PatientSummary") {
                store.dispatch("emergencyContactsList", patientUdid);
              }
            });
        }
      });
    };

    // const contactTypes = globalCode.value.pmOfcontact.globalCode

    // console.log('contactTypes', contactTypes)

    return {
      actionTrack,
      paramsId:route.params.udid,
      emergencyContactsColumns,
      editEmergencyContact,
      deleteEmergencyContact,
    };
  },
};
</script>
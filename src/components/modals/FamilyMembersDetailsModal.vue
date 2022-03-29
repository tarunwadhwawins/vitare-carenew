<template>
  <a-modal width="90%" title="Family Members" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-table
          rowKey="id"
          :columns="familyMembersColumns"
          :data-source="familyMembersList"
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
              ><EditOutlined @click="editFamilyMember(record.id);actionTrack(paramsId,303,'patient')"
            /></a>
            <a class="icons"
              ><DeleteOutlined @click="deleteFamilyMember(record.id);actionTrack(paramsId,304,'patient')"
            /></a>
          </template>
        </a-table>
        <Loader />
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { reactive } from "vue-demi";
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
    patientId: {
      type: Number,
    },
    familyMembersList: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const patientUdid = reactive(props.patientId);
    const familyMembersColumns = [
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
      {
        title: "Relation",
        dataIndex: "relation",
        key: "relation",
      },
      {
        title: "Is Primary",
        dataIndex: "isPrimary",
        key: "isPrimary",
        /* slots: {
					customRender: "isPrimary"
				}, */
      },
      {
        title: "Action",
        dataIndex: "action",
        className: "doc-actions",
        slots: {
          customRender: "action",
        },
      },
    ];

    const editFamilyMember = (value) => {
      store.dispatch("familyMemberDetails", {
          patientUdid: patientUdid,
          familyUdid: value,
        })
        .then(() => {
          emit("isFamilyMemberEdit");
        });
    };

    const deleteFamilyMember = (value) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteFamilyMember", {
              patientUdid: patientUdid,
              familyUdid: value,
            })
            .then(() => {
              if (route.name == "PatientSummary") {
                store.dispatch('patientDetails', patientUdid)
                store.dispatch("familyMembersList", patientUdid);
              }
            });
        }
      });
    };

    return {
      actionTrack,
      paramsId:route.params.udid,
      familyMembersColumns,
      editFamilyMember,
      deleteFamilyMember,
    };
  },
};
</script>
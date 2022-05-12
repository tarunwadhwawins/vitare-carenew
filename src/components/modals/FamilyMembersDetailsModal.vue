<template>
  <a-modal width="90%" :title="$t('global.responsiblePersons')" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-table
          rowKey="id"
          :columns="responsiblePersonsColumns"
          :data-source="responsiblePersonsList"
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

          <template #action="{ record }">
            <a class="icons" v-if="arrayToObjact(screensPermissions,303)"
              ><EditOutlined @click="editResponsiblePerson(record.id);actionTrack(paramsId,303,'patient')"
            /></a>
            <a class="icons" v-if="arrayToObjact(screensPermissions,304)"
              ><DeleteOutlined @click="deleteResponsiblePerson(record.id);actionTrack(paramsId,304,'patient')"
            /></a>
          </template>
        </a-table>
        <Loader />
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { computed, reactive } from "vue-demi";
import { useStore } from "vuex";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { warningSwal, actionTrack,arrayToObjact, } from "@/commonMethods/commonMethod";
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
    /* responsiblePersonsList: {
      type: Array,
    }, */
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const patientUdid = reactive(props.patientId);
    const responsiblePersonsColumns = [
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
    
    const responsiblePersonsList = computed(() => {
      return store.state.patients.responsiblePersonsList
    })

    const editResponsiblePerson = (value) => {
      store.dispatch("responsiblePersonDetails", {
          patientUdid: patientUdid,
          familyUdid: value,
        })
        .then(() => {
          emit("isResponsiblePersonEdit");
        });
    };

    const deleteResponsiblePerson = (value) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteResponsiblePerson", {
              patientUdid: patientUdid,
              familyUdid: value,
            })
            .then(() => {
              if (route.name == "PatientSummary") {
                store.dispatch('patientDetails', patientUdid)
                store.dispatch("responsiblePersonsList", patientUdid);
                if(responsiblePersonsList.value.length <= 1) {
                  emit('closeModal', {
                    modal: 'responsiblePersonsList',
                    value: false
                  })
                }
              }
            });
        }
      });
    };

    return {
      arrayToObjact,
      screensPermissions: store.getters.screensPermissions,
      actionTrack,
      paramsId:route.params.udid,
      responsiblePersonsColumns,
      responsiblePersonsList,
      editResponsiblePerson,
      deleteResponsiblePerson,
    };
  },
};
</script>
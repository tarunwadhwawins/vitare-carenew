<template>
  <a-modal width="1000px" title="Device Detail" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-table
          :columns="devicesColumns"
          :data-source="devicesList"
          :pagination="false"
          @change="onChange"
        >
          <template #flags="{ text }">
            <span class="box" :class="text"></span>
            <span
              class="box"
              :class="(text = text.match(/yellowBgColor/g))"
              v-if="text.match(/yellowBgColor/g)"
            ></span>
          </template>
          <template #active>
            <a-switch v-model:checked="checked" />
          </template>
          <template #action="{record}">
            <!-- <a class="icons"><EditOutlined @click="editDevice(record.id)" /></a> -->
            <a class="icons"><DeleteOutlined @click="deleteDevice(record.id)" /></a>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { computed, defineComponent, reactive, watchEffect } from "vue";
import {
  DeleteOutlined,
  // EditOutlined
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import {warningSwal} from "@/commonMethods/commonMethod"
import { messages } from '@/config/messages';
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    DeleteOutlined,
    // EditOutlined,
  },
  props: {
    patientDetails: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const patientDetail = reactive(props.patientDetails);
    watchEffect(() => {
      if(route.name == 'PatientSummary') {
        store.dispatch('devices', route.params.udid)
      }
      else {
        store.dispatch('devices', patientDetail.id)
      }
    })
    const devicesList = computed(() => {
      return store.state.patients.devices
    })
    const devicesColumns = [
      {
        title: "Home Unit Type",
        dataIndex: "deviceType",
      },
      {
        title: "Model No",
        dataIndex: "modelNumber",
      },
      {
        title: "Serial No",
        dataIndex: "serialNumber",
      },
      {
        title: "MAC Address",
        dataIndex: "macAddress",
      },
      {
        title: "Action",
        dataIndex: "action",
        slots: {
          customRender: "action",
        },
      },
    ];

    // const editDevice = (id) => {
    //   console.log(id)
    // }
    const deleteDevice = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteDevice', {
            id: patientDetail.id,
            deviceId: id,
          }).then(() => {
            if(route.name == 'PatientSummary') {
              store.dispatch('devices', route.params.udid)
            }
            else {
              store.dispatch('devices', patientDetail.id)
            }
            if(route.name == 'PatientSummary') {
              store.dispatch('latestDevice', route.params.udid)
              store.dispatch('patientTimeline', route.params.udid);
            }
          });
        }
      })
    }

    return {
      devicesColumns,
      devicesList,
      // editDevice,
      deleteDevice,
    };
  },
});
</script>

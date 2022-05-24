<template>
<div class="patientTable">

    <a-table rowKey="id" :columns="columnData" :data-source="escalationList" style="width:100%" :pagination="false" @change="handleTableChange" :scroll="{y: height }">

        <template #patientName="{ text, record }" >
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.patientId } }">{{ text }}</router-link>
        </template>

        <template #escalationType="{ record }">
            <span v-for="esc,i in record.escalationType.data" :key="esc.id" >
                {{i==0?' ':','}} {{ esc.escalationType }}
            </span>
        </template>
        <template #action="{record}" >
            <a-tooltip placement="bottom"  @click="showEscalationData(record.id)">
                <template #title>
                    <span>{{ 'View' }}</span>
                </template>
                <a class="icons">
                    <EyeOutlined /></a>
            </a-tooltip>
        </template>
         <template #flag="{ record }">
         <a-tooltip placement="bottom">
                <template #title>
                    <span>{{ record.flagName }}</span>
                </template>
                <a class="icons">
                    <Flags :flag="record.flagColor"/></a>
            </a-tooltip>
          
        </template>
    </a-table>
</div>
</template>
<script>
import { EyeOutlined } from "@ant-design/icons-vue";
import { onMounted} from "vue";
import { useStore } from "vuex";
import Flags from "@/components/common/flags/Flags";
import { useRoute } from 'vue-router';
export default {
  name: "EscalationTable",
  components: {
    EyeOutlined,
    Flags
  },
  props: {
    columnData:Array,
    escalationList:Array,
    otherParam:String,

    height:String
  },
  setup(props,{emit}) {
    const store = useStore();
    onMounted(() => {
      
    })
    const route = useRoute()
    let filter = route.query.filter ? "&filter=" + route.query.filter : "&filter="
        let dateFilter = route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate="
    const showEscalationData = (id) =>{
      console.log(id)
      emit("showEscalationData",true)
      store.dispatch("singleEscalationRecord",id)
    }
      const handleTableChange = (pag, filters, sorter) => {
        let otherParam = props.otherParam?props.otherParam:''
      if (sorter.order) {
        let order = sorter.order == "ascend" ? "ASC" : "DESC";
        let orderParam = "&orderField=" + sorter.field + "&orderBy=" + order;
        store.dispatch("orderTable", {
          data: orderParam,
          orderBy: order,
          page: pag,
          filters: filters,
        });
        store.dispatch(
          "escalation",
          "?page=" + store.getters.searchTable.value +dateFilter + filter + orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "escalation",
          "?page=" +
            store.getters.searchTable.value +
            store.getters.orderTable.value.data+otherParam+
            dateFilter + filter +
            store.getters.orderTable.value.data
        );
      }
    };
    return {
      handleTableChange,
      showEscalationData,
      screensPermissions: store.getters.screensPermissions,
    };
  },
};
</script>
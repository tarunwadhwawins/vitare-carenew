<template>
<div class="patientTable">

    <a-table rowKey="id" :columns="columnData" :data-source="escalationList" style="width:100%" :pagination="false" @change="handleTableChange">

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
                    <span>{{ $t('global.edit') }}</span>
                </template>
                <a class="icons">
                    <EyeOutlined /></a>
            </a-tooltip>
        </template>
         <template #flag="{ record }">
            <Flags :flag="record.flagColor"/>
        </template>
    </a-table>
</div>
</template>
<script>
import { EyeOutlined } from "@ant-design/icons-vue";
import { onMounted} from "vue";
import { useStore } from "vuex";
import Flags from "@/components/common/flags/Flags";
export default {
  name: "EscalationTable",
  components: {
    EyeOutlined,
    Flags
  },
  props: {
    columnData:Array,
    escalationList:Array
  },
  setup(props,{emit}) {
    const store = useStore();
    onMounted(() => {
      
    })
    const showEscalationData = (id) =>{
      console.log(id)
      emit("showEscalationData",true)
      store.dispatch("singleEscalationRecord",id)
    }
      const handleTableChange = (pag, filters, sorter) => {
      if (sorter.order) {
        let order = sorter.order == "ascend" ? "ASC" : "DESC";
        let orderParam = "&orderField=" + sorter.field + "&orderBy=" + order;
        // store.dispatch("staffEscalation", {
        //   data: orderParam,
        //   orderBy: order,
        //   page: pag,
        //   filters: filters,
        // });
        store.dispatch(
          "staffEscalation",
          "?page=" + store.getters.searchTable.value + orderParam
        );
      } else {
        store.dispatch("staffEscalation", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "staffEscalation",
          "?page=" +
            store.getters.searchTable.value +
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
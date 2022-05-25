<template>
<div class="patientTable">
    <a-table rowKey="id" :columns="columnData" :data-source="escalationMainList" style="width:100%" :pagination="false" @change="handleTableChange" :scroll="height? {y: height } : {y: 400 }">
        <template #patientName="{ text, record }" >
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.patientId } }">{{ text }}</router-link>
        </template>
         <template #escalationStaff="{ record }">
            <span v-for="esc,i in record.escalationStaff.data" :key="esc.id" >
                {{i==0?' ':','}} <router-link :to="{ name: 'CoordinatorSummary', params: { udid: esc.staffUdid } }">{{ esc.staffName }}</router-link>
            </span>
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
    
    otherParam:String,

    height:String
  },
  setup(props,{emit}) {
    const store = useStore();
    let data = [];
    let scroller = "";
    const meta = store.getters.escalationMeta;
    const escalationMainList = store.getters.escalation
    const route = useRoute()
    let  dateFilter= ''
    let filter= ''
  function checkDate(){
     filter = route.query.filter ? "&filter=" + route.query.filter : "&filter="
     dateFilter = route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate="
    }
    onMounted(() => {
      checkDate()
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.value.current_page + 1;

          if (current_page <= meta.value.total_pages) {
            scroller = maxScroll;
            data = escalationMainList.value
            
            store.state.careCoordinator.escalationMeta = "";

            store
              .dispatch(
                "escalation",
                "?page=" +
                  current_page +
                 dateFilter + filter +
                  
                  store.getters.searchTable.value +
                 
                  store.getters.orderTable.value.data
              )
              .then(() => {
                loadMoredata();
              });
          }
        }
      });
    })

    function loadMoredata() {
      const newData = escalationMainList.value

      newData.forEach((element) => {
        data.push(element);
      });
    
      store.state.careCoordinator.escalation = data
      
      // = data;
      var tableContent = document.querySelector(".ant-table-body");

      setTimeout(() => {
        tableContent.scrollTo(0, scroller);
      }, 50);
 
    }

    
    
    const showEscalationData = (id) =>{
      console.log(id)
      emit("showEscalationData",true)
      store.dispatch("singleEscalationRecord",id)
    }
      const handleTableChange = (pag, filters, sorter) => {
        checkDate()
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
          "?page=" + store.getters.searchTable.value +dateFilter + filter + orderParam+otherParam
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
      escalationMainList,
      loadMoredata,
      handleTableChange,
      showEscalationData,
      screensPermissions: store.getters.screensPermissions,
    };
  },
};
</script>
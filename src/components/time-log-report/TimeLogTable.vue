
<template>
<a-col :sm="24" :xs="24" >
    <a-table  rowKey="id" :columns="meta.timeLogReportColumns" :pagination="false" :data-source="meta.timeLogReportList" :scroll="{ y: tableYScroller }" @change="onChange">
        <template #staff="{record}">
            <span>{{record.staff}}</span>
        </template>
        <template #patient="{record}">
            <span>{{record.patient}}</span>
        </template>
        <template #flag="{ text }">
            <span>
                <img class="reportFlag" src="../../assets/images/flag-orange.svg" alt="image" /></span>
            <span v-if="text.match(/two/g)"><img class="reportFlag" src="../../assets/images/flag-red.svg" alt="image" /></span>
        </template>
        <template #actions="{record}" >
            <a-tooltip placement="bottom" @click="editTimeLog(record.id)">
                <template #title>
                    <span>{{$t('global.edit')}}</span>
                </template>
                <a class="icons">
                    <EditOutlined /></a>
            </a-tooltip>
            <!-- <a-tooltip placement="bottom" @click="deleteTimeLog(record.id)">
                <template #title>
                    <span>{{$t('global.delete')}}</span>
                </template>
                <a class="icons">
                    <DeleteOutlined /></a>
            </a-tooltip> -->
        </template>
        <template #active="key">
            <a-switch v-model:checked="checked[key.record.key]" />
        </template>
    </a-table>
    <Loader/>
    <InfiniteLoader v-if="loader" />
    <AuditTimeLog v-model:visible="visible" @saveAuditTimeLog="handleOk($event)" :Id="Id" />
</a-col>
</template>
    
<script>
import { ref, onMounted, computed } from "vue";
import { 
  // DeleteOutlined,
   EditOutlined 
} from "@ant-design/icons-vue";
import AuditTimeLog from "../modals/AuditTimeLogs";
import { messages } from "@/config/messages";
import InfiniteLoader from "@/components/loader/InfiniteLoader";
import { useStore } from "vuex";
import { warningSwal,arrayToObjact,tableYScroller } from "@/commonMethods/commonMethod";
import Loader from "../loader/Loader" 

export default {
  components: {
    // DeleteOutlined,
    EditOutlined,
    InfiniteLoader,
    AuditTimeLog,
    Loader,
  },
  
  setup() {
    const store = useStore();
    const visible = ref(false);
    const Id =ref()
    const handleOk = () => {
      visible.value = false;
    };

    function editTimeLog(id) {
      store.dispatch("editAuditTimeLog", id);
      visible.value = true;
      Id.value = id
    }

    function deleteTimeLog(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteTimeLog", id);
          setTimeout(() => {
            store.dispatch("timeLogReportList");
          }, 2000);
        }
      });
    }
    // console.log("props.timeLogRecords",props.timeLogRecords)
    // const fields = reactive(props.columns);
    // const data = reactive(props.timeLogRecords);
    //infinite scroll
    const meta = store.getters.timeLogReports.value;
    const loader = ref(false);
    let data = ''
    let scroller = ''
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");

      tableContent ? tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.timeLogeMeta.current_page + 1;

          if (current_page <= meta.timeLogeMeta.total_pages) {
            scroller = maxScroll
                     data =meta.timeLogReportList
            
            loader.value = true;
            meta.timeLogeMeta = "";
            store.state.timeLogReport.timeLogReportList =""
            store.dispatch("timeLogReportList", "?page=" + current_page).then(()=>{
              loadMoredata();
            })

          }
        }
      }) : ''
    
    })

    function loadMoredata() {
      const newData = meta.timeLogReportList;
     
      newData.forEach((element) => {
        data.push(element);
      });
      meta.timeLogReportList=data
            var tableContent = document.querySelector('.ant-table-body')

            setTimeout(() => {
                tableContent.scrollTo(0, scroller)
            }, 50)
      loader.value = false;
    }

    //timeLogReport
    const auditTimes =computed(()=>{
        return store.state.timeLogReport
    })
   
    return {
      Id,
      arrayToObjact,
      auditTimes,
      editTimeLog,
      handleOk,
      // fields,
      deleteTimeLog,
      // data,
      loader,
      visible,
      meta,
      tableYScroller
     
    };
  },
};
</script>


<template>
<a-col :sm="24" :xs="24" >
    <a-table  rowKey="id" :columns="meta.timeLogReportColumns" :pagination="false" :data-source="meta.timeLogReportList" :scroll="{ y: tableYScroller }"  @change="handleTableChange">
        <template #staff="{record}">
            <span>{{record.staff}}</span>
        </template>
        <template #patient="{record}">
            <span>{{record.patient}}</span>
        </template>
        <template #flags="{ record }">
          <Flags :flag="record.flagColor" />
        </template>
        <template #flag="{ text }">
            <span>
                <img class="reportFlag" src="../../assets/images/flag-orange.svg" alt="image" /></span>
            <span v-if="text.match(/two/g)"><img class="reportFlag" src="../../assets/images/flag-red.svg" alt="image" /></span>
        </template>
        <template #actions="{record}" >
            <a-tooltip placement="bottom" @click="editTimeLog(record.id)" v-if="arrayToObjact(screensPermissions, 334)">
                <template #title>
                    <span>{{$t('global.edit')}}</span>
                </template>
                <a class="icons">
                    <EditOutlined /></a>
            </a-tooltip>
            <a-tooltip placement="bottom" @click="viewTimeLog(record.id)" v-if="arrayToObjact(screensPermissions, 332)">
              <template #title>
                <span>{{ $t("common.view") }}</span>
              </template>
              <a class="icons">
                <EyeOutlined />
              </a>
            </a-tooltip>
        </template>
        <template #active="key">
            <a-switch v-model:checked="checked[key.record.key]" />
        </template>
    </a-table>
    <Loader/>
    <AuditTimeLog v-model:visible="visible" @saveAuditTimeLog="handleOk($event)" :Id="Id" />
</a-col>
<a-modal width="1100px" centered v-model:visible="viewReport" title="Audit Time Log Change Report" @ok="handleOk">
  <a-table  rowKey="id" :columns="columns" :data-source="modalData">
  </a-table>
  <TableLoader/>
</a-modal>
</template>
    
<script>
import { ref, onMounted, computed } from "vue";
import { 
  // DeleteOutlined,
   EditOutlined,
   EyeOutlined 
} from "@ant-design/icons-vue";
import AuditTimeLog from "../modals/AuditTimeLogs";
import { messages } from "@/config/messages";
import TableLoader from "@/components/loader/TableLoader";
import { useStore } from "vuex";
import { warningSwal,arrayToObjact,tableYScroller } from "@/commonMethods/commonMethod";
import Loader from "../loader/Loader"
import Flags from "@/components/common/flags/Flags";

export default {
  components: {
    // DeleteOutlined,
    EyeOutlined,
    EditOutlined,
    TableLoader,
    AuditTimeLog,
    Loader,
    Flags,
  },
  
  setup() {
    const store = useStore();
    const visible = ref(false);
    const viewReport = ref(false);
    const Id =ref()
    const handleOk = () => {
      visible.value = false;
    };

    const editTimeLog = (id) => {
      store.commit('errorMsg', null)
      store.dispatch("editAuditTimeLog", id);
      visible.value = true;
      Id.value = id
    }
    function viewTimeLog(id) {
      store.dispatch("timeLogView", id);
      viewReport.value=true
    }
    const modalData = store.getters.timeLogView
 const columns = store.getters.viuewTimeReportModal
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
 
    //infinite scroll
    const meta = store.getters.timeLogReports.value;
    const loader = ref(false);
    let data = []
    let scroller = ''
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");

      tableContent ? tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.timeLogeMeta.current_page + 1;
          scroller = ''
          if (current_page <= meta.timeLogeMeta.total_pages) {
            scroller = maxScroll
                     data =meta.timeLogReportList
            
            loader.value = true;
            meta.timeLogeMeta = "";
            store.state.timeLogReport.timeLogReportList =""
            
            store.dispatch("timeLogReportList", store.getters.auditTimeLogFilterDates.value+"&page=" + current_page+store.getters.orderTable.value.data ).then(()=>{
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
    const handleTableChange = (pag, filters, sorter) => {
      if(sorter.order){
        let order =sorter.order=='ascend' ? 'ASC': 'DESC'
        let orderParam = '&orderField='+sorter.field+'&orderBy='+order
        store.dispatch('orderTable',{data:orderParam,orderBy:order,page:pag,filters:filters})
        store.dispatch("timeLogReportList", '?search='+orderParam)
        
      }else{
        store.dispatch('orderTable',{data:'&orderField=&orderBy='})
        store.dispatch("timeLogReportList", '?search='+ store.getters.orderTable.value.data)
      }
    }
    
    return {
      screensPermissions:store.getters.screensPermissions,
      handleTableChange,
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
      tableYScroller,
      viewTimeLog,
      modalData,
            columns,
            viewReport
     
    };
  },
};
</script>

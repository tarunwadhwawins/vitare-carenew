<template>
    <a-col :sm="24" :xs="24" >
        <a-table  :columns="fields" :pagination="false" :data-source="data" :scroll="{ y: 400 }" @change="onChange">
            <template #staff="text">
                <!-- <router-link to="coordinator-summary">{{
  text.text
}}</router-link> -->
<span>{{text.text}}</span>
            </template>
            <template #patient="text">
                <!-- <router-link :to="linkTo">{{
  text.text
}}</router-link> -->
<span>{{text.text}}</span>
            </template>
            <template #flag="{ text }">
                <span>
                    <img class="reportFlag" src="../../assets/images/flag-orange.svg" alt="image" /></span>
                <span v-if="text.match(/two/g)"><img class="reportFlag" src="../../assets/images/flag-red.svg" alt="image" /></span>
            </template>
            <template #actions="text">
                <a-tooltip placement="bottom" @click="editTimeLog(text.text)">
                  <AuditTimeLog v-model:visible="visible" @saveAuditTimeLog="handleOk($event)" :Id="text.text"/>
                    <template #title>
                        <span>{{$t('global.edit')}}</span>
                    </template>
                    <a class="icons">
                        <EditOutlined /></a>
                </a-tooltip>
                <a-tooltip placement="bottom" @click="deleteTimeLog(text.text)">
                    <template #title>
                        <span>{{$t('global.delete')}}</span>
                    </template>
                    <a class="icons">
                        <DeleteOutlined /></a>
                </a-tooltip>
            </template>
            <template #active="key">
                <a-switch v-model:checked="checked[key.record.key]" />
            </template>
        </a-table>
        <Loader />
    </a-col>
    </template>
    
    <script>
      import { ref, reactive,  onMounted } from "vue"
      import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
      import AuditTimeLog from "../modals/AuditTimeLogs";
      import { messages } from "@/config/messages";
      import Loader from "@/components/loader/Loader";
      
      import { useStore } from "vuex";
      import { warningSwal } from "@/commonMethods/commonMethod";
    export default {
    
        components: {
            DeleteOutlined,
            EditOutlined,
            Loader,
            AuditTimeLog,
        },
        props: {
            columns: {
                type: Array,
            },
            timeLogRecords: {
                type: Array,
            },
    
        },
        setup(props) {
            const store = useStore();
            const visible = ref(false);
    const handleOk = () => {
    
      visible.value = false;
    };
  
    

    function  editTimeLog(id) {
      store.dispatch("editAuditTimeLog", id);
      visible.value = true;
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
         const fields =reactive(props.columns) 
            const data = reactive(props.timeLogRecords)
            //infinite scroll
            const meta = store.getters.timeLogReports
            const loader = ref(false)
            onMounted(() => {
                var tableContent = document.querySelector('.ant-table-body')
                tableContent.addEventListener('scroll', (event) => {
                    let maxScroll = event.target.scrollHeight - event.target.clientHeight
                    let currentScroll = event.target.scrollTop + 2
                    if (currentScroll >= maxScroll) {
                       
                        let current_page = meta.value.timeLogeMeta.current_page + 1
                       
                        if (current_page <= meta.value.timeLogeMeta.total_pages) {
                            loader.value = true
                            meta.value.timeLogeMeta = ""
                            store.dispatch("timeLogReportList", "?page=" + current_page)
                            setTimeout(() => {
                                loadMoredata()
                            }, 1000)
    
                        }
                    }
                })
            })
    
            function loadMoredata() {
                const newData = meta.value.timeLogReportList
                console.log("newData",newData)
                newData.forEach(element => {
                    data.push(element)
                });
                loader.value = false
            }
            return {
                editTimeLog,
                handleOk,
                fields,
                deleteTimeLog,
                data,
                loader,
                visible,
    
            }
        }
    }
    </script>
  
    
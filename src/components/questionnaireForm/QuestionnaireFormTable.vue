<template>
<a-table rowKey="id" :columns="columns" :data-source="data" :scroll="{ x: 900 }" @change="handleTableChange" :pagination=false>
    <template #userName="text">
        <router-link v-if="entity=='Patient'" :to="{ name: 'PatientSummary', params: { udid:text.record.userId?text.record.userId:'eyrer8758458958495'  }}">
            {{
                            text.text
                          }}</router-link>
                          <router-link v-else :to="{ name: 'CoordinatorSummary', params: { udid:text.record.userId?text.record.userId:'eyrer8758458958495'  }}">
            {{
                            text.text
                          }}</router-link>

    </template>
    <template #actions="{record}">
        
        <!-- <a-tooltip placement="bottom">
            <template #title>
                <span>Assign Section</span>
            </template>
            <a class="icons">
             
                    <DiffTwoTone @click="assignSection(record.id)"/></a>
        </a-tooltip> -->
        <!-- <a-tooltip placement="bottom">
            <template #title>
                <span>Setting</span>
            </template>
            <a class="icons">
            <router-link :to="{ name: 'QuestionTemplateDetail', params: { udid:record.id?record.id:'eyrer8758458958495'  }}">
                    <SettingTwoTone /></router-link></a>
        </a-tooltip> -->
        <!-- <a-tooltip placement="bottom">
            <template #title>
                <span>Edit</span>
            </template>
            <a class="icons" >
                <EditOutlined @click="editModal(record.id)"/></a>
        </a-tooltip> -->
        <!-- <a-tooltip placement="bottom">
            <template #title>
                <span>Create Url</span>
            </template>
            <a class="icons">
            
                    <SendOutlined  @click="getResponse(record.id)"/></a>
        </a-tooltip> -->
        <a-tooltip placement="bottom">
            <template #title>
                <span>Response View</span>
            </template>
            <a class="icons">
                <router-link :to="{ name: 'QuestionnaireResponse', params: { udid:record.id?record.questionnaireTempleteId:'eyrer8758458958495'  }}" >
                
                <EyeOutlined  /></router-link></a>
        </a-tooltip>
        <!-- <a-tooltip placement="bottom">
            <template #title>
                <span>Delete</span>
            </template>
            <a class="icons" @click="deleteModal(record.id)">
                <DeleteOutlined /></a>
        </a-tooltip> -->
    </template>
    <template #active="key">
        <a-switch v-model:checked="checked[key.record.key]" />
    </template>
</a-table>
<Loader />

 <a-modal width="70%" v-model:visible="visibleModal" title="New Template Url" :maskClosable="false" centered   :footer="false">
           <span>{{templateId}} </span>
    </a-modal>
</template>

<script>
import {EyeOutlined} from "@ant-design/icons-vue"
import {useStore} from "vuex"
import Loader from "@/components/loader/Loader"

import { onMounted , ref } from "vue"

const columns = [{
        title: "Questionnaire Template",
        dataIndex: "templateName",

        slots: {
            customRender: "templateName",
        },
    },
    {
        title: "User Name",
        dataIndex: "userName",
        slots: {
            customRender: "userName",
        },
    },
    {
        title: "Type",
        dataIndex: "templateType",
    },
    {
        title: "Actions",
        dataIndex: "actions",
        slots: {
            customRender: "actions",
        },
    },
];

export default {
    emits:["edit"],
    components: {
        EyeOutlined,
        Loader,
        
    },
    props: {},
    setup() {
        const store = useStore();
      
        const visible = ref(false)
        const data = store.getters.questionnaireResponse
        const meta = store.getters.questionnaireTemplateMeta
        let record = []
        let scroller = ""
        onMounted(() => {
            var tableContent = document.querySelector(".ant-table-body");
            tableContent.addEventListener("scroll", (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight;
                let currentScroll = event.target.scrollTop + 2
                if (currentScroll >= maxScroll) {
                    let current_page = meta.value.current_page + 1
                    if (current_page <= meta.value.total_pages) {
                        scroller = maxScroll;
                        meta.value = ""
                        record = data.value
                        store.dispatch("questionnaireResponse", "?page=" + current_page + store.getters.searchTable.value +
                            store.getters.orderTable.value.data).then(() => {
                            loadMoredata()
                        });
                    }
                }
            });
        });

        function loadMoredata() {
            const newData = data.value
            newData.forEach((element) => {
                record.push(element)
            });
            data.value = record;
            var tableContent = document.querySelector(".ant-table-body");

            setTimeout(() => {
                tableContent.scrollTo(0, scroller);
            }, 50)
        }
  

       
        const handleTableChange = (pag, filters, sorter) => {
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
                    "questionnaireResponse",
                    "?page=" + store.getters.searchTable.value + orderParam
                );
            } else {
                store.dispatch("orderTable", {
                    data: "&orderField=&orderBy=",
                });
                store.dispatch(
                    "questionnaireResponse",
                    "?page=" +
                    store.getters.searchTable.value +
                    store.getters.orderTable.value.data
                )
            }
        }
        const visibleModal = ref(false)
        const templateId = ref(false)
     const  getResponse =(id) =>{
        visibleModal.value = true
      templateId.value = id  
     }
   
        const showSection = (e) =>{
    
visible.value = e.show
}
        return {
            visibleModal,
            columns,
            data,
            getResponse,
           
            handleTableChange,
            visible,
           templateId,
            showSection,
            
            
        };
    },
};
</script>

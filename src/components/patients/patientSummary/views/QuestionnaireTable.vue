<template>
<a-table rowKey="id" :columns="columns" :data-source="data" :scroll="{ x: 900 }" @change="handleTableChange" :pagination=false>
    <template #templateName="text">
        <router-link :to="{ name: 'QuestionTemplateDetail', params: { udid:text.record.id?text.record.id:'eyrer8758458958495'  }}">
            {{
                            text.text
                          }}</router-link>
    </template>
    <template #actions="{record}">

        <a-tooltip placement="bottom">
            <template #title>
                <span>View</span>
            </template>
            <a class="icons">

                <EyeOutlined @click="showQuestionnaireForm(record)" />

            </a>
        </a-tooltip>

    </template>

</a-table>

<Loader />
<a-modal width="80%" v-model:visible="visible" title="Questionnaire" :maskClosable="false" centered @cancel="closeModal()" :footer="false">
    
    <TemplateResponse v-if="visible == true" :templateId="templateId" :clientResponse="clientResponse" @is-visible="emitFunction($event)" :user="userName" :userType="entityType"/>
</a-modal>
</template>

<script>
import {EyeOutlined} from "@ant-design/icons-vue"
import {useStore} from "vuex"
import Loader from "@/components/loader/Loader"
import {messages} from "@/config/messages";
import {warningSwal} from "@/commonMethods/commonMethod";
import TemplateResponse from "@/components/administration/questionnaire-template/TemplateResponse";
import { onMounted , ref , computed, onUnmounted } from "vue"
const columns = [{
        title: "Questionnaire Template",
        dataIndex: "templateName",

        slots: {
            customRender: "templateName",
        },
    },
    {
        title: "Type",
        dataIndex: "templateType",
    },
      {
        title: "Status",
        dataIndex: "status",
        
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
    emits: ["edit"],
    components: {
        Loader,
        EyeOutlined,
        TemplateResponse
    },
    props: {
        entityType:Number
    },
    setup() {
        const store = useStore();

        const visible = ref(false)
        const templateId = ref('')
        const data = store.getters.assignAllTemplates
        const meta = store.getters.questionnaireTemplateMeta
        const userName = ref('')
        const userType = ref('')
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
                        store.dispatch("assignAllTemplates", "?page=" + current_page + store.getters.searchTable.value +
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
                    "assignAllTemplates",
                    "?page=" + store.getters.searchTable.value + orderParam
                );
            } else {
                store.dispatch("orderTable", {
                    data: "&orderField=&orderBy=",
                });
                store.dispatch(
                    "assignAllTemplates",
                    "?page=" +
                    store.getters.searchTable.value +
                    store.getters.orderTable.value.data
                )
            }
        }

        const clientResponse = ref('')
        const showQuestionnaireForm = (id) => {
            userName.value = {name:id.userName,id:id.userId}
            userType.value = id.entityType
            if (id.clientQuestionnaireTemplateId) {
                templateId.value = id.clientQuestionnaireTemplateId
                clientResponse.value = true
            } else {
                templateId.value = id.questionnaireTemplateId
                clientResponse.value = false
            }

            visible.value = true

        }
        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput;
        })

        function closeModal() {
            if (checkFieldsData.value) {
                visible.value = true
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {

                        store.commit('clearStaffFormValidation', true)
                        store.commit('checkChangeInput', false)

                    } else {
                        store.commit('clearStaffFormValidation', false)

                        visible.value = true

                    }
                });
            } else {
                visible.value = false
                store.commit('clearStaffFormValidation', true)
            }

        }
        const emitFunction = (event) => {

             visible.value = event.show
        }
        onUnmounted(()=>{
            store.state.questionnaireTemplate.questionnaireResponseDetails = null
            store.state.questionnaireTemplate.detailsQuestionnaireTemplate = null
            store.state.questionnaireTemplate.templateDetailsList = []

        })
        return {

            columns,
            data,
            handleTableChange,
            visible,
            showQuestionnaireForm,
            closeModal,
            templateId,
            clientResponse,
            emitFunction,
            userName,
            userType
        };
    },
};
</script>

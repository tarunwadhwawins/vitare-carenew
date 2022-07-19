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
                <span>Assign Section</span>
            </template>
            <a class="icons">

                <DiffTwoTone @click="assignSection(record.id)" /></a>
        </a-tooltip>
        <a-tooltip placement="bottom">
            <template #title>
                <span>Setting</span>
            </template>
            <a class="icons">
                <router-link :to="{ name: 'QuestionTemplateDetail', params: { udid:record.id?record.id:'eyrer8758458958495'  }}">
                    <SettingTwoTone />
                </router-link>
            </a>
        </a-tooltip>
        <a-tooltip placement="bottom">
            <template #title>
                <span>Assign To User</span>
            </template>
            <a class="icons">
                <DiffTwoTone @click="assignToUser({id:record.id,show:true})" /></a>
        </a-tooltip>
        <a-tooltip placement="bottom">
            <template #title>
                <span>Edit</span>
            </template>
            <a class="icons">
                <EditOutlined @click="editModal(record.id)" /></a>
        </a-tooltip>
        <a-tooltip placement="bottom">
            <template #title>
                <span>Create Url</span>
            </template>
            <a class="icons">
                <router-link :to="{ name: 'TemplateResponse', params: { udid:record.id?record.id:'eyrer8758458958495'  }}">
                    <SendOutlined />
                </router-link>
            </a>
        </a-tooltip>
        <a-tooltip placement="bottom">
            <template #title>
                <span>Clone</span>
            </template>
            <a class="icons">
                <CopyOutlined @click="clone(record.id)" /></a>
        </a-tooltip>
        <a-tooltip placement="bottom">
            <template #title>
                <span>Delete</span>
            </template>
            <a class="icons" @click="deleteModal(record.id)">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template>
    <template #active="key">
        <a-switch v-model:checked="checked[key.record.key]" />
    </template>
</a-table>
<Loader />
<AssignSection v-if="visible" v-model:visible="visible" @is-visible="showSection($event)" :update="true" />
<AssignToUser v-if="assignToUserVisible" v-model:visible="assignToUserVisible" @is-visible="assignToUser($event)" :tempId="assignToUserId" />
</template>

<script>
import {DeleteOutlined,SettingTwoTone,SendOutlined,DiffTwoTone,CopyOutlined,EditOutlined} from "@ant-design/icons-vue"
import {useStore} from "vuex"
import Loader from "@/components/loader/Loader"
import {messages} from "@/config/messages";
import {warningSwal} from "@/commonMethods/commonMethod";
import { onMounted , ref } from "vue"
import AssignSection from "@/components/administration/questionnaire-template/modals/AssignSection"
import AssignToUser from "@/components/administration/questionnaire-template/modals/AssignToUser"
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
        DeleteOutlined,
        //EditOutlined,
        CopyOutlined,
        Loader,
        SettingTwoTone,
        SendOutlined,
        DiffTwoTone,
        AssignSection,
        EditOutlined,
        AssignToUser
    },
    props: {},
    setup(props, {
        emit
    }) {
        const store = useStore();
        const assignToUserId = ref('')
        const editModal = (id) => {
            store.dispatch("detailsQuestionnaireTemplate", id)
            emit("edit", {
                show: true,
                id: id
            });
        };
        const visible = ref(false)
        const data = store.getters.questionnaireTemplateList
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
                        store.dispatch("questionnaireTemplateList", "?page=" + current_page + store.getters.searchTable.value +
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

        function assignSection(id) {

            store.dispatch('detailsQuestionnaireTemplate', id)
            visible.value = true

        }

        function deleteModal(id) {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {
                    var index = data.value.findIndex(function (o) {
                        return o.id === id;
                    })
                    store.dispatch('deleteQuestionnaireTemplate', id)
                    data.value.splice(index, 1)
                }
            })

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
                    "questionnaireTemplateList",
                    "?page=" + store.getters.searchTable.value + orderParam
                );
            } else {
                store.dispatch("orderTable", {
                    data: "&orderField=&orderBy=",
                });
                store.dispatch(
                    "questionnaireTemplateList",
                    "?page=" +
                    store.getters.searchTable.value +
                    store.getters.orderTable.value.data
                )
            }
        }

        const clone = (id) => {
            store.dispatch('detailsQuestionnaireTemplate', id)
            emit('clone', id)
        }
        const showSection = (e) => {

            visible.value = e.show
        }
        const assignToUserVisible = ref(false)
        
        const assignToUser = (id) => {
            assignToUserId.value = id.id
 
assignToUserVisible.value = id.show
   
            
        }

        return {
            assignToUserId,
            columns,
            data,
            editModal,
            deleteModal,
            handleTableChange,
            visible,
            assignSection,
            showSection,
            clone,
            assignToUser,
            
            assignToUserVisible,

        };
    },
};
</script>

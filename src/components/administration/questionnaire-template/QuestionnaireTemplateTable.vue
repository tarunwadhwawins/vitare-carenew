<template>
<a-table rowKey="id" :columns="columns" :data-source="data" :scroll="{ x: 900 }" @change="onChange" :pagination=false>
    <template #question="text">
        <router-link to="question-template-detail">{{
                            text.text
                          }}</router-link>
    </template>
    <template #actions>
        <a-tooltip placement="bottom">
            <template #title>
                <span>Edit</span>
            </template>
            <a class="icons" @click="editModal">
                <EditOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom">
            <template #title>
                <span>Clone</span>
            </template>
            <a class="icons">
                <CopyOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom">
            <template #title>
                <span>Delete</span>
            </template>
            <a class="icons">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template>
    <template #active="key">
        <a-switch v-model:checked="checked[key.record.key]" />
    </template>
</a-table>
</template>
  
<script>

import {
    DeleteOutlined,
    EditOutlined,
    CopyOutlined,
} from "@ant-design/icons-vue";
const columns = [{
        title: "Questionnaire Template",
        dataIndex: "question",
        sorter: {
            compare: (a, b) => a.template - b.template,
            multiple: 3,
        },
        slots: {
            customRender: "question",
        },
    },
    {
        title: "Type",
        dataIndex: "type",

    },
    {
        title: "Actions",
        dataIndex: "actions",
        slots: {
            customRender: "actions",
        },
    },
];
const data = [{
        key: "1",
        question: "Physician Orders for Life-Sustaining Treatment (POLST)",
        type: "Intake",
        action: "",
    },
    {
        key: "2",
        question: "Physician's Report For Community Care Facilities",
        type: "Screening",
        action: "",
    },
    {
        key: "3",
        question: "Physician's Report For Residential Care Facilities For The Elderly (RCFE)",
        type: "Assessment",
        action: "",
    },
];
export default {
    components: {

        DeleteOutlined,
        EditOutlined,
        CopyOutlined,

    },
    props:{

    },
    setup(props,{emit}) {
      const  editModal =()=>{
          emit("edit",true)
      }
 
        return {
            columns,
            data,
            editModal,

          
        };
    },
};
</script>

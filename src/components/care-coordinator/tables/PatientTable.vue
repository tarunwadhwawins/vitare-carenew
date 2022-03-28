<template>
<a-table  rowKey="id" :columns="patients.staffSummaryPatientCols" :data-source="patients.staffSummaryPatient" :pagination="false" @change="onChange">
    <template #firstName="{ record }">
        <router-link :to="{ name: 'PatientSummary', params: { udid: record.id } }">{{ record.firstName }}</router-link>
    </template>
    <template #lastName="text">
        <router-link :to="linkTo">{{ text.text }}</router-link>
    </template>
    <template #flags="{ text }">
        <span class="box" :style="{'background-color':text}"></span>
        <!-- <span class="box" :class="text"></span>
        <span class="box" :class="(text = text.match(/yellowBgColor/g))" v-if="text.match(/yellowBgColor/g)"></span> -->
    </template>
    <template #compliance>
        <a class="icons">
            <WarningOutlined /></a>
    </template>

    <template #lastReadingValues>
        <WarningOutlined />
    </template>
    <template #action="">
        <a-tooltip placement="bottom" >
            <template #title>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template>
</a-table>
</template>

<script>
import{useStore} from "vuex"
import{computed} from "vue"
import {DeleteOutlined,} from "@ant-design/icons-vue";
export default {
    comments:{
        DeleteOutlined
    },
    setup(){
        const store = useStore()
        const patients = computed(()=>{
           return store.state.careCoordinatorSummary
        })
        return{
            patients
        }
    }
};
</script>

<style>
</style>

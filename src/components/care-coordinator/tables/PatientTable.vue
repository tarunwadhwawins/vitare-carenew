<template>
<a-table  rowKey="id" :columns="patients.staffSummaryPatientCols" :data-source="patients.staffSummaryPatient" :scroll="{ x: 800,y:'calc(100vh - 470px)' }" :pagination="false" @change="onChange">
    <template #firstName="{ record }" v-if="arrayToObjact(screensPermissions,63)">
        <router-link :to="{ name: 'PatientSummary', params: { udid: record.id } }">{{ record.firstName }}</router-link>
    </template>
     <template #firstName="{ record }" v-else>
        <span >{{ record.firstName }}</span>
    </template>
    <template #lastName="text">
        <span >{{ text.text }}</span>
    </template>
    <template #flags="{ text }">
        <span class="box" :style="{'background-color':text}"></span>
    </template>
    <template #compliance>
        <a class="icons">
            <WarningOutlined /></a>
    </template>

    <template #lastReadingValues>
        <WarningOutlined />
    </template>
    <template  v-if="arrayToObjact(screensPermissions,64)">
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
import {
    arrayToObjact,
} from "@/commonMethods/commonMethod"
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
            arrayToObjact,
            screensPermissions:store.getters.screensPermissions,
            patients
        }
    }
};
</script>

<style>
</style>

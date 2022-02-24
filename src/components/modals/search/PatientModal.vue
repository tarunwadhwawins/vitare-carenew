<template>
<a-modal width="1000px" title="Patient Search" :maskClosable="false">
    <a-form ref="formRef" autocomplete="off" :model="patientSearch" @finish="submitForm">
        <a-row :gutter="24">
            <a-col :sm="20" :xs="24">
                <a-form-item :label="$t('patient.patients')" name="search" :rules="[{ required: true, message: $t('patient.patients')+' '+$t('global.validation') }]">
                    <a-input v-model:value="patientSearch.search" placeholder="Search patients" size="large" />
                </a-form-item>
            </a-col>
            <a-col :sm="4" :xs="24">
                <a-button type="primary" size="large" html-type="submit">Search</a-button>
            </a-col>
        </a-row>
    </a-form>
    <a-row :span="24">
        <a-col :sm="24" :xs="24">
            <a-table :pagination="false" :columns="patientsData.patientSearchWithBitrixCols" :data-source="patientsData.patientSearchWithBitrix" :scroll="{ x: 900 }">
                <template #action="text">
                        <a class="icons" @click="fetchFromBitrix(text.record.CONTACT_ID)">
                           <FileOutlined />
                        </a>
                </template>
            </a-table>
        </a-col>
        <Loader />
    </a-row>
</a-modal>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader";
import {FileOutlined} from "@ant-design/icons-vue";
export default {
    components:{
        Loader,
        FileOutlined
    },
  setup(props,{emit}) {
    const store = useStore();
    const patientSearch = reactive({
      search: "",
    });

    function submitForm() {
      store.dispatch("patientSearchWithBitrix", patientSearch);
    }
    const patientsData = computed(()=>{
        return store.state.patients
    })
    function fetchFromBitrix(id){
        store.dispatch('fetchFromBitrix',id),
        emit('closeSearchPatient',false)
    }
    return {
    fetchFromBitrix,
    patientsData,
      submitForm,
      patientSearch,
    };
  },
};
</script>

<style>
</style>

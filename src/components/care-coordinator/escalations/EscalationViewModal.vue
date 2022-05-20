<template>
<a-modal max-width="1140px" width="70%" title="Details" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
       
        <a-col :span="24">
        <a-collapse v-model:activeKey="activeKey" accordion>
            <a-collapse-panel key="1" header="Patient Name">
                <p>{{ record.patientName }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="Escalation Description">
                <p>{{ record.escalationDescription }}</p>
            </a-collapse-panel>
            <!-- <a-collapse-panel key="3" header="Notes" v-if="record.escalationNotes.data.length>0">
                <p>{{ record.escalationNotes.data }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="4" header="Vitals" v-if="record.escalationVital.data.length>0">
                <p>{{ record.escalationVital.data }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="5" header="Care Plans" v-if="record.escalationCarePlan.data.length>0">
                <p>{{ record.escalationCarePlan.data }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="6" header="Flags" v-if="record.escalationFlag.data.length>0">
                <p>{{ record.escalationFlag.data }}</p>
            </a-collapse-panel> -->
            
        </a-collapse>
        </a-col>
    </a-row>
</a-modal>
</template>

<script>
import {computed, ref } from 'vue';
import { useStore } from "vuex";
export default {
 setup() {
    const activeKey = ref([])
    const store = useStore()
    const record = computed(()=>{
        return store.state.patients.singleEscalationRecord
    })
    return {
      activeKey,
      record
    };
  },
}
</script>

<style>

</style>

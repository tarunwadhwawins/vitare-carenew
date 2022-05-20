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

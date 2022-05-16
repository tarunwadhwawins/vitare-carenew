<template>
<div>
    <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
            <PatientInfoTop :patientDetails="patientDetails" />
        </a-col>
    </a-row>
    <a-row>
        <div class="">
            <!-- stepper -->
            <a-steps v-model:current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title?item.title:''" />
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Escalation Info'">
                <h3>Escalation Info</h3>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Notes'">
                <h3>Notes</h3>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Vitals'">
                <h3>Vitals</h3>
            </div>
        </div>
    </a-row>
</div>
</template>

<script>
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import {
    computed
} from 'vue-demi';
import {
    useStore
} from 'vuex';
export default {
    components: {
        PatientInfoTop,
    },
    setup() {
        const store = useStore();
        const patientDetails = computed(() => {
            return store.state.patients.patientDetails;
        })
        const current = computed({
            get: () => store.state.patients.escalationCounter,
            set: (value) => {
                store.state.patients.escalationCounter = value;
            },
        });
        const next = () => {
            store.commit("counterPlus");
        };
        const prev = () => {
            store.commit("counterMinus");
        };
        return {
            current,
            next,
            prev,
            patientDetails,
            steps: [{
                    title: "Escalation Info",
                    content: "First-content",
                },
                {
                    title: "Notes",
                    content: "Second-content",
                },
                {
                    title: "Vitals",
                    content: "Second-content",
                },
            ],
        }
    }
}
</script>

<style lang="scss">
.dangerValue {
    padding: 5px;
    background-color: #f03131f3;
    color: #fff;
}
</style>

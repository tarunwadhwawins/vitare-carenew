<template>
<div>

    <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
            <PatientInfoTop :patientDetails="patientDetails" />
        </a-col>
    </a-row>
    <div class="common-bg">
        <a-row>
            <a-col :span="24">
                <h2 class="pageTittle">
                    Questionnaire Template

                </h2>
            </a-col>
            <a-col :span="12">
                <SearchField endPoint="questionnaire" class="mb-24" />
            </a-col>
            <a-col :span="24">
                <QuestionnaireTemplateTable @edit="showModal($event)" @clone="clone($event)" :entityType="entityType" @is-visible="emitRecords($event)" />

            </a-col>
        </a-row>
    </div>
</div>
<!--modals-->

<!---->
</template>

<script>
import QuestionnaireTemplateTable from "@/components/patients/patientSummary/views/QuestionnaireTable"
import { ref, onUnmounted, onMounted } from "vue";
import { useStore } from "vuex";
import SearchField from "@/components/common/input/SearchField";
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
export default {
    components: {

        QuestionnaireTemplateTable,
        SearchField,
        PatientInfoTop
    },
    props: {
        patientDetails: Object,
        entityType: Number,
        userId: String,
    },
    setup(props) {
        const store = useStore();
        const checked = ref([false]);
        const visible2 = ref(false);
        const update = ref('');
        const templateId = ref('')
        const showModal = (e) => {
            update.value = e.id;
            visible2.value = e.show;
            templateId.value = ''
        };
        const templatEdit = (e) => {
            update.value = e.id;
            visible2.value = e.show;
        };

        const handleChange2 = (value) => {
            console.log(`selected ${value}`);
        };
        onMounted(() => {
            store.dispatch("searchTable", "&search=");
            store.dispatch("orderTable", {
                data: "&orderField=&orderBy=",
            });
            store.dispatch("assignAllTemplates", {
                id: props.userId,
                entityType: props.entityType
            });
        });

        onUnmounted(() => {
            store.state.questionnaireTemplate.questionnaireResponseDetails = null
            store.state.questionnaireTemplate.detailsQuestionnaireTemplate = null
            store.state.questionnaireTemplate.templateDetailsList = []
            store.dispatch("searchTable", "&search=");
            store.dispatch("orderTable", {
                data: "&orderField=&orderBy=",
            });
            store.state.patients.errorMsg = "";
            store.state.common.successMsg = "";
        });

        const clone = (event) => {
            templateId.value = event
            visible2.value = true;
            update.value = ''
        }

        function emitRecords() {
            store.dispatch("assignAllTemplates", {
                id: props.userId,
                entityType: props.entityType
            });

        }
        return {
            checked,
            visible2,
            showModal,
            templatEdit,
            handleChange2,
            update,
            clone,
            templateId,
            emitRecords
        };
    },
};
</script>

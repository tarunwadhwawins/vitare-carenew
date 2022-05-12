<template>
<a-modal width="100%" :title="templaterecord.templateName" centered :maskClosable="false" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="assignQuestion" layout="vertical" @finish="addAssignQuestion" @finishFailed="onFinishFailed">
        <a-row>
            <a-col :span="16">
                <SearchField endPoint="question" />
            </a-col>

            <a-col :span="8">
                <div class="text-right mt-28">
                    <a-button class="btn primaryBtn">Search Existing</a-button>
                    <a-button @click="showModal({show:true,id:''})" class="btn primaryBtn ml-10">Add New Question</a-button>
                </div>
            </a-col>

            <a-col :span="24">
                <div class="questionnaireMain checkBoxCollapse mt-28">

                    <a-collapse v-model:activeKey="activeKey" expand-icon-position="right">
                        <a-collapse-panel v-for="questionList in questionnaireList" :key="questionList.questionId" :header="questionList.question">
                            <div v-if="questionList.dataTypeId==244 || questionList.dataTypeId==243">
                                <a-col :span="24" v-for="(options,index) in questionList.options" :key="index">
                                    <div class="questionOutput">
                                        <a-checkbox v-if="questionList.dataTypeId==244" v-model:checked="options.defaultOption" disabled>
                                            Default
                                        </a-checkbox>
                                        <a-checkbox v-if="questionList.dataTypeId==244" v-model:checked="options.correct" disabled>
                                            Correct
                                        </a-checkbox>
                                        <p>Options : </p>
                                        <p>{{ options.option }}</p>
                                        <p v-if="options.score">Score - {{options.score}}</p>
                                        <div v-if="options.program.length>0">
                                            <a-tag v-for="(program,i) in options.program" :key="i">{{program.program}} - {{program.score? program.score : 0}}</a-tag>
                                        </div>
                                    </div>
                                </a-col>
                            </div>
                            <a-col :span="24" v-else>
                                <div class="questionOutput">

                                    <p>Score : {{questionList.score?questionList.score : 0}}</p>

                                </div>
                            </a-col>

                            <template class="checkBox" #extra>
                                <a-checkbox v-model:checked="assignQuestion.checkBox[questionList.id]" name="checkbox" :value="questionList.id" @change="checkboxChange($event);checkChangeInput();"></a-checkbox>
                            </template>
                        </a-collapse-panel>

                    </a-collapse>
                </div>
            </a-col>
            <a-col :span="24" class="text-right" v-if="questionnaireList.length>0">
                <a-button class="btn primaryBtn" type="primary" html-type="submit">Assign Questions</a-button>
            </a-col>

        </a-row>
    </a-form>
    <AddQuestionnaire v-model:visible="visible1" @is-visible="showModal($event)" :templateId="templaterecord.id" />

    <Loader />
</a-modal>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref,onMounted , reactive, watchEffect,computed } from "vue"; 
import { useStore } from "vuex"
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import Loader from "@/components/loader/Loader";
import SearchField from "@/components/common/input/SearchField"
export default defineComponent({
    components: {
        Loader,
        AddQuestionnaire: defineAsyncComponent(() => import("@/components/administration/questionnaire-bank/modals/AddQuestionnaire")),
        SearchField

    },
    props: {
        templaterecord: Array
    },

    setup(props, {
        emit
    }) {
        const store = useStore()

        const assignQuestion = reactive({
            questionId: [],
            checkBox: []

        })
        // const form = reactive({
        //     ...assignQuestion
        // })
        const templateDetailsList = store.getters.templateDetailsList
        const questionnaireList = store.getters.questionnaireList
        onMounted(() => {
            //store.dispatch("questionnaireList")
        })
        watchEffect(() => {

            if (templateDetailsList.value.length > 0 && questionnaireList.value.length > 0) {
                templateDetailsList.value.forEach(element => {
                  
                    var index = questionnaireList.value.findIndex(a => a.id === element.id)
                    if(index!==-1){
                      questionnaireList.value.splice(index, 1)
                    }

                });

            }
        })

        function checkboxChange(event) {

            if (event.target.checked) {
                assignQuestion.questionId.push(event.target.value);
            } else {
                let index = assignQuestion.questionId.indexOf(event.target.value);
                assignQuestion.questionId.splice(index, 1);
            }
        }
        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };

        const filterOption = (input, option) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const visible1 = ref(false);
        const id = ref("");
        const showModal = (e) => {
            visible1.value = e.show;
            id.value = e.id;

        }

        const addAssignQuestion = () => {

            store.dispatch("addAssiignquestionnaire", {
                data: assignQuestion.questionId,
                id: props.templaterecord.id
            }).then(() => {
                store.dispatch("templateDetailsList", props.templaterecord.id)
                emit("is-visible-exist", false)
                reset()
                store.commit("checkChangeInput", false)
            })
        }
        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput;
        })

        function checkChangeInput() {
            store.commit("checkChangeInput", true)
        }

        function reset() {
            assignQuestion.questionId = []
            assignQuestion.checkBox = []
            //Object.assign(assignQuestion, form)
        }

        function closeModal() {
            if (checkFieldsData.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        emit("is-visible-exist", false)
                        reset()
                        store.commit("checkChangeInput", false)
                    } else {
                        emit("is-visible-exist", true)
                    }
                });
            } else {
                store.commit("checkChangeInput", false)
                //disabled.value= false
            }
        }
        return {
            addAssignQuestion,
            assignQuestion,
            checkboxChange,
            filterOption,

            handleChange,
            showModal,
            visible1,

            id,
            questionnaireList,
            templateDetailsList,
            closeModal,
            checkChangeInput,
        };
    },
});
</script>

<template>
<div class="common-bg">
    <div class="questionnaireMain">
        <a-row :gutter="24">
            <a-col :span="24">
                <h2 class="pageTittle">

                    {{ detailsQuestionnaireTemplate ? detailsQuestionnaireTemplate.templateName : ''}}
                    <div class="commonBtn">
                        <a-button class="btn primaryBtn ml-10 buttonWtIcon" @click="showModal2(true)">Search Question</a-button>
                        <a-button class="btn primaryBtn ml-10 buttonWtIcon" @click="showModal({show:true,id:''})">Add Question
                            <PlusOutlined />
                        </a-button>
                        <router-link to="/questionnaire-template" class="b-inline ml-10">
                            <a-button class="btn primaryBtn">Back</a-button>
                        </router-link>
                    </div>
                </h2>
            </a-col>
            <a-col :span="24">
                <a-collapse v-model:activeKey="activeKey" expand-icon-position="left">
                    <a-collapse v-model:activeKey="activeKey" expand-icon-position="right" v-if="templateDetailsList">
                        <a-collapse-panel v-for="questionList in templateDetailsList" :key="questionList.questionId" :header="questionList.question">
                            <div v-if="questionList.dataTypeId==244 || questionList.dataTypeId==243">
                                <a-col :span="24" v-for="(options,index) in questionList.options" :key="index">
                                    <div class="questionOutput">
                                        <a-checkbox v-model:checked="options.defaultOption" disabled>
                                            Default
                                        </a-checkbox>
                                        <a-checkbox v-model:checked="options.correct" disabled>
                                            Correct
                                        </a-checkbox>
                                        <div class="ml-10 ">
                                            <p>{{ options.option }}</p>
                                            <p v-if="options.score">Score - {{options.score}}</p>
                                            <div v-if="options.program.length>0">
                                                <a-tag v-for="(program,i) in options.program" :key="i">{{program.program}} - {{program.score? program.score : 0}}</a-tag>
                                            </div>
                                        </div>
                                    </div>
                                </a-col>
                            </div>
                            <a-col :span="24" v-else>
                                <div class="questionOutput">

                                    <p>Score : {{questionList.score?questionList.score : 0}}</p>

                                </div>
                            </a-col>

                            <template #extra>
                                <!-- <EditOutlined @click="showModal1" /> -->
                                <DeleteOutlined /></template>
                        </a-collapse-panel>

                    </a-collapse>

                </a-collapse>
            </a-col>
        </a-row>

    </div>
    <!--modals-->
    <AddQuestionnaire v-model:visible="visible2" @is-visible="showModal($event)" :templateId="udid" />
    <EditQuestionnaire v-model:visible="visible3" />
    <SearchQuestion v-if="detailsQuestionnaireTemplate" v-model:visible="visible1" :templaterecord="detailsQuestionnaireTemplate" @is-visible-exist="showModal2($event)" />
    <!---->
</div>
<TableLoader />
</template>

<script>
  import { defineComponent, ref,onMounted,onUnmounted } from "vue"
  import { DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue"
  import AddQuestionnaire from "@/components/administration/questionnaire-bank/modals/AddQuestionnaire"
  import EditQuestionnaire from "@/components/modals/EditQuestionnaire"
  import SearchQuestion from "@/components/administration/questionnaire-template/modals/SearchQuestion"
  import TableLoader from "@/components/loader/TableLoader"
  import { useStore  } from "vuex"
  import { useRoute  } from 'vue-router'
export default defineComponent({
    name: "Question Template Details",
    components: {

        DeleteOutlined,

        AddQuestionnaire,
        EditQuestionnaire,
        SearchQuestion,
        PlusOutlined,
        TableLoader
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const udid = route.params.udid
        const activeKey = ref(["1"])
        const visible2 = ref(false)
        const id = ref("");
        const showModal = (e) => {
            visible2.value = e.show;
            id.value = e.id;

        }
        const visible3 = ref(false)
        const showModal1 = () => {
            visible3.value = true
        };
        const visible1 = ref(false)
        const showModal2 = (e) => {
            store.dispatch("questionnaireList")
            visible1.value = e;
        };

        onMounted(() => {
            store.dispatch("detailsQuestionnaireTemplate", udid)
            store.dispatch("templateDetailsList", udid)
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })

        onUnmounted(() => {
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })
        return {
            activeKey,
            visible2,
            showModal,
            visible3,
            showModal1,
            visible1,
            showModal2,
            udid,
            detailsQuestionnaireTemplate: store.getters.detailsQuestionnaireTemplate,
            templateDetailsList: store.getters.templateDetailsList
        };
    },
});
</script>

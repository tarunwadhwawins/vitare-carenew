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
                <Question :question="templateDetailsList" v-if="templateDetailsList"  :edit="false" />
               
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
  import { PlusOutlined } from "@ant-design/icons-vue"
  import AddQuestionnaire from "@/components/administration/questionnaire-bank/modals/AddQuestionnaire"
  import EditQuestionnaire from "@/components/modals/EditQuestionnaire"
  import SearchQuestion from "@/components/administration/questionnaire-template/modals/SearchQuestion"
  import Question from "@/components/administration/questionnaire-bank/common/Question"
  import TableLoader from "@/components/loader/TableLoader"
  import { useStore  } from "vuex"
  import { useRoute  } from 'vue-router'
export default defineComponent({
    name: "Question Template Details",
    components: {

      

        AddQuestionnaire,
       EditQuestionnaire,
        SearchQuestion,
        PlusOutlined,
        Question,
        TableLoader
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const udid = route.params.udid
       
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
            
            visible2,
            showModal,
            visible3,
            showModal1,
            visible1,
            showModal2,
            udid,
            detailsQuestionnaireTemplate: store.getters.detailsQuestionnaireTemplate,
            templateDetailsList: store.getters.templateDetailsList,
            value: ref(1),
            value2: ref(1)
        };
    },
});
</script>

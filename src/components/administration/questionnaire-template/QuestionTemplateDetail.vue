<template>
<div class="common-bg">
    <div class="questionnaireMain">
        <a-row :gutter="24" >
            <a-col :span="24">
                <h2 class="pageTittle">

                    {{ detailsQuestionnaireTemplate ? detailsQuestionnaireTemplate.templateName : ''}}
                    <div class="commonBtn">
                        <a-button class="btn primaryBtn ml-10 buttonWtIcon" @click="showModal2(true)">Search Question</a-button>
                        <!-- <a-button class="btn primaryBtn ml-10 buttonWtIcon" @click="showModal2(true)">Search Section</a-button> -->
                         <a-button class="btn primaryBtn ml-10 buttonWtIcon" @click="showSection({show:true,id:detailsQuestionnaireTemplate.id})">Assign Section
                            <PlusOutlined />
                        </a-button>
                        <a-button class="btn primaryBtn ml-10 buttonWtIcon" @click="showModal({show:true,id:''})">Add Question
                            <PlusOutlined />
                        </a-button>
                        <router-link to="/questionnaire-template" class="b-inline ml-10">
                            <a-button class="btn primaryBtn">Back</a-button>
                        </router-link>
                    </div>
                </h2>
            </a-col>
        </a-row>
        <a-row :gutter="24" v-if="detailsQuestionnaireTemplate">
            <a-col :span="24" v-for="templateRecords,index in detailsQuestionnaireTemplate.questionnaireQuestion" :key="index">
           
                <Question v-if="templateRecords.entityType=='question'" :question="templateRecords.question" temOrSection="template"  :edit="false" type="single"/>
               <div class="healthTemplateBox" v-else>
               
                <!-- <div v-for="sectionName in templateRecords.questionnaireSection" :key="sectionName.id">-->

                <h4>Section Name : {{templateRecords.questionnaireSection.sectionName}}</h4>
<Question :question="templateRecords.questionnaireSection" temOrSection="section"  :edit="false" type="multiple"/>
                <!-- </div>  -->
            </div>
            </a-col>
            
        </a-row>

    </div>
    <!--modals-->
    <AddQuestionnaire v-if="visible2"  v-model:visible="visible2" @is-visible="showModal($event)" :templateId="udid" temOrSection="template" :name="detailsQuestionnaireTemplate ? detailsQuestionnaireTemplate.templateName : ''" />
    
    <AssignSection v-if="sectionVisible" v-model:visible="sectionVisible"  @is-visible="showSection($event)" :update="true"/>
    <SearchQuestion v-if="visible1" v-model:visible="visible1" :templaterecord="detailsQuestionnaireTemplate" @is-visible-exist="showModal2($event)" temOrSection="template" />
    <!---->
    
</div>
<TableLoader />
</template>

<script>
  import { defineComponent,defineAsyncComponent, ref,onMounted,onUnmounted } from "vue"
  import { PlusOutlined } from "@ant-design/icons-vue"
  import SearchQuestion from "@/components/administration/questionnaire-template/modals/SearchQuestion"
  import Question from "@/components/administration/questionnaire-bank/common/Question"
  import TableLoader from "@/components/loader/TableLoader"
  import AssignSection from "@/components/administration/questionnaire-template/modals/AssignSection"
  import { useStore  } from "vuex"
  import { useRoute  } from 'vue-router'
export default defineComponent({
    name: "Question Template Details",
    components: {
        AddQuestionnaire: defineAsyncComponent(() => import("@/components/administration/questionnaire-bank/modals/AddQuestionnaire")),
 
        SearchQuestion,
        PlusOutlined,
        Question,
        TableLoader,
        AssignSection
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
        const sectionVisible =  ref(false)
        // const visible3 = ref(false)
        // const showModal1 = () => {
        //     visible3.value = true
        // };
        const visible1 = ref(false)
        const showModal2 = (e) => {
            store.dispatch("questionnaireList")
            visible1.value = e;
        };
const showSection = (e) =>{
    store.dispatch('detailsQuestionnaireTemplate', e.id)
sectionVisible.value = e.show
}
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
           
            visible1,
            showModal2,
            udid,
            detailsQuestionnaireTemplate: store.getters.detailsQuestionnaireTemplate,
            templateDetailsList: store.getters.templateDetailsList,
            value: ref(1),
            value2: ref(1),
            showSection,
            sectionVisible
        };
    },
});
</script>
<style lang="scss">
    .healthTemplateBox{
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #e3e3e3;
        h4 {
            margin:  0 0 10px;
        }
    }
</style>
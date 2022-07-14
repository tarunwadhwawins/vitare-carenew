<template>
<a-modal width="100%" :title="detailsQuestionnaireTemplate ? detailsQuestionnaireTemplate.templateName:''" centered :maskClosable="false" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="section" layout="vertical" @finish="assignSection">
        <a-row :gutter="16">
            <!-- <a-col :span="16">
                <div class="form-group">
                 
                    <a-form-item :label="$t('questionnaire.sectionName')" name="sectionId" :rules="[{ required: true, message: $t('questionnaire.sectionName') +' '+$t('global.validation') }]">
                      <ArrayDataSearch v-if="sectionType" v-model:value="section.sectionId" :globalCode="sectionType" @change="checkChangeInput()" mode="multiple" :responseReturn="true" @checkReturnResponse="sectionSelect($event)"/>
                       
                         <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.sectionId[0]:''" />
                    </a-form-item>
                </div>
            </a-col>  -->

            <a-col :md="20" :sm="24" :xs="24" class="mb-24">
                <a-input @keypress="selectedSection($event,'search')" size="large" placeholder="Search..." id="conditionBox" />
            </a-col>
             <a-col :span="4">
                <div class="">
                    <a-button class="btn primaryBtn" v-if="addSectionButton" @click="showModal({show:true,id:''})">Create New Section</a-button>
                </div>

            </a-col>
            <a-col :md="20" :sm="20" :xs="20">
                <div class="form-group conditionsCheckboxs">
                    <a-form-item name="sectionId" :rules="[{ required: true, message: $t('questionnaire.sectionName')+' '+$t('global.validation') }]">
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.sectionId[0]:''" />
                        <!-- Selected -->

                        <p v-if="selectedSectionList && selectedSectionList.length > 0">
                            <a-checkbox-group v-model:value="section.sectionId">
                                <a-checkbox @change="chooseSection($event, false,false)" v-for="disease in selectedSectionList" :key="disease.id" :value="disease.id" name="sectionId">{{disease.name}}</a-checkbox>
                            </a-checkbox-group>
                        </p><br />
                        <!-- Unselected -->
                        <!-- {{conditions.unselectedConditions}} -->
                        <p v-if="unSelectedSectionList && unSelectedSectionList.length > 0">
                            <a-checkbox-group v-model:value="section.unselectedsectionId">
                                <a-checkbox @change="chooseSection($event, true,false)" v-for="disease in unSelectedSectionList" :key="disease.id" :value="disease.id" name="unselectedsectionId">{{disease.name}}</a-checkbox>
                            </a-checkbox-group>
                        </p>
                    </a-form-item>
                </div>
            </a-col>

           
            <a-col :span="24">

                <div class="steps-action">
                    <a-button style="margin-right: 8px" html-type="reset"  @click="reset()">{{$t('global.clear')}}</a-button>
                    <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
                    <!-- <a-button  type="primary" html-type="submit" v-else >{{$t('global.update')}}</a-button> -->
                </div>
            </a-col>
        </a-row>
        <TableLoader />
    </a-form>
    <CreateSection v-model:visible="visible" @is-visible="setSectionId($event)" v-if="visible" :sectionName="sectionName" />
</a-modal>
</template>

<script>
import { ref, reactive, defineComponent, computed,watchEffect, onMounted } from "vue";
import { useStore } from "vuex";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
//import ArrayDataSearch from "@/components/modals/search/ArrayDataSearch.vue"
import TableLoader from "@/components/loader/TableLoader"
import ErrorMessage from "@/components/common/messages/ErrorMessage"
import CreateSection from "@/components/administration/template-section/modals/CreateSection"
export default defineComponent({
    emits: ["is-visible"],
    components: {
        TableLoader,
        //ArrayDataSearch,
        ErrorMessage,
        CreateSection
    },
    props: {
        udid: String,
        update: Boolean
    },

    setup(props, {
        emit
    }) {
        const store = useStore();
        const formRef = ref();
const visible = ref(false)
        const section = reactive({

            sectionId: [],
            unselectedsectionId: []

        });
        const sectionType = store.getters.allSections
        const isValueChanged = ref(false)
        const unSelectedSectionList = ref([])
        const selectedSectionList = ref([])
            onMounted(() => {
            
            store.dispatch("allSections").then(() => {
                 selectedSection('','notsearch')
                if (detailsQuestionnaireTemplate.value) {
                    detailsQuestionnaireTemplate.value.questionnaireQuestion.map((item) => {
                        if (item.entityType == 'questionnaireSection') {
                                 
                            chooseSection(item.questionnaireSection.id, true,true)
                          
                
                        }
                    })
                }
                
            })

        })
        const selectedSection = (event,search) => {
         
            isValueChanged.value = true;
            const searchedValue =search=='search'? event.target.value : event
            unSelectedSectionList.value = []
            sectionType.value.map(function (sectionRecord) {
              if (sectionRecord.name.toLowerCase().includes(searchedValue.toLowerCase()) == false) {
                
                addSectionButton.value = true
                sectionName.value = searchedValue
            } else {
                addSectionButton.value = false
                sectionName.value = ''
            }
                if (sectionRecord.name.toLowerCase().includes(searchedValue.toLowerCase())) {
                    if (!selectedSectionList.value.includes(sectionRecord) && !unSelectedSectionList.value.includes(sectionRecord)) {
                        unSelectedSectionList.value.push(sectionRecord)
                    }
                }
            });
        }
        const chooseSection = (event,isTrue,checkedValue) => {
            const value = checkedValue ? event: event.target.value
            const checked = checkedValue ? checkedValue : event.target.checked
            if (isTrue && checked) {
                store.state.patients.errorMsg
                unSelectedSectionList.value.filter(function (sectionRecord) {
                    if (value == sectionRecord.id) {
                        const indexOfObject = unSelectedSectionList.value.findIndex(object => {
                            return object.id === sectionRecord.id;
                        });
                        unSelectedSectionList.value.splice(indexOfObject, 1);
                        if (!selectedSectionList.value.includes(sectionRecord)) {
                            
                            selectedSectionList.value.push(sectionRecord)
                            if (!section.unselectedsectionId.includes(value)) {
                                section.unselectedsectionId.push(value)
                            }
                        }
                        section.sectionId.push(sectionRecord.id)
                    }
                })
            } else if (!isTrue && !checked) {
                section.sectionId = section.sectionId.filter(function (val) {
                    return value != val;
                });
                selectedSectionList.value.filter(function (sectionRecord) {
                    
                    if (value == sectionRecord.id) {
                        
                        const indexOfObject = selectedSectionList.value.findIndex(object => {
                            return object.id === sectionRecord.id;
                        });
                        selectedSectionList.value.splice(indexOfObject, 1)
                        section.unselectedsectionId.splice(section.unselectedsectionId.findIndex(function(i){
    return i === value;
}), 1);
                        
                        //
                       
                        if (!unSelectedSectionList.value.includes(sectionRecord)) {
                            unSelectedSectionList.value.push(sectionRecord)
                        }
                    }
                })
            }
        }
function setSectionId(event){
  
   visible.value = event.show
   selectedSection(event.id.sectionName,'notSearch')
   console.log("event",event.id.sectionName)

}
        const disabled = ref(false)
        const form = reactive({
            ...section
        })
        const detailsQuestionnaireTemplate = store.getters.detailsQuestionnaireTemplate
    
        watchEffect(() => {

        })
        const assignSection = () => {

            //disabled.value= true
            store.dispatch("sectionAssignToTemplate", {
                id: detailsQuestionnaireTemplate.value.id,
                sectionId: [...section.sectionId],
                method:"put",
                showPopup:true
            }).then(() => {
                if (store.state.common.successMsg) {
                    emit("is-visible", {
                        show: false,
                        id: props.update
                    })
                    reset()
                    store.dispatch("detailsQuestionnaireTemplate", detailsQuestionnaireTemplate.value.id)
                    disabled.value = false
                }
            })
        }
        const addSectionButton = ref(false)
        const sectionName = ref('')
        const sectionSelect = (val) => {
            if (val.value == false) {
                console.log(val.input)
                addSectionButton.value = true
                sectionName.value = val.input
            } else {
                addSectionButton.value = false
                sectionName.value = ''
            }
            //console.log(val)
        }

        function reset() {
            section.sectionId = []
            section.unselectedsectionId = []
            store.state.patients.errorMsg = ""
            store.commit("checkChangeInput", false)
            Object.assign(section, form)
            disabled.value = false
        }

        function closeModal() {

            if (checkFieldsData.value) {
                emit("is-visible", {
                    show: true,
                    id: detailsQuestionnaireTemplate.id
                })
                warningSwal(messages.modalWarning).then((response) => {

                    if (response == true) {
                        emit("is-visible", {
                            show: false,
                            id: detailsQuestionnaireTemplate.id
                        })
                        reset()
                        disabled.value = false
                    } else {
                        reset()
                        emit("is-visible", {
                            show: true,
                            id: detailsQuestionnaireTemplate.id
                        })
                    }
                });
            } else {
                formRef.value.resetFields()
                disabled.value = false
            }
        }

        function checkChangeInput() {
            store.commit("checkChangeInput", true);
        }
        const errorMsg = store.getters.errorMsg.value
        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput
        })
        
        const showModal = (e) => {
            visible.value = e.show
        }
        return {
            chooseSection,
            selectedSection,
            section,
            assignSection,
            closeModal,
            checkChangeInput,
            checkFieldsData,
            errorMsg,
            formRef,
            disabled,
            detailsQuestionnaireTemplate,
            sectionType,
            reset,
            sectionSelect,
            addSectionButton,
            sectionName,
            showModal,
            visible,
            unSelectedSectionList,
            selectedSectionList,
            isValueChanged,
            setSectionId

        };
    },
});
</script>

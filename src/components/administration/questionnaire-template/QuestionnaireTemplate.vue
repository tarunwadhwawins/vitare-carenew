<template>
<div>
    <!---->
    
                <div class="common-bg">
                    <a-row>
                        <a-col :span="24">
                            <h2 class="pageTittle">
                                Questionnaire Template
                                <div class="commonBtn">
                                    
                                        <a-button class="btn primaryBtn" @click="showModal('true')">Create New Template</a-button>
                                   
                                </div>
                            </h2>
                        </a-col>
                        <a-col :span="12">
                            <a-select   mode="tags" style="width: 100%" placeholder="Search . . ." :options="searchoptions" @change="handleChange2">
                            </a-select>
                        </a-col>
                        <a-col :span="24" class="mt-25">
                          <QuestionnaireTemplateTable @edit="templatEdit($event)"/>
                        </a-col>
                    </a-row>
                </div>
          </div>
    <!--modals-->
    <CreateTemplate v-model:visible="visible2" :update="update"/>
    <!---->

</template>

  
  
<script>

import CreateTemplate from "@/components/modals/CreateTemplate";
import QuestionnaireTemplateTable from "@/components/administration/questionnaire-template/QuestionnaireTemplateTable"
import {
    
    ref
} from "vue";


export default {
    components: {
        
        CreateTemplate,
        QuestionnaireTemplateTable
    },
    setup() {
        const checked = ref([false]);
        const visible2 = ref(false);
        const update = ref(false)
        const showModal = (e) => {
            update.value = false
            visible2.value = e;
        };
        const templatEdit = (e) =>{
            update.value = true
            visible2.value = e;

        }
        const handleChange2 = (value) => {
            console.log(`selected ${value}`);
        };
        const searchoptions = ref([{
                value: "Physician's Report For Residential Care Facilities For The Elderly (RCFE)",
                label: "Physician's Report For Residential Care Facilities For The Elderly (RCFE)",
            },
            {
                value: "Physician's Report For Community Care Facilities",
                label: "Physician's Report For Community Care Facilities",
            },
            {
                value: "Physician Orders for Life-Sustaining Treatment (POLST)",
                label: "Physician Orders for Life-Sustaining Treatment (POLST)",
            },
        ]);
        return {
            
            checked,
            visible2,
            showModal,
            templatEdit,
            handleChange2,
            searchoptions,
            update
           
            
        };
    },
};
</script>

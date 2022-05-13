<template>
<a-form :model="workFlowCriteria" ref="formRef" name="workFlowCriteria"  autocomplete="off" scrollToFirstError=true layout="vertical" @finish="submitForm" @finishFailed="onFinishFailed">

    <a-row>
        <a-col :sm="24" :xs="24">
        <div class="form-group">
            <a-form-item  label="Choose Field Name " name="fieldName" :rules="[{ required: false, message: 'Choose field name' +' '+$t('global.validation')  }]">
                 <GlobalCodeDropDown  v-model:value="fieldName" mode="multiple" :globalCode="criteriaColumns" @change="handleChangeFieldName"/>
            </a-form-item>
        </div>
        </a-col>
    </a-row>
    <a-row class="row">
        <a-col :sm="7" :xs="24">
            <label for="Criteria"><b>{{'Criteria'}}</b></label>
        </a-col>
        <a-col :sm="4" :xs="24">
            <label for="Operator"><b>{{'Operator'}}</b></label>
        </a-col>
        <a-col :sm="13" :xs="24">
            <label for="Value"><b>{{'Value'}}</b></label>
        </a-col>
    </a-row>
   
    <div  v-for="(colm,i) in criteriaColumns" :key="i" >
    <a-row  :gutter="24" v-if="colm.id === fieldName.filter((item)=>item == criteriaColumns[i].id).toString() ">
        <a-col :sm="6" :xs="24">
            <a-form-item name="field">
                <a-input type="text" :value="workFlowCriteria[0].field[i]=colm.title" size="large" style="width: 100%" disabled />
                <a-input type="hidden"  :value="workFlowCriteria[0].fieldId[i]=colm.id" size="large" style="width: 100%" disabled />
            </a-form-item>
        </a-col>
        <a-col :sm="4" :xs="24">
            <div class="form-group">
                <a-form-item name="operator" :rules="[{ required: false, message: 'Operator' +' '+$t('global.validation')  }]">
                    <a-select v-model:value="workFlowCriteria[0].operator[i]" style="width: 100%" size="large" @focus="focus"  placeholder="Choose Operator">
                        <a-select-option v-for="optr in colm.operator" :key="optr.id" :value="optr.id">{{optr.operator}}</a-select-option>
                    </a-select>
                </a-form-item>
            </div>
        </a-col>

        <a-col :sm="14" :xs="24">
            <div class="form-group" v-if=" colm.value.length>0">
                <a-form-item name="value" :rules="[{ required: false, message: 'Value' +' '+$t('global.validation')  }]">
                    <a-select v-model:value="workFlowCriteria[0].value[i]" style="width: 100%" mode="multiple" size="large" @focus="focus"  placeholder="Choose Value">
                        <a-select-option v-for="val in colm.value" :key="val.id" :value="val.id">{{val.name}}</a-select-option>
                    </a-select>
                </a-form-item>
            </div>
            <div class="form-group" v-else>
                <a-form-item name="value" :rules="[{ required: false, message: 'Value' +' '+$t('global.validation')  }]">
                    <a-input v-model:value="workFlowCriteria[0].value[i]" size="large" style="width: 100%" placeholder="Please input the value" />
                </a-form-item>
            </div>
        </a-col>
    </a-row>
    </div>
    <a-col :span="24">
        <div class="steps-action">
            <a-button type="primary" html-type="submit" >{{$t('global.next')}}</a-button>
        </div>
    </a-col>

</a-form>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, ref, watchEffect } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch"
export default {
  name: "WorkFlowCriteria",
  components: {
      GlobalCodeDropDown
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const fieldName = ref([])
    const workFlowCriteria = reactive([
      {
        field: [],
        fieldId:[],
        operator: [],
        value: [],
      },
    ]);

    function submitForm() {
      let data = []
      workFlowCriteria.map((item) => {
        let  temp = fieldName.value.filter((itm)=>itm != '')
        temp.map((itm, i) => {
          data.push({
            field: item.field[i],
            fieldId: fieldName.value.filter((itm)=>itm == item.fieldId[i]).toString() ,
            operator: item.operator[i],
            value: item.value[i],
          })
        })

      })
      console.log('object',data);
    store.dispatch('addWorkflowCriteria',{id:route.params.udid,criteria:JSON.stringify(data)})
    }
    const editWorkflowCriteria =computed(()=>{
        return store.state.workflow.editWorkflowCriteria
    })
    onMounted(()=>{
        store.dispatch('editWorkflowCriteria',route.params.udid)
    })

    watchEffect(()=>{
        if(editWorkflowCriteria.value){
            workFlowCriteria[0].field=editWorkflowCriteria.value.criteria.field
            workFlowCriteria[0].fieldId=editWorkflowCriteria.value.criteria.fieldId
            fieldName.value = editWorkflowCriteria.value.criteria.fieldId.filter((item)=>item != '' )
            workFlowCriteria[0].value=editWorkflowCriteria.value.criteria.value
            workFlowCriteria[0].operator=editWorkflowCriteria.value.criteria.operator
        }
    })

    onUnmounted(()=>{
        store.state.workflow.editWorkflowCriteria=null
    })

  
    const handleChangeFieldName =(value)=>{
        console.log('value',value);
        let dataValue ={
        field: [],
        fieldId:[],
        operator: [],
        value: [],
      }
        workFlowCriteria.map((item) => {
        let  temp = fieldName.value.filter((itm)=>itm != '')
            temp.map((itm, i) => {
                dataValue.field[i] = item.field[i],
                dataValue.fieldId[i]=fieldName.value.filter((itm)=>itm == item.fieldId[i]).toString() ,
                dataValue.operator[i]=item.operator[i],
                dataValue.value[i] = item.value[i]
              
            })
        // console.log('temp',temp);
        // console.log('dataValue',dataValue);
        // console.log('workFlowCriteria[0]',workFlowCriteria[0]);
        // Object.assign(workFlowCriteria[0],dataValue)
      }) 

    
    }
    

    return {
      handleChangeFieldName,
      fieldName,
      editWorkflowCriteria,
      submitForm,
      workFlowCriteria,
      size: ref(),
      criteriaColumns: store.getters.criteriaColumns,
    }
  }
}
</script>

<style scoped>
.search {
  padding-bottom: 15px;
}

.row {
  margin-bottom: 30px;
}
</style>

<template>
<a-form :model="workFlowCriteria" ref="formRef" name="workFlowCriteria"  autocomplete="off" scrollToFirstError=true layout="vertical" @finish="submitForm" @finishFailed="onFinishFailed">
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
    <a-row :gutter="24" v-for="(colm,i) in criteriaColumns" :key="i">
        <a-col :sm="6" :xs="24">
            <a-form-item name="field">
                <a-input type="text" :value="workFlowCriteria[0].field[i]=colm.title" size="large" style="width: 100%" disabled />
            </a-form-item>
        </a-col>
        <a-col :sm="3" :xs="24">
            <div class="form-group">
                <a-form-item name="operator" :rules="[{ required: false, message: 'Operator' +' '+$t('global.validation')  }]">
                    <a-select v-model:value="workFlowCriteria[0].operator[i]" style="width: 100%" size="large" @focus="focus" @change="handleChange" placeholder="Choose Operator">
                        <a-select-option v-for="optr in colm.operator" :key="optr.id" :value="optr.id">{{optr.operator}}</a-select-option>
                    </a-select>
                </a-form-item>
            </div>
        </a-col>

        <a-col :sm="13" :xs="24">
            <div class="form-group" v-if="colm.value.length>0">
                <a-form-item name="value" :rules="[{ required: false, message: 'Value' +' '+$t('global.validation')  }]">
                    <a-select v-model:value="workFlowCriteria[0].value[i]" style="width: 100%" mode="multiple" size="large" @focus="focus" @change="handleChange" placeholder="Choose Value">
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
    <a-col :span="24">
        <div class="steps-action">
            <!-- <router-link to="/work-flow"><a-button  style="margin-right: 8px">{{'Back'}}</a-button></router-link>  -->
            <a-button type="primary" html-type="submit" >{{$t('global.next')}}</a-button>
        </div>
    </a-col>

</a-form>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, ref, watchEffect } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
export default {
  name: "WorkFlowCriteria",
  components: {},
  setup() {
    const store = useStore()
    const route = useRoute()
    const workFlowCriteria = reactive([
      {
        field: [],
        operator: [],
        value: [],
      },
    ]);

    function submitForm() {
      let data = []
      workFlowCriteria.map((item) => {
        item.field.map((itm, i) => {
        //   let valueSelected = [];
        //   if (typeof item.value[i] == "string") {
        //     valueSelected.push(item.value[i])
        //   } else {
        //     valueSelected = item.value[i]
        //   }
          data.push({
            field: item.field[i],
            operator: item.operator[i],
            value: item.value[i],
          })
        })
      })
      console.log('object',workFlowCriteria.value);
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
            workFlowCriteria[0].value=editWorkflowCriteria.value.criteria.value
            workFlowCriteria[0].operator=editWorkflowCriteria.value.criteria.operator
        }
    })

    onUnmounted(()=>{
        store.state.workflow.editWorkflowCriteria=null
    })

    return {
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

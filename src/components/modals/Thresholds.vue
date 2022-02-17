<template>
  <a-modal width="1000px" :title="$t('thresholds.thresholdModal.generalParameters')" centered>
    <a-form :model="thresholdForm" layout="vertical" @finish="submitForm">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <a-form-item :label="$t('thresholds.thresholdModal.generalParametersGroup')" name="generalParametersGroup" :rules="[{ required: true, message: $t('thresholds.thresholdModal.generalParametersGroup')+' '+$t('global.validation') }]">
          <a-input v-model:value="thresholdForm.generalParametersGroup" size="large" />
          </a-form-item>
        </div>
      </a-col>
      <a-col :md="12" :sm="12" :xs="24">
        <div class="form-group">
            <a-form-item :label="$t('global.type')" name="deviceType" :rules="[{ required: true, message: $t('global.type')+' '+$t('global.validation') }]">
                <a-select v-if="globalCode.deviceType.globalCode" ref="select" v-model:value="thresholdForm.deviceType" style="width: 100%" size="large" placeholder="Select Device Type"  mode="multiple"  @change="handleDevice">
                    <!-- <a-select-option value="" disabled>{{'Select Device Type'}}</a-select-option> -->
                    <a-select-option v-for="device in globalCode.deviceType.globalCode" :key="device.id" :value="device.id">{{device.name}}</a-select-option>
                </a-select>
                <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
            </a-form-item>
        </div>
    </a-col>
   </a-row>
   <a-row :gutter="24" v-if="vitalData">
    <div v-for="vital,i in vitalData" :key="i">
      {{vital.id}}
      <a-col :md="12" :sm="12" :xs="24">
        <div class="form-group">
          <a-form-item :label="$t('thresholds.thresholdModal.highLimit')" name="vital.field" >
        
          <!-- <a-input v-model="value" size="large" /> -->
          <a-input-number v-model:value="thresholdForm.generalParametershigh[vital.id]"   :step="0.1" size="large" style="width:100%"/>
          <ErrorMessage v-if="errorMsg" :name="errorMsg.note?errorMsg.high[0]:''" />
        </a-form-item>
        </div>
      </a-col>
      <a-col :md="12" :sm="12" :xs="24">
        <div class="form-group">
          <a-form-item :label="$t('thresholds.thresholdModal.lowLimit')" name="vital.field" >
         
          <!-- <a-input v-model="value" size="large" /> -->
          <a-input-number v-model:value="thresholdForm.generalParameterslow[vital.id]"   :step="0.1" size="large" style="width:100%"/>
          <ErrorMessage v-if="errorMsg" :name="errorMsg.note?errorMsg.low[0]:''" />
        </a-form-item>
        </div>
      </a-col>
    </div>
</a-row>
<a-row :gutter="24" >
      <a-col :span="24">
        <div class="steps-action">
          <ModalButtons @is_click="handleCancel"/>   
        </div>
      </a-col>
    </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { ref, reactive, computed } from "vue";
import ModalButtons from "@/components/common/button/ModalButtons";
import ErrorMessage from "../common/messages/ErrorMessage"


import { useStore } from "vuex"
const OPTIONS = ["Jane Doe", "Steve Smith", "Joseph William"];
const OPTIONSTAG = ["Admin", "Clinical", "Office", "Personal"];
export default {
  components: {
      ErrorMessage,
      ModalButtons,
    },
  props:{

  },
  setup(props,{emit}) {

    const store = useStore()
    
     const value = ref();
     const value2 = ref();
    const selectedItems = ref(["Jane Doe"]);
    const filteredOptions = computed(() =>
      OPTIONS.filter((o) => !selectedItems.value.includes(o))
    );

    const selectedItemsForTag = ref(["Admin"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );
    const thresholdForm = reactive({
      deviceType:  [],
      generalParametersGroup:'',
      generalParametershigh:[],
      generalParameterslow:[]
      
    });
    const handleCancel = () => {

        emit('is-visible', false);
      };
      const globalCode = computed(() => {
       
      return store.state.common;
    });
   
    const vitalData= computed(()=>{ 
       return store.state.thresholds.vitalData
  })
    function handleDevice(){
      store.state.thresholds.vitalData=null
      store.dispatch('getVital',thresholdForm.deviceType)
    }
    const submitForm = () => {
let low=[]
      thresholdForm.generalParameterslow.forEach(function(Element2,i2){
        
        low.push({type:i2,low:Element2,high: thresholdForm.generalParametershigh[i2]})
        });

        
        
      }
    return {
      handleDevice,
      globalCode,
      thresholdForm,
      vitalData,
      handleCancel,
      submitForm,
      selectedItems,
      filteredOptions,
      filteredOptionsForTag,
      selectedItemsForTag,
      size: ref("large"),
      value,
      value2,
    };
  },
};
</script>

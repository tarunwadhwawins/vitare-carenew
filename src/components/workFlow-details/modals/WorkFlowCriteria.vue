<template>
      <a-form :model="workFlowCriteria" ref="formRef" name="workFlowCriteria" scrollToFirstError=true layout="vertical" @finish="submitForm" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <a-col :sm="8" :xs="24">
                <div class="form-group">
                    <a-form-item label="Label" name="label" :rules="[{ required: false, message: 'Label' +' '+$t('global.validation')  }]">
                        <a-input-number v-model="workFlowCriteria.label" size="large" style="width: 100%"/>
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="8" :xs="24">
                <div class="form-group">
                    <a-form-item label="Operator" name="operator" :rules="[{ required: false, message: 'Operator' +' '+$t('global.validation')  }]">
                        <a-select  v-model="workFlowCriteria.operator" style="width: 100%" size="large" @focus="focus" @change="handleChange" placeholder="Choose Operator">
                            <a-select-option value="Yimiernghe">=</a-select-option>
                            <a-select-option value="Yiminerghe">!= </a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="8" :xs="24">
                <div class="form-group">
                    <a-form-item label="Value" name="value" :rules="[{ required: false, message: 'Value' +' '+$t('global.validation')  }]">
                        <a-select  v-model="workFlowCriteria.value" style="width: 100%" size="large" @focus="focus" @change="handleChange" placeholder="Choose Value">
                            <a-select-option value="Yimiernghe">Value1</a-select-option>
                            <a-select-option value="Yiminerghe">Value2</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </a-col>

            <a-col  :span="24">
                <div class="steps-action" >
                    <a-button type="primary" html-type="submit">{{$t('global.update')}}</a-button>
                </div>
                
            </a-col>
        </a-row>
    </a-form>
</template>
<script>
import { reactive, ref } from "vue";
export default {
    name:"WorkFlowCriteria",
    components: {
  },
  setup() {
      const workFlowCriteria =reactive({
          label:"",
          operator:"",
          value:""
      })
    return {
      workFlowCriteria,
      size: ref(),
    };
  },
};
</script>
<style scoped>
.search {
  padding-bottom: 15px;
}
</style>
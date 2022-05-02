<template>
<a-modal max-width="1000px" width="60%" title="WorkFlow Details" centered :footer="false" :maskClosable="false" >
    <a-form :model="eventDetails" ref="formRef" name="eventDetails" scrollToFirstError=true layout="vertical" @finish="submitForm" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item label="Event Type" name="eventType" :rules="[{ required: true, message: 'Event Type' +' '+$t('global.validation')  }]">
                        <a-select  v-model="eventDetails.eventType" style="width: 100%" size="large" @focus="focus" @change="handleChange" placeholder="Choose Type">
                            <a-select-option value="Yimiernghe">Event Type 1</a-select-option>
                            <a-select-option value="Yiminerghe">Event Type 2 </a-select-option>
                            <a-select-option value="Yimiernghe">Event Type 3</a-select-option>
                            <a-select-option value="Yietminghe">Event Type 4</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                   <a-form-item label="Event" name="event" :rules="[{ required: true, message: 'Event' +' '+$t('global.validation')  }]">
                        <a-select v-model="eventDetails.event" style="width: 100%" size="large" @focus="focus" @change="handleChange" placeholder="Choose Event">
                            <a-select-option value="Yimiernghe">Event 1</a-select-option>
                            <a-select-option value="Yiminerghe">Event 2 </a-select-option>
                            <a-select-option value="Yimiernghe">Event 3</a-select-option>
                            <a-select-option value="Yietminghe">Event 4</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>

            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item label="WorkFlow Name" name="workFlowName" :rules="[{required: true,message:'WorkFlow Name ' +$t('global.validation'),},]">
                        <a-input-number v-model="eventDetails.workFlowName" size="large" style="width: 100%"/>
                    </a-form-item>
                </div>

            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item label="Comments" name="comments" :rules="[{required: false,message:'WorkFlow Name ' +$t('global.validation'),},]">
                        <a-textarea v-model="eventDetails.comments" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('global.startDate')" name="startDate" :rules="[{ required: true, message: $t('global.startDate')+' '+$t('global.validation')  }]">
                        <a-date-picker  v-model="eventDetails.startDate" size="large" style="width: 100%"/>
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('global.startDate')" name="startDate" :rules="[{ required: false, message: $t('global.startDate')+' '+$t('global.validation')  }]">
                        <a-date-picker  v-model="eventDetails.endDate" size="large" style="width: 100%"/>
                    </a-form-item>
                </div>
            </a-col>

            <a-col :span="24">
                <div class="steps-action" v-if="update==true">
                    <a-button type="primary" html-type="submit">{{$t('global.update')}}</a-button>
                </div>
                <div class="steps-action" v-else>
                   <a-button html-type="reset"  style="margin-right: 8px" @click="reset()">{{$t('global.clear')}}</a-button>
                    <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
                </div>
            </a-col>
        </a-row>
    </a-form>
    <Loader />
</a-modal>
</template>
<script>
import { reactive, ref } from "vue";
export default {
name:"CreateWorkFlow",
props:{
update:Boolean
},
  setup() {
    const eventDetails = reactive({
        eventType:"",
        event:"",
        workFlowName:"",
        comments:"",
        startDate:"",
        endDate:""
    })
    const formRef = ref()
    function submitForm(value){
        console.log(value);
    }

    function onFinishFailed(value){
        console.log(value);
    }

    function reset(){
        formRef.value.resetFields();
    }
    return {
      formRef,
      onFinishFailed,
      submitForm,
      reset,
      size: ref("large"),
      eventDetails,
    };
  },
};
</script>
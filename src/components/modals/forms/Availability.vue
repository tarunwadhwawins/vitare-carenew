<template>
<a-form :model="availability" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addAvailability" @finishFailed="availabilityDataFailed">
    <a-row :gutter="24">
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.startTime')" name="startTime" :rules="[{ required: true, message: $t('global.startTime')+' '+$t('global.validation') }]">
                    <a-time-picker  use12-hours format="hh:mm A" v-model:value="availability.startTime"  value-format="HH:mm"  @change="checkChangeInput()"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.startTime?errorMsg.startTime[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.endTime')" name="endTime" :rules="[{ required: true, message: $t('global.endTime')+' '+$t('global.validation') }]">
                    <a-time-picker v-model:value="availability.endTime" use12-hours format="hh:mm A" value-format="HH:mm" @change="checkChangeInput()"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.endTime?errorMsg.endTime[0]:''" />
                </a-form-item>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :span="24" v-if="paramId">
        <a-button  html-type="reset" style="margin-right: 8px" @click="reset()">{{$t('global.clear')}}</a-button>
        <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
        </a-col>
        <a-col :span="24" v-else>
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row>
</a-form>
<a-row :gutter="24" v-show="!paramId">
    <a-col :span="24">
        <!-- <a-table  rowKey="id" :pagination="false" :columns="staffs.availabilityListColms" :data-source="staffs.availabilityList" :scroll="{ x: 900 }">
            <template #action="text">
                <a-tooltip placement="bottom" @click="deleteAvailability(text.record.id)">
                    <template #title>
                        <span>{{$t('global.delete')}}</span>
                    </template>
                    <a class="icons">
                        <DeleteOutlined /></a>
                </a-tooltip>
            </template>
        </a-table> -->
        <AvailabilityTable :Id="Id" />
        <Loader />
    </a-col>
</a-row>
</template>

<script>
import { defineComponent, reactive, ref, computed,onUnmounted } from "vue";
// import { DeleteOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import AvailabilityTable from "../../care-coordinator/tables/AvailabilityTable.vue";
import moment from  "moment"
import {  timeStamp } from '../../../commonMethods/commonMethod'
export default defineComponent({
  components: {
    // EditOutlined,
    // DeleteOutlined,
    Loader,
    ErrorMessage,
    AvailabilityTable
  },
  props:{
    paramId:String
  },
  setup(props,{emit}) {
    const store = useStore();
    const availability = reactive({
      startTime: "",
      endTime: "",
    });

    const staffs = computed(() => {
      return store.state.careCoordinator;
    });

    function addAvailability() {
      store.dispatch("addAvailability", {
        id: props.paramId?props.paramId:staffs.value.addStaff.id,
        data:  {startTime: timeStamp(moment().format('MM/DD/YYYY')+ ' ' + availability.startTime+':00'),
      endTime:timeStamp(moment().format('MM/DD/YYYY') + ' ' + availability.endTime+':00')}
      });
      setTimeout(() => {
        store.dispatch("availabilityList", props.paramId?props.paramId:staffs.value.addStaff.id);
        reset()
        if(staffs.value.closeModal){
          emit("saveModal", false)
      }
      }, 2000);
    }

    const Id = staffs.value.addStaff?staffs.value.addStaff.id:''

    const form = reactive({
      ...availability,
    });
    function reset(){
      Object.assign(availability,form)
    }
    onUnmounted(()=>{
      store.commit('errorMsg',null)
    })
    function checkChangeInput(){
      store.commit('checkChangeInput',true)
    }
    return {
      checkChangeInput,
      reset,
      Id,
      staffs,
      addAvailability,
      availability,
      size: ref("large"),
    };
  },
});
</script>

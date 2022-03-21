<template>
<a-form :model="contact" scrollToFirstError=true name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addContacts" @finishFailed="contactDataFailed">
    <a-row :gutter="24">
        <a-col :md="12" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: $t('global.firstName')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="contact.firstName" size="large" name="firstName" @change="checkChangeInput()"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.firstName?errorMsg.firstName[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                    <a-input v-model:value="contact.lastName" size="large" @change="checkChangeInput()"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName?errorMsg.lastName[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                    <a-input v-model:value="contact.email" placeholder="test@test.com" size="large" @input="emailChange()" @change="checkChangeInput()"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email?errorMsg.email[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber}]">
                    <a-input v-model:value="contact.phoneNumber" placeholder="Please enter 10 digit number" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" @change="checkChangeInput()"/>
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
    <a-row :gutter="24" v-show="!paramId">
        <a-col :span="24">
            <!-- <a-table  rowKey="id" :pagination="false" :columns="staffs.staffContactColms" :data-source="staffs.staffContactList" :scroll="{ x: 900 }">
                <template #action="text">
                    <a-tooltip placement="bottom" @click="deleteContact(text.record.id)">
                        <template #title>
                            <span>{{$t('global.delete')}}</span>
                        </template>
                        <a class="icons">
                            <DeleteOutlined /></a>
                    </a-tooltip>
                </template>
            </a-table> -->
            <ContactTable :Id="Id"/>
            <Loader />
        </a-col>
    </a-row>
</a-form>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { regex } from "@/RegularExpressions/regex";
// import { warningSwal } from "@/commonMethods/commonMethod";
// import { messages } from "@/config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import Loader from "@/components/loader/Loader";

import {
  // EditOutlined,
  // DeleteOutlined,
} from "@ant-design/icons-vue";
import ContactTable from "../../care-coordinator/tables/ContactTable.vue";

export default defineComponent({
  components: {
    // EditOutlined,
    // DeleteOutlined,
    Loader,
    ErrorMessage,
    ContactTable
  },
  props:{
    paramId:String
  },
  setup(props,{emit}) {
    const store = useStore();
    const contact = reactive({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });
   
    function addContacts() {
      store.dispatch("addContacts", {
        id: props.paramId?props.paramId:staffs.value.addStaff.id,
        data: contact,
      });
      setTimeout(() => {
        
        store.dispatch("staffContactList", props.paramId?props.paramId:staffs.value.addStaff.id);
        if(staffs.value.closeModal==true){
          reset()
          emit("saveModal", false)
      }
      }, 2000);
    }
    const staffs = computed(() => {
      return store.state.careCoordinator;
    });

    const Id = staffs.value.addStaff?staffs.value.addStaff.id:''

     const form = reactive({
      ...contact,
    });
    function reset(){
      Object.assign(contact,form)
    }
    function checkChangeInput(){
      store.commit('checkChangeInput',true)
    }
    const errorMsg = computed(() => {
      return store.state.careCoordinator.errorMsg;
    });

    function emailChange(){
        errorMsg.value.email?errorMsg.value.email[0]=null:''
    }
    return {
      checkChangeInput,
      reset,
      Id,
      // deleteContact,
      addContacts,
      contact,
      size: ref("large"),
      staffs,
      regex,
      errorMsg,
      emailChange
    };
  },
});
</script>

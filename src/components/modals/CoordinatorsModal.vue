<template>
<a-modal max-width="1140px" width="100%" :title="$t('careCoordinator.coordinatorsModal.addNewCoordinator')" centered :footer="null" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <a-col :span="24">
            <a-steps v-model:current="current" >
                <a-step v-for="item in steps" :key="item.title" :title="item.title?item.title:''" />
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Personal Information'">
                <a-form :model="personalInfoData" scrollToFirstError=true ref="info" class="basic" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="personalInfo" @finishFailed="onFinishFailed">
                    <!-- <PersonalInformation /> -->
                    <a-row :gutter="24"> 
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: $t('global.firstName')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="personalInfoData.firstName" size="large" class="firstName" @change="checkChangeInput()"/>
                                    <ErrorMessage v-if="errorMsg && !personalInfoData.firstName" :name="errorMsg.firstName?errorMsg.firstName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: true, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="personalInfoData.lastName" @change="checkChangeInput()"/>
                                    <ErrorMessage v-if="errorMsg && !personalInfoData.lastName" :name="errorMsg.lastName?errorMsg.lastName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item name="designationId" :label="$t('global.designation')" :rules="[{ required: true, message: $t('global.designation')+' '+$t('global.validation') }]">
                                    <!-- <a-select ref="select" v-model:value="personalInfoData.designationId" style="width: 100%" size="large" @change="checkChangeInput()">
                                        <a-select-option value="" disabled>{{'Select Designation'}}</a-select-option>
                                        <a-select-option v-for="designation in careCordinator.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select> -->
                                  <GlobalCodeDropDown @change="checkChangeInput()" v-model:value="personalInfoData.designationId" :globalCode="careCordinator.designations"/>
                                    <ErrorMessage v-if="errorMsg && !personalInfoData.designationId" :name="errorMsg.designationId?errorMsg.designationId[0]:''" />
                                </a-form-item>
                            </div>

                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item name="genderId" :label="$t('global.gender')" :rules="[{ required: true, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <!-- <a-select ref="select" v-model:value="personalInfoData.genderId" style="width: 100%" size="large" @change="checkChangeInput()">
                                        <a-select-option value="" disabled>{{'Select Gender'}}</a-select-option>
                                        <a-select-option v-for="gender in careCordinator.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select> -->
                                    <GlobalCodeDropDown @change="checkChangeInput()" v-model:value="personalInfoData.genderId" :globalCode="careCordinator.gender"/>
                                    <ErrorMessage v-if="errorMsg && !personalInfoData.genderId" :name="errorMsg.genderId?errorMsg.genderId[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(),type: 'email' }]">
                                    <a-input v-model:value="personalInfoData.email" placeholder="test@test.com" @input="emailChange()" @change="checkChangeInput()"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input v-model:value="personalInfoData.phoneNumber" placeholder="Please enter 10 digit number" @change="checkChangeInput()"/>
                                    <ErrorMessage v-if="errorMsg && !personalInfoData.phoneNumber" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.specialization')" name="specializationId" :rules="[{ required: true, message: $t('global.specialization')+' '+$t('global.validation') }]">
                                    <!-- <a-select ref="select" v-model:value="personalInfoData.specializationId" style="width: 100%" size="large" @change="checkChangeInput()">
                                        <a-select-option value="" disabled>{{'Select Specialization'}}</a-select-option>
                                        <a-select-option v-for="network in careCordinator.specialization.globalCode" :key="network.id" :value="network.id">{{network.name}}</a-select-option>
                                    </a-select> -->
                                    <GlobalCodeDropDown @change="checkChangeInput()" v-model:value="personalInfoData.specializationId" :globalCode="careCordinator.specialization"/>
                                    <ErrorMessage v-if="errorMsg && !personalInfoData.specializationId" :name="errorMsg.specializationId?errorMsg.specializationId[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.network')" name="networkId" :rules="[{ required: true, message: $t('global.network')+' '+$t('global.validation') }]">
                                    <!-- <a-select ref="select" v-model:value="personalInfoData.networkId" style="width: 100%" size="large" @change="checkChangeInput()">
                                        <a-select-option value="" disabled>{{'Select Network'}}</a-select-option>
                                        <a-select-option v-for="network in careCordinator.network.globalCode" :key="network.id" :value="network.id">{{network.name}}</a-select-option>
                                    </a-select> -->
                                    <GlobalCodeDropDown @change="checkChangeInput()" v-model:value="personalInfoData.networkId" :globalCode="careCordinator.network"/>
                                    <ErrorMessage v-if="errorMsg && !personalInfoData.networkId" :name="errorMsg.networkId?errorMsg.networkId[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>

                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">{{$t('global.next')}}</a-button>
                    </div>

                </a-form>
            </div>

            <div class="steps-content" v-if="steps[current].title == 'Contacts'">
                <Contacts  id="contact"/>
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                </div>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Availability'"  @click="stepperClick(2)">
                <Availability />
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>

                </div>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Roles'">
                <Roles />
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                </div>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Documents'">
                <StaffDocuments  entity="staff"/>
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                    <a-button v-if="current == steps.length - 1" type="primary" @click="saveModal()">
                        {{$t('global.save')}}
                    </a-button>
                </div>
            </div>
            <!-- <div class="steps-content" v-if="steps[current].title == 'Providers'">
                <Providers />
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                    <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                        {{$t('global.save')}}
                    </a-button>
                </div>
            </div> -->
        </a-col>
    </a-row>
    
</a-modal>
</template>

<script>
import {reactive, computed,onUnmounted, watchEffect,ref } from "vue";
// import PersonalInformation from "@/components/modals/forms/PersonalInformation"
import Contacts from "@/components/modals/forms/Contacts";
import Availability from "@/components/modals/forms/Availability";
import Roles from "@/components/modals/forms/Roles";
import StaffDocuments from "@/components/modals/forms/StaffDocuments";
// import Providers from "@/components/modals/forms/Providers";
import { useStore } from "vuex";
import ErrorMessage from "@/components/common/messages/ErrorMessage";
import { regex } from "@/RegularExpressions/regex";
import { successSwal,warningSwal,errorSwal} from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
export default {
  components: {
    // PersonalInformation,
    Contacts,
    Availability,
    Roles,
    StaffDocuments,
    // Providers,
    ErrorMessage,
    GlobalCodeDropDown
  },
  setup(props, { emit }) {
    const store = useStore();

    const info =ref();
    const current= computed({
      get: () =>
        store.state.careCoordinator.counter,
      set: (value) => {
        if(addStaff.value){
          store.state.careCoordinator.counter = value;
        }else{
          if(Object.values(personalInfoData).filter(item=>item!='').length>=8){
            personalInfo();
          }else{
            errorSwal('All fields are required!')
            store.state.careCoordinator.counter = 0;
          }
        }

      },
    })

    
    const personalInfoData = reactive({
      firstName: "",
      lastName: "",
      designationId: "",
      genderId: "",
      email: "",
      phoneNumber: "",
      specializationId: "",
      networkId: "",
      roleId: '',
      
    });

    const personalInfo = () => {
      // setTimeout(() => {
        if(addStaff.value==null){
          store.dispatch("addStaff", personalInfoData);
        }
        if (addStaff.value!=null) {
          // store.dispatch("allStaffList");
          store.dispatch("updateStaff", {
           id:addStaff.value.id,
           data:personalInfoData
           });
        }
      // }, 2000);
      return addStaff.value!=null?true:false
    };

    const next = () => {
      store.commit("counterPlus");
    };
    const prev = () => {
      store.commit("counterMinus");
    };

    const onFinishFailed = () => {
      // errorSwal(messages.fieldsRequired);
      // console.log("test", value);
    };

    const handleChange = () => {};

    const careCordinator = computed(() => {
      return store.state.common;
    });

    const addStaff = computed(() => {
      return store.state.careCoordinator.addStaff;
    });

    const errorMsg = computed(() => {
      return store.state.careCoordinator.errorMsg;
    });

    function emailChange(){
        errorMsg.value.email?errorMsg.value.email[0]=null:''
    }

    const form = reactive({
      ...personalInfoData,
    });

    function saveModal() {
      if(addStaff.value){ 
        emit("saveModal", false);
        successSwal(messages.formSuccess);
        Object.assign(personalInfoData, form);
        store.dispatch("allStaffList");
        store.dispatch('specializationStaff')
        store.dispatch('networkStaff')
        store.commit("resetCounter");
      }else{
        warningSwal('No data have to save!').then((response) => {
        if (response == true) {
          emit("saveModal", false)
          store.commit("resetCounter")
        } else {
          emit("saveModal", true);
        }
        })
      }
    }

    function checkChangeInput(){
      store.commit('checkChangeInput',true)
    }

    const checkFieldsData = computed(()=>{
      return store.state.common.checkChangeInput;
    })
    function closeModal() {
      if(checkFieldsData.value){
      warningSwal(messages.modalWarning).then((response) => {
        if (response == true) {
          emit("saveModal", false)
          Object.assign(personalInfoData, form);
          store.dispatch("allStaffList")
          store.dispatch('specializationStaff')
          store.dispatch('networkStaff')
          store.commit("resetCounter")
          store.commit('checkChangeInput',false)
          store.state.careCoordinator.addStaff =null
         
        } else {
          emit("saveModal", true);
        }
      });
      }
    }
     onUnmounted(()=>{
      store.commit('errorMsg',null)
    })
    watchEffect(()=>{
      if(addStaff.value){
      store.dispatch("roleList", addStaff.value.id);
      store.dispatch("availabilityList", addStaff.value.id);
      store.dispatch("staffContactList", addStaff.value.id);
      store.dispatch("staffDocuments", addStaff.value.id);
      }
    })
    const paramId = addStaff.value?addStaff.value.id:''
    return {
      info,
      checkFieldsData,
      checkChangeInput,
      paramId,
      closeModal,
      form,
      saveModal,
      emailChange,
      handleChange,
      // scrollToTop,
      regex,
      errorMsg,
      addStaff,
      careCordinator,
      personalInfoData,
      current,
      personalInfo,
      steps: [
        {
          title: "Personal Information",
          content: "First-content",
        },
        {
          title: "Contacts",
          content: "Second-content",
        },
        {
          title: "Availability",
          content: "Second-content",
        },
        {
          title: "Roles",
          content: "Second-content",
        },
        {
          title: "Documents",
          content: "Second-content",
        },
        // {
        //   title: "Providers",
        //   content: "Last-content",
        // },
      ],
      next,
      prev,
      onFinishFailed,
    };
  },
};
</script>

<style scoped>
.steps-content {
  margin-top: 16px;
  border-radius: 6px;
  min-height: 200px;
  text-align: left;
  padding: 12px 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.steps-action {
  text-align: right;
}
</style>

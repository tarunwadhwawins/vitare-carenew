
<template>
<a-modal max-width="1140px" width="100%" :title="cptCodeId ? 'Edit CPT Codes' : 'Add CPT Codes'" centered :footer="null" :maskClosable="false" @cancel="closeModal()">
    <a-form ref="formRef" :model="cptCodeForm" layout="vertical" @finish="submitForm" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
                <div class="form-group">

                    <a-form-item :label="$t('global.service')" name="serviceId" :rules="[{ required: true, message: $t('global.service') +' '+$t('global.service')+' '+$t('global.validation')  }]">
                        <!-- <a-select ref="select" v-if="cptCodesGetters.service" v-model:value="cptCodeForm.serviceId" style="width: 100%" size="large">
                            <a-select-option value="" hidden>{{'Select Service Type'}}</a-select-option>
                            <a-select-option v-for="services in cptCodesGetters.service" :key="services.udid" :value="services.udid">
                                {{ services.name }}</a-select-option>
                        </a-select> -->
                        <GlobalCodeDropDown v-if="cptCodesGetters.service" v-model:value="cptCodeForm.serviceId" :globalCode="cptCodesGetters.service" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.serviceId?errorMsg.serviceId[0]:''" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item label="CPT Code" name="name" :rules="[{required: true,message:'CPT Code ' +$t('global.validation'),},]">
                        <a-input v-model:value="cptCodeForm.name" size="large" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.name ? errorMsg.name[0] : ''" />
                    </a-form-item>
                </div>

            </a-col>
            <a-col :sm="6" :xs="24">
                <div class="form-group">
                    <a-form-item label="Billing Amount" name="billingAmout" :rules="[{required: true,message:'Billing Amount ' +$t('global.validation'),},]">
                        <a-input-number v-model:value="cptCodeForm.billingAmout" :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\$\s?|(,*)/g, '')" size="large" style="width: 100%" />
                        <!-- <a-input v-model:value="cptCodeForm.billingAmout" size="large" placeholder="$" /> -->
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.billingAmout ? errorMsg.billingAmout[0] : ''" />
                    </a-form-item>
                </div>

            </a-col>
            <a-col :sm="6" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('global.duration') +' '+$t('global.time')" name="durationId" :rules="[{ required: true, message: $t('global.duration') +' '+$t('global.time')+' '+$t('global.validation')  }]">
                        <!-- <a-select ref="select" v-if="durationList.duration" v-model:value="cptCodeForm.durationId" style="width: 100%" size="large">
                            <a-select-option value="" hidden>{{'Select Duration Time'}}</a-select-option>
                            <a-select-option v-for="duration in durationList.duration" :key="duration.id" :value="duration.id">
                                {{ duration.name }}</a-select-option>
                        </a-select> -->
                        <GlobalCodeDropDown v-if="durationList.duration" v-model:value="cptCodeForm.durationId" :globalCode="durationList.duration" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.durationId?errorMsg.durationId[0]:''" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :xs="24">
                <div class="form-group">
                    <a-form-item label="Description" name="billingAmout" :rules="[{required: true,message:'Description ' +$t('global.validation'),},]">
                        <a-textarea v-model:value="cptCodeForm.description" placeholder="Message" allow-clear />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.description ? errorMsg.description[0] : ''" />
                    </a-form-item>
                </div>
                <!-- <div class="form-group">
          <label>Description </label>
          <a-textarea v-model:value="value2" placeholder="Message" allow-clear />
        </div> -->
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <label>Active/Inactive</label>
                    <a-switch v-model:checked="cptCodeForm.status" @change="UpdateStatus($event)" />
                </div>
            </a-col>
            <a-col :span="24">

                <div class="steps-action">
                    <ModalButtons @is_click="reset" isReset="true" :disabled="formButton" :Id="cptCodeId" />
                </div>
            </a-col>
        </a-row>
    </a-form>
    <Loader />
</a-modal>
</template>
<script>
import { ref, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import ModalButtons from "@/components/common/button/ModalButtons";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import Loader from "@/components/loader/Loader";
import { warningSwal } from "./../../commonMethods/commonMethod";
import { messages } from "./../../config/messages";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";

export default {
  components: {
    ModalButtons,
    Loader,
    ErrorMessage,
    GlobalCodeDropDown,
  },
  props: {
    cptId: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const checked = ref([false]);
    const formRef = ref(false);
    const cptCodeId = reactive(props.cptId);
    const cptCodeForm = reactive({
      serviceId: "",
      name: "",
      providerId: 1,
      billingAmout: "",
      description: "",
      durationId: "",
      status: true,
    });
    const onFinishFailed = () => {
      //
    };
    const cptCodesGetters = store.getters.cptRecords;

    function UpdateStatus(event) {
      cptCodeForm.status = event;
    }
    const formButton = ref(false);
    const durationList = store.getters.commonRecords.value;
    watchEffect(() => {
      if (cptCodeId) {
        store.commit("loadingStatus", true);
        if (cptCodesGetters.value.cptCodeDetails) {
          Object.assign(cptCodeForm, cptCodesGetters.value.cptCodeDetails);
        }
        store.commit("loadingStatus", false);
      }
    });
    const submitForm = () => {
      if (props.cptId != null) {
        store.dispatch("updateCptCode", {
          data: cptCodeForm,
          id: props.cptId,
        }).then(()=>{
          store.dispatch("cptCodesList");
        })
      } else {
        formButton.value = store.dispatch("addCptCode", cptCodeForm).then(()=>{
          store.dispatch("cptCodesList");
        })
      }

      reset();
      
      emit("is-visible", false);
    };
    const form = reactive({
      ...cptCodeForm,
    });

    function reset() {
      formRef.value.resetFields();
      Object.assign(cptCodeForm, form);
      formButton.value = false;
    }

    function closeModal() {
      if (
        cptCodeForm.name != "" ||
        cptCodeForm.description != "" ||
        cptCodeForm.serviceId != "" ||
        cptCodeForm.billingAmout != "" ||
        cptCodeForm.durationId != ""
      ) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            reset();
            emit("is-visible", false);
          } else {
            emit("is-visible", true);
          }
        });
      }
    }
    return {
      formButton,
      size: ref("large"),
      checked,
      cptCodeForm,
      cptCodesGetters,
      onFinishFailed,
      UpdateStatus,
      durationList,
      submitForm,
      formRef,
      reset,
      closeModal,
      cptCodeId,
    };
  },
};
</script>

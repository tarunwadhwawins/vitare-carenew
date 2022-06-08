<template>
<a-modal :title="title" max-width="1040px" width="100%" v-model:visible="visible" :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <a-col :span="24">
            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Providers'">
                <a-form :model="providerForm" autocomplete="off" :scrollToFirstError="true" layout="vertical" @finish="submitProviderForm">
                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.providerName')" name="name" :rules="[{ required: true, message: $t('providers.providerName')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerForm.name" size="large" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.providerAddress')" name="address" :rules="[{ required: true, message: $t('providers.providerAddress')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerForm.address" size="large" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.country')" name="countryId" :rules="[{ required: true, message: $t('global.country')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown v-model:value="providerForm.countryId" :globalCode="globalCode.country" @change="checkChangeInput()" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.country?errorMsg.country[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.state')" name="stateId" :rules="[{ required: true, message: $t('global.state')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown v-model:value="providerForm.stateId" :globalCode="globalCode.state" @change="checkChangeInput()" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.state?errorMsg.state[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.city')" name="city" :rules="[{ required: true, message: $t('providers.city')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerForm.city" size="large" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.zipcode')" name="zipcode" :rules="[{ required: true, message:$t('global.validValidation')+' '+ $t('global.zipcode').toLowerCase(),pattern: regex.zipCode }]">
                                    <a-input v-model:value="providerForm.zipcode" size="large" @change="checkChangeInput()" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.zipCode?errorMsg.zipCode[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.phoneNumber')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber}]">
                                    <a-input-number @change="checkChangeInput()" v-model:value.trim="providerForm.phoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
                                    <!-- <PhoneNumber @change="checkChangeInput()" v-model:value.trim="providerForm.phoneNumber" @setPhoneNumber="setPhoneNumberProviderForm"/> -->
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.tags')" name="tagId" :rules="[{ required: true, message: $t('providers.tags')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown v-model:value="providerForm.tagId" mode="multiple" :globalCode="providerTags" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.modules')" name="moduleId" :rules="[{ required: true, message: $t('providers.modules')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown v-model:value="providerForm.moduleId" mode="multiple" :globalCode="providerModules" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <label>Active/Inactive</label>
                                <a-switch v-model:checked="providerForm.isActive" @change="UpdateStatus($event)" />
                            </div>
                        </a-col>
                        <a-col :span="24">
                            <div class="steps-action">
                                <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                                <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">{{$t('global.next')}}</a-button>
                                <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                                    {{$t('global.done')}}
                                </a-button>
                            </div>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Locations'">
                <a-form :model="providerLocationForm" ref="clearLocationForm" autocomplete="off" :scrollToFirstError="true" layout="vertical" @finish="submitProviderLocationForm">
                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.locationName')" name="locationName" :rules="[{ required: true, message: $t('providers.locationName')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerLocationForm.locationName" size="large" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.noOfLocations')" name="noOfLocations" :rules="[{ required: true, message: $t('providers.noOfLocations')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerLocationForm.noOfLocations" size="large" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.locationAddress')" name="address" :rules="[{ required: true, message: $t('providers.locationAddress')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerLocationForm.address" size="large" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.state')" name="stateId" :rules="[{ required: true, message: $t('global.state')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown v-model:value="providerLocationForm.stateId" :globalCode="globalCode.state" @change="checkChangeInput()" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.state?errorMsg.stateId[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.city')" name="city" :rules="[{ required: true, message: $t('providers.city')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerLocationForm.city" size="large" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.zipcode')" name="zipCode" :rules="[{ required: true, message:$t('global.validValidation')+' '+ $t('global.zipcode').toLowerCase(),pattern: regex.zipCode }]">
                                    <a-input v-model:value="providerLocationForm.zipCode" size="large" @change="checkChangeInput()" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.zipCode?errorMsg.zipCode[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.phoneNumber')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber}]">
                                    <a-input-number v-model:value="providerLocationForm.phoneNumber" size="large" maxlength="10" @change="checkChangeInput()" style="width: 100%"/>
                                    <!-- <vue-tel-input  v-model.trim:value="providerLocationForm.phoneNumber" v-bind="bindProps" @change="checkChangeInput()" /> -->
                                    <!-- <PhoneNumber @change="checkChangeInput()" v-model:value.trim="providerLocationForm.phoneNumber" @setPhoneNumber="setPhoneNumberProviderLocationForm"/> -->
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.emailAddress')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input v-model:value="providerLocationForm.email" placeholder="test@test.com" size="large" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.website')" name="websiteUrl" :rules="[{ required: true, message: $t('providers.website')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerLocationForm.websiteUrl" size="large" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :span="24" v-if="arrayToObjact(screensPermissions,32) && !editProviderLocationData">
                            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
                        </a-col>
                        <a-col :span="24" v-if="arrayToObjact(screensPermissions,33) && editProviderLocationData">
                            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.update')}}</a-button>
                        </a-col>
                        <a-col :span="24">
                            <a-table class="tableCommonSpace" v-if="providerLocationlistData && arrayToObjact(screensPermissions,31) " :columns="columns" :data-source="providerLocationlistData" :pagination="false" :scroll="{ x: 900 }">
                                <template #action="text" >
                                  <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,33)">
                                        <a class="icons" @click="editProviderLocation(text.record.id)">
                                            <EditOutlined />
                                        </a>
                                    </a-tooltip>
                                    <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,34)">
                                        <a class="icons" @click="deleteProviderLocation(text.record.id)">
                                            <DeleteOutlined />
                                        </a>
                                    </a-tooltip>
                                </template>
                            </a-table>
                            <Loader />
                        </a-col>
                        <a-col :span="24">
                            <div class="steps-action">
                                <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                                <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">{{$t('global.next')}}</a-button>
                                <a-button v-if="current >0" type="primary" @click="saveModal()">
                                    {{$t('global.save')}}
                                </a-button>
                            </div>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </a-col>
    </a-row>
</a-modal>
</template>
<script>
import { ref, computed, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import Loader from "./../loader/Loader";
import {
  warningSwal,
  successSwal,
  arrayToObjact,
} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import { DeleteOutlined,EditOutlined } from "@ant-design/icons-vue";
import { regex } from "@/RegularExpressions/regex";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
// import PhoneNumber from "@/components/modals/forms/fields/PhoneNumber"

export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    Loader,
    GlobalCodeDropDown,
    // PhoneNumber
  },
  props: {
    isAdd: {
      type: Boolean,
    },
    providerId: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const current = ref(0);
    const visible = ref(true);
    const store = useStore();
    const clearLocationForm =ref()
    const title = props.isAdd ? "Edit Providers" : "Add Providers";
    const providerId = reactive(props.providerId);

    const providerForm = reactive({
      name: "",
      address: "",
      countryId: 19,
      stateId: "",
      city: "",
      zipcode: "",
      phoneNumber: "",
      tagId: ref([]),
      moduleId: ref([]),
      isActive: true,
    });

    const providerLocationForm = reactive({
      locationName: "",
      noOfLocations: "",
      address: "",
      stateId: "",
      city: "",
      zipCode: "",
      phoneNumber: "",
      email: "",
      websiteUrl: "",
      isActive: 1,
    });

    const setPhoneNumberProviderForm = (value) => {
      providerForm.phoneNumber = value;
    };
    const setPhoneNumberProviderLocationForm = (value) => {
      providerLocationForm.phoneNumber = value;
    };

    function UpdateStatus(event) {
      providerForm.isActive = event;
    }
    const submitProviderForm = () => {
      if (!providerId) {
        store.dispatch("provider", providerForm);
      } else {
        store.dispatch("updateSingleProvider", {
          data:providerForm,
          id: providerId,
        });
      }
      store.state.provider.providersListAll = "";
      setTimeout(() => {
        store.dispatch("providersListAll");
      }, 2000);

      current.value++;
    };

    const providerLocationlistData = computed(() => {
      return store.state.provider.providerLocationList;
    })

    const providersData = computed(() => {
      return store.state.provider;
    })

    const columns = computed(() => {
      return store.state.provider.columns;
    })


    const editSingleProvider = computed(() => {
      return store.state.provider.editSingleProvider;
    })

    const editProviderLocationData = computed(() => {
      return store.state.provider.editProviderLocation;
    })

    const submitProviderLocationForm = () => {
      let proId = providerId ? providerId : providersData.value.provider.id;
      if(editProviderLocationData.value){
        store.dispatch("updateProviderLocation", {
          data:providerLocationForm,
          id: proId,
          locationId:editProviderLocationData.value.id
        }).then((response)=>{
          if(response == true)
          clearLocationForm.value.resetFields()
          store.commit('editProviderLocation', null)
        });
        
      }else{
        store.dispatch("providerLocation", {
          data:providerLocationForm,
          id: proId,
        }).then((response)=>{
          if(response == true)
          clearLocationForm.value.resetFields()
        });
      }
      store.state.provider.providersListAll = "";
      store.dispatch("providersListAll");
      setTimeout(() => {
        store.dispatch("providerLocationList", proId);
      }, 2000);
    };

    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };

    const globalCode = computed(() => {
      return store.state.common;
    });

    const providers = store.getters.providersRecords.value;

    const providerTags = computed(() => {
      return store.state.common.documentTags;
    });

    const providerModules = computed(() => {
      return store.state.common.modules;
    });

    const form = reactive({
      ...providerLocationForm,
    });

    function saveModal() {
      successSwal(messages.formSuccess);
      Object.assign(providerLocationForm, form);
      //store.dispatch("provider");
      store.commit("resetCounter");
      emit("closeModal", false);
    }

    function checkChangeInput() {
      store.commit("checkChangeInput", true);
    }

    const checkFieldsData = computed(() => {
      return store.state.common.checkChangeInput;
    });

    function closeModal() {
      emit("closeModal", true)
      if (checkFieldsData.value) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            emit("closeModal", false);
            Object.assign(providerForm, form);
            Object.assign(providerLocationForm, form);
            store.commit("resetCounter");
            store.commit("checkChangeInput", false);
            store.state.provider.provider = null;
            store.commit('editProviderLocation', null)
          } else {
            emit("closeModal", true);
          }
        });
      } else {
        emit("closeModal", false);
      }
    }

    function editProviderLocation(id) {
      store.commit("loadingStatus", true);
      if (providerId != null) {
            store
              .dispatch("editProviderLocation", {
                id: providerId,
                locationId: id,
              })
      } else {
            store.dispatch("editProviderLocation", {
              id: providersData.value.provider.id,
              locationId: id,
            });
      }
    }

    function deleteProviderLocation(id) {
      
      if (providerId != null) {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
            store.state.provider.editProviderLocation=''
            Object.assign(providerLocationForm, form)
            store.commit("loadingStatus", true);
            store
              .dispatch("deleteProviderLocation", {
                id: providerId,
                locationId: id,
              })
              .then(() => {
                store.dispatch("providerLocationList", providerId);
              });
          }
        });
      } else {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
            store.state.provider.editProviderLocation=''
            Object.assign(providerLocationForm, form)
            store.commit("loadingStatus", true);
            store.dispatch("deleteProviderLocation", {
              id: providersData.value.provider.id,
              locationId: id,
            });
            setTimeout(() => {
              store.dispatch(
                "providerLocationList",
                providersData.value.provider.id
              );
            }, 2000);
          }
        });
      }
    }

    watchEffect(() => {
      if (providerId != null) {
        if (editSingleProvider.value) {
          store.commit("loadingStatus", true);
          Object.assign(providerForm, editSingleProvider.value);
          Object.assign(providerLocationForm, editProviderLocationData.value);
          store.dispatch("providerLocationList", providerId);
          setTimeout(() => {
            store.commit("loadingStatus", false);
          }, 2000);
        }
      }
    });

    return {
      clearLocationForm,
      editProviderLocationData,
      editProviderLocation,
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      setPhoneNumberProviderForm,
      setPhoneNumberProviderLocationForm,
      checkChangeInput,
      checkFieldsData,
      UpdateStatus,
      regex,
      current,
      visible,
      providerForm,
      editSingleProvider,
      providerLocationForm,
      submitProviderForm,
      submitProviderLocationForm,
      next,
      prev,
      saveModal,
      closeModal,
      props,
      title,
      emit,
      columns,
      deleteProviderLocation,
      providers,
      globalCode,
      providerTags,
      providerModules,
      providerLocationlistData,
      steps: [
        {
          title: "Providers",
          content: "First-content",
        },
        {
          title: "Locations",
          content: "Second-content",
        },
      ],

      bindProps: store.state.common.bindProps,
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
<template>
<a-modal :title="title" max-width="1040px" width="100%" v-model:visible="visible" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <a-col :span="24">
            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Providers'">
                <a-form :model="providerForm" layout="vertical" @finish="submitProviderForm">
                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.providerName')" name="name" :rules="[{ required: true, message: $t('providers.providerName')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerForm.name" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.providerAddress')" name="address" :rules="[{ required: true, message: $t('providers.providerAddress')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerForm.address" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.country')" name="countryId" :rules="[{ required: true, message: $t('global.country')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="providerForm.countryId" style="width: 100%" size="large" @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Country'}}</a-select-option>
                                        <a-select-option v-for="country in globalCode.country.globalCode" :key="country.id" :value="country.id">{{country.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.country?errorMsg.country[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.state')" name="stateId" :rules="[{ required: true, message: $t('global.state')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="providerForm.stateId" style="width: 100%" size="large" @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select State'}}</a-select-option>
                                        <a-select-option v-for="state in globalCode.state.globalCode" :key="state.id" :value="state.id">{{state.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.state?errorMsg.state[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.city')" name="city" :rules="[{ required: true, message: $t('providers.city')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerForm.city" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.zipcode')" name="zipcode" :rules="[{ required: true, message:$t('global.validValidation')+' '+ $t('global.zipcode').toLowerCase(),pattern: regex.zipCode }]">
                                    <a-input v-model:value="providerForm.zipcode" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.zipCode?errorMsg.zipCode[0]:''" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.phoneNumber')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber}]">
                                    <a-input v-model:value="providerForm.phoneNumber"  placeholder="Please enter 10 digit number" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.tags')" name="tagId" :rules="[{ required: true, message: $t('providers.tags')+' '+$t('global.validation') }]">
                                    <a-select v-model:value="providerForm.tagId" mode="multiple" size="large" placeholder="Select Tags" style="width: 100%" :options="providerTags.globalCode.map((item) => ({ label: item.name, value: item.id }))" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.modules')" name="moduleId" :rules="[{ required: true, message: $t('providers.modules')+' '+$t('global.validation') }]">
                                    <a-select v-model:value="providerForm.moduleId" mode="multiple" size="large" placeholder="Select modules" style="width: 100%" :options="providerModules.globalCode.map((item) => ({ label: item.name, value: item.id }))" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <label>Active/Inactive</label>
                                <a-switch v-model:checked="providers.isActive" @change="UpdateStatus($event)" />
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
                <a-form :model="providerLocationForm" layout="vertical" @finish="submitProviderLocationForm">
                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.locationName')" name="locationName" :rules="[{ required: true, message: $t('providers.locationName')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerLocationForm.locationName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.noOfLocations')" name="noOfLocations" :rules="[{ required: true, message: $t('providers.noOfLocations')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerLocationForm.noOfLocations" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.locationAddress')" name="locationAddress" :rules="[{ required: true, message: $t('providers.locationAddress')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerLocationForm.locationAddress" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.state')" name="state" :rules="[{ required: true, message: $t('global.state')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="providerLocationForm.state" style="width: 100%" size="large" @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select State'}}</a-select-option>
                                        <a-select-option v-for="state in globalCode.state.globalCode" :key="state.id" :value="state.id">{{state.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.state?errorMsg.state[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.city')" name="city" :rules="[{ required: true, message: $t('providers.city')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerLocationForm.city" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.zipcode')" name="zipcode" :rules="[{ required: true, message:$t('global.validValidation')+' '+ $t('global.zipcode').toLowerCase(),pattern: regex.zipCode }]">
                                    <a-input v-model:value="providerLocationForm.zipcode" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.zipCode?errorMsg.zipCode[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.phoneNumber')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber}]">
                                    <a-input v-model:value="providerLocationForm.phoneNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.emailAddress')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input v-model:value="providerLocationForm.email" placeholder="test@test.com" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('providers.website')" name="website" :rules="[{ required: true, message: $t('providers.website')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="providerLocationForm.website" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :span="24">
                            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
                        </a-col>
                        <a-col :span="24">
                            <a-table class="tableCommonSpace" v-if="providerLocationlistData" :columns="columns" :data-source="providerLocationlistData" :pagination="false" :scroll="{ x: 900 }">
                                <template #action="text">
                                    <a-tooltip placement="bottom">
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
import {
    ref,
    computed,
    reactive,
    watchEffect
} from "vue"
import {
    useStore
} from "vuex"
import Loader from "./../loader/Loader"
import {
    warningSwal,
    successSwal
} from "./../../commonMethods/commonMethod"
import {
    messages
} from "./../../config/messages";
import {
    DeleteOutlined
} from "@ant-design/icons-vue";
import { regex } from "@/RegularExpressions/regex";

export default {

    components: {
        DeleteOutlined,
        Loader
    },
    props: {
        isAdd: {
            type: Boolean
        },
        providerId: {
            type: Number
        },
    },
    setup(props, {
        emit
    }) {
        const current = ref(0);
        const visible = ref(true);
        const store = useStore();
        const title = props.isAdd ? "Edit Providers" : "Add Providers";
        const providerId = reactive(props.providerId);

        const providerForm = reactive({
            name: '',
            address: '',
            countryId: '',
            stateId: '',
            city: '',
            zipcode: '',
            phoneNumber: '',
            tagId: ref([]),
            moduleId: ref([]),
        })

        const providerLocationForm = reactive({
            locationName: '',
            noOfLocations: '',
            locationAddress: '',
            state: '',
            city: '',
            zipcode: '',
            phoneNumber: '',
            email: '',
            website: '',
        })

        const submitProviderForm = () => {
            if (!providerId) {
                store.dispatch('provider', {
                    name: providerForm.name,
                    address: providerForm.address,
                    countryId: providerForm.countryId,
                    stateId: providerForm.stateId,
                    city: providerForm.city,
                    zipcode: providerForm.zipcode,
                    phoneNumber: providerForm.phoneNumber,
                    tagId: providerForm.tagId,
                    moduleId: providerForm.moduleId,
                    isActive: 1
                });
            } else {
                store.dispatch('updateSingleProvider', {
                    data: {
                        name: providerForm.name,
                        address: providerForm.address,
                        countryId: providerForm.countryId,
                        stateId: providerForm.stateId,
                        city: providerForm.city,
                        zipCode: providerForm.zipcode,
                        phoneNumber: providerForm.phoneNumber,
                        tagId: providerForm.tagId,
                        moduleId: providerForm.moduleId,
                        isActive: 1
                    },
                    id: providerId
                });
            }
            store.commit('loadingStatus', false)
            current.value++;
            store.state.provider.providersListAll=''
            store.dispatch("providersListAll")

        }

        const providerLocationlistData = computed(() => {
            return store.state.provider.providerLocationList;
        });

        const providersData = computed(() => {
            return store.state.provider;
        });

        const columns = computed(() => {
            return store.state.provider.columns;
        });

        const editSingleProvider = computed(() => {
            return store.state.provider.editSingleProvider;
        });

        const submitProviderLocationForm = () => {
            let proId = providerId ? providerId : providersData.value.provider.id
            store.dispatch("providerLocation", {
                data: {
                    locationName: providerLocationForm.locationName,
                    numberOfLocations: providerLocationForm.noOfLocations,
                    locationAddress: providerLocationForm.locationAddress,
                    stateId: providerLocationForm.state,
                    city: providerLocationForm.city,
                    zipCode: providerLocationForm.zipcode,
                    phoneNumber: providerLocationForm.phoneNumber,
                    email: providerLocationForm.email,
                    websiteUrl: providerLocationForm.website,
                    providerId: proId,
                    isActive: 1
                },
                id: proId,
            });
            
            setTimeout(() => {
                //store.dispatch("providersListAll")
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

        const providers = store.getters.providersRecords.value

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
            emit('closeModal', false);
        }

        function closeModal() {
            if (providerForm.name != '' || providerForm.address != '') {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        emit("closeModal", false);
                        Object.assign(providerForm, form);
                       // store.dispatch("provider");
                        store.commit("resetCounter");
                        store.state.provider.provider = null
                    } else {
                        emit("closeModal", true);
                    }
                })
            }
        }

        function deleteProviderLocation(id) {
            if (providerId != null) {
                warningSwal(messages.deleteWarning).then((response) => {
                    if (response == true) {
                        store.dispatch('deleteProviderLocation', {
                            id: providerId,
                            locationId: id
                        }).then(() => {
                            store.dispatch("providerLocationList", providerId);
                        }, 2000);
                    }
                })
            } else {
                warningSwal(messages.deleteWarning).then((response) => {
                    if (response == true) {
                        store.dispatch('deleteProviderLocation', {
                            id: providersData.value.provider.id,
                            locationId: id
                        })
                        setTimeout(() => {
                            store.dispatch("providerLocationList", providersData.value.provider.id);
                        }, 2000);
                    }
                })
            }
        }

        watchEffect(() => {
           
            if (providerId != null) {
                if (editSingleProvider.value) {
                    store.commit('loadingStatus', true)
                    Object.assign(providerForm, editSingleProvider.value);
                    store.dispatch("providerLocationList", providerId);
                    setTimeout(() => {
                        store.commit('loadingStatus', false)
                    }, 2000)

                }
            }
        });

        return {
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
            steps: [{
                    title: "Providers",
                    content: "First-content",
                },
                {
                    title: "Locations",
                    content: "Second-content",
                },
            ],
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

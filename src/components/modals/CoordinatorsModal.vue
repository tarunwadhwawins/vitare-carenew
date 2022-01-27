<template>
<a-modal max-width="1140px" width="100%" :title="$t('careCoordinator.coordinatorsModal.addNewCoordinator')" centered :footer="null">
    <a-form :model="personalInfoData" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="personalInfo" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <a-col :span="24">
                <a-steps :current="current">
                    <a-step v-for="item in steps" :key="item.title" :title="item.title?item.title:''" />
                </a-steps>
                <div class="steps-content" v-if="steps[current].title == 'Personal Information'">
                    <!-- <PersonalInformation /> -->
                    <a-row :gutter="24">
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: $t('global.firstName')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="personalInfoData.firstName"  size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.firstName[0]" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: true, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="personalInfoData.lastName"  />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName[0]" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item name="designationId" :label="$t('global.designation')" has-feedback :rules="[{ required: true, message: $t('global.designation')+' '+$t('global.validation') }]">
                                    <a-select ref="select" show-search v-model:value="personalInfoData.designationId" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="designation in careCordinator.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.designationId[0]" />
                                </a-form-item>
                            </div>

                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item name="genderId" :label="$t('global.gender')" has-feedback :rules="[{ required: true, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="personalInfoData.genderId" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="gender in careCordinator.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.genderId[0]" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(),type: 'email' }]">
                                    <a-input v-model:value="personalInfoData.email" placeholder="test@test.com" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email[0]" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: new RegExp('^[0-9]{10}$') }]">
                                    <a-input v-model:value="personalInfoData.phoneNumber" placeholder="Please enter 10 digit number" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber[0]" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.specialization')" name="specializationId" :rules="[{ required: true, message: $t('global.specialization')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="personalInfoData.specializationId" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="network in careCordinator.specialization.globalCode" :key="network.id" :value="network.id">{{network.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.specializationId[0]" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.network')" name="networkId" :rules="[{ required: true, message: $t('global.network')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="personalInfoData.networkId" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="network in careCordinator.network.globalCode" :key="network.id" :value="network.id">{{network.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.networkId[0]" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-row>

        <div class="steps-action">
            <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
            <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">{{$t('global.next')}}</a-button>
            <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                {{$t('global.done')}}
            </a-button>
        </div>

    </a-form>

    <div class="steps-content" v-if="steps[current].title == 'Contacts'">
        <Contacts />
    </div>
    <div class="steps-content" v-if="steps[current].title == 'Availability'">
        <Availability />
    </div>
    <div class="steps-content" v-if="steps[current].title == 'Roles'">
        <Roles />
    </div>
    <div class="steps-content" v-if="steps[current].title == 'Documents'">
        <Documents />
    </div>
    <div class="steps-content" v-if="steps[current].title == 'Providers'">
        <Providers />
    </div>

</a-modal>
</template>

<script>
import {
    ref,
    reactive,
    computed
} from "vue";
import PersonalInformation from "@/components/modals/forms/PersonalInformation";
import Contacts from "@/components/modals/forms/Contacts";
import Availability from "@/components/modals/forms/Availability";
import Roles from "@/components/modals/forms/Roles";
import Documents from "@/components/modals/forms/Documents";
import Providers from "@/components/modals/forms/Providers";
import {useStore} from "vuex"
import ErrorMessage from "../common/messages/ErrorMessage"
export default {
    components: {
        // PersonalInformation,
        Contacts,
        Availability,
        Roles,
        Documents,
        Providers,
        ErrorMessage,
    },
    setup() {
        const current = ref(0);
        const store = useStore();
        const personalInfoData = reactive({
            firstName: '',
            lastName: '',
            designationId: '',
            genderId: '',
            email: '',
            phoneNumber: '',
            specializationId: '',
            networkId: '',
            roleId:3,
            providerId:1

        });
        const next = values => {
            console.log('Success:', values);
            current.value++;
        }

        const personalInfo = (values) => {
            store.dispatch('addStaff', personalInfoData)
            setTimeout(()=>{
            if(addStaff.value.id){
             store.dispatch('staffs')
             current.value++; 
            }
            },2000)
            
        }

        const prev = () => {
            current.value--;
        }

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };

        const careCordinator = computed(() => {
            return store.state.common
        })

        const addStaff = computed(() => {
            return store.state.careCoordinator.addStaff
        })

        const errorMsg = computed(() => {
            return store.state.common.errorMsg
        })


        return {
            errorMsg,
            addStaff,
            careCordinator,
            personalInfoData,
            current,
            personalInfo,
            steps: [{
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
                {
                    title: "Providers",
                    content: "Last-content",
                },
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

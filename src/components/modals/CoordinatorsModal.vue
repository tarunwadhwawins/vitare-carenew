<template>
<a-modal max-width="1140px" width="100%" :title="$t('careCoordinator.coordinatorsModal.addNewCoordinator')" centered :footer="null">
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="next" @finishFailed="onFinishFailed">
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
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="formState.firstName" placeholder="input placeholder" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="formState.lastName" placeholder="input placeholder" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item name="designation" :label="$t('global.designation')" has-feedback :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="formState.designation" placeholder="Please select designation">
                                        <a-select-option value="Administrative">Administrative</a-select-option>
                                        <a-select-option value="Manager">Manager</a-select-option>
                                        <a-select-option value="Executive">Executive</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>

                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item name="gender" :label="$t('global.gender')" has-feedback :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="formState.gender" placeholder="Please select gender">
                                        <a-select-option value="lucy">Male</a-select-option>
                                        <a-select-option value="Yiminghe">Female</a-select-option>
                                        <a-select-option value="Yiminghe">Others</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="formState.email" placeholder="input placeholder" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNo" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="formState.phoneNo" placeholder="input placeholder" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.specialization')" name="specialization" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="formState.specialization" placeholder="input placeholder" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.network')" name="network" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="formState.network" placeholder="input placeholder" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                </div>
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
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" html-type="submit" >{{$t('global.next')}}</a-button>
                    <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                        {{$t('global.done')}}
                    </a-button>
                </div>
            </a-col>
        </a-row>
    </a-form>
</a-modal>
</template>

<script>
import {
    ref,
    reactive
} from "vue";
import PersonalInformation from "@/components/modals/forms/PersonalInformation";
import Contacts from "@/components/modals/forms/Contacts";
import Availability from "@/components/modals/forms/Availability";
import Roles from "@/components/modals/forms/Roles";
import Documents from "@/components/modals/forms/Documents";
import Providers from "@/components/modals/forms/Providers";
export default {
    components: {
        // PersonalInformation,
        Contacts,
        Availability,
        Roles,
        Documents,
        Providers,
    },
    setup() {
        const current = ref(0);
        const formState = reactive({
            firstName: '',
            lastName: '',
            designation: '',
            gender:'',
            email:'',
            phoneNo:'',
            specialization:'',
            network:''

        });
        const next = values => {
            console.log('Success:', values);
            current.value++;
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
        return {
            current,
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
            formState
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

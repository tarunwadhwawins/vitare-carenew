<template>
<a-modal max-width="1140px" width="100%" title="Add New Patients" centered :footer="null">

    <a-row :gutter="24">
        <a-col :span="24">
            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Demographics'">
                <!-- <Demographics /> -->
                <a-form :model="demographics" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="next" @finishFailed="onFinishFailed">
                    <a-row :gutter="24">

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.firstName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.middleName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.lastName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.dateOfBirth')" name="dob" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-date-picker v-model:value="demographics.dob" :size="size" style="width: 100%" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label> {{$t('global.gender')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" v-model:value="demographics.gender" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option value="1">Male</a-select-option>
                                        <!-- <a-select-option value="2">Female</a-select-option>
                                        <a-select-option value="3">Others</a-select-option> -->
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.language')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.language')" name="language" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.language" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.otherLanguage')}}</label> -->
                                <a-form-item :label="$t('patient.demographics.otherLanguage')" name="otherLanguage" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="demographics.otherLanguage" mode="multiple" size="large" placeholder="Please Select Language" style="width: 100%" :options="test" />
                                </a-form-item>

                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.nickName')}}</label> -->
                                <a-form-item :label="$t('patient.demographics.nickName')" name="nickName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.nickName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.weight')}}</label> -->
                                <a-form-item :label="$t('patient.demographics.weight')" name="weight" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.weight" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.height')}}</label> -->
                                <a-form-item :label="$t('patient.demographics.height')" name="height" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.height" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.email')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.email" size="large">
                                        <template #addonAfter>
                                            <a-select v-model:value="value4" style="width: 120px">
                                                <a-select-option value="@yahoo">@yahoo.com</a-select-option>
                                                <a-select-option value="@gmail.com">@gmail.com</a-select-option>
                                                <a-select-option value="@hotmail.com">@hotmail.com</a-select-option>
                                                <a-select-option value="@outlook.com">@outlook.com</a-select-option>
                                                <a-select-option value="@aol.com">@aol.com</a-select-option>
                                            </a-select>
                                        </template>
                                    </a-input>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.phoneNo')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.phoneNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.preferredMethodofContact')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="demographics.contactType" mode="multiple" size="large" style="width: 100%" :options="test" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label> {{$t('patient.demographics.preferredTimeofDayforContact')}}<span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="demographics.contactTime" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option value="lucy">Morning</a-select-option>
                                        <a-select-option value="Yiminghe">Afternoon</a-select-option>
                                        <a-select-option value="Yiminghe">Evening</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.MRN')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.MRN')" name="medicalRecordNumber" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.medicalRecordNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.country')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.country')" name="country" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.country" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.state')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.state')" name="state" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.state" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.city')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.city')" name="city" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.city" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.zipcode')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.zipcode')" name="zipCode" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.zipCode" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.suiteorApartment')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.suiteorApartment')" name="appartment" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.appartment" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :span="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.address')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.address')" name="address" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-textarea v-model:value="demographics.address" allow-clear />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.demographics.primaryFamilyMember')}}</h2>
                            </div>
                        </a-col>
                    </a-row>

                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.fullName')}}<span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.fullName')" name="fullName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.fullName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.emailAddress')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="familyEmail" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.familyEmail" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.phoneNo')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.familyPhoneNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.preferredMethodofContact')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="demographics.familyContactType" mode="multiple" size="large" style="width: 100%" :options="test" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.preferredTimeofDayforContact')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="demographics.familyContactTime" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option value="lucy">Morning</a-select-option>
                                        <a-select-option value="Yiminghe">Afternoon</a-select-option>
                                        <a-select-option value="Yiminghe">Evening</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label> {{$t('global.gender')}}</label> -->
                                <a-form-item :label="$t('global.gender')" name="familyGender" :rules="[{ required: true, message: 'This field is required.' }]">

                                    <a-select ref="select" v-model:value="demographics.familyGender" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option value="lucy">Male</a-select-option>
                                        <a-select-option value="Yiminghe">Female</a-select-option>
                                        <a-select-option value="Yiminghe">Others</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.relation')}}</label> -->
                                <a-form-item :label="$t('global.relation')" name="relation" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.relation" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.demographics.emergencyContact')}}</h2>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                            <a-checkbox v-model:checked="demographics.isPrimary">
                                {{$t('patient.demographics.sameAsPrimaryFamilyMemberInfo')}}
                            </a-checkbox>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.fullName')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.fullName')" name="emergencyFullName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.emergencyFullName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.emailAddress')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="emergencyEmail" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.emergencyEmail" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.phoneNo')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="emergencyPhoneNumber" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.emergencyPhoneNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.preferredMethodofContact')}}<span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="emergencyContactType" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="demographics.emergencyContactType" mode="multiple" size="large" style="width: 100%" :options="test2" />
                                </a-form-item>

                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.preferredTimeofDayforContact')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="emergencyContactTime" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="demographics.emergencyContactTime" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option value="lucy">Morning</a-select-option>
                                        <a-select-option value="Yiminghe">Afternoon</a-select-option>
                                        <a-select-option value="Yiminghe">Evening</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label> {{$t('global.gender')}}</label> -->
                                <a-form-item :label="$t('global.gender')" name="emergencyGender" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" v-model:value="demographics.emergencyGender" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option value="lucy">Male</a-select-option>
                                        <a-select-option value="Yiminghe">Female</a-select-option>
                                        <a-select-option value="Yiminghe">Others</a-select-option>
                                    </a-select>
                                </a-form-item>
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
                <!--  -->
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Conditions'">

                <!-- <Conditions /> -->
                <a-form :model="conditions" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="next" @finishFailed="onFinishFailed">
                    <a-row :gutter="24">
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="conditions.firstName" placeholder="input placeholder" size="large" />
                                </a-form-item>
                            </div>
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="conditions.lastName" placeholder="input placeholder" size="large" />
                                </a-form-item>
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
                <!--  -->
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Programs'">
                <Programs />
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Devices'">
                <Devices />
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Parameters'">
                <Parameters />
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Clinical Data'">
                <ClinicalData />
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Insurance'">
                <Insurance />
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Documents'">
                <Documents />
            </div>

        </a-col>
    </a-row>

</a-modal>
</template>

<script>
import {
    defineComponent,
    ref,
    computed,
    reactive,
    watchEffect
} from "vue";
import Demographics from "@/components/modals/forms/Demographics";
import Conditions from "@/components/modals/forms/Conditions";
import Programs from "@/components/modals/forms/Programs";
import Devices from "@/components/modals/forms/Devices";
import Parameters from "@/components/modals/forms/Parameters";
import ClinicalData from "@/components/modals/forms/ClinicalData";
import Insurance from "@/components/modals/forms/Insurance";
import Documents from "@/components/modals/forms/Documents";
import {
    useStore
} from "vuex";
export default {
    components: {
        // Demographics,
        // Conditions,
        Programs,
        Devices,
        Parameters,
        ClinicalData,
        Insurance,
        Documents,
    },
    setup() {
      const store = useStore();
        const current = ref(0);
        const demographics = reactive({
            firstName: '',
            middleName: '',
            lastName: '',
            dob: '',
            gender: '',
            language: '',
            otherLanguage: '',
            nickName: '',
            weight: '',
            height: '',
            email: '',
            phoneNumber: '',
            contactType: '',
            contactTime: '',
            medicalRecordNumber: '',
            country: '',
            state: '',
            city: '',
            zipCode: '',
            appartment: '',
            address: '',
            fullName: '',
            familyEmail: '',
            familyPhoneNumber: '',
            familyContactType: '',
            familyContactTime: '',
            familyGender: '',
            relation: '',
            emergencyFullName: '',
            emergencyEmail: '',
            emergencyPhoneNumber: '',
            emergencyContactType: '',
            emergencyContactTime: '',
            emergencyGender: '',
            isPrimary: ''
        });

        const conditions = reactive({
            firstName: '',
            lastName: '',
            designation: '',
            gender: '',
            email: '',
            phoneNo: '',
            specialization: '',
            network: ''

        });
        const next = (values) => {
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

        watchEffect(()=>{
          store.dispatch('globalCodes')
        })

       const globalCodes = computed(()=>{
         return store.state.patients.globalCodes
       })

        return {
            current,
            globalCodes,
            steps: [{
                    title: "Demographics",
                    content: "First-content",
                },
                {
                    title: "Conditions",
                    content: "Second-content",
                },
                {
                    title: "Programs",
                    content: "Second-content",
                },
                {
                    title: "Devices",
                    content: "Second-content",
                },
                {
                    title: "Parameters",
                    content: "Second-content",
                },
                {
                    title: "Clinical Data",
                    content: "Second-content",
                },
                {
                    title: "Insurance",
                    content: "Second-content",
                },
                {
                    title: "Documents",
                    content: "Last-content",
                },
            ],
            next,
            prev,
            size: ref("large"),
            value: ref(["Manger", "Billing Admin", "User Admin"]),
            handleChange,
            demographics,
            conditions,
            onFinishFailed
        };
    },
};
</script>

<style lang="scss">
@media (max-width: 1199px) {
    .ant-steps-item {
        display: flex;

        .ant-steps-item-container {
            text-align: center;

            .ant-steps-item-icon {
                margin: 0;
            }

            .ant-steps-item-content {
                display: block;

                .ant-steps-item-title {
                    padding: 0;
                    font-size: 13px;

                    &::after {
                        display: none;
                    }
                }
            }
        }
    }
}

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

<template>
<a-modal max-width="1140px" width="100%" title="Add New Patients" centered :footer="null">
    <ServerMessage />

    <a-row :gutter="24">
        <a-col :span="24">
            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Demographics'">
                <!-- <Demographics /> -->
                <a-form :model="demographics" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="demographic" @finishFailed="onFinishFailed">
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
                                <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.middleName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.lastName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.dateOfBirth')" name="dob" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-date-picker v-model:value="demographics.dob" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label> {{$t('global.gender')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" v-model:value="demographics.gender" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.language')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.language')" name="language" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <!-- <a-input v-model:value="demographics.language" size="large" /> -->
                                    <a-select ref="select" v-model:value="demographics.language" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="language in globalCode.language.globalCode" :key="language.id" :value="language.id">{{language.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.otherLanguage')}}</label> -->
                                <a-form-item :label="$t('patient.demographics.otherLanguage')" name="otherLanguage" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="demographics.otherLanguage" mode="multiple" size="large" placeholder="Please Select Language" style="width: 100%" :options="globalCode.language.globalCode.map((item) => ({ label: item.name, value: item.id }))" />
                                    <!-- <a-select ref="select" v-model:value="demographics.otherLanguage" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="language in globalCode.language.globalCode" :key="language.id" :value="language.id">{{language.name}}</a-select-option>
                                    </a-select> -->
                                </a-form-item>

                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.nickName')}}</label> -->
                                <a-form-item :label="$t('patient.demographics.nickName')" name="nickName" :rules="[{ required: false, message: 'This field is required.'}]">
                                    <a-input v-model:value="demographics.nickName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.weight')}}</label> -->
                                <a-form-item :label="$t('patient.demographics.weight')" name="weight" :rules="[{ required: false, message: 'This field is required.', pattern: new RegExp(/^\d+(\.\d{1,2})?$/) }]">
                                    <a-input v-model:value="demographics.weight" placeholder="Please enter weight in kg/ILB" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.height')}}</label> -->
                                <a-form-item :label="$t('patient.demographics.height')" name="height" :rules="[{ required: false, message: 'This field is required.', pattern: new RegExp(/^\d+(\.\d{1,2})?$/) }]">
                                    <a-input v-model:value="demographics.height" placeholder="Please enter height in cm/inch " size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.email')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: 'Please enter valid email.', type: 'email' }]">
                                    <a-input v-model:value="demographics.email" size="large">
                                        <!-- <template #addonAfter>
                                            <a-select v-model:value="value4" style="width: 120px">
                                                <a-select-option value="@yahoo">@yahoo.com</a-select-option>
                                                <a-select-option value="@gmail.com">@gmail.com</a-select-option>
                                                <a-select-option value="@hotmail.com">@hotmail.com</a-select-option>
                                                <a-select-option value="@outlook.com">@outlook.com</a-select-option>
                                                <a-select-option value="@aol.com">@aol.com</a-select-option>
                                            </a-select>
                                        </template> -->
                                    </a-input>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.phoneNo')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: 'Please enter number only.',pattern: new RegExp(/^[0-9]+$/)}]">
                                    <a-input v-model:value="demographics.phoneNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.preferredMethodofContact')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="demographics.contactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({ label: item.name,value: item.id }))" />
                                    <!-- <a-select ref="select" v-model:value="demographics.contactType" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="pmOfcontact in globalCode.pmOfcontact.globalCode" :key="pmOfcontact.id" :value="pmOfcontact.id">{{pmOfcontact.name}}</a-select-option>
                                    </a-select> -->
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label> {{$t('patient.demographics.preferredTimeofDayforContact')}}<span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="demographics.contactTime" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
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
                                    <!-- <a-input v-model:value="demographics.country" size="large" /> -->
                                    <a-select ref="select" show-search v-model:value="demographics.country" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="country in globalCode.country.globalCode" :key="country.id" :value="country.id">{{country.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.state')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.state')" name="state" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <!-- <a-input v-model:value="demographics.state" size="large" /> -->
                                    <a-select ref="select" show-search v-model:value="demographics.state" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="state in globalCode.state.globalCode" :key="state.id" :value="state.id">{{state.name}}</a-select-option>
                                    </a-select>
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
                                <a-form-item :label="$t('global.zipcode')" name="zipCode" :rules="[{ required: true, message: 'This field is required.',pattern: new RegExp(/^[0-9]+$/) }]">
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
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="familyEmail" :rules="[{ required: true, message: 'Please enter valid email.', type: 'email' }]">
                                    <a-input v-model:value="demographics.familyEmail" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.phoneNo')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: true, message: 'Please enter number only.',pattern: new RegExp(/^[0-9]+$/) }]">
                                    <a-input v-model:value="demographics.familyPhoneNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.preferredMethodofContact')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="demographics.familyContactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({label: item.name, value: item.id }))" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.preferredTimeofDayforContact')}} <span class="red-color">*</span></label> -->
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="demographics.familyContactTime" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label> {{$t('global.gender')}}</label> -->
                                <a-form-item :label="$t('global.gender')" name="familyGender" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" v-model:value="demographics.familyGender" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.relation')}}</label> -->
                                <a-form-item :label="$t('global.relation')" name="relation" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="demographics.relation" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="relation in globalCode.relation.globalCode" :key="relation.id" :value="relation.id">{{relation.name}}</a-select-option>
                                    </a-select>
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
                                <a-form-item v-if="demographics.isPrimary" :label="$t('patient.demographics.fullName')" name="fullName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.fullName" size="large" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('patient.demographics.fullName')" name="emergencyFullName" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="demographics.emergencyFullName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.emailAddress')}} <span class="red-color">*</span></label> -->
                                <a-form-item v-if="demographics.isPrimary" :label="$t('patient.demographics.emailAddress')" name="familyEmail" :rules="[{ required: true, message: 'Please enter valid email.', type: 'email' }]">
                                    <a-input v-model:value="demographics.familyEmail" size="large" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('patient.demographics.emailAddress')" name="emergencyEmail" :rules="[{ required: true, message: 'Please enter valid email.', type: 'email' }]">
                                    <a-input v-model:value="demographics.emergencyEmail" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.phoneNo')}} <span class="red-color">*</span></label> -->
                                <a-form-item v-if="demographics.isPrimary" :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: true, message: 'Please enter number only.',pattern: new RegExp(/^[0-9]+$/) }]">
                                    <a-input v-model:value="demographics.familyPhoneNumber" size="large" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.phoneNo')" name="emergencyPhoneNumber" :rules="[{ required: true, message: 'Please enter number only.',pattern: new RegExp(/^[0-9]+$/) }]">
                                    <a-input v-model:value="demographics.emergencyPhoneNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.preferredMethodofContact')}}<span class="red-color">*</span></label> -->
                                <a-form-item v-if="demographics.isPrimary" :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="demographics.familyContactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({label: item.name, value: item.id }))" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('patient.demographics.preferredMethodofContact')" name="emergencyContactType" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select v-model:value="demographics.emergencyContactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({ label: item.name,value: item.id }))" />
                                </a-form-item>

                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.demographics.preferredTimeofDayforContact')}} <span class="red-color">*</span></label> -->
                                <a-form-item v-if="demographics.isPrimary" :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="demographics.familyContactTime" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item v-else :label="$t('patient.demographics.preferredTimeofDayforContact')" name="emergencyContactTime" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="demographics.emergencyContactTime" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label> {{$t('global.gender')}}</label> -->
                                <a-form-item v-if="demographics.isPrimary" :label="$t('global.relation')" name="relation" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="demographics.relation" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="relation in globalCode.relation.globalCode" :key="relation.id" :value="relation.id">{{relation.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.gender')" name="emergencyGender" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" v-model:value="demographics.emergencyGender" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
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
                <a-form :model="conditions" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="nextCondition" @finishFailed="onFinishFailed">
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.conditions.healthConditions')}}</h2>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" class="mb-24">
                        <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                            <a-input-search v-model:value="value22" placeholder="Search..." style="width: 100%" size="large" @search="onSearch" />
                        </a-col>
                        <a-col :md="9" :sm="9" :xs="9">
                            <a-checkbox-group v-model:value="conditions.condition">
                                <a-checkbox v-for="condition in globalCode.healthCondition.globalCode" :key="condition.id" :value="condition.id" name="condition">{{condition.name}}</a-checkbox>
                            </a-checkbox-group>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.conditions.referralSource')}}</h2>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.name')}}</label>
                                <a-input v-model="value" size="large" /> -->
                                <a-form-item :label="$t('global.name')" name="name" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="conditions.name" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label> {{$t('global.designation')}}</label>
                                <a-input v-model="value" size="large" /> -->
                                <a-form-item :label="$t('global.designation')" name="designation" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="conditions.designation" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="designation in globalCode.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.email')}}</label>
                                <a-input v-model="value" size="large">
                                    <template #addonAfter>
                                        <a-select v-model:value="value4" style="width: 120px">
                                            <a-select-option value="@yahoo">@yahoo.com</a-select-option>
                                            <a-select-option value="@gmail.com">@gmail.com</a-select-option>
                                            <a-select-option value="@hotmail.com">@hotmail.com</a-select-option>
                                            <a-select-option value="@outlook.com">@outlook.com</a-select-option>
                                            <a-select-option value="@aol.com">@aol.com</a-select-option>
                                        </a-select>
                                    </template>
                                </a-input> -->
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: 'Please enter valid email.', type: 'email' }]">
                                    <a-input v-model:value="conditions.email" size="large">
                                        <!-- <template #addonAfter>
                                            <a-select v-model:value="value4" style="width: 120px">
                                                <a-select-option value="@yahoo">@yahoo.com</a-select-option>
                                                <a-select-option value="@gmail.com">@gmail.com</a-select-option>
                                                <a-select-option value="@hotmail.com">@hotmail.com</a-select-option>
                                                <a-select-option value="@outlook.com">@outlook.com</a-select-option>
                                                <a-select-option value="@aol.com">@aol.com</a-select-option>
                                            </a-select>
                                        </template> -->
                                    </a-input>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.phoneNo')}}</label>
                                <a-input v-model="value" size="large" /> -->
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: 'Please enter number only.',pattern: new RegExp(/^[0-9]+$/) }]">
                                    <a-input v-model:value="conditions.phoneNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.conditions.fax')}}</label>
                                <a-input v-model="value" size="large" /> -->
                                <a-form-item :label="$t('patient.conditions.fax')" name="fax" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="conditions.fax" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.conditions.primaryPhysician')}}</h2>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                            <a-checkbox v-model:checked="conditions.checked"> {{$t('patient.conditions.sameAsabove')}} </a-checkbox>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('global.name')}}</label>
                                <a-input v-model="value" size="large" /> -->
                                <a-form-item v-if="conditions.checked" :label="$t('global.name')" name="name" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="conditions.name" size="large" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.name')" name="name" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="conditions.physician.name" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="conditions.checked" :label="$t('global.designation')" name="designation" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="conditions.designation" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="designation in globalCode.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.designation')" name="designation" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="conditions.physician.designation" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="designation in globalCode.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="conditions.checked" :label="$t('global.email')" name="email" :rules="[{ required: true, message: 'Please enter valid email.', type: 'email' }]">
                                    <a-input v-model:value="conditions.email" size="large">
                                    </a-input>
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.email')" name="email" :rules="[{ required: true, message: 'Please enter valid email.', type: 'email' }]">
                                    <a-input v-model:value="conditions.physician.email" size="large">
                                        <!-- <template #addonAfter>
                                            <a-select v-model:value="value4" style="width: 120px">
                                                <a-select-option value="@yahoo">@yahoo.com</a-select-option>
                                                <a-select-option value="@gmail.com">@gmail.com</a-select-option>
                                                <a-select-option value="@hotmail.com">@hotmail.com</a-select-option>
                                                <a-select-option value="@outlook.com">@outlook.com</a-select-option>
                                                <a-select-option value="@aol.com">@aol.com</a-select-option>
                                            </a-select>
                                        </template> -->
                                    </a-input>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="conditions.checked" :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: 'Please enter number only.',pattern: new RegExp(/^[0-9]+$/) }]">
                                    <a-input v-model:value="conditions.phoneNumber" size="large" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: 'Please enter number only.',pattern: new RegExp(/^[0-9]+$/) }]">
                                    <a-input v-model:value="conditions.physician.phoneNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="conditions.checked" :label="$t('patient.conditions.fax')" name="fax" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="conditions.fax" size="large" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('patient.conditions.fax')" name="fax" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="conditions.physician.fax" size="large" />
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
                <!-- <Programs /> -->
                <a-form :model="program" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="programs" @finishFailed="onFinishFailed">
                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.programs.program')}}</label> -->
                                <a-form-item :label="$t('patient.programs.program')" name="program" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="program.program" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="program in patients.programList" :key="program.id" :value="program.id">{{program.description}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="6" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.programs.onboardinScheduledDate')}}</label> -->
                                <a-form-item :label="$t('patient.programs.onboardinScheduledDate')" name="onboardingScheduleDate" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-date-picker v-model:value="program.onboardingScheduleDate" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="6" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.programs.dischargeDate')}}</label> -->
                                <a-form-item :label="$t('patient.programs.dischargeDate')" name="dischargeDate" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-date-picker v-model:value="program.dischargeDate" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <label>{{$t('global.status')}}</label>
                                <a-radio-group v-model:value="program.status">
                                    <a-radio :value="1">Active</a-radio>
                                    <a-radio :value="0">Inactive</a-radio>
                                </a-radio-group>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" class="mb-24">
                        <a-col :span="24">
                            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" class="mb-24">
                        <DataTable :columns="columns" :data-source="programsData" :scroll="{ x: 1024 }" />
                    </a-row>
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                        <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                            {{$t('global.done')}}
                        </a-button>
                    </div>
                </a-form>

                <!-- end  -->
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Devices'">
                <!-- <Devices /> -->
                <a-form :model="device" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addDevice" @finishFailed="onFinishFailed">

                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.devices.deviceType')}}</label> -->
                                <a-form-item :label="$t('patient.devices.deviceType')" name="deviceType" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-select ref="select" show-search v-model:value="device.deviceType" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                        <a-select-option v-for="device in globalCode.deviceType.globalCode" :key="device.id" :value="device.id">{{device.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.devices.modelNo')}}</label> -->
                                <a-form-item :label="$t('patient.devices.modelNo')" name="modelNumber" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="device.modelNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.devices.serialNo')}}</label> -->
                                <a-form-item :label="$t('patient.devices.serialNo')" name="serialNumber" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="device.serialNumber" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.devices.MACAddress')}}</label> -->
                                <a-form-item :label="$t('patient.devices.MACAddress')" name="macAddress" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="device.macAddress" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.devices.deviceTime')}}</label> -->
                                <a-form-item :label="$t('patient.devices.deviceTime')" name="deviceTime" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="device.deviceTime" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <label>{{$t('patient.devices.ServerTime')}}</label> -->
                                <a-form-item :label="$t('patient.devices.ServerTime')" name="serverTime" :rules="[{ required: true, message: 'This field is required.' }]">
                                    <a-input v-model:value="device.serverTime" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" class="mb-24">
                        <a-col :span="24">
                            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
                        </a-col>
                    </a-row>
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                        <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                            {{$t('global.done')}}
                        </a-button>
                    </div>
                </a-form>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Parameters'">
                <!-- <Parameters /> -->
                <a-form :model="parameters" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="parameters" @finishFailed="onFinishFailed">

                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.parameters.bloodPressure')}}</h2>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <label>{{$t('patient.parameters.systolic')}}</label>
                                <a-input v-model="value" size="large" />
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <label>{{$t('patient.parameters.diastolic')}}</label>
                                <a-input v-model="value" size="large" />
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.parameters.pulse')}}</h2>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <label>{{$t('patient.parameters.BPM')}}</label>
                                <a-input v-model="value" size="large" />
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.parameters.bloodOxygenSaturation')}}</h2>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <label>{{$t('patient.parameters.SPO2')}}</label>
                                <a-input v-model="value" size="large" />
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.parameters.glucosen')}}</h2>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <label>{{$t('patient.parameters.FastingBloodSugar')}}</label>
                                <a-input v-model="value" size="large" />
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <label>{{$t('patient.parameters.randomBloodSugar')}}</label>
                                <a-input v-model="value" size="large" />
                            </div>
                        </a-col>
                    </a-row>
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                        <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                            {{$t('global.done')}}
                        </a-button>
                    </div>
                </a-form>
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
} from "vuex"
import ServerMessage from "../messageHandling/ServerSideMessage"
import DataTable from "../patients/data-table/DataTable.vue"
export default {
    components: {
        // Demographics,
        // Conditions,
        // Programs,
        // Devices,
        // Parameters,
        ClinicalData,
        Insurance,
        Documents,
        DataTable
        // ServerMessage
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
            otherLanguage: [],
            nickName: '',
            weight: '',
            height: '',
            email: '',
            phoneNumber: '',
            contactType: [],
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
            familyContactType: [],
            familyContactTime: '',
            familyGender: '',
            relation: '',
            emergencyFullName: '',
            emergencyEmail: '',
            emergencyPhoneNumber: '',
            emergencyContactType: [],
            emergencyContactTime: '',
            emergencyGender: '',
            isPrimary: false
        });

        const conditions = reactive({
            condition: [],
            name: '',
            designation: '',
            email: '',
            phoneNumber: '',
            fax: '',
            checked: false,
            physician: {
                name: '',
                designation: '',
                email: '',
                phoneNumber: '',
                fax: ''
            }
        });

        const program = reactive({
            program: '',
            onboardingScheduleDate: '',
            dischargeDate: '',
            status: 1

        })

        const device = reactive({
            inventory: 1,
            deviceType: '',
            modelNumber: '',
            serialNumber: '',
            macAddress: '',
            deviceTime: '',
            serverTime: ''
        })

        const demographic = (values) => {
            console.log('Success:', values);
            if (demographics.isPrimary == true) {
                demographics.emergencyFullName = demographics.fullName,
                    demographics.emergencyEmail = demographics.familyEmail,
                    demographics.emergencyPhoneNumber = demographics.familyPhoneNumber,
                    demographics.emergencyContactType = demographics.familyContactType,
                    demographics.emergencyContactTime = demographics.familyContactTime,
                    demographics.emergencyGender = demographics.familyGender,
                    store.dispatch('demographics', demographics)
            } else {
                store.dispatch('demographics', demographics)
            }
            // if(patients.value.demographics.id){
            current.value++;
            // }

            // current.value = patients.value.counter
        }

        const next = () => {
            current.value++;
        }

        const prev = () => {
            current.value--;
            store.commit('counterMinus', 1)
            // current.value = patients.value.counter
        }

        const nextCondition = () => {
            // current.value++;

            // console.log('patient:', values)
            store.dispatch('conditions', {
                data: conditions,
                id: patients.value.demographics.id
            })
            store.dispatch('patientReferals', {
                data: conditions,
                id: patients.value.demographics.id
            })
            // let physicianData = {}
            if (conditions.checked == false) {
                conditions.name = conditions.physician.name,
                    conditions.designation = conditions.physician.designation,
                    conditions.email = conditions.physician.email,
                    conditions.phoneNumber = conditions.physician.phoneNumber,
                    conditions.fax = conditions.physician.fax
                store.dispatch('patientPhysician', {
                    data: conditions,
                    id: patients.value.demographics.id
                })
                current.value++;
            }
            if (conditions.checked == true) {
                store.dispatch('patientPhysician', {
                    data: conditions,
                    id: patients.value.demographics.id
                })

                // current.value = patients.value.counter
                current.value++;
            }

        }

        const programs = (values) => {
            console.log('programs:', values)
            store.dispatch('addProgram', {
                data: program,
                id: patients.value.demographics.id
            })
            // if (patients.value.addProgram.id) {
            //     current.value++;
            // }
            // store.dispatch('program',patients.value.demographics.id)
        }

        const addDevice = (values) => {
            console.log('programs:', values)
            store.dispatch('addDevice', {
                data: device,
                id: patients.value.demographics.id
            })
            if (patients.value.addDevice.id) {
                current.value++;
            }
        }

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };

        watchEffect(() => {

            // store.dispatch('program',patients.value.demographics.id)
        })

        const globalCode = computed(() => {
            return store.state.common
        })

        const patients = computed(() => {
            return store.state.patients
        })

        console.log('pt', patients.value)

        return {
            patients,
            current,
            globalCode,
            demographic,
            nextCondition,
            programs,
            program,
            device,
            addDevice,
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

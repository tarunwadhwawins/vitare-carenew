<template>
<a-modal max-width="1140px" width="100%" title="Add New Patients" centered :footer="null">
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
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: $t('global.firstName')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="demographics.firstName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.firstName?errorMsg.firstName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="demographics.middleName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.middleName?errorMsg.middleName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="demographics.lastName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName?errorMsg.lastName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.dateOfBirth')" name="dob" :rules="[{ required: true, message: $t('global.dateOfBirth')+' '+$t('global.validation') }]">
                                    <a-date-picker v-model:value="demographics.dob" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.dob?errorMsg.dob[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: true, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.gender" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Gender'}}</a-select-option>
                                        <a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.gender?errorMsg.gender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.language')" name="language" :rules="[{ required: true, message: $t('patient.demographics.language')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.language" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Language'}}</a-select-option>
                                        <a-select-option v-for="language in globalCode.language.globalCode" :key="language.id" :value="language.id">{{language.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.language?errorMsg.language[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.otherLanguage')" name="otherLanguage" :rules="[{ required: true, message: $t('patient.demographics.otherLanguage')+' '+$t('global.validation') }]">
                                    <a-select v-model:value="demographics.otherLanguage" mode="multiple" size="large" placeholder="Please Select Language" style="width: 100%" :options="globalCode.language.globalCode.map((item) => ({ label: item.name, value: item.id }))" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.otherLanguage?errorMsg.otherLanguage[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col> 

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.nickName')" name="nickName" :rules="[{ required: false, message: $t('patient.demographics.nickName')+' '+$t('global.validation')}]">
                                    <a-input v-model:value="demographics.nickName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.weight')" name="weight" :rules="[{ required: false, message: $t('patient.demographics.weight')+' '+$t('global.validation'), pattern: regex.digitWithdecimal }]">
                                    <a-input v-model:value="demographics.weight" placeholder="Please enter weight in lbs" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.height')" name="height" :rules="[{ required: false, message: $t('patient.demographics.height')+' '+$t('global.validation'), pattern: regex.digitWithdecimal }]">
                                    <a-input v-model:value="demographics.height" placeholder="Please enter height in cm " size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input v-model:value="demographics.email" placeholder="test@test.com" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email[0]" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber}]">
                                    <a-input v-model:value="demographics.phoneNumber" placeholder="Please enter 10 digit number" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: true, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <a-select v-model:value="demographics.contactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({ label: item.name,value: item.id }))" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactType?errorMsg.contactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: true, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.contactTime" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Preferred Time'}}</a-select-option>
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactTime?errorMsg.contactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.MRN')" name="medicalRecordNumber" :rules="[{ required: true, message: $t('patient.demographics.MRN')+' '+$t('global.validation'),pattern: regex.onlyNumber }]">
                                    <a-input v-model:value="demographics.medicalRecordNumber" placeholder="Please enter number only" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.medicalRecordNumber?errorMsg.medicalRecordNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.country')" name="country" :rules="[{ required: true, message: $t('global.country')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.country" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Country'}}</a-select-option>
                                        <a-select-option v-for="country in globalCode.country.globalCode" :key="country.id" :value="country.id">{{country.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.country?errorMsg.country[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.state')" name="state" :rules="[{ required: true, message: $t('global.state')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.state" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select State'}}</a-select-option>
                                        <a-select-option v-for="state in globalCode.state.globalCode" :key="state.id" :value="state.id">{{state.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.state?errorMsg.state[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.city')" name="city" :rules="[{ required: true, message: $t('global.city')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="demographics.city" size="large" />
                                   <ErrorMessage v-if="errorMsg" :name="errorMsg.city?errorMsg.city[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.zipcode')" name="zipCode" :rules="[{ required: true, message:$t('global.validValidation')+' '+ $t('global.zipcode').toLowerCase(),pattern: regex.zipCode }]">
                                    <a-input v-model:value="demographics.zipCode" placeholder="Please enter 5 digit number" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.zipCode?errorMsg.zipCode[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.suiteorApartment')" name="appartment" :rules="[{ required: true, message: $t('patient.demographics.suiteorApartment')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="demographics.appartment" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.appartment?errorMsg.appartment[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :span="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.address')" name="address" :rules="[{ required: true, message: $t('global.address')+' '+$t('global.validation') }]">
                                    <a-textarea v-model:value="demographics.address" allow-clear />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.address?errorMsg.address[0]:''" />
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
                                <a-form-item :label="$t('patient.demographics.fullName')" name="fullName" :rules="[{ required: true, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="demographics.fullName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.fullName?errorMsg.fullName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="familyEmail" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input v-model:value="demographics.familyEmail" placeholder="test@test.com" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyEmai?errorMsg.familyEmail[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input v-model:value="demographics.familyPhoneNumber" placeholder="Please enter 10 digit number" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyPhoneNumber?errorMsg.familyPhoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: true, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <a-select v-model:value="demographics.familyContactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({label: item.name, value: item.id }))" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactType?errorMsg.familyContactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: true, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.familyContactTime" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Preferred Time'}}</a-select-option>
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactTime?errorMsg.familyContactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="familyGender" :rules="[{ required: true, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.familyGender" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Gender'}}</a-select-option>
                                        <a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyGender?errorMsg.familyGender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.relation')" name="relation" :rules="[{ required: true, message: $t('global.relation')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.relation" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Relation'}}</a-select-option>
                                        <a-select-option v-for="relation in globalCode.relation.globalCode" :key="relation.id" :value="relation.id">{{relation.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.relation?errorMsg.relation[0]:''" />
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
                                <a-form-item v-if="demographics.isPrimary" :label="$t('patient.demographics.fullName')" name="fullName" :rules="[{ required: true, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="demographics.fullName" size="large" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('patient.demographics.fullName')" name="emergencyFullName" :rules="[{ required: true, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="demographics.emergencyFullName" size="large" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyFullName?errorMsg.emergencyFullName[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="demographics.isPrimary" :label="$t('patient.demographics.emailAddress')" name="familyEmail" :rules="[{ required: true, message:$t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input v-model:value="demographics.familyEmail" placeholder="test@test.com" size="large" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('patient.demographics.emailAddress')" name="emergencyEmail" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input v-model:value="demographics.emergencyEmail" placeholder="test@test.com" size="large" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyEmail?errorMsg.emergencyEmail[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="demographics.isPrimary" :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input v-model:value="demographics.familyPhoneNumber" size="large" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.phoneNo')" name="emergencyPhoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input v-model:value="demographics.emergencyPhoneNumber" placeholder="Please enter 10 digit number" size="large" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyPhoneNumber?errorMsg.emergencyPhoneNumber[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="demographics.isPrimary" :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: true, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <a-select v-model:value="demographics.familyContactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({label: item.name, value: item.id }))" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('patient.demographics.preferredMethodofContact')" name="emergencyContactType" :rules="[{ required: true, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <a-select v-model:value="demographics.emergencyContactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({ label: item.name,value: item.id }))" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyContactType?errorMsg.emergencyContactType[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="demographics.isPrimary" :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: true, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.familyContactTime" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Preferred Time'}}</a-select-option>
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item v-else :label="$t('patient.demographics.preferredTimeofDayforContact')" name="emergencyContactTime" :rules="[{ required: true, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.emergencyContactTime" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Preferred Time'}}</a-select-option>
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyContactTime?errorMsg.emergencyContactTime[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="demographics.isPrimary" :label="$t('global.gender')" name="familyGender" :rules="[{ required: true, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.familyGender" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Gender'}}</a-select-option>
                                        <a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.gender')" name="emergencyGender" :rules="[{ required: true, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="demographics.emergencyGender" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Gender'}}</a-select-option>
                                        <a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyGender?errorMsg.emergencyGender[0]:''" />
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
                                <a-form-item :label="$t('global.name')" name="name" :rules="[{ required: true, message: $t('global.name')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="conditions.name" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.designation')" name="designation" :rules="[{ required: true, message: $t('global.designation')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="conditions.designation" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Designation'}}</a-select-option>
                                        <a-select-option v-for="designation in globalCode.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.designation?errorMsg.designation[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <!-- <a-input v-model="value" size="large">
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
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input v-model:value="conditions.email" placeholder="test@test.com" size="large">
                                    </a-input>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input v-model:value="conditions.phoneNumber" placeholder="Please enter 10 digit number" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.conditions.fax')" name="fax" :rules="[{ required: true, message: $t('patient.conditions.fax')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="conditions.fax" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.fax?errorMsg.fax[0]:''" />
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
                                <a-form-item v-if="conditions.checked" :label="$t('global.name')" name="name" :rules="[{ required: true, message: $t('global.name')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="conditions.name" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.name')" name="physicianName" :rules="[{ required: true, message: $t('global.name')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="conditions.physicianName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="conditions.checked" :label="$t('global.designation')" name="designation" :rules="[{ required: true, message: $t('global.designation')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="conditions.designation" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Designation'}}</a-select-option>
                                        <a-select-option v-for="designation in globalCode.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.designation?errorMsg.designation[0]:''" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.designation')" name="physicianDesignation" :rules="[{ required: true, message: $t('global.designation')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="conditions.physicianDesignation" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Designation'}}</a-select-option>
                                        <a-select-option v-for="designation in globalCode.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.designation?errorMsg.designation[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="conditions.checked" :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input v-model:value="conditions.email" placeholder="test@test.com" size="large"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.email')" name="physicianEmail" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input v-model:value="conditions.physicianEmail" placeholder="test@test.com" size="large"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                                
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="conditions.checked" :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input v-model:value="conditions.phoneNumber" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('global.phoneNo')" name="physicianPhoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input v-model:value="conditions.physicianPhoneNumber" placeholder="Please enter 10 digit number" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item v-if="conditions.checked" :label="$t('patient.conditions.fax')" name="fax" :rules="[{ required: true, message: $t('patient.conditions.fax')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="conditions.fax" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.fax?errorMsg.fax[0]:''" />
                                </a-form-item>
                                <a-form-item v-else :label="$t('patient.conditions.fax')" name="physicianFax" :rules="[{ required: true, message: $t('patient.conditions.fax')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="conditions.physicianFax" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.fax?errorMsg.fax[0]:''" />
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
                                <a-form-item :label="$t('patient.programs.program')" name="program" :rules="[{ required: true, message: $t('patient.programs.program')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="program.program" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Program'}}</a-select-option>
                                        <a-select-option v-for="program in patients.programList" :key="program.id" :value="program.id">{{program.description}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.program?errorMsg.program[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="6" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.programs.onboardinScheduledDate')" name="onboardingScheduleDate" :rules="[{ required: true, message: $t('patient.programs.onboardinScheduledDate')+' '+$t('global.validation') }]">
                                    <a-date-picker v-model:value="program.onboardingScheduleDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.onboardingScheduleDate?errorMsg.onboardingScheduleDate[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="6" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.programs.dischargeDate')" name="dischargeDate" :rules="[{ required: true, message: $t('patient.programs.dischargeDate')+' '+$t('global.validation') }]">
                                    <a-date-picker v-model:value="program.dischargeDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.dischargeDate?errorMsg.dischargeDate[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <label>{{$t('global.status')}}</label>
                                <a-radio-group v-model:value="program.status">
                                    <a-radio :value="1">{{$t('global.active')}}</a-radio>
                                    <a-radio :value="0">{{$t('global.inactive')}}</a-radio>
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
                        <a-col :span="24">
                            <a-table :columns="columns" :data-source="programsData" :pagination="false" :scroll="{ x: 900 }">
                                <template #action>
                                    <a-tooltip placement="bottom">
                                        <template #title>
                                            <span>{{$t('global.edit')}}</span>
                                        </template>
                                        <!-- <a class="icons">
                                            <EditOutlined />
                                        </a> -->
                                    </a-tooltip>

                                </template>
                            </a-table>
                            <Loader />
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
                <!-- end  -->
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Devices'">
                <!-- <Devices /> -->
                <a-form :model="device" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addDevice" @finishFailed="onFinishFailed">
                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.devices.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('patient.devices.deviceType')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="device.deviceType" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Device Type'}}</a-select-option>
                                        <a-select-option v-for="device in globalCode.deviceType.globalCode" :key="device.id" :value="device.id">{{device.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.devices.modelNo')" name="modelNumber" :rules="[{ required: true, message: $t('patient.devices.modelNo')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="device.modelNumber" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.modelNumber?errorMsg.modelNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.devices.serialNo')" name="serialNumber" :rules="[{ required: true, message: $t('patient.devices.serialNo')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="device.serialNumber" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.serialNumber?errorMsg.serialNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.devices.MACAddress')" name="macAddress" :rules="[{ required: true, message: $t('patient.devices.MACAddress')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="device.macAddress" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.macAddress?errorMsg.macAddress[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.devices.deviceTime')" name="deviceTime" :rules="[{ required: true, message: $t('patient.devices.deviceTime')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="device.deviceTime" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceTime?errorMsg.deviceTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.devices.ServerTime')" name="serverTime" :rules="[{ required: true, message: $t('patient.devices.ServerTime')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="device.serverTime" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.serverTime?errorMsg.serverTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" class="mb-24">
                        <a-col :span="24">
                            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" class="mb-24">
                        <a-col :span="24">
                            <a-table :columns="deviceColumns" :data-source="deviceData" :pagination="false" :scroll="{ x: 900 }">
                                <template #active>
                                    <a-switch v-model:checked="checked" />
                                </template>
                                <template #action>
                                    <a class="icons">
                                        <DeleteOutlined /></a>
                                </template>
                            </a-table>
                            <Loader />
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
                <!-- <ClinicalData /> -->
                <a-form :model="clinicals" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="clinicalHistory" @finishFailed="onFinishFailed">
                    <div class="form-group">
                        <a-form-item :label="$t('patient.clinicalData.medicalHistory')" name="history" :rules="[{ required: true, message: $t('patient.clinicalData.medicalHistory')+' '+$t('global.validation') }]">
                            <a-input v-model:value="clinicals.history" size="large" />
                            <ErrorMessage v-if="errorMsg" :name="errorMsg.history?errorMsg.history[0]:''" />
                        </a-form-item>
                    </div>
                    <a-row :gutter="24" class="mb-24">
                        <a-col :span="24">
                            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
                        </a-col>
                    </a-row>
                </a-form>
                <a-row :gutter="24" class="mb-24">
                    <a-col :span="24">
                        <a-table :columns="clinicalHistoryColumns" :data-source="clinicalsData" :scroll="{ x: 900 }">
                            <template #action>
                                <a-tooltip placement="bottom">
                                    <template #title>
                                        <span>{{$t('global.edit')}}</span>
                                    </template>
                                    <a class="icons">
                                        <EditOutlined />
                                    </a>
                                </a-tooltip>
                                <a-tooltip placement="bottom">
                                    <template #title>
                                        <span>{{$t('global.delete')}}</span>
                                    </template>
                                    <a class="icons">
                                        <DeleteOutlined />
                                    </a>
                                </a-tooltip>
                            </template>
                        </a-table>
                        <Loader />
                    </a-col>
                </a-row>

                <a-form :model="clinicalMedication" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="clinicalMedicat" @finishFailed="onFinishFailed">
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.clinicalData.medication')}}</h2>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.clinicalData.medicine')" name="medicine" :rules="[{ required: true, message: $t('patient.clinicalData.medicine')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="clinicalMedication.medicine" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.medicine?errorMsg.medicine[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">

                            <div class="form-group">
                                <a-form-item :label="$t('patient.clinicalData.frequency')" name="frequency" :rules="[{ required: true, message: $t('patient.clinicalData.frequency')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="clinicalMedication.frequency" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.frequency?errorMsg.frequency[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.startDate')" name="startDate" :rules="[{ required: true, message: $t('global.startDate')+' '+$t('global.validation') }]">
                                    <a-date-picker v-model:value="clinicalMedication.startDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                     <ErrorMessage v-if="errorMsg" :name="errorMsg.startDate?errorMsg.startDate[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.endDate')" name="endDate" :rules="[{ required: true, message: $t('global.endDate')+' '+$t('global.validation') }]">
                                    <a-date-picker v-model:value="clinicalMedication.endDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.endDate?errorMsg.endDate[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" class="mb-24">
                        <a-col :span="24">
                            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
                        </a-col>
                    </a-row>
                </a-form>
                <a-row :gutter="24" class="mb-24">
                    <a-col :span="24">
                        <a-table :columns="clinicalMedicatColumns" :data-source="clinicalMedicatData" :scroll="{ x: 900 }">
                            <template #action>
                                <a-tooltip placement="bottom">
                                    <template #title>
                                        <span>{{$t('global.edit')}}</span>
                                    </template>
                                    <a class="icons">
                                        <EditOutlined />
                                    </a>
                                </a-tooltip>
                                <a-tooltip placement="bottom">
                                    <template #title>
                                        <span>{{$t('global.delete')}}</span>
                                    </template>
                                    <a class="icons">
                                        <DeleteOutlined />
                                    </a>
                                </a-tooltip>
                            </template>
                        </a-table>
                        <Loader />
                    </a-col>
                </a-row>
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                    <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                        {{$t('global.done')}}
                    </a-button>
                </div>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Insurance'">
                <!-- <Insurance /> -->
                <a-form :model="insuranceData" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="insuranceForm" @finishFailed="onFinishFailed">
                    <a-row :gutter="24" v-for=" insuranceName,i in globalCode.insuranceType.globalCode" :key="insuranceName.id">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{insuranceName.name}}</h2>
                                <input type="hidden" :name="insuranceData.insuranceType[i]" :value="insuranceData.insuranceType[i]=insuranceName.id">
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.insuranceType?errorMsg.insuranceType[0]:''" />
                            </div>
                        </a-col>
                        <a-col :sm="8" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.insurance.insuranceNumber')" name="insuranceNumber" :rules="i==0?[{ required: true, message: $t('patient.insurance.insuranceNumber')+' '+$t('global.validation') }]:''">
                                    <a-input v-model:value="insuranceData.insuranceNumber[i]" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.insuranceNumber?errorMsg.insuranceNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="8" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.insurance.insuranceName')" name="insuranceName" :rules="i==0?[{ required: true, message: $t('patient.insurance.insuranceName')+' '+$t('global.validation') }]:''">
                                    <a-select ref="select" v-model:value="insuranceData.insuranceName[i]" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Insurance Name'}}</a-select-option>
                                        <a-select-option v-for="insuranceName in globalCode.insuranceName.globalCode" :key="insuranceName.id" :value="insuranceName.id">{{insuranceName.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.insuranceName?errorMsg.insuranceName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="8" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.insurance.expirationDate')" name="expirationDate" :rules="i==0?[{ required: true, message: $t('patient.insurance.expirationDate')+' '+$t('global.validation') }]:''">
                                    <a-date-picker v-model:value="insuranceData.expirationDate[i]" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.expirationDate?errorMsg.expirationDate[0]:''" />
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
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Documents'">
                <!-- <Documents /> -->
                <a-form :model="documents" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="documentForm" @finishFailed="onFinishFailed">
                    <a-row :gutter="24">
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.name')" name="name" :rules="[{ required: false, message: $t('global.name')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="documents.name" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.document')" name="document" :rules="[{ required: false, message: $t('global.document')+' '+$t('global.validation') }]">
                                    <a-input v-model:value="documents.document" name="document_file" size="large" type="file" @change="onFileUpload" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.document?errorMsg.document[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.type')" name="type" :rules="[{ required: false, message: $t('global.type')+' '+$t('global.validation') }]">
                                    <a-select ref="select" v-model:value="documents.type" style="width: 100%" size="large"  @change="handleChange">
                                        <a-select-option value="" disabled>{{'Select Type'}}</a-select-option>
                                        <a-select-option v-for="documentType in globalCode.documentTypes.globalCode" :key="documentType.id" :value="documentType.id">{{documentType.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.type?errorMsg.type[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.tags')" name="tags" :rules="[{ required: false, message: $t('global.tags')+' '+$t('global.validation') }]">
                                    <a-select v-model:value="documents.tags" mode="multiple" size="large" placeholder="Select Tags" style="width: 100%" :options="globalCode.documentTags.globalCode.map((item) => ({ label: item.name, value: item.id }))" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.tags?errorMsg.tags[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" class="mb-24">
                        <a-col :span="24">
                            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" class="mb-24">
                        <a-col :span="24">
                            <a-table :columns="documentColumns" :data-source="documentsData" :pagination="false" :scroll="{ x: 900 }">
                                <template #tags="text">
                                    <span v-for="tag in text.text.data" :key="tag.id">{{ tag.tag+ " "}}</span>
                                </template>
                                <template #action>
                                    <a-tooltip placement="bottom">
                                        <template #title>
                                            <span>{{$t('global.edit')}}</span>
                                        </template>
                                        <a class="icons">
                                            <EditOutlined /></a>
                                    </a-tooltip>
                                    <a-tooltip placement="bottom">
                                        <template #title>
                                            <span>{{$t('global.delete')}}</span>
                                        </template>
                                        <a class="icons">
                                            <DeleteOutlined /></a>
                                    </a-tooltip>
                                </template>
                            </a-table>
                            <Loader />
                        </a-col>
                    </a-row>
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary">{{$t('global.next')}}</a-button>
                        <a-button v-if="current == steps.length - 1" type="primary" @click="closeModal()">
                            {{$t('global.done')}}
                        </a-button>
                    </div>
                </a-form>
            </div>
        </a-col>
    </a-row>
</a-modal>
</template>

<script>
import {  ref, computed, reactive } from "vue";
// import Demographics from "@/components/modals/forms/Demographics";
// import Conditions from "@/components/modals/forms/Conditions";
// import Programs from "@/components/modals/forms/Programs";
// import Devices from "@/components/modals/forms/Devices";
// import Parameters from "@/components/modals/forms/Parameters";
// import ClinicalData from "@/components/modals/forms/ClinicalData";
// import Insurance from "@/components/modals/forms/Insurance";
// import Documents from "@/components/modals/forms/Documents";
import { useStore } from "vuex";
// import DataTable from "../patients/data-table/DataTable.vue"
import ErrorMessage from "../common/messages/ErrorMessage.vue";
// import serviceMethod from "../../services/serviceMethod";
import {regex} from "../../RegularExpressions/regex"
import { scrollToTop } from "../../commonMethods/commonMethod"
import Loader from "../loader/Loader"
import {successSwal} from "../../commonMethods/commonMethod"
// import dayjs from 'dayjs';
import {
DeleteOutlined,
EditOutlined
} from "@ant-design/icons-vue";
export default {
  components: {
    // Demographics,
    // Conditions,
    // Programs,
    // Devices,
    // Parameters,
    // ClinicalData,
    // Insurance,
    // Documents,
    // DataTable,
    DeleteOutlined,
    EditOutlined,
    ErrorMessage,
    Loader
  },
  setup(props, {emit}) {
    const store = useStore();
    const current = ref(0);
    const demographics = reactive({
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: "",
      language: "",
      otherLanguage: [],
      nickName: "",
      weight: "",
      height: "",
      email: "",
      phoneNumber: "",
      contactType: [],
      contactTime: "",
      medicalRecordNumber: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      appartment: "",
      address: "",
      fullName: "",
      familyEmail: "",
      familyPhoneNumber: "",
      familyContactType: [],
      familyContactTime: "",
      familyGender: "",
      relation: "",
      emergencyFullName: "",
      emergencyEmail: "",
      emergencyPhoneNumber: "",
      emergencyContactType: [],
      emergencyContactTime: "",
      emergencyGender: "",
      isPrimary: false,
    });

    const conditions = reactive({
      condition: [],
      name: "",
      designation: "",
      email: "",
      phoneNumber: "",
      fax: "",
      checked: false,
      physicianName: "",
      physicianDesignation: "",
      physicianEmail: "",
      physicianPhoneNumber: "",
      physicianFax: "",
    });

    const program = reactive({
      program: "",
      onboardingScheduleDate: "",
      dischargeDate: "",
      status: 1,
    });

    const device = reactive({
      inventory: 1,
      deviceType: "",
      modelNumber: "",
      serialNumber: "",
      macAddress: "",
      deviceTime: "",
      serverTime: "",
    });

    const parameters = reactive([]);

    const clinicals = reactive({
      history: "",
    });

    const clinicalMedication = reactive({
      medicine: "",
      frequency: "",
      startDate: "",
      endDate: "",
    });

    const insuranceData = reactive({
      insuranceNumber: [],
      insuranceName: [],
      expirationDate: [],
      insuranceType: [],
    });

    const documentFile = ref();

    const demographic = () => {
      if (demographics.isPrimary == true) {
        (demographics.emergencyFullName = demographics.fullName),
          (demographics.emergencyEmail = demographics.familyEmail),
          (demographics.emergencyPhoneNumber = demographics.familyPhoneNumber),
          (demographics.emergencyContactType = demographics.familyContactType),
          (demographics.emergencyContactTime = demographics.familyContactTime),
          (demographics.emergencyGender = demographics.familyGender),
          store.dispatch("addDemographic", demographics);
      } else {
        store.dispatch("addDemographic", demographics);
      }

      setTimeout(() => {
        if ( patients.value.status === true ) {
            // store.dispatch("updateDemographic", demographics)
            current.value++;
        }
      }, 3000)
    };

    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
      //   store.commit("counterMinus", 1);
      // current.value = patients.value.counter
    };

    const nextCondition = () => {
      // current.value++;

      store.dispatch("conditions", {
        data: conditions,
        id: patients.value.addDemographic.id,
      });
      store.dispatch("patientReferals", {
        data: conditions,
        id: patients.value.addDemographic.id,
      });
      // let physicianData = {}
      if (conditions.checked == false) {
        (conditions.name = conditions.physicianName),
          (conditions.designation = conditions.physicianDesignation),
          (conditions.email = conditions.physicianEmail),
          (conditions.phoneNumber = conditions.physicianPhoneNumber),
          (conditions.fax = conditions.physicianFax);
        store.dispatch("patientPhysician", {
          data: conditions,
          id: patients.value.addDemographic.id,
        });
        current.value++;
      }
      if (conditions.checked == true) {
        store.dispatch("patientPhysician", {
          data: conditions,
          id: patients.value.addDemographic.id,
        });

        // current.value = patients.value.counter
        current.value++;
      }
    };

    const programs = () => {
      store.dispatch("addProgram", {
        data: program,
        id: patients.value.addDemographic.id,
      });
      // if (patients.value.addProgram.id) {
      //     current.value++;
      // }
      setTimeout(() => {
        store.dispatch("program", patients.value.addDemographic.id);
      }, 3000);
    };

    const addDevice = () => {
      store.dispatch("addDevice", {
        data: device,
        id: patients.value.addDemographic.id,
      });
      //   if (patients.value.addDevice.id) {
      //     current.value++;
      //   }
      setTimeout(() => {
        store.dispatch("devices", patients.value.addDemographic.id);
      }, 3000);
    };

    const parameter = () => {
      store.dispatch("parameter", {
        vital: parameters,
        id: patients.value.addDemographic.id,
      });
    };

    const clinicalHistory = () => {
      store.dispatch("clinicalHistory", {
        data: clinicals,
        id: patients.value.addDemographic.id,
      });

      setTimeout(() => {
        store.dispatch("clinicalHistoryList", patients.value.addDemographic.id);
      }, 3000);
    };

    const clinicalMedicat = () => {
      store.dispatch("clinicalMedicat", {
        data: clinicalMedication,
        id: patients.value.addDemographic.id,
      });
      setTimeout(() => {
        store.dispatch("clinicalMedicatList", patients.value.addDemographic.id);
      }, 3000);
    };

    const insuranceForm = () => {
      store.dispatch("insuranceForm", {
        data: { insurance: [insuranceData] },
        id: patients.value.addDemographic.id,
      });
      setTimeout(() => {
        if (patients.value.insuranceForm.id) {
          current.value++;
        }
      }, 2000);
    };

    const onFileUpload = (event) => {
      let doc_file = event.target.files[0];
      let formData = new FormData();
      formData.append("file", doc_file);
      store.dispatch("uploadFile", formData);
    };

    const filePath = computed(() => {
      return store.state.patients.uploadFile;
    });

    const documents = reactive({
      name: "",
      document: filePath.value ? filePath.value : "",
      type: "",
      tags: [],
      entity: "patient",
    });

    const documentForm = () => {
      store.dispatch("documentForm", {
        data: {
          name: documents.name,
          document: filePath.value ? filePath.value : "",
          type: documents.type,
          tags: documents.tags,
          entity: "patient",
        },
        id: patients.value.addDemographic.id,
      });
      setTimeout(() => {
        store.dispatch("documents", patients.value.addDemographic.id);
      }, 3000);
    };

    const onFinishFailed = (value) => {
        console.log(value)
        scrollToTop();
    };
    const handleChange = () => {
    };

    const globalCode = computed(() => {
      return store.state.common;
    });

    const patients = computed(() => {
      return store.state.patients;
    });

    const deviceData = computed(() => {
      return store.state.patients.devices;
    });

    const deviceColumns = computed(() => {
      return store.state.patients.devicesColumns;
    });

    const columns = computed(() => {
      return store.state.patients.columns;
    });

    const programsData = computed(() => {
      return store.state.patients.program;
    });

    const clinicalHistoryColumns = computed(() => {
      return store.state.patients.clinicalHistoryListColumns;
    });

    const clinicalsData = computed(() => {
      return store.state.patients.clinicalHistoryList;
    });

    const clinicalMedicatData = computed(() => {
      return store.state.patients.clinicalMedicatList;
    });

    const clinicalMedicatColumns = computed(() => {
      return store.state.patients.clinicalMedicatListColumns;
    });

    const documentsData = computed(() => {
      return store.state.patients.documents;
    });

    const documentColumns = computed(() => {
      return store.state.patients.documentColumns;
    });

    const errorMsg = computed(() => {
      return store.state.patients.errorMsg;
    });

    function parameterFields(id) {
      store.dispatch("parameterFields", id);
    }

  

    const fields = computed(() => {
      return store.state.patients.parameterFields;
    });

    function closeModal(){
        emit('closeModal',false)
        let message = 'Patient successfully added!'
        successSwal(message);
    }

    return {
        successSwal,
       closeModal,
       regex,
       scrollToTop,
      deviceColumns,
      deviceData,
      documentFile,
      filePath,
      onFileUpload,
      documentColumns,
      documentsData,
      documentForm,
      documents,
      insuranceForm,
      clinicalMedicatColumns,
      clinicalMedicatData,
      clinicalHistoryColumns,
      insuranceData,
      clinicalMedicat,
      clinicalMedication,
      clinicalsData,
      clinicalHistory,
      clinicals,
      parameter,
      parameters,
      // parameterFieldsName,
      fields,
      parameterFields,
      errorMsg,
      programsData,
      columns,
      patients,
      current,
      globalCode,
      demographic,
      nextCondition,
      programs,
      program,
      device,
      addDevice,
      steps: [
        {
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
        // {
        //   title: "Parameters",
        //   content: "Second-content",
        // },
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
      handleChange,
      demographics,
      conditions,
      onFinishFailed,
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
.validation {
  color: red;
}
</style>


z

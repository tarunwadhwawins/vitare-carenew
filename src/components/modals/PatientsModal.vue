<template>
<a-modal max-width="1140px" width="100%" :title="isEdit == true ? 'Edit Patient' : 'Add New Patient'" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <div class="common-btn mb-24" ref="customScrollTop">
            <a-button type="primary" @click="showSearchPatient" v-if="!isEdit && current==0">
                Bitrix Lookup
            </a-button>
        </div>
        <a-col :span="24">
            <a-steps v-model:current="current" @change="scrollToTop($event)">
                <a-step v-for="item in steps" :key="item.title" :title="item.title?item.title:''"><span :id="item"></span></a-step>
            </a-steps>

            <div class="steps-content" v-if="steps[current].title === 'Demographics'">
                <!-- <Demographics /> -->
                <a-form :model="demographics" name="basic" ref="formRef" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" scrollToFirstError=true autocomplete="off" layout="vertical" @finish="demographic()" @finishFailed="demographicsFailed">
                    <Loader />

                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: $t('global.firstName')+' '+$t('global.validation')}]">
                                    <a-input @change="changedValue" v-model:value="demographics.firstName" size="large" />
                                    <ErrorMessage class="error" v-if="errorMsg" :name="errorMsg.firstName?errorMsg.firstName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="demographics.middleName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.middleName?errorMsg.middleName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: true, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="demographics.lastName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName?errorMsg.lastName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.nickName')" name="nickName" :rules="[{ required: false, message: $t('patient.demographics.nickName')+' '+$t('global.validation')}]">
                                    <a-input @change="changedValue" v-model:value="demographics.nickName" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.dateOfBirth')" name="dob" :rules="[{ required: true, message: $t('global.dateOfBirth')+' '+$t('global.validation') }]">
                                    <a-date-picker @change="changedValue" v-model:value="demographics.dob" :disabledDate="d => !d || d.isAfter(moment())" :format="globalDateFormat" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.dob?errorMsg.dob[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="demographics.email" placeholder="test@test.com" size="large" @input="emailChange()" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber}]">
                                    <a-input v-maska="'###-###-####'" @change="changedValue" v-model:value="demographics.phoneNumber" placeholder="Please enter 10 digit number" size="large" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg && !demographics.phoneNumber" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: true, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.gender" :globalCode="globalCode.gender" />
                                    <ErrorMessage v-if="errorMsg && !demographics.gender" :name="errorMsg.gender?errorMsg.gender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.language')" name="language" :rules="[{ required: false, message: $t('patient.demographics.language')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.language" :globalCode="globalCode.language" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.language?errorMsg.language[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.otherLanguage')" name="otherLanguage" :rules="[{ required: false, message: $t('patient.demographics.otherLanguage')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.otherLanguage" mode="multiple" :globalCode="globalCode.language" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.otherLanguage?errorMsg.otherLanguage[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.weight') + '(lbs)'" name="weight" :rules="[{ required: false, message: $t('patient.demographics.weight')+' '+$t('global.validation'), pattern: regex.digitWithdecimal }]">
                                    <a-input-number @change="changedValue" style="width: 100%" v-model:value="demographics.weight" placeholder="Please enter weight in lbs" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.height')+'(CM)'" name="height" :rules="[{ required: false, message: $t('patient.demographics.height')+' '+$t('global.validation'), pattern: regex.digitWithdecimal }]">
                                    <a-input-number @change="changedValue" style="width: 100%" v-model:value="demographics.height" placeholder="Please enter height in cm " size="large" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactType?errorMsg.contactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactTime?errorMsg.contactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>

                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :span="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.address')" name="address" :rules="[{ required: false, message: $t('global.address')+' '+$t('global.validation') }]">
                                    <a-textarea size="large" @change="changedValue" v-model:value="demographics.address" allow-clear />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.address?errorMsg.address[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.address')+' 2'" name="appartment" :rules="[{ required: false, message: $t('global.address')+' '+$t('global.validation') }]">
                                    <a-textarea size="large" @change="changedValue" v-model:value="demographics.appartment" allow-clear />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.appartment?errorMsg.appartment[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.city')" name="city" :rules="[{ required: false, message: $t('global.city')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="demographics.city" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.city?errorMsg.city[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.state')" name="state" :rules="[{ required: false, message: $t('global.state')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.state" :globalCode="globalCode.state" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.state?errorMsg.state[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.zipcode')" name="zipCode" :rules="[{ required: false, message:$t('global.validValidation')+' '+ $t('global.zipcode').toLowerCase(),pattern: regex.zipCode }]">
                                    <a-input-number @change="changedValue" style="width:100%" v-model:value="demographics.zipCode" placeholder="Please enter 5 digit number" size="large" maxlength="5" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.zipCode?errorMsg.zipCode[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.country')" name="country" :rules="[{ required: false, message: $t('global.country')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.country" :globalCode="globalCode.country" />

                                </a-form-item>
                            </div>
                        </a-col>

                    </a-row>

                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.demographics.responsiblePerson')}}</h2>
                            </div>
                        </a-col>
                    </a-row>

                    <a-row :gutter="24">
                        <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                            <a-checkbox @change="changeSelf" v-model:checked="responsiblePersonForm.self">
                                {{$t('patient.demographics.self')}}
                            </a-checkbox>
                        </a-col>
                    </a-row>

                    <a-row :gutter="24" v-if="responsiblePersonForm.self">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.relation')" name="relation" :rules="[{ required: false, message: $t('global.relation')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.relation" :globalCode="globalCode.relation" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: false, message: $t('global.firstName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="demographics.firstName" size="large" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="demographics.middleName" size="large" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="demographics.lastName" size="large" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="email" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="demographics.email" placeholder="test@test.com" size="large" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber}]">
                                    <a-input v-maska="'###-###-####'" @change="changedValue" v-model:value="demographics.phoneNumber" placeholder="Please enter 10 digit number" size="large" :disabled="disableResponsiblePerson" style="width: 100%" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.gender" :globalCode="globalCode.gender" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>

                    </a-row>

                    <a-row :gutter="24" v-else>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.relation')" name="relation" :rules="[{ required: false, message: $t('global.relation')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.relation" :globalCode="globalCode.relation" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: false, message: $t('global.firstName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.firstName" size="large" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.middleName" size="large" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.lastName" size="large" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="email" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.email" placeholder="test@test.com" size="large" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber}]">
                                    <a-input v-maska="'###-###-####'" @change="changedValue" v-model:value="responsiblePersonForm.phoneNumber" placeholder="Please enter 10 digit number" size="large" :disabled="disableResponsiblePerson" style="width: 100%" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.gender" :globalCode="globalCode.gender" :disabled="disableResponsiblePerson" />

                                </a-form-item>
                            </div>
                        </a-col>

                    </a-row>

                    <div v-if="emergencyContactShow">
                        <a-row :gutter="24">
                            <a-col :span="24">
                                <div class="formHeading">
                                    <h2>{{$t('patient.demographics.emergencyContact')}}</h2>
                                </div>
                            </a-col>
                        </a-row>

                        <a-row>
                            <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                                <a-checkbox @change="changeResponsible" v-model:checked="emergencyContactForm.sameAsPrimary">
                                    {{$t('patient.demographics.sameAsResponsiblePersonInfo')}}
                                </a-checkbox>
                            </a-col>
                        </a-row>
                        <a-row :gutter="24" v-if="emergencyContactForm.sameAsPrimary && responsiblePersonForm.self">

                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: false, message: $t('global.firstName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" v-model:value="demographics.firstName" size="large" :disabled="disableResponsiblePerson" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" v-model:value="demographics.middleName" size="large" :disabled="disableResponsiblePerson" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" v-model:value="demographics.lastName" size="large" :disabled="disableResponsiblePerson" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('patient.demographics.emailAddress')" name="email" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                        <a-input @change="changedValue" v-model:value="demographics.email" placeholder="test@test.com" size="large" :disabled="disableResponsiblePerson" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber}]">
                                        <a-input v-maska="'###-###-####'" @change="changedValue" v-model:value="demographics.phoneNumber" placeholder="Please enter 10 digit number" size="large" :disabled="disableResponsiblePerson" style="width: 100%" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact" :disabled="disableResponsiblePerson" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" :disabled="disableResponsiblePerson" />

                                    </a-form-item>
                                </div>
                            </a-col>

                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.gender" :globalCode="globalCode.gender" :disabled="disableResponsiblePerson" />

                                    </a-form-item>
                                </div>
                            </a-col>

                        </a-row>
                        <a-row :gutter="24" v-else-if="emergencyContactForm.sameAsPrimary">
                            <!-- <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.fullName')" name="fullName" :rules="[{ required: false, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.fullName" size="large" disabled />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.fullName?errorMsg.fullName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col> -->
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: false, message: $t('global.firstName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" v-model:value="responsiblePersonForm.firstName" size="large" :disabled="disableEmergencyContact" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" v-model:value="responsiblePersonForm.middleName" size="large" :disabled="disableEmergencyContact" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" v-model:value="responsiblePersonForm.lastName" size="large" :disabled="disableEmergencyContact" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('patient.demographics.emailAddress')" name="email" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                        <a-input @change="changedValue" v-model:value="responsiblePersonForm.email" placeholder="test@test.com" size="large" :disabled="disableEmergencyContact" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber }]">
                                        <a-input v-maska="'###-###-####'" @change="changedValue" size="large" v-model:value="responsiblePersonForm.phoneNumber" style="width: 100%" :disabled="disableEmergencyContact" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact" :disabled="disableEmergencyContact" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" :disabled="disableEmergencyContact" />

                                    </a-form-item>
                                </div>
                            </a-col>

                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.gender" :globalCode="globalCode.gender" :disabled="disableEmergencyContact" />

                                    </a-form-item>
                                </div>
                            </a-col>
                        </a-row>

                        <a-row :gutter="24" v-else>

                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: false, message: $t('global.firstName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" v-model:value="emergencyContactForm.firstName" size="large" />
                                        <ErrorMessage v-if="errorMsg" :name="errorMsg.firstName ? errorMsg.firstName[0] : ''" />
                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" v-model:value="emergencyContactForm.middleName" size="large" />
                                        <ErrorMessage v-if="errorMsg" :name="errorMsg.middleName ? errorMsg.middleName[0] : ''" />
                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" v-model:value="emergencyContactForm.lastName" size="large" />
                                        <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName ? errorMsg.lastName[0] : ''" />
                                    </a-form-item>
                                </div>
                            </a-col>

                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('patient.demographics.emailAddress')" name="emergencyEmail" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                        <a-input @change="changedValue" v-model:value="emergencyContactForm.emergencyEmail" placeholder="test@test.com" size="large" />
                                    </a-form-item>

                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.phoneNo')" name="emergencyPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase() }]">
                                        <!-- <PhoneNumber  @change="changedValue" v-model.trim:value="demographics.emergencyPhoneNumber" @setPhoneNumber="setPhoneNumberEmergencyPhoneNumber" /> -->
                                        <a-input v-maska="'###-###-####'" @change="changedValue" v-model:value="emergencyContactForm.phoneNumber" placeholder="Please enter 10 digit number" size="large" style="width: 100%" />
                                    </a-form-item>

                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="emergencyContactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact" />
                                    </a-form-item>

                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="emergencyContactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" />
                                    </a-form-item>

                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.gender')" name="emergencyGender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.gender" :globalCode="globalCode.gender" />
                                    </a-form-item>

                                </div>
                            </a-col>
                        </a-row>
                    </div>
                    <div v-if="referalFormShow">
                        <a-row :gutter="24">
                            <a-col :span="24">
                                <div class="formHeading">
                                    <h2>{{$t('patient.conditions.referralSource')}}</h2>
                                </div>
                            </a-col>
                        </a-row>

                        <a-row :gutter="24">
                            <a-col :md="16" :sm="12" :xs="24" v-if="ShowReferralId">
                                <div class="form-group">
                                    <a-form-item label="Select Referral User" name="referral" :rules="[{ required: false, message: 'User  '+$t('global.validation') }]">
                                        <!-- <GlobalCodeDropDown v-if="referralData" @change="changedValue" v-model:value="referal.referral" :globalCode="referralData" /> -->
                                        <ReferralSearch :editDataReferral="editPatientReferral" v-model:value="referal.referral" @handleReferralChange="handleReferralChange($event)" @clearValidtion="clearValidtion" />
                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <a-button type="primary" style="margin-right: 8px" @click="newReferral">{{ShowReferral == false ? 'Add New Referral' : 'Back'}}</a-button>
                            </a-col>
                        </a-row>
                        <a-row v-if="ShowReferral">
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: false, message: $t('global.firstName')+' '+$t('global.validation')}]">
                                        <a-input @change="changedValue" @input="onKeyUp('firstName')" v-model:value="referal.firstName" size="large" />
                                        <ErrorMessage class="error" v-if="errorMsg" :name="errorMsg.firstName?errorMsg.firstName[0]:''" />
                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" @input="onKeyUp('middleName')" v-model:value="referal.middleName" size="large" />
                                        <ErrorMessage v-if="errorMsg" :name="errorMsg.middleName?errorMsg.middleName[0]:''" />
                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" @input="onKeyUp('lastName')" v-model:value="referal.lastName" size="large" />

                                    </a-form-item>
                                </div>
                            </a-col>

                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.designation')" name="referralDesignation" :rules="[{ required: false, message: $t('global.designation')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" @input="onKeyUp('referralDesignation')" v-model:value="referal.referralDesignation" :globalCode="globalCode.designations" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.email')" name="referralEmail" :rules="[{ required: referalEmail, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                        <a-input @change="changedValue" @input="onKeyUp('referralEmail')" v-model:value="referal.referralEmail" placeholder="test@test.com" size="large" />
                                        <ErrorMessage v-if="errorMsg && referalEmail" :name="errorMsg.referralEmail?errorMsg.referralEmail[0]:''" />
                                    </a-form-item>

                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('global.phoneNo')" name="referralPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase() }]">
                                        <a-input v-maska="'###-###-####'" @change="changedValue" @input="onKeyUp('referralPhoneNumber')" v-model:value.trim="referal.referralPhoneNumber" placeholder="Please enter 10 digit number" size="large" style="width: 100%" />

                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="12" :xs="24">
                                <div class="form-group">
                                    <a-form-item :label="$t('patient.conditions.fax')" name="referralFax" :rules="[{ required: false, message: $t('patient.conditions.fax')+' '+$t('global.validation') }]">
                                        <a-input @change="changedValue" @input="onKeyUp('referralFax')" v-model:value="referal.referralFax" size="large" />
                                        <ErrorMessage v-if="referralErrorMsg" :name="referralErrorMsg.referralFax?referralErrorMsg.referralFax[0]:''" />
                                    </a-form-item>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                    <PatientSearch v-model:visible="patientSearch" @closeSearchPatient="closeSearchPatient($event)" @clearValidtion="clearValidtion" />
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" @click="scrollToTop(current);" html-type="submit">{{$t('global.next')}}</a-button>
                        <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                            {{$t('global.done')}}
                        </a-button>
                    </div>
                </a-form>
                <!--  -->
            </div>
            <div class="steps-content" v-if="steps[current].title === 'Devices'">
                <Devices :idPatient="idPatient" @onChange="changedValue" />
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next();scrollToTop(current);">{{$t('global.next')}}</a-button>
                </div>
            </div>
            <div class="steps-content" v-if="steps[current].title === 'Programs'">

                <Programs :idPatient="idPatient" @onChange="changedValue" />

                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next();scrollToTop(current)">{{$t('global.next')}}</a-button>
                </div>
                <!-- end  -->
            </div>
            <div class="steps-content" v-if="steps[current].title === 'Conditions'">
                <!-- <Conditions /> -->
                <a-form :model="conditions" name="basic" scrollToFirstError=true autocomplete="off" layout="vertical" @finish="condition" @finishFailed="conditionsFailed">
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.conditions.healthConditions')}}</h2>
                            </div>
                        </a-col>
                    </a-row>

                    <a-row :gutter="24" class="mb-24">
                        <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                            <a-input @change="selectedDiseases($event)" size="large" placeholder="Search..." id="conditionBox" />
                        </a-col>
                        <a-col :md="24" :sm="24" :xs="24">
                            <div class="form-group conditionsCheckboxs">
                                <a-form-item name="condition" :rules="[{ required: true, message: $t('patient.conditions.healthConditions')+' '+$t('global.validation') }]">
                                    <!-- Selected -->

                                    <p v-if="selectedDiseasesList && selectedDiseasesList.length > 0">
                                        <a-checkbox-group v-model:value="conditions.condition">
                                            <a-checkbox @change="chooseDiseases($event, false)" v-for="disease in selectedDiseasesList" :key="disease.id" :value="disease.id" name="condition">{{disease.name}}</a-checkbox>
                                        </a-checkbox-group>
                                    </p><br />
                                    <!-- Unselected -->
                                    <!-- {{conditions.unselectedConditions}} -->
                                    <p v-if="unSelectedDiseasesList && unSelectedDiseasesList.length > 0">
                                        <a-checkbox-group v-model:value="conditions.unselectedConditions">
                                            <a-checkbox @change="chooseDiseases($event, true)" v-for="disease in unSelectedDiseasesList" :key="disease.id" :value="disease.id" name="unselectedConditions">{{disease.name}}</a-checkbox>
                                        </a-checkbox-group>
                                    </p>
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>

                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" @click="scrollToTop(current)" html-type="submit">{{$t('global.next')}}</a-button>
                        <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                            {{$t('global.done')}}
                        </a-button>
                    </div>

                </a-form>
                <Loader />
                <!--  -->
            </div>

            <div class="steps-content" v-if="steps[current].title == 'Clinical Data'">
                <ClinicalData :idPatient="idPatient" @onChange="changedValue" />

                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next();scrollToTop(current)">{{$t('global.next')}}</a-button>
                    <a-button v-if="current == steps.length - 1" type="primary" @click="saveModal()">
                        {{$t('global.save')}}
                    </a-button>
                </div>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Insurance'">
                <!-- <Insurance /> -->
                <a-form :model="insuranceData" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" scrollToFirstError=true autocomplete="off" layout="vertical" @finish="insuranceForm" @finishFailed="insuranceDataFailed">
                    <Loader />
                    <a-row :gutter="24" v-for=" insuranceName,i in globalCode.insuranceType" :key="insuranceName.id">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{insuranceName.name}}</h2>
                                <a-input @change="changedValue" type="hidden" :name="insuranceData.insuranceType[i]" :value="insuranceData.insuranceType[i]=insuranceName.id" />
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.insuranceType?errorMsg.insuranceType[0]:''" />
                            </div>
                        </a-col>
                        <a-col :sm="8" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.insurance.insuranceNumber')" name="insuranceNumber" :rules="i==0?[{ required: true, message: $t('patient.insurance.insuranceNumber')+' '+$t('global.validation') }]:''">
                                    <a-input @change="changedValue" v-model:value="insuranceData.insuranceNumber[i]" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.insuranceNumber?errorMsg.insuranceNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="8" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.insurance.insuranceName')" name="insuranceName" :rules="i==0?[{ required: true, message: $t('patient.insurance.insuranceName')+' '+$t('global.validation') }]:''">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="insuranceData.insuranceName[i]" :globalCode="globalCode.insuranceName" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.insuranceName?errorMsg.insuranceName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="8" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.insurance.expirationDate')" name="expirationDate" :rules="i==0?[{ required: true, message: $t('patient.insurance.expirationDate')+' '+$t('global.validation') }]:''">
                                    <a-date-picker @change="changedValue" v-model:value="insuranceData.expirationDate[i]" :format="globalDateFormat" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.expirationDate?errorMsg.expirationDate[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" @click="scrollToTop(current)" html-type="submit">{{$t('global.next')}}</a-button>
                        <a-button v-if="current == steps.length - 1" type="primary" @click="saveModal()">
                            {{$t('global.save')}}
                        </a-button>
                    </div>
                </a-form>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Documents'">
                <Documents entity="patient" :idPatient="idPatient? idPatient : patients.addDemographic.id" @onChange="changedValue" />

                <div class="steps-action">

                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" @click="next(); scrollToTop(current)" type="primary" html-type="submit">{{$t('global.next')}}</a-button>

                </div>
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
  watchEffect,
  defineComponent,
  defineAsyncComponent,
  onUnmounted,
  onMounted,
} from "vue";

import { useStore } from "vuex";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import { regex } from "@/RegularExpressions/regex";
import Loader from "@/components/loader/Loader";
import {
  successSwal,
  warningSwal,
  globalDateFormat,
  errorSwal,
} from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
import { useRoute } from "vue-router";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";

import moment from "moment";
//import PhoneNumber from "@/components/modals/forms/fields/PhoneNumber"
export default defineComponent({
  props: {
    isEdit: Boolean,
  },
  components: {
    // PhoneNumber,
    //StaffDropDown,
    GlobalCodeDropDown,
    Programs: defineAsyncComponent(() =>
      import("@/components/modals/forms/Programs")
    ),
    Devices: defineAsyncComponent(() =>
      import("@/components/modals/forms/Devices")
    ),
    ClinicalData: defineAsyncComponent(() =>
      import("@/components/modals/forms/ClinicalData")
    ),
    Documents: defineAsyncComponent(() =>
      import("@/components/modals/forms/Documents")
    ),
    ErrorMessage,
    Loader,
    PatientSearch: defineAsyncComponent(() =>
      import("../modals/search/PatientModal")
    ),
    ReferralSearch: defineAsyncComponent(() =>
      import("../modals/search/ReferralDropdownSearch")
    ),
  },

  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const isValueChanged = ref(false);
    const formRef = ref();
    const patientSearch = ref(false);
    const customScrollTop = ref();
    const disableResponsiblePerson = ref(false);
    const disableEmergencyContact = ref(false);
    const emergencyContactShow = ref(true);
    const referalFormShow = ref(true);
    const ShowReferral = ref(false);
    const globalCode = computed(() => {
      return store.state.common;
    });

    const ShowReferralId = ref(true);

    const errorMsg = computed(() => {
      return store.state.patients.errorMsg;
    });

    const referralErrorMsg = computed(() => {
      return store.state.patients.referralErrorMsg;
    });

    const physicianErrorMsg = computed(() => {
      return store.state.patients.physicianErrorMsg;
    });

    const steps = [
      {
        title: "Demographics",
        key: "demographics",
        content: "First-content",
      },
      {
        title: "Devices",
        key: "devices",
        content: "Second-content",
      },
      {
        title: "Programs",
        key: "programs",
        content: "Third-content",
      },
      {
        title: "Insurance",
        key: "insurance",
        content: "Fourth-content",
      },
      {
        title: "Documents",
        key: "documents",
        content: "Fifth-content",
      },
      {
        title: "Conditions",
        key: "conditions",
        content: "Sixth-content",
      },

      {
        title: "Clinical Data",
        key: "clinicalData",
        content: "Last-content",
      },
    ];

    const changedValue = () => {
      store.commit("isEditPatient", false);
      isValueChanged.value = true;
    };

    const unSelectedDiseasesList = ref([]);
    const selectedDiseasesList = ref([]);
    const selectedDiseases = (event) => {
      isValueChanged.value = true;
      const searchedValue = event.target.value;
      unSelectedDiseasesList.value = [];
      globalCode.value.healthCondition.map(function (healthCondition) {
        if (
          healthCondition.name
            .toLowerCase()
            .includes(searchedValue.toLowerCase())
        ) {
          if (
            !selectedDiseasesList.value.includes(healthCondition) &&
            !unSelectedDiseasesList.value.includes(healthCondition)
          ) {
            unSelectedDiseasesList.value.push(healthCondition);
          }
        }
      });
    };

    const chooseDiseases = (event, isTrue) => {
      const value = event.target.value;
      const checked = event.target.checked;
      if (isTrue && checked) {
        unSelectedDiseasesList.value.filter(function (healthCondition) {
          if (value == healthCondition.id) {
            const indexOfObject = unSelectedDiseasesList.value.findIndex(
              (object) => {
                return object.id === healthCondition.id;
              }
            );
            unSelectedDiseasesList.value.splice(indexOfObject, 1);
            if (!selectedDiseasesList.value.includes(healthCondition)) {
              selectedDiseasesList.value.push(healthCondition);
              if (!conditions.unselectedConditions.includes(value)) {
                conditions.unselectedConditions.push(value);
              }
            }
            conditions.condition.push(healthCondition.id);
          }
        });
      } else if (!isTrue && !checked) {
        conditions.condition = conditions.condition.filter(function (val) {
          return value != val;
        });
        selectedDiseasesList.value.filter(function (healthCondition) {
          if (value == healthCondition.id) {
            const indexOfObject = selectedDiseasesList.value.findIndex(
              (object) => {
                return object.id === healthCondition.id;
              }
            );
            selectedDiseasesList.value.splice(indexOfObject, 1);
            if (!unSelectedDiseasesList.value.includes(healthCondition)) {
              unSelectedDiseasesList.value.push(healthCondition);
            }
          }
        });
      }
    };

    const changedPhoneNumber = () => {
      store.commit("isEditPatient", false);
      isValueChanged.value = true;
    };

    const showSearchPatient = () => {
      patientSearch.value = true;
    };
    const closeSearchPatient = (value) => {
      patientSearch.value = value;
    };

    const idPatient = ref(null);

    const patients = computed(() => {
      return store.state.patients;
    });
    const responsiblePerson = computed(() => {
      return store.state.patients.responsiblePerson;
    });
    const emergencyContact = computed(() => {
      return store.state.patients.emergencyContact;
    });
    // const patientReferralSource = computed(() => {
    //     return store.state.patients.patientReferralSource;
    // });
    const isEditPatient = computed(() => {
      return store.state.patients.isEditPatient;
    });
    const patientDetail = patients.value.patientDetails;
    //const title = isEditPatient.value == true ? 'Edit Patient' : 'Add New Patient'
    const disabled = isEditPatient.value == true ? true : false;

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
      contactTime: [],
      medicalRecordNumber: "",
      country: 19,
      state: "",
      city: "",
      zipCode: "",
      appartment: "",
      address: "",
    });

    const responsiblePersonForm = reactive({
      id: "",
      self: false,
      relation: "",
      relationId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      contactType: [],
      contactTime: [],
      gender: "",
    });

    const emergencyContactForm = reactive({
      id: "",
      sameAsPrimary: false,
      firstName: "",
      middleName: "",
      lastName: "",
      emergencyEmail: "",
      phoneNumber: "",
      contactType: [],
      contactTime: [],
      gender: "",
    });

    const referal = reactive({
      firstName: "",
      middleName: "",
      lastName: "",
      id: "",
      referralName: "",
      referralDesignation: "",
      referralEmail: "",
      referralPhoneNumber: "",
      referralFax: "",
      referral: "",
    });

    const conditions = reactive({
      condition: [],
      unselectedConditions: [],
    });

    const insuranceData = reactive({
      insuranceNumber: [],
      insuranceName: [],
      expirationDate: [],
      insuranceType: [],
    });

    const handleReferralChange = (value) => {
      referal.referral = value;
    };

    const emergencyForm = reactive({
      ...emergencyContactForm,
    });
    const responsiblePersonReactiveForm = reactive({
      ...responsiblePersonForm,
    });
    const referalForm = reactive({
      ...referal,
    });

    const patientConditions = computed(() => {
      return store.state.patients.patientConditions;
    });

    function newReferral() {
      if (ShowReferral.value == false) {
        ShowReferral.value = true;
        ShowReferralId.value = false;
      } else {
        ShowReferral.value = false;
        ShowReferralId.value = true;
        let referalData = referal.referral;
        Object.assign(referal, referalForm);
        referal.referral = referalData;
      }
    }
    const current = computed({
      get: () => store.state.patients.counter,
      set: (value) => {
        selectedDiseasesList.value = [];
        conditions.condition = [];
        conditions.unselectedConditions = [];
        if (props.isEdit && value == 5) {
          if (
            patients.value.addCondition == null &&
            patientConditions.value == null
          ) {
            unSelectedDiseasesList.value = [];
            store.dispatch("patientConditions", idPatient.value).then(() => {
              globalCode.value.healthCondition.map(function (healthCondition) {
                if (patientConditions.value.includes(healthCondition.id)) {
                  if (!selectedDiseasesList.value.includes(healthCondition)) {
                    selectedDiseasesList.value.push(healthCondition);
                    if (!conditions.condition.includes(healthCondition)) {
                      conditions.condition.push(healthCondition.id);
                    }
                  }
                } else {
                  unSelectedDiseasesList.value =
                    globalCode.value.healthCondition;
                }
              });
            });
          } else if (
            patients.value.addCondition == null &&
            patientConditions.value != null
          ) {
            unSelectedDiseasesList.value = [];
            store.dispatch("patientConditions", idPatient.value).then(() => {
              globalCode.value.healthCondition.map(function (healthCondition) {
                if (patientConditions.value.includes(healthCondition.id)) {
                  if (!selectedDiseasesList.value.includes(healthCondition)) {
                    selectedDiseasesList.value.push(healthCondition);
                    if (!conditions.condition.includes(healthCondition)) {
                      conditions.condition.push(healthCondition.id);
                    }
                  }
                } else {
                  if (!unSelectedDiseasesList.value.includes(healthCondition)) {
                    unSelectedDiseasesList.value.push(healthCondition);
                  }
                }
              });
            });
          } else if (
            patients.value.addCondition != null &&
            patientConditions.value != null
          ) {
            unSelectedDiseasesList.value = [];
            store.dispatch("patientConditions", idPatient.value).then(() => {
              globalCode.value.healthCondition.map(function (healthCondition) {
                if (patientConditions.value.includes(healthCondition.id)) {
                  if (!selectedDiseasesList.value.includes(healthCondition)) {
                    selectedDiseasesList.value.push(healthCondition);
                    if (!conditions.condition.includes(healthCondition)) {
                      conditions.condition.push(healthCondition.id);
                    }
                  }
                } else {
                  if (!unSelectedDiseasesList.value.includes(healthCondition)) {
                    unSelectedDiseasesList.value.push(healthCondition);
                  }
                }
              });
            });
          }
        } else if (!props.isEdit && value == 5) {
          store.dispatch("globalCodes");
          unSelectedDiseasesList.value = globalCode.value.healthCondition;
          store.dispatch("patientConditions", idPatient.value).then(() => {
            if (patientConditions.value != null) {
              unSelectedDiseasesList.value = [];
              globalCode.value.healthCondition.map(function (disease) {
                if (patientConditions.value.includes(disease.id)) {
                  if (!selectedDiseasesList.value.includes(disease)) {
                    selectedDiseasesList.value.push(disease);
                    if (!conditions.condition.includes(disease)) {
                      conditions.condition.push(disease.id);
                    }
                  }
                } else {
                  if (!unSelectedDiseasesList.value.includes(disease)) {
                    unSelectedDiseasesList.value.push(disease);
                  }
                }
              });
            } else {
              unSelectedDiseasesList.value = globalCode.value.healthCondition;
              selectedDiseasesList.value = [];
            }
          });
          conditions.condition = [];
        }

        if (props.isEdit || patients.value.addDemographic) {
          store.state.patients.counter = value;
        } else {
          if (
            demographics.firstName &&
            demographics.lastName &&
            demographics.dob &&
            demographics.email &&
            demographics.phoneNumber &&
            referalEmail.value == false
          ) {
            if (store.state.patients.counter < 1) {
              demographic(value);
            }
          } else {
            errorSwal("All(*) fields are required!");
            store.state.patients.counter = 0;
          }
        }
      },
    });
    const form = reactive({
      ...demographics,
    });

    onMounted(() => {
      Object.assign(demographics, form);
      //   store.dispatch("referralList");
    });
    const referalEmail = ref(false);
    watchEffect(() => {
      idPatient.value = patients.value.addDemographic
        ? patients.value.addDemographic.id
        : route.name == "PatientSummary"
        ? route.params.udid
        : null;
      // Bitrix data assign

      if (patients.value.fetchFromBitrix) {
        Object.assign(demographics, patients.value.fetchFromBitrix);
      } else if (!patients.value.fetchFromBitrix) {
        Object.assign(demographics, form);
      }

      //responsiblePerson.value && responsiblePerson.value.self ? disableResponsiblePerson.value = true : disableResponsiblePerson.value = false
      //emergencyContact.value && emergencyContact.value.sameAsPrimary ? disableEmergencyContact.value = true : disableEmergencyContact.value = false

      if (emergencyContact.value && !props.isEdit) {
        //emergencyContactShow.value= false
        //Object.assign(emergencyContactForm, emergencyContact.value)
      }
      if (responsiblePerson.value) {
        if(responsiblePerson.value.self) {
          disableResponsiblePerson.value = true
        }
        Object.assign(responsiblePersonForm, responsiblePerson.value);
      }
      if (patients.value.addDemographic || patients.value.patientDetails) {
        Object.assign(
          demographics,
          patients.value.addDemographic
            ? patients.value.addDemographic
            : patients.value.patientDetails
        );
      }
      if (patients.value.patientReferralSource != null && !props.isEdit) {
        //referalFormShow.value = false
        ShowReferral.value = false;
        ShowReferralId.value = true;
        Object.assign(referal, referalForm);
        referal.referral = patients.value.patientReferralSource.id;
      }
      if (patients.value.patientInsurance != null) {
        Object.assign(insuranceData, patients.value.patientInsurance);
      }

      if (props.isEdit) {
        referalFormShow.value = false;
        emergencyContactShow.value = false;
        emergencyContactForm.sameAsPrimary = false;
        // responsiblePersonForm.self = false;
      }
      // }
    });

    const parameters = reactive([]);

    const demographic = (counteValue = null) => {
      demographics.phoneNumber = demographics.phoneNumber.replace(/-/g,'')
      responsiblePersonForm.phoneNumber = responsiblePersonForm.phoneNumber.replace(/-/g,'')
      emergencyContactForm.phoneNumber = emergencyContactForm.phoneNumber.replace(/-/g,'')
      referal.referralPhoneNumber = referal.referralPhoneNumber.replace(/-/g,'')
      if (responsiblePersonForm.self == true && !responsiblePerson.value) {
        Object.assign(responsiblePersonForm, demographics);
      }
      if (
        emergencyContactForm.sameAsPrimary == true &&
        !emergencyContact.value
      ) {
        if (responsiblePersonForm.self) {
          Object.assign(emergencyContactForm, demographics);
          emergencyContactForm.emergencyEmail = demographics.email;
          emergencyContactForm.sameAsPrimary = true;
        } else {
          Object.assign(emergencyContactForm, responsiblePersonForm);
          emergencyContactForm.emergencyEmail = responsiblePersonForm.email;
          emergencyContactForm.sameAsPrimary = true;
        }
      }
      if (
        (referal.firstName ||
          referal.middleName ||
          referal.lastName ||
          referal.referralDesignation ||
          referal.referralFax ||
          referal.referralPhoneNumber) &&
        referal.referralEmail == ""
      ) {
        store.state.patients.referralErrorMsg["referralEmail"] =
          "Please enter valid email";
      } else {
        if (
          props.isEdit &&
          (patients.value.addDemographic != null ||
            patients.value.patientDetails != null)
        ) {
          store
            .dispatch("updateDemographic", {
              data: {
                demographics: demographics,
                referal: referal,
                responsiblePerson: responsiblePersonForm,
                emergencyContactForm: emergencyContactForm,
              },
              referalId: null,
              responsiblePersonId: responsiblePerson.value
                ? responsiblePerson.value.id
                : null,
              emergencyContactId:
                emergencyContact.value && !props.isEdit
                  ? emergencyContact.value.id
                  : null,
              patientUdid: patients.value.addDemographic
                ? patients.value.addDemographic.id
                : patients.value.patientDetails.id,
            })
            .then(() => {
              //   store.dispatch("referralList");
              if (route.name == "PatientSummary") {
                store.dispatch("patientDetails", route.params.udid);
                store.dispatch("responsiblePerson", route.params.udid);
                store.dispatch("emergencyContact", route.params.udid);
                isValueChanged.value = false;
              }
            });
        } else if (
          !props.isEdit &&
          (patients.value.addDemographic != null ||
            patients.value.patientDetails != null)
        ) {
          store
            .dispatch("updateDemographic", {
              data: {
                demographics: demographics,
                referal: referal,
                responsiblePerson: responsiblePersonForm,
                emergencyContactForm: emergencyContactForm,
              },
              referalId: null,
              responsiblePersonId: responsiblePerson.value
                ? responsiblePerson.value.id
                : null,
              emergencyContactId:
                emergencyContact.value && !props.isEdit
                  ? emergencyContact.value.id
                  : null,
              patientUdid: patients.value.addDemographic
                ? patients.value.addDemographic.id
                : patients.value.patientDetails.id,
            })
            .then(() => {
              if (counteValue) {
                store.state.patients.counter = counteValue;
              }
              //   store.dispatch("referralList");
              if (route.name == "PatientSummary") {
                store.dispatch("patientDetails", route.params.udid);
                store.dispatch("responsiblePerson", route.params.udid);
                store.dispatch("emergencyContact", route.params.udid);
                isValueChanged.value = false;
              }
            });
        } else {
          store
            .dispatch("addDemographic", {
              demographics: demographics,
              referal: referal,
              responsiblePerson: responsiblePersonForm,
              emergencyContactForm: emergencyContactForm,
            })
            .then(() => {
              //   store.dispatch("referralList");
              if (counteValue) {
                store.state.patients.counter = counteValue;
              }

              if (route.name == "PatientSummary") {
                store.dispatch("patientDetails", route.params.udid);
                store.dispatch("responsiblePerson", route.params.udid);
                store.dispatch("emergencyContact", route.params.udid);
                isValueChanged.value = false;
              }
            });
        }
      }
    };

    const condition = () => {
      const patientId = patients.value.patientDetails
        ? patients.value.patientDetails.id
        : idPatient.value;
      const patientConditions = {
        condition: conditions.condition,
      };
      store
        .dispatch("addCondition", {
          data: patientConditions,
          id: patientId,
        })
        .then(() => {
          isValueChanged.value = false;
          store.dispatch("patientConditions", patientId);
        });
      store.dispatch("checkForErrors");
      const checkForErrors = computed(() => {
        return store.state.patients.checkForErrors;
      });
      console.log("checkForErrors 222", checkForErrors);
    };

    const parameter = () => {
      store
        .dispatch("parameter", {
          vital: parameters,
          id: patients.value.addDemographic.id,
        })
        .then(() => {
          isValueChanged.value = false;
        });
    };

    const insuranceForm = () => {
      if (idPatient.value != null) {
        store
          .dispatch("addInsurance", {
            data: {
              insurance: [insuranceData],
            },
            id: idPatient.value,
          })
          .then(() => {
            isValueChanged.value = false;
          });
      } else {
        store
          .dispatch("addInsurance", {
            data: {
              insurance: [insuranceData],
            },
            id: patients.value.addDemographic.id,
          })
          .then(() => {
            isValueChanged.value = false;
          });
      }
    };

    const next = () => {
      store.commit("counterPlus");
      if (!props.isEdit && current.value == 5) {
        store.dispatch("globalCodes").then(() => {
          unSelectedDiseasesList.value = globalCode.value.healthCondition;
        });
      }
    };

    const prev = () => {
      if (patients.value.addDemographic && current.value == 1) {
        Object.assign(demographics, patients.value.addDemographic);
      }

      if (!props.isEdit && current.value == 6) {
        if (
          patients.value.addCondition == null &&
          patientConditions.value == null
        ) {
          unSelectedDiseasesList.value = [];
          store.dispatch("patientConditions", idPatient.value).then(() => {
            globalCode.value.healthCondition.map(function (healthCondition) {
              if (patientConditions.value.includes(healthCondition.id)) {
                if (!selectedDiseasesList.value.includes(healthCondition)) {
                  selectedDiseasesList.value.push(healthCondition);
                  if (!conditions.condition.includes(healthCondition)) {
                    conditions.condition.push(healthCondition.id);
                  }
                }
              } else {
                unSelectedDiseasesList.value = globalCode.value.healthCondition;
              }
            });
          });
        } else if (
          (patients.value.addCondition == null &&
            patientConditions.value != null) ||
          (patients.value.addCondition != null &&
            patientConditions.value != null)
        ) {
          unSelectedDiseasesList.value = [];
          store.dispatch("patientConditions", idPatient.value).then(() => {
            globalCode.value.healthCondition.map(function (healthCondition) {
              if (patientConditions.value.includes(healthCondition.id)) {
                if (!selectedDiseasesList.value.includes(healthCondition)) {
                  selectedDiseasesList.value.push(healthCondition);
                  if (!conditions.condition.includes(healthCondition)) {
                    conditions.condition.push(healthCondition.id);
                  }
                }
              } else {
                if (!unSelectedDiseasesList.value.includes(healthCondition)) {
                  unSelectedDiseasesList.value.push(healthCondition);
                }
              }
            });
          });
        }
        /* else if(patients.value.addCondition != null && patientConditions.value != null) {
                	unSelectedDiseasesList.value = []
                	store.dispatch('patientConditions', idPatient.value).then(() => {

globalCode.value.healthCondition.map(function(healthCondition) {

if(patientConditions.value.includes(healthCondition.id)) {

if(!selectedDiseasesList.value.includes(healthCondition)) {

selectedDiseasesList.value.push(healthCondition)

if(!conditions.condition.includes(healthCondition)) {

conditions.condition.push(healthCondition.id)

}

}

}

else {

if(!unSelectedDiseasesList.value.includes(healthCondition)) {

unSelectedDiseasesList.value.push(healthCondition)

}

}

});
                	})
                } */
      }

      // if(patients.value.addDemographic && current.value == 1) {
      // 	Object.assign(demographics, patients.value.addDemographic);
      // }
      store.commit("counterMinus");
      customScrollTop.value.scrollIntoView({
        behavior: "smooth",
      });
    };

    const demographicsFailed = (e) => {
      console.log("demographicsFailed", e);
    };

    const conditionsFailed = () => {};

    const insuranceDataFailed = () => {};

    const err = computed(() => {
      return store.state.patients.errorMessage;
    });
    const errorMessage = err.value;

    function parameterFields(id) {
      store.dispatch("parameterFields", id);
    }

    const fields = computed(() => {
      return store.state.patients.parameterFields;
    });

    function saveModal() {
      store.commit("resetCounter");
      current.value = 0;
      emit("saveModal", false);

      // store.commit("resetCounter");
      successSwal(messages.formSuccess);
      common();

      store.dispatch("patients");
      // store.commit("resetCounter");
      emit("closeModal");
      store.state.patients.editPatientReferral = null;
    }

    const bitrixFormCheck = computed(() => {
      return store.state.patients.bitrixFormCheck;
    });

    function common() {
      store.commit("bitrixFormCheck", false);
      if (props.isEdit == false) {
        store.state.patients.addDemographic = null;
        store.state.patients.patientDetails = null;
        store.state.patients.emergencyContact = null;
        store.state.patients.patientReferralSource = null;
        store.state.patients.responsiblePerson = null;
        store.state.patients.fetchFromBitrix = "";
        store.state.patients.uploadFile = "";
      }
      isValueChanged.value = false;
      emergencyContactForm.sameAsPrimary = false;
      // responsiblePersonForm.self = false;
      Object.assign(demographics, form);
      Object.assign(responsiblePersonForm, responsiblePersonReactiveForm);
      Object.assign(referal, referalForm);
      Object.assign(emergencyContactForm, emergencyForm);
      ShowReferral.value = false;
      store.commit("resetCounter");
      disableResponsiblePerson.value = false;
      disableEmergencyContact.value = false;
    }

    function closeModal() {
      //current.value = 0
      emit("saveModal", true)
      emit("closeModal", {
        modal: "editPatient",
        value: true,
      })
      if (isValueChanged.value || bitrixFormCheck.value) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            store.commit("addDemographic", null);

            common();
            emit("saveModal", false);
            emit("closeModal", {
              modal: "editPatient",
              value: false,
            });
            store.state.patients.editPatientReferral = null;
            // saveModal()
          } else {
            emit("saveModal", true);
            emit("closeModal", {
              modal: "editPatient",
              value: true,
            });
            store.state.patients.editPatientReferral = null;
          }
        });
      } else {
        common();
        store.commit("resetCounter");
        formRef.value.resetFields();
        emit("saveModal", false)
        emit("closeModal", {
          modal: "editPatient",
          value: false,
        })
      }
    }

    function emailChange() {
      errorMsg.value.email ? (errorMsg.value.email[0] = null) : "";
    }

    function stepperClick(value) {
      console.log("stepper", value);
    }

    onUnmounted(() => {
      store.commit("errorMsg", null);
      store.commit("referralErrorMsg", null);
      store.commit("physicianErrorMsg", null);
    });

    function clearValidtion() {
      formRef.value.resetFields();
      Object.assign(demographics, patients.value.fetchFromBitrix);
    }

    const onKeyUp = (event) => {
      if (
        (referal.firstName ||
          referal.middleName ||
          referal.lastName ||
          referal.referralDesignation ||
          referal.referralFax ||
          referal.referralPhoneNumber ||
          referal.referralEmail) &&
        !referal.referralEmail.match(regex.emailValidation)
      ) {
        referalEmail.value = true;
      } else {
        referalEmail.value = false;
      }

      if (event == "referralEmail") {
        if (referal.referralEmail.match(regex.emailValidation)) {
          referalEmail.value = false;
        }
      }
    };

    function scrollToTop() {
      customScrollTop.value.scrollIntoView({
        behavior: "smooth",
      });
    }

    const handleStaffChange = (val) => {
      conditions.staff = val;
    };

    function checkChangeInput() {
      store.commit("checkChangeInput", true);
    }

    function changeResponsible(e) {
      isValueChanged.value = true;
      disableEmergencyContact.value = true;

      if (e.target.checked) {
        store.commit("isEditPatient", true);
        //         if(responsiblePersonForm.self){
        //            Object.assign(emergencyContactForm, demographics);
        //         emergencyContactForm.emergencyEmail = demographics.email;
        //         emergencyContactForm.sameAsPrimary = true;
        //         }else{
        // Object.assign(emergencyContactForm, responsiblePersonForm);
        //         emergencyContactForm.emergencyEmail = responsiblePersonForm.email;
        //         emergencyContactForm.sameAsPrimary = true;
        //         }
      } else {
        Object.assign(emergencyContactForm, emergencyForm);
        emergencyContactForm.sameAsPrimary = false;
        disableEmergencyContact.value = false;
      }
    }

    function changeSelf(event) {
      const relationId = ref("");
      globalCode.value.relation.some((relation) => {
        if (relation.name === "Self") {
          relationId.value = relation.id;
        }
      });

      if (event.target.checked) {
        Object.assign(responsiblePersonForm, demographics);
        responsiblePersonForm.self = true;
        disableResponsiblePerson.value = true;
        responsiblePersonForm.relationId = relationId.value;
        responsiblePersonForm.relation = relationId.value;
      } else {
        Object.assign(responsiblePersonForm, responsiblePersonReactiveForm);
        // responsiblePersonForm.self = false;
        disableResponsiblePerson.value = false;
      }

      store.commit("isEditPatient", true);
      isValueChanged.value = true;
    }

    const editDataReferral = computed(() => {
      return store.state.patients.editPatientReferral;
    });

    return {
      editDataReferral,
      handleReferralChange,
      disableResponsiblePerson,
      disableEmergencyContact,
      handleStaffChange,
      checkChangeInput,
      customScrollTop,
      changeSelf,
      // setPhoneNumberEmergencyPhoneNumber,
      // setPhoneNumberDemographics,
      scrollToTop,
      formRef,
      clearValidtion,
      changedValue,
      changedPhoneNumber,
      closeSearchPatient,
      showSearchPatient,
      patientSearch,
      stepperClick,
      emailChange,
      insuranceDataFailed,
      conditionsFailed,
      closeModal,
      warningSwal,
      form,
      successSwal,
      saveModal,
      regex,
      insuranceForm,
      insuranceData,
      parameter,
      parameters,
      fields,
      parameterFields,
      errorMsg,
      referralErrorMsg,
      physicianErrorMsg,
      errorMessage,
      patients,
      current,
      globalCode,
      demographic,
      condition,
      steps,
      next,
      prev,
      size: ref("large"),
      search: ref(),
      demographics,
      conditions,
      demographicsFailed,
      idPatient,
      patientDetail,
      isEditPatient,
      disabled,
      onKeyUp,
      bindProps: store.state.common.bindProps,
      moment,
      globalDateFormat,
      responsiblePersonForm,
      emergencyContactForm,
      referal,
      changeResponsible,
      emergencyContactShow,
      referalFormShow,
      ShowReferral,
      newReferral,
      //   referralData: store.getters.referralList,
      selectedDiseases,
      selectedDiseasesList,
      unSelectedDiseasesList,
      chooseDiseases,
      ShowReferralId,
      referalEmail,
    };
  },
});
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

.ant-input-number-handler-wrap {
  display: none;
}

label.ant-checkbox-wrapper.ant-checkbox-wrapper-checked {
  width: fit-content;
}
</style>

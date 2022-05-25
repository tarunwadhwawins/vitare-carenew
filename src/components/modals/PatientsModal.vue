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
                                    <!-- <PhoneNumber @change="changedValue" v-model.trim:value="demographics.phoneNumber" @setPhoneNumber="setPhoneNumberDemographics"/> -->
                                    <a-input-number @change="changedValue" v-model:value="demographics.phoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
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
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.country?errorMsg.country[0]:''" />
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
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.relation?errorMsg.relation[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: false, message: $t('global.firstName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.firstName" size="large" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.firstName ? errorMsg.firstName[0] : ''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.middleName" size="large" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.middleName ? errorMsg.middleName[0] : ''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.lastName" size="large" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName ? errorMsg.lastName[0] : ''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="email" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.email" placeholder="test@test.com" size="large" :disabled="disableResponsiblePerson" @input="emailChange()" />
                                    <ErrorMessage v-if="errorMsg && !demographics.email" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber}]">
                                    <a-input-number @change="changedValue" v-model:value.trim="responsiblePersonForm.phoneNumber" placeholder="Please enter 10 digit number" size="large" :disabled="disableResponsiblePerson" maxlength="10" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactType?errorMsg.contactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactTime?errorMsg.contactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.gender" :globalCode="globalCode.gender" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.gender?errorMsg.gender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                    </a-row>

                    <a-row :gutter="24" v-else>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.relation')" name="relation" :rules="[{ required: false, message: $t('global.relation')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.relation" :globalCode="globalCode.relation" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.relation?errorMsg.relation[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: false, message: $t('global.firstName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.firstName" size="large" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.firstName ? errorMsg.firstName[0] : ''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.middleName" size="large" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.middleName ? errorMsg.middleName[0] : ''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.lastName" size="large" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName ? errorMsg.lastName[0] : ''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="email" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="responsiblePersonForm.email" placeholder="test@test.com" size="large" :disabled="disableResponsiblePerson" @input="emailChange()" />
                                    <ErrorMessage v-if="errorMsg && !demographics.email" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber}]">
                                    <a-input-number @change="changedValue" v-model:value.trim="responsiblePersonForm.phoneNumber" placeholder="Please enter 10 digit number" size="large" :disabled="disableResponsiblePerson" maxlength="10" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactType?errorMsg.contactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactTime?errorMsg.contactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="responsiblePersonForm.gender" :globalCode="globalCode.gender" :disabled="disableResponsiblePerson" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.gender?errorMsg.gender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                    </a-row>
<div v-if="emergencyContactShow">
    
                    <a-row :gutter="24" >
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.demographics.emergencyContact')}}</h2>
                            </div>
                        </a-col>
                    </a-row>

                    <a-row >
                        <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                            <a-checkbox @change="changeResponsible" v-model:checked="emergencyContactForm.sameAsPrimary">
                                {{$t('patient.demographics.sameAsResponsiblePersonInfo')}}
                            </a-checkbox>
                        </a-col>
                    </a-row>

                    <a-row :gutter="24" v-if="emergencyContactForm.sameAsPrimary">
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
                                    <a-input @change="changedValue" v-model:value="emergencyContactForm.firstName" size="large" :disabled="disableEmergencyContact" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.firstName ? errorMsg.firstName[0] : ''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="emergencyContactForm.middleName" size="large" :disabled="disableEmergencyContact" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.middleName ? errorMsg.middleName[0] : ''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="emergencyContactForm.lastName" size="large" :disabled="disableEmergencyContact" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName ? errorMsg.lastName[0] : ''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="email" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="emergencyContactForm.emergencyEmail" placeholder="test@test.com" size="large" :disabled="disableEmergencyContact" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber }]">
                                    <a-input-number @change="changedValue" size="large" v-model:value="emergencyContactForm.phoneNumber" style="width: 100%" :disabled="disableEmergencyContact" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact" :disabled="disableEmergencyContact" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactType?errorMsg.contactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" :disabled="disableEmergencyContact" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactTime?errorMsg.contactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.gender" :globalCode="globalCode.gender" :disabled="disableEmergencyContact" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.gender?errorMsg.gender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>

                    <a-row :gutter="24" v-else>
                        <!-- <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.fullName')" name="emergencyFullName" :rules="[{ required: false, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="emergencyContactForm.fullName" size="large" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyFullName?errorMsg.fullName[0]:''" />
                            </div>
                        </a-col> -->

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
                                    <a-input @change="changedValue" v-model:value="emergencyContactForm.emergencyEmail" placeholder="test@test.com" size="large" @input="emailChange()" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg && !demographics.email" :name="errorMsg.email?errorMsg.email[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="emergencyPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase() }]">
                                    <!-- <PhoneNumber  @change="changedValue" v-model.trim:value="demographics.emergencyPhoneNumber" @setPhoneNumber="setPhoneNumberEmergencyPhoneNumber" /> -->
                                    <a-input-number @change="changedValue" v-model:value.trim="emergencyContactForm.phoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyPhoneNumber?errorMsg.phoneNumber[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="emergencyContactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyContactType?errorMsg.contactType[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="emergencyContactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyContactTime?errorMsg.contactTime[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="emergencyGender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.gender" :globalCode="globalCode.gender" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyGender?errorMsg.gender[0]:''" />
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
                        <a-col :md="16" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Select Referral User" name="referral" :rules="[{ required: false, message: 'User  '+$t('global.validation') }]">
                                    <GlobalCodeDropDown v-if="referralData" @change="changedValue" v-model:value="referal.referral" :globalCode="referralData"  />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.referral?errorMsg.referral[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
<a-col :md="8" :sm="12" :xs="24">
                       <a-button  type="primary" style="margin-right: 8px" @click="newReferral">Add New Referral</a-button>
</a-col>
                    </a-row>
                    <a-row v-if="ShowReferral">
                       <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: false, message: $t('global.firstName')+' '+$t('global.validation')}]">
                                    <a-input @change="changedValue" v-model:value="referal.firstName" size="large" />
                                    <ErrorMessage class="error" v-if="errorMsg" :name="errorMsg.firstName?errorMsg.firstName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.middleName')" name="middleName" :rules="[{ required: false, message: $t('global.middleName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="referal.middleName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.middleName?errorMsg.middleName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="referal.lastName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName?errorMsg.lastName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.designation')" name="referralDesignation" :rules="[{ required: false, message: $t('global.designation')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" @keyup="onKeyUp('referralDesignation')" v-model:value="referal.referralDesignation" :globalCode="globalCode.designations" />
                                    <ErrorMessage v-if="referralErrorMsg" :name="referralErrorMsg.referralDesignation?referralErrorMsg.referralDesignation[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.email')" name="referralEmail" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" @keyup="onKeyUp('referralEmail')" v-model:value="referal.referralEmail" placeholder="test@test.com" size="large" @input="emailChange()" />
                                    <ErrorMessage v-if="referralErrorMsg" :name="referralErrorMsg.referralEmail?referralErrorMsg.referralEmail[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="referralPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase() }]">
                                    <a-input-number @change="changedValue" v-model:value.trim="referal.referralPhoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
                                    <ErrorMessage v-if="referralErrorMsg" :name="referralErrorMsg.referralPhoneNumber?referralErrorMsg.referralPhoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.conditions.fax')" name="referralFax" :rules="[{ required: false, message: $t('patient.conditions.fax')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="referal.referralFax" size="large" />
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
                            <a-input-search @change="changedValue" v-model:value="search" placeholder="Search..." style="width: 100%" size="large" @search="onSearch" />
                        </a-col>
                        <a-col :md="24" :sm="24" :xs="24">
                            <div class="form-group conditionsCheckboxs">
                                <a-form-item name="condition" :rules="[{ required: true, message: $t('patient.conditions.healthConditions')+' '+$t('global.validation') }]">
                                    <a-checkbox-group @change="changedValue" v-model:value="conditions.condition">
                                        <a-checkbox v-for="condition in globalCode.healthCondition" :key="condition.id" :value="condition.id" name="condition">{{condition.name}}</a-checkbox>
                                    </a-checkbox-group>
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>

                    <!-- <a-row :gutter="24">

<a-col :span="24">

<div class="formHeading">

<h2>{{$t('patient.conditions.primaryPhysician')}}</h2>

</div>

</a-col>

</a-row>

<a-row :gutter="24">

<a-col :sm="24" :xs="24">

<a-form-item :label="$t('global.careCoodinator')" name="staff" :rules="[{ required: false, message: $t('global.careCoodinator')+' '+$t('global.validation') }]">

<StaffDropDown v-model:value="conditions.staff" @handleStaffChange="handleStaffChange($event)" @change="checkChangeInput()" :close="closeValue" />

</a-form-item>

</a-col>

</a-row> -->

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
                    <a-button v-if="current == steps.length - 1" type="primary" @click="saveModal()">
                        {{$t('global.save')}}
                    </a-button>
                </div>
            </div>
        </a-col>
    </a-row>

</a-modal>
</template>

<script>
import { ref, computed, reactive, watchEffect, defineComponent, defineAsyncComponent,onUnmounted, onMounted } from "vue";


import { useStore } from "vuex";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import { regex } from "@/RegularExpressions/regex";
import Loader from "@/components/loader/Loader";
import {successSwal,warningSwal,globalDateFormat,errorSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
import { useRoute } from 'vue-router';
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"

import moment from "moment"
//import PhoneNumber from "@/components/modals/forms/fields/PhoneNumber"
export default defineComponent({
    props: {
        isEdit: Boolean
    },
    components: {
        // PhoneNumber,
        //StaffDropDown,
        GlobalCodeDropDown,
        Programs:defineAsyncComponent(() => import("@/components/modals/forms/Programs")),
        Devices:defineAsyncComponent(() => import("@/components/modals/forms/Devices")),
        ClinicalData:defineAsyncComponent(() => import("@/components/modals/forms/ClinicalData")),
        Documents:defineAsyncComponent(() => import("@/components/modals/forms/Documents")),
        ErrorMessage,
        Loader,
        PatientSearch: defineAsyncComponent(() => import("../modals/search/PatientModal")),
    },

    setup(props, {
        emit
    }) {
        const store = useStore();
        const route = useRoute();
        const isValueChanged = ref(false);
        const formRef = ref()
        const patientSearch = ref(false)
        const customScrollTop = ref()
        const disableResponsiblePerson = ref(false);
        const disableEmergencyContact = ref(false);
        const emergencyContactShow = ref(true)
        const referalFormShow = ref(true)
const ShowReferral = ref(false)
function newReferral(){
    ShowReferral.value = true
}
        const errorMsg = computed(() => {
            return store.state.patients.errorMsg;
        });

        const referralErrorMsg = computed(() => {
            return store.state.patients.referralErrorMsg;
        });

        const physicianErrorMsg = computed(() => {
            return store.state.patients.physicianErrorMsg;
        });

        const steps = [{
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

        ]

        const changedValue = () => {
          
            store.commit('isEditPatient', false)
            isValueChanged.value = true
        }
        const changedPhoneNumber = () => {
            store.commit('isEditPatient', false)
            isValueChanged.value = true

        }

        const showSearchPatient = () => {
            patientSearch.value = true
        }
        const closeSearchPatient = (value) => {
            patientSearch.value = value
        }
        const globalCode = computed(() => {
            return store.state.common;
        });
        const idPatient = ref(null)

        const patients = computed(() => {
            return store.state.patients;
        });
        const responsiblePerson = computed(() => {
            return store.state.patients.responsiblePerson;
        });
        const emergencyContact = computed(() => {
            return store.state.patients.emergencyContact;
        });
        const patientReferralSource = computed(() => {
            return store.state.patients.patientReferralSource;
        });
        const isEditPatient = computed(() => {
            return store.state.patients.isEditPatient
        })
        const patientDetail = patients.value.patientDetails;
        //const title = isEditPatient.value == true ? 'Edit Patient' : 'Add New Patient'
        const disabled = isEditPatient.value == true ? true : false

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
            id: '',
            self: false,
            relation: '',
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            contactType: [],
            contactTime: [],
            gender: '',
        })

        const emergencyContactForm = reactive({
            id: '',
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
            id: '',
            referralName: "",
            referralDesignation: "",
            referralEmail: "",
            referralPhoneNumber: "",
            referralFax: "",
            referral:'',
        })

        const conditions = reactive({
            condition: [],
        });

        const insuranceData = reactive({
            insuranceNumber: [],
            insuranceName: [],
            expirationDate: [],
            insuranceType: [],
        });

        const emergencyForm = reactive({
            ...emergencyContactForm
        });
        const responsiblePersonReactiveForm = reactive({
            ...responsiblePersonForm
        });
        const referalForm = reactive({
            ...referal
        });

        const patientConditions = computed(() => {
            return store.state.patients.patientConditions
        })

        const current = computed({
            get: () =>
                store.state.patients.counter,
            set: (value) => {
                if (value == 5) {
                    store.dispatch('patientConditions', idPatient.value).then(() => {
                        console.log('patientConditions.value', patientConditions.value)
                        if (patientConditions.value != null) {
                            Object.assign(conditions.condition, patientConditions.value)
                        }
                    })
                }

                if (props.isEdit || patients.value.addDemographic) {

                    store.state.patients.counter = value
                }
                else {
                    if (demographics.firstName && demographics.lastName && demographics.dob && demographics.email && demographics.phoneNumber) {
                        if (store.state.patients.counter < 1) {

                            demographic(value)
                           

                        }
                    } else {
                        errorSwal('All(*) fields are required!')
                        store.state.patients.counter = 0;
                    }
                }

            },
        })
        const form = reactive({
            ...demographics,
        });

        onMounted(() => {
            Object.assign(demographics, form)
            store.dispatch("referralList")
        })

        watchEffect(() => {
            idPatient.value = patients.value.addDemographic ? patients.value.addDemographic.id : route.name == "PatientSummary" ? route.params.udid : null;
            //console.log("test",idPatient.value)
            // Bitrix data assign 
            if(props.isEdit){
                referalFormShow.value = false
                emergencyContactShow.value= false
            }
            if (patients.value.fetchFromBitrix) {
                Object.assign(demographics, patients.value.fetchFromBitrix);
            } else if (!patients.value.fetchFromBitrix) {
                Object.assign(demographics, form)
            }

            //responsiblePerson.value && responsiblePerson.value.self ? disableResponsiblePerson.value = true : disableResponsiblePerson.value = false
            //emergencyContact.value && emergencyContact.value.sameAsPrimary ? disableEmergencyContact.value = true : disableEmergencyContact.value = false

            if (emergencyContact.value ) {
                emergencyContactShow.value= false
               
                //Object.assign(emergencyContactForm, emergencyContact.value)
                //emergencyContactForm.sameAsPrimary = false
            }
            if (responsiblePerson.value) {
                Object.assign(responsiblePersonForm, responsiblePerson.value)
                responsiblePersonForm.self = false
            }

            if (patients.value.patientDetails) {
                
                
                Object.assign(demographics, patients.value.patientDetails)
            }
            if (patients.value.patientReferralSource != null ) {
                 
                referalFormShow.value = false
               // Object.assign(referal, patients.value.patientReferralSource)
            }
            if (patients.value.patientInsurance != null) {
                Object.assign(insuranceData, patients.value.patientInsurance)
            }
            // }
        })

        const parameters = reactive([]);

        const demographic = (counteValue=null) => {
            if (props.isEdit && (patients.value.addDemographic != null || patients.value.patientDetails != null)) {
                store.dispatch("updateDemographic", {
                    data: {
                        "demographics": demographics,
                        "referal": referal,
                        "responsiblePerson": responsiblePersonForm,
                        "emergencyContactForm": emergencyContactForm
                    },
                    referalId: patientReferralSource.value ? patientReferralSource.value.id : null,
                    responsiblePersonId: responsiblePerson.value ? responsiblePerson.value.id : null,
                    emergencyContactId: emergencyContact.value ? emergencyContact.value.id : null,
                    patientUdid: patients.value.addDemographic ? patients.value.addDemographic.id : patients.value.patientDetails.id,
                }).then(() => {
                    if (route.name == 'PatientSummary') {
                        store.dispatch('patientDetails', route.params.udid)
                        store.dispatch('responsiblePerson', route.params.udid)
                        store.dispatch('emergencyContact', route.params.udid)
                        isValueChanged.value = false;
                    }
                })
            } else {
                store.dispatch("addDemographic", {
                    "demographics": demographics,
                    "referal": referal,
                    "responsiblePerson": responsiblePersonForm,
                    "emergencyContactForm": emergencyContactForm
                }).then(() => {
                    if(counteValue){
                         store.state.patients.counter = counteValue
                    }
                    
                    if (route.name == 'PatientSummary') {
                        store.dispatch('patientDetails', route.params.udid)
                        store.dispatch('responsiblePerson', route.params.udid)
                        store.dispatch('emergencyContact', route.params.udid)
                        isValueChanged.value = false;
                    }
                })
            }
        }

        const condition = () => {
            const patientId = patients.value.patientDetails ? patients.value.patientDetails.id : idPatient.value
            store.dispatch("addCondition", {
                data: conditions,
                id: patientId,

            }).then(() => {
                isValueChanged.value = false;
            })
            store.dispatch('checkForErrors')
            const checkForErrors = computed(() => {
                return store.state.patients.checkForErrors
            })
            console.log('checkForErrors 222', checkForErrors)
            /* if (patients.value.patientDetails) {
                store.dispatch("updateCondition", {
                    data: conditions,
                    id: patients.value.patientDetails.id,

                }).then(() => {
                    isValueChanged.value = false;
                    // store.commit('errorMsg',null)
                })
            } else {
                store.dispatch("addCondition", {
                    data: conditions,
                    id: idPatient.value,

                }).then(() => {
                    isValueChanged.value = false;
                    // store.commit('errorMsg',null)
                })
            } */
        }

        const parameter = () => {
            store.dispatch("parameter", {
                vital: parameters,
                id: patients.value.addDemographic.id,
            }).then(() => {
                isValueChanged.value = false;
            })
        };

        const insuranceForm = () => {
            if (idPatient.value != null) {
                store.dispatch("addInsurance", {
                    data: {
                        insurance: [insuranceData],
                    },
                    id: idPatient.value,
                }).then(() => {
                    isValueChanged.value = false;
                })
            } else {
                store.dispatch("addInsurance", {
                    data: {
                        insurance: [insuranceData],
                    },
                    id: patients.value.addDemographic.id,
                }).then(() => {
                    isValueChanged.value = false;
                })
            }
        };

        const next = () => {
            store.commit("counterPlus");
        };
        const prev = () => {
            store.commit("counterMinus");
            customScrollTop.value.scrollIntoView({
                behavior: 'smooth'
            });
        };

        const demographicsFailed = (e) => {
            console.log('demographicsFailed', e)
        };

        const conditionsFailed = () => {

        };

        const insuranceDataFailed = () => {

        };

        const err = computed(() => {
            return store.state.patients.errorMessage;
        });
        const errorMessage = err.value

        function parameterFields(id) {
            store.dispatch("parameterFields", id);
        }

        const fields = computed(() => {
            return store.state.patients.parameterFields;
        });

        function saveModal() {
            emit("saveModal", false);
            store.commit("resetCounter");
            successSwal(messages.formSuccess);
            Object.assign(responsiblePersonForm, responsiblePersonReactiveForm)
            Object.assign(referal, referalForm)
            Object.assign(emergencyContactForm, emergencyForm)

            store.dispatch("patients");
            store.commit("resetCounter");
            emit("closeModal");
            current.value = 0
            Object.assign(demographics, form);
        }

        const bitrixFormCheck = computed(() => {
            return store.state.patients.bitrixFormCheck
        })

        function closeModal() {
            //current.value = 0
            if (isValueChanged.value || bitrixFormCheck.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        store.commit('bitrixFormCheck', false)
                        emit("saveModal", false);
                        emit("closeModal", {
                            modal: 'editPatient',
                            value: false
                        });
                       
                        Object.assign(responsiblePersonForm, responsiblePersonReactiveForm)
                        Object.assign(referal, referalForm)
                        Object.assign(emergencyContactForm, emergencyForm)

                        store.dispatch("patients");
                        store.commit("resetCounter");
                        store.state.patients.addDemographic = ''
                        store.state.patients.patientDetails = ''
                        store.state.patients.fetchFromBitrix = ''
                        store.state.patients.uploadFile = ''
                        isValueChanged.value = false
                        Object.assign(demographics, form);
                        //saveModal()
                    } else {
                        emit("saveModal", true);
                        emit("closeModal", {
                            modal: 'editPatient',
                            value: true
                        });
                    }
                })
            } else {
                
                store.commit("resetCounter");
                formRef.value.resetFields()
            }

        }

        function emailChange() {
            errorMsg.value.email ? errorMsg.value.email[0] = null : ''
        }

        function stepperClick(value) {
            console.log('stepper', value)
        }

        onUnmounted(() => {
            store.commit('errorMsg', null)
            store.commit('referralErrorMsg', null)
            store.commit('physicianErrorMsg', null)
        })

        function clearValidtion() {
            formRef.value.resetFields()
            Object.assign(demographics, patients.value.fetchFromBitrix);
        }

        const onKeyUp = (value) => {
            switch (value) {
                case 'referralName':
                    referralErrorMsg.value.referralName = ''
                    break;
                case 'referralDesignation':
                    referralErrorMsg.value.referralDesignation = ''
                    break;
                case 'referralEmail':
                    referralErrorMsg.value.referralEmail = ''
                    break;
                case 'name':
                    physicianErrorMsg.value.name = ''
                    break;
                case 'designation':
                    physicianErrorMsg.value.designation = ''
                    break;
                case 'email':
                    physicianErrorMsg.value.email = ''
                    break;
                default:
                    break;
            }
        }

        function scrollToTop(event) {
            console.log('scroll', event);
            customScrollTop.value.scrollIntoView({
                behavior: 'smooth'
            });
            console.log('customScrollTop', customScrollTop.value);
        }

        const handleStaffChange = (val) => {
            conditions.staff = val;
        };

        function checkChangeInput() {
            store.commit('checkChangeInput', true)
        }

        function changeResponsible(e) {
            isValueChanged.value = true
            disableEmergencyContact.value = true
            if (e.target.checked) {
                store.commit('isEditPatient', true)

                Object.assign(emergencyContactForm, demographics)
                emergencyContactForm.emergencyEmail = demographics.email
                emergencyContactForm.sameAsPrimary = true
            } else {

                Object.assign(emergencyContactForm, emergencyForm)
                emergencyContactForm.sameAsPrimary = false
                disableEmergencyContact.value = false
            }

        }

        function changeSelf(event) {
            const relationId = ref('');
            (globalCode.value.relation).some(relation => {
                if (relation.name === 'Self') {
                    relationId.value = relation.id
                }
            });

            if (event.target.checked) {
                Object.assign(responsiblePersonForm, demographics)
                responsiblePersonForm.self = true
                disableResponsiblePerson.value = true
                responsiblePersonForm.relation = 258
            } else {
                Object.assign(responsiblePersonForm, responsiblePersonReactiveForm)
                responsiblePersonForm.self = false
                disableResponsiblePerson.value = false
            }

            store.commit('isEditPatient', true)
            isValueChanged.value = true

        }

        return {
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
            referralData:store.getters.referralList
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
</style>

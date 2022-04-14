<template>
<a-modal max-width="1140px" width="100%"  :title="title" centered :footer="null"  :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <div class="common-btn mb-24" ref="customScrollTop">
          <a-button type="primary" @click="showSearchPatient">
            Bitrix Lookup
         </a-button>
        </div>
        <a-col :span="24" >
            <a-steps v-model:current="current" @change="scrollToTop($event)" >
                <a-step v-for="item in steps" :key="item.title" :title="item.title" ><span :id="item"></span></a-step>
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Demographics'">
                <!-- <Demographics /> -->
                <a-form :model="demographics" name="basic"  ref="formRef" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" scrollToFirstError=true autocomplete="off" layout="vertical" @finish="demographic" @finishFailed="demographicsFailed">
                    <Loader />
                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')"  name="firstName" :rules="[{ required: true, message: $t('global.firstName')+' '+$t('global.validation')}]">
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
                                    <a-date-picker @change="changedValue" v-model:value="demographics.dob" :disabledDate="d => !d || d.isAfter(moment())" format="DD, MMM YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.dob?errorMsg.dob[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="demographics.email" placeholder="test@test.com" size="large" @input="emailChange()"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber}]">
                                    <!-- <vue-tel-input  @change="changedValue" v-model.trim:value="demographics.phoneNumber" v-bind="bindProps" /> -->
                                    <!-- <PhoneNumber @change="changedValue" v-model.trim:value="demographics.phoneNumber" @setPhoneNumber="setPhoneNumberDemographics"/> -->
                                    <a-input-number @change="changedValue" v-model:value.trim="demographics.phoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.gender" :globalCode="globalCode.gender"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.gender?errorMsg.gender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.language')" name="language" :rules="[{ required: false, message: $t('patient.demographics.language')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.language" :globalCode="globalCode.language"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.language?errorMsg.language[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.otherLanguage')" name="otherLanguage" :rules="[{ required: false, message: $t('patient.demographics.otherLanguage')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.otherLanguage" mode="multiple" :globalCode="globalCode.language"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.otherLanguage?errorMsg.otherLanguage[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.weight')" name="weight" :rules="[{ required: false, message: $t('patient.demographics.weight')+' '+$t('global.validation'), pattern: regex.digitWithdecimal }]">
                                    <a-input-number @change="changedValue" style="width: 100%" v-model:value="demographics.weight" placeholder="Please enter weight in lbs" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.height')" name="height" :rules="[{ required: false, message: $t('patient.demographics.height')+' '+$t('global.validation'), pattern: regex.digitWithdecimal }]">
                                    <a-input-number @change="changedValue" style="width: 100%" v-model:value="demographics.height" placeholder="Please enter height in cm " size="large" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactType?errorMsg.contactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactTime?errorMsg.contactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.country')" name="country" :rules="[{ required: false, message: $t('global.country')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.country" :globalCode="globalCode.country"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.country?errorMsg.country[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.state')" name="state" :rules="[{ required: false, message: $t('global.state')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.state" :globalCode="globalCode.state"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.state?errorMsg.state[0]:''" />
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
                                <a-form-item :label="$t('global.zipcode')" name="zipCode" :rules="[{ required: false, message:$t('global.validValidation')+' '+ $t('global.zipcode').toLowerCase(),pattern: regex.zipCode }]">
                                    <a-input-number @change="changedValue" style="width:100%" v-model:value="demographics.zipCode" placeholder="Please enter 5 digit number" size="large" maxlength="5" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.zipCode?errorMsg.zipCode[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.suiteorApartment')" name="appartment" :rules="[{ required: false, message: $t('patient.demographics.suiteorApartment')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="demographics.appartment" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.appartment?errorMsg.appartment[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :span="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.address')" name="address" :rules="[{ required: false, message: $t('global.address')+' '+$t('global.validation') }]">
                                    <a-textarea size="large" @change="changedValue" v-model:value="demographics.address" allow-clear />
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
                                <a-form-item :label="$t('patient.demographics.fullName')" name="fullName" :rules="[{ required: false, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="demographics.fullName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.fullName?errorMsg.fullName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="familyEmail" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="demographics.familyEmail" placeholder="test@test.com" size="large" @input="emailChange()"/>
                                    <ErrorMessage v-if="errorMsg && !demographics.familyEmail" :name="errorMsg.familyEmail?errorMsg.familyEmail[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber}]">
                                     <!-- <vue-tel-input  @change="changedValue" v-model.trim:value="demographics.familyPhoneNumber" v-bind="bindProps" /> -->
                                     <!-- <PhoneNumber  @change="changedValue" v-model.trim:value="demographics.familyPhoneNumber" @setPhoneNumber="setPhoneNumberDemographicFamily"/> -->
                                    <a-input-number @change="changedValue" v-model:value.trim="demographics.familyPhoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyPhoneNumber?errorMsg.familyPhoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.familyContactType" mode="multiple" :globalCode="globalCode.pmOfcontact"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactType?errorMsg.familyContactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.familyContactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactTime?errorMsg.familyContactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="familyGender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.familyGender" :globalCode="globalCode.gender"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyGender?errorMsg.familyGender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.relation')" name="relation" :rules="[{ required: false, message: $t('global.relation')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.relation" :globalCode="globalCode.relation"/>
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
                    <a-row>
                        <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                            <a-checkbox @change="changedValue" v-model:checked="demographics.sameAsPrimary">
                                {{$t('patient.demographics.sameAsPrimaryFamilyMemberInfo')}}
                            </a-checkbox>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" v-if="demographics.sameAsPrimary">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.fullName')" name="fullName" :rules="[{ required: false, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="demographics.fullName" size="large" disabled />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.fullName?errorMsg.fullName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="familyEmail" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="demographics.familyEmail" placeholder="test@test.com" size="large" disabled  />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyEmail?errorMsg.familyEmail[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber }]">
                                     <!-- <vue-tel-input  @change="changedValue" v-model.trim:value="demographics.familyPhoneNumber" v-bind="bindProps" disabled/> -->
                                    <!-- <PhoneNumber  @change="changedValue" v-model.trim:value="demographics.familyPhoneNumber" @setPhoneNumber="setPhoneNumberDemographicFamily" disabled/> -->
                                    <a-input-number  @change="changedValue" size="large" v-model:value="demographics.familyPhoneNumber"  style="width: 100%" disabled/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyPhoneNumber?errorMsg.familyPhoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.familyContactType" mode="multiple" :globalCode="globalCode.pmOfcontact" disabled/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactType?errorMsg.familyContactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.familyContactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact" disabled/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactTime?errorMsg.familyContactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="familyGender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.familyGender"  :globalCode="globalCode.gender" disabled/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyGender?errorMsg.familyGender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" v-else>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.fullName')" name="emergencyFullName" :rules="[{ required: false, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="demographics.emergencyFullName" size="large" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyFullName?errorMsg.emergencyFullName[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.emailAddress')" name="emergencyEmail" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.emailAddress').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="demographics.emergencyEmail" placeholder="test@test.com" size="large" @input="emailChange()" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg && !demographics.emergencyEmail" :name="errorMsg.emergencyEmail?errorMsg.emergencyEmail[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="emergencyPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern:regex.phoneNumber }]">
                                    <!-- <vue-tel-input  @change="changedValue" v-model.trim:value="demographics.emergencyPhoneNumber" v-bind="bindProps" /> -->
                                    <!-- <PhoneNumber  @change="changedValue" v-model.trim:value="demographics.emergencyPhoneNumber" @setPhoneNumber="setPhoneNumberEmergencyPhoneNumber" /> -->
                                    <a-input-number @change="changedValue" v-model:value.trim="demographics.emergencyPhoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%"/>
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyPhoneNumber?errorMsg.emergencyPhoneNumber[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="emergencyContactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.emergencyContactType" mode="multiple" :globalCode="globalCode.pmOfcontact"/>
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyContactType?errorMsg.emergencyContactType[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="emergencyContactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.emergencyContactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact"/>
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyContactTime?errorMsg.emergencyContactTime[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="emergencyGender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                        <GlobalCodeDropDown @change="changedValue" v-model:value="demographics.emergencyGender"  :globalCode="globalCode.gender"/>
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyGender?errorMsg.emergencyGender[0]:''" />
                            </div>
                        </a-col>
                    </a-row>
                     <PatientSearch v-model:visible="patientSearch" @closeSearchPatient="closeSearchPatient($event)" @clearValidtion="clearValidtion"/>
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" @click="scrollToTop(current)" html-type="submit">{{$t('global.next')}}</a-button>
                        <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                            {{$t('global.done')}}
                        </a-button>
                    </div>
                </a-form>
                <!--  -->
            </div>
            <div  class="steps-content" v-if="steps[current].title == 'Conditions'" >
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
												<a-form-item :label="$t('global.name')" name="referralName" :rules="[{ required: false, message: $t('global.name')+' '+$t('global.validation') }]">
													<a-input @change="changedValue" @keyup="onKeyUp('referralName')" v-model:value="conditions.referralName" size="large" />
													<ErrorMessage v-if="referralErrorMsg" :name="referralErrorMsg.referralName?referralErrorMsg.referralName[0]:''" />
												</a-form-item>
											</div>
										</a-col>
										<a-col :md="8" :sm="12" :xs="24">
											<div class="form-group">
												<a-form-item :label="$t('global.designation')" name="referralDesignation" :rules="[{ required: false, message: $t('global.designation')+' '+$t('global.validation') }]">
													<GlobalCodeDropDown @change="changedValue" @keyup="onKeyUp('referralDesignation')" v-model:value="conditions.referralDesignation"  :globalCode="globalCode.designations"/>
													<ErrorMessage v-if="referralErrorMsg" :name="referralErrorMsg.referralDesignation?referralErrorMsg.referralDesignation[0]:''" />
												</a-form-item>
											</div>
										</a-col>
										<a-col :md="8" :sm="12" :xs="24">
											<div class="form-group">
												<a-form-item :label="$t('global.email')" name="referralEmail" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
													<a-input @change="changedValue" @keyup="onKeyUp('referralEmail')" v-model:value="conditions.referralEmail" placeholder="test@test.com" size="large" @input="emailChange()" />
													<ErrorMessage v-if="referralErrorMsg" :name="referralErrorMsg.referralEmail?referralErrorMsg.referralEmail[0]:''" />
												</a-form-item>
											</div>
										</a-col>
										<a-col :md="8" :sm="12" :xs="24">
											<div class="form-group">
												<a-form-item :label="$t('global.phoneNo')" name="referralPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase() }]">
													<a-input-number @change="changedValue" v-model:value.trim="conditions.referralPhoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%"/>
													<ErrorMessage v-if="referralErrorMsg" :name="referralErrorMsg.referralPhoneNumber?referralErrorMsg.referralPhoneNumber[0]:''" />
												</a-form-item>
											</div>
										</a-col>
										<a-col :md="8" :sm="12" :xs="24">
											<div class="form-group">
												<a-form-item :label="$t('patient.conditions.fax')" name="referralFax" :rules="[{ required: false, message: $t('patient.conditions.fax')+' '+$t('global.validation') }]">
													<a-input @change="changedValue" v-model:value="conditions.referralFax" size="large" />
													<ErrorMessage v-if="referralErrorMsg" :name="referralErrorMsg.referralFax?referralErrorMsg.referralFax[0]:''" />
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
										<a-col :sm="24" :xs="24">
											<a-form-item :label="$t('global.careCoodinator')" name="staff" :rules="[{ required: false, message: $t('global.careCoodinator')+' '+$t('global.validation') }]">
												<StaffDropDown v-model:value="conditions.staff" @handleStaffChange="handleStaffChange($event)" @change="checkChangeInput()" :close="closeValue" />
											</a-form-item>
										</a-col>
									</a-row>

									<div class="steps-action">
										<a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
										<a-button v-if="current < steps.length - 1"  type="primary" @click="scrollToTop(current)" html-type="submit">{{$t('global.next')}}</a-button>
										<a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
											{{$t('global.done')}}
										</a-button>
									</div>
									
								</a-form>
                <Loader />
                <!--  -->
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Programs'">
                <Programs :idPatient="idPatient" @onChange="changedValue" />

                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next();scrollToTop(current)">{{$t('global.next')}}</a-button>
                </div>
                <!-- end  -->
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Devices'">
                <Devices :idPatient="idPatient" @onChange="changedValue" />
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next();scrollToTop(current)">{{$t('global.next')}}</a-button>
                </div>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Clinical Data'">
                <ClinicalData :idPatient="idPatient" @onChange="changedValue" />

                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next();scrollToTop(current)">{{$t('global.next')}}</a-button>
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
                                    <GlobalCodeDropDown @change="changedValue" v-model:value="insuranceData.insuranceName[i]"  :globalCode="globalCode.insuranceName"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.insuranceName?errorMsg.insuranceName[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="8" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.insurance.expirationDate')" name="expirationDate" :rules="i==0?[{ required: true, message: $t('patient.insurance.expirationDate')+' '+$t('global.validation') }]:''">
                                    <a-date-picker @change="changedValue" v-model:value="insuranceData.expirationDate[i]" format="DD, MMM YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.expirationDate?errorMsg.expirationDate[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" @click="scrollToTop(current)" html-type="submit">{{$t('global.next')}}</a-button>
                    </div>
                </a-form>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Documents'">
                <Documents entity="patient" :idPatient="idPatient" @onChange="changedValue" />

                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" @click="scrollToTop(current)" type="primary">{{$t('global.next')}}</a-button>
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
import Programs from "@/components/modals/forms/Programs";
import Devices from "@/components/modals/forms/Devices";
import ClinicalData from "@/components/modals/forms/ClinicalData";
import Documents from "@/components/modals/forms/Documents";
import { useStore } from "vuex";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import { regex } from "@/RegularExpressions/regex";
import Loader from "@/components/loader/Loader";
import {successSwal,warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
import { useRoute } from 'vue-router';
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import StaffDropDown from "@/components/modals/search/StaffDropdownSearch.vue"
import moment from "moment"
// import PhoneNumber from "@/components/modals/forms/fields/PhoneNumber"
export default defineComponent( {
  components: {
    // PhoneNumber,
    StaffDropDown,
    GlobalCodeDropDown,
    Programs,
    Devices,
    ClinicalData,
    Documents,
    ErrorMessage,
    Loader,
    PatientSearch: defineAsyncComponent(() => import("../modals/search/PatientModal")),
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const isValueChanged = ref(false);
    const formRef =ref()
    const patientSearch =ref(false)
    const customScrollTop =ref()
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
				title: "Conditions",
				key: "conditions",
				content: "Second-content",
			},
			{
				title: "Programs",
				key: "programs",
				content: "Second-content",
			},
			{
				title: "Devices",
				key: "devices",
				content: "Second-content",
			},
			
			{
				title: "Clinical Data",
				key: "clinicalData",
				content: "Second-content",
			},
			{
				title: "Insurance",
				key: "insurance",
				content: "Second-content",
			},
			{
				title: "Documents",
				key: "documents",
				content: "Last-content",
			},
		]
    
    const current= computed({
      get: () =>
        store.state.patients.counter,
      set: (value) => {
        store.state.patients.counter = value;
      },
    })

    const changedValue = (value) => {
			store.commit('isEditPatient', false)
			isValueChanged.value = value
    }
    const showSearchPatient = ()=>{
        patientSearch.value =true
    }
    const closeSearchPatient = (value)=>{
       patientSearch.value =value 
    }
    const globalCode = computed(() => {
      return store.state.common;
    });
    const idPatient = route.name == "PatientSummary" ? route.params.udid : null;

    const patients = computed(() => {
      return store.state.patients;
    });
    const isEditPatient = computed(() => {
      return store.state.patients.isEditPatient
    })
    const patientDetail = patients.value.patientDetails;
    const title = isEditPatient.value == true ? 'Edit Patient' : 'Add New Patient'
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
      fullName: "",
      familyEmail: "",
      familyPhoneNumber: "",
      familyContactType: [],
      familyContactTime: [],
      familyGender: "",
      relation: "",
      emergencyFullName: "",
      emergencyEmail: "",
      emergencyPhoneNumber: "",
      emergencyContactType: [],
      emergencyContactTime: [],
      emergencyGender: "",
      sameAsPrimary: false,
      isPrimary: true,
      familyMemberId: '',
      emergencyId: '',
    });

    const conditions = reactive({
      condition: [],
      referralName: "",
      referralDesignation: "",
      referralEmail: "",
      referralPhoneNumber: "",
      referralFax: "",
      staff: "",
      isPrimary: 1,
      /* sameAsAbove: false,
      name: "",
      designation: "",
      email: "",
      phoneNumber: "",
      fax: "", */
    });

    const insuranceData = reactive({
      insuranceNumber: [],
      insuranceName: [],
      expirationDate: [],
      insuranceType: [],
    });

    const setPhoneNumberDemographics = (value) => {
      demographics.phoneNumber = value;
    };
    const setPhoneNumberDemographicFamily = (value) => {
      demographics.familyPhoneNumber = value;
    };
    const setPhoneNumberEmergencyPhoneNumber = (value) => {
      demographics.emergencyPhoneNumber = value;
    };

     const form = reactive({ ...demographics, });

    onMounted(() => {
			Object.assign(demographics, form)
    })

		watchEffect(() => {
			// Bitrix data assign 
			if(patients.value.fetchFromBitrix) { 
				Object.assign(demographics, patients.value.fetchFromBitrix);
			}
			else if(!patients.value.fetchFromBitrix) {
				Object.assign(demographics, form)
			}
			
			if(idPatient) {
				Object.assign(demographics, patients.value.patientDetails);
				if(patients.value.patientPrimaryPhysician != null) {
					Object.assign(conditions, patients.value.patientPrimaryPhysician)
				}
				if(isEditPatient.value && patients.value.patientConditions != null) {
					Object.assign(conditions.condition, patients.value.patientConditions)
				}
				if(patients.value.patientReferralSource != null) {
					Object.assign(conditions, patients.value.patientReferralSource)
				}
				if(patients.value.patientInsurance != null) {
					Object.assign(insuranceData, patients.value.patientInsurance)
				}
			}
    })

    const parameters = reactive([]);

    const demographic = () => {
        const demographicsData = {
					firstName: demographics.firstName ? demographics.firstName : "",
					middleName: demographics.middleName ? demographics.middleName : "",
					lastName: demographics.lastName ? demographics.lastName : "",
					dob: demographics.dob ? demographics.dob : "",
					gender: demographics.gender ? demographics.gender : "",
					language: demographics.language ? demographics.language : "",
					otherLanguage: demographics.otherLanguage ? demographics.otherLanguage : "",
					nickName: demographics.nickName ? demographics.nickName : "",
					weight: demographics.weight ? demographics.weight : "",
					height: demographics.height ? demographics.height : "",
					email: demographics.email ? demographics.email : "",
					phoneNumber: demographics.phoneNumber ? demographics.phoneNumber : "",
					contactType: demographics.contactType ? demographics.contactType : "",
					contactTime: demographics.contactTime ? demographics.contactTime : "",
					medicalRecordNumber: demographics.medicalRecordNumber ? demographics.medicalRecordNumber : "",
					country: demographics.country ? demographics.country : "",
					state: demographics.state ? demographics.state : "",
					city: demographics.city ? demographics.city : "",
					zipCode: demographics.zipCode ? demographics.zipCode : "",
					appartment: demographics.appartment ? demographics.appartment : "",
					address: demographics.address ? demographics.address : "",
					fullName: demographics.fullName ? demographics.fullName : "",
					familyEmail: demographics.familyEmail ? demographics.familyEmail : "",
					familyPhoneNumber: demographics.familyPhoneNumber ? demographics.familyPhoneNumber : "",
					familyContactType: demographics.familyContactType ? demographics.familyContactType : "",
					familyContactTime: demographics.familyContactTime ? demographics.familyContactTime : "",
					familyGender: demographics.familyGender ? demographics.familyGender : "",
					relation: demographics.relation ? demographics.relation : "",
					emergencyFullName: demographics.emergencyFullName ? demographics.emergencyFullName : "",
					emergencyEmail: demographics.emergencyEmail ? demographics.emergencyEmail : "",
					emergencyPhoneNumber: demographics.emergencyPhoneNumber ? demographics.emergencyPhoneNumber : "",
					emergencyContactType: demographics.emergencyContactType ? demographics.emergencyContactType : "",
					emergencyContactTime: demographics.emergencyContactTime ? demographics.emergencyContactTime : "",
					emergencyGender: demographics.emergencyGender ? demographics.emergencyGender : "",
					sameAsPrimary: demographics.sameAsPrimary ? demographics.sameAsPrimary : "",
					isPrimary: demographics.isPrimary ? demographics.isPrimary : "",
					familyMemberId: "",
					emergencyId: "",
        }
				
			if(idPatient != null) {
					if(patients.value.addDemographic == null) {
							if(demographicsData.sameAsPrimary == false) {
									(demographicsData.emergencyId = patients.value.patientDetails.emergencyContact.data ? patients.value.patientDetails.emergencyContact.data.id : ''),
									(demographicsData.familyMemberId = patients.value.patientDetails.patientFamilyMember.data ? patients.value.patientDetails.patientFamilyMember.data.id : ''),
									store.dispatch("updateDemographic", {
											data: demographicsData,
											id: idPatient,
									}).then(() => {
											if(route.name == 'PatientSummary') {
													store.dispatch('patientDetails', route.params.udid)
													isValueChanged.value = false;
											}
									})
							}
							else if(demographicsData.sameAsPrimary == true) {
									(demographicsData.emergencyFullName = demographicsData.fullName),
									(demographicsData.emergencyEmail = demographicsData.familyEmail),
									(demographicsData.emergencyPhoneNumber = demographicsData.familyPhoneNumber),
									(demographicsData.emergencyContactType = demographicsData.familyContactType),
									(demographicsData.emergencyContactTime = demographicsData.familyContactTime),
									(demographicsData.emergencyGender = demographicsData.familyGender),
									(demographicsData.emergencyId = patients.value.patientDetails.emergencyContact.data ? patients.value.patientDetails.emergencyContact.data.id : ''),
									(demographicsData.familyMemberId = patients.value.patientDetails.patientFamilyMember.data ? patients.value.patientDetails.patientFamilyMember.data.id : ''),
									store.dispatch("updateDemographic", {
											data: demographicsData,
											id: idPatient,
									}).then(() => {
											if(route.name == 'PatientSummary') {
													store.dispatch('patientDetails', route.params.udid)
													isValueChanged.value = false;
											}
									})
							}
					}
					else if(patients.value.addDemographic != null && patients.value.addDemographic.id) {
							if(demographicsData.sameAsPrimary == false) {
									(demographicsData.emergencyId = patients.value.addDemographic.emergencyContact.data ? patients.value.addDemographic.emergencyContact.data.id : ''),
									(demographicsData.familyMemberId = patients.value.addDemographic.patientFamilyMember.data ? patients.value.addDemographic.patientFamilyMember.data.id : ''),
									store.dispatch("updateDemographic", {
											data: demographicsData,
											id: patients.value.addDemographic.id ? patients.value.addDemographic.id : idPatient,
									}).then(() => {
											if(route.name == 'PatientSummary') {
													store.dispatch('patientDetails', route.params.udid)
													isValueChanged.value = false;
											}
									})
							}
							else if(demographicsData.sameAsPrimary == true) {
									(demographicsData.emergencyFullName = demographicsData.fullName),
									(demographicsData.emergencyEmail = demographicsData.familyEmail),
									(demographicsData.emergencyPhoneNumber = demographicsData.familyPhoneNumber),
									(demographicsData.emergencyContactType = demographicsData.familyContactType),
									(demographicsData.emergencyContactTime = demographicsData.familyContactTime),
									(demographicsData.emergencyGender = demographicsData.familyGender),
									(demographicsData.emergencyId = patients.value.addDemographic.emergencyContact.data ? patients.value.addDemographic.emergencyContact.data.id : ''),
									(demographicsData.familyMemberId = patients.value.addDemographic.patientFamilyMember.data ? patients.value.addDemographic.patientFamilyMember.data.id : ''),
									store.dispatch("updateDemographic", {
											data: demographicsData,
											id: patients.value.addDemographic.id ? patients.value.addDemographic.id : idPatient,
									}).then(() => {
											if(route.name == 'PatientSummary') {
													store.dispatch('patientDetails', route.params.udid)
													isValueChanged.value = false;
											}
									})
							}
					}
			}
			else {
					if(patients.value.addDemographic == null) {
							if(demographicsData.sameAsPrimary == false) {
									store.dispatch("addDemographic", demographicsData).then(() => {
											if(route.name == 'PatientSummary') {
													store.dispatch('patientDetails', route.params.udid)
													isValueChanged.value = false;
											}
									})
							}
							else if(demographicsData.sameAsPrimary == true) {
									(demographicsData.emergencyFullName = demographicsData.fullName),
									(demographicsData.emergencyEmail = demographicsData.familyEmail),
									(demographicsData.emergencyPhoneNumber = demographicsData.familyPhoneNumber),
									(demographicsData.emergencyContactType = demographicsData.familyContactType),
									(demographicsData.emergencyContactTime = demographicsData.familyContactTime),
									(demographicsData.emergencyGender = demographicsData.familyGender),
									store.dispatch("addDemographic", demographicsData).then(() => {
											if(route.name == 'PatientSummary') {
													store.dispatch('patientDetails', route.params.udid)
													isValueChanged.value = false;
											}
									})
							}
					}
					else if(patients.value.addDemographic != null && patients.value.addDemographic.id) {
							if(demographicsData.sameAsPrimary == false) {
									(demographicsData.emergencyId = patients.value.addDemographic.emergencyContact.data ? patients.value.addDemographic.emergencyContact.data.id : ''),
									(demographicsData.familyMemberId = patients.value.addDemographic.patientFamilyMember.data ? patients.value.addDemographic.patientFamilyMember.data.id : ''),
									store.dispatch("updateDemographic", {
											data: demographicsData,
											id: patients.value.addDemographic.id,
									}).then(() => {
											if(route.name == 'PatientSummary') {
													store.dispatch('patientDetails', route.params.udid)
													isValueChanged.value = false;
											}
									})
							}
							else if(demographicsData.sameAsPrimary == true) {
									(demographicsData.emergencyFullName = demographicsData.fullName),
									(demographicsData.emergencyEmail = demographicsData.familyEmail),
									(demographicsData.emergencyPhoneNumber = demographicsData.familyPhoneNumber),
									(demographicsData.emergencyContactType = demographicsData.familyContactType),
									(demographicsData.emergencyContactTime = demographicsData.familyContactTime),
									(demographicsData.emergencyGender = demographicsData.familyGender),
									(demographicsData.emergencyId = patients.value.addDemographic.emergencyContact.data ? patients.value.addDemographic.emergencyContact.data.id : ''),
									(demographicsData.familyMemberId = patients.value.addDemographic.patientFamilyMember.data ? patients.value.addDemographic.patientFamilyMember.data.id : ''),
									store.dispatch("updateDemographic", {
											data: demographicsData,
											id: patients.value.addDemographic.id,
									}).then(() => {
											if(route.name == 'PatientSummary') {
													store.dispatch('patientDetails', route.params.udid)
													isValueChanged.value = false;
											}
									})
							}
					}
			}
    };

		const condition = () => {
			if(idPatient != null) {
				if(patients.value.addCondition == null && patients.value.addPatientReferals == null && patients.value.addPatientPhysician == null) {
					if((patients.value.patientReferralSource && patients.value.patientReferralSource != null)
					&& (patients.value.patientPrimaryPhysician && patients.value.patientPrimaryPhysician != null)) {
						store.dispatch("updateCondition", {
							data: conditions,
							id: idPatient,
							referalId: patients.value.patientReferralSource.id ? patients.value.patientReferralSource.id : null,
							primaryPhysicianId: patients.value.patientPrimaryPhysician.id ? patients.value.patientPrimaryPhysician.id : null,
						}).then(() => {
							isValueChanged.value = false;
							// store.commit('errorMsg',null)
						})
					}
					else if((!patients.value.patientReferralSource && patients.value.patientReferralSource == null)
					&& (patients.value.patientPrimaryPhysician && patients.value.patientPrimaryPhysician != null)) {
						store.dispatch("updateCondition", {
							data: conditions,
							id: idPatient,
							referalId: null,
							primaryPhysicianId: patients.value.patientPrimaryPhysician.id ? patients.value.patientPrimaryPhysician.id : null,
						}).then(() => {
							isValueChanged.value = false;
							// store.commit('errorMsg',null)
						})
					}
					else if((patients.value.patientReferralSource && patients.value.patientReferralSource != null)
					&& (!patients.value.patientPrimaryPhysician && patients.value.patientPrimaryPhysician == null)) {
						store.dispatch("updateCondition", {
							data: conditions,
							id: idPatient,
							referalId: patients.value.patientReferralSource.id ? patients.value.patientReferralSource.id : null,
							primaryPhysicianId: null,
						}).then(() => {
							isValueChanged.value = false;
							// store.commit('errorMsg',null)
						})
					}
					else if((!patients.value.patientReferralSource || patients.value.patientReferralSource == null)
					|| (!patients.value.patientPrimaryPhysician || patients.value.patientPrimaryPhysician == null)) {
						store.dispatch("addCondition", {
							data: conditions,
							id: idPatient,
							referalId: null,
							primaryPhysicianId: null,
						}).then(() => {
							isValueChanged.value = false;
							// store.commit('errorMsg',null)
						})
					}
				}
				else if(patients.value.addCondition != null || patients.value.addPatientReferals != null || patients.value.addPatientPhysician != null) {
					if((patients.value.patientReferralSource && patients.value.patientReferralSource != null)
						&& patients.value.patientPrimaryPhysician && patients.value.patientPrimaryPhysician != null) {
						store.dispatch("updateCondition", {
							data: conditions,
							id: idPatient,
							referalId: patients.value.patientReferralSource.id ? patients.value.patientReferralSource.id : null,
							primaryPhysicianId: patients.value.patientPrimaryPhysician.id ? patients.value.patientPrimaryPhysician.id : null,
						}).then(() => {
							isValueChanged.value = false;
							// store.commit('errorMsg',null)
						})
					}
					else if((!patients.value.patientReferralSource && patients.value.patientReferralSource == null)
						&& patients.value.patientPrimaryPhysician && patients.value.patientPrimaryPhysician != null) {
						store.dispatch("updateCondition", {
							data: conditions,
							id: idPatient,
							referalId: patients.value.addPatientReferals ? patients.value.addPatientReferals.id : null,
              primaryPhysicianId: patients.value.patientPrimaryPhysician.id ? patients.value.patientPrimaryPhysician.id : null,
						}).then(() => {
							isValueChanged.value = false;
							// store.commit('errorMsg',null)
						})
					}
					else if((patients.value.patientReferralSource && patients.value.patientReferralSource != null)
						&& !patients.value.patientPrimaryPhysician && patients.value.patientPrimaryPhysician == null) {
						store.dispatch("updateCondition", {
							data: conditions,
							id: idPatient,
							referalId: patients.value.patientReferralSource.id ? patients.value.patientReferralSource.id : null,
              primaryPhysicianId: patients.value.addPatientPhysician ? patients.value.addPatientPhysician.id : null,
						}).then(() => {
							isValueChanged.value = false;
						})
					}
					else if((!patients.value.patientReferralSource && patients.value.patientReferralSource == null)
					|| (!patients.value.patientPrimaryPhysician && patients.value.patientPrimaryPhysician == null)) {
						store.dispatch("updateCondition", {
							data: conditions,
							id: idPatient,
							referalId: patients.value.addPatientReferals ? patients.value.addPatientReferals : null,
							primaryPhysicianId: patients.value.addPatientPhysician ? patients.value.addPatientPhysician.id : null,
						}).then(() => {
							isValueChanged.value = false;
						})
					}
				}
      }
			else {	// Add Patient
				if(patients.value.addCondition == null && patients.value.addPatientReferals == null && patients.value.addPatientPhysician == null) {
					store.dispatch("addCondition", {
						data: conditions,
						id: patients.value.addDemographic ? patients.value.addDemographic.id : null,
						referalId: null,
					}).then(() => {
						isValueChanged.value = false;
						// store.commit('errorMsg',null)
					})
				}
				else if(patients.value.addCondition != null || patients.value.addPatientReferals != null || patients.value.addPatientPhysician != null) {
					store.dispatch("addCondition", {
						data: conditions,
						id: patients.value.addDemographic ? patients.value.addDemographic.id : null,
						referalId: patients.value.addPatientReferals ? patients.value.addPatientReferals.id : null,
						primaryPhysicianId: patients.value.addPatientPhysician ? patients.value.addPatientPhysician.id : null,
					}).then(() => {
						isValueChanged.value = false;
					})
				}
			}

			store.dispatch('checkForErrors')
			const checkForErrors = computed(() => {
				return store.state.patients.checkForErrors
			})
			console.log('checkForErrors 222', checkForErrors)
		};

    const parameter = () => {
        store.dispatch("parameter", {
            vital: parameters,
            id: patients.value.addDemographic.id,
        }).then(() => {
            isValueChanged.value = false;
        })
    };

    const insuranceForm = () => {
        if(idPatient != null) {
            store.dispatch("addInsurance", {
                data: {
                insurance: [insuranceData],
                },
                id: idPatient,
            }).then(() => {
                isValueChanged.value = false;
            })
        }
        else {
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
      customScrollTop.value.scrollIntoView({behavior: 'smooth'});
    };

    const demographicsFailed = (e) => {
     console.log('demographicsFailed',e)
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
      successSwal(messages.formSuccess);
      Object.assign(demographics, form);
      store.dispatch("patients");
      store.commit("resetCounter");
      emit("closeModal");
			current.value = 0
    }

    const bitrixFormCheck = computed(()=>{
        return store.state.patients.bitrixFormCheck
    })

    function closeModal() {
			current.value = 0
        if(isValueChanged.value || bitrixFormCheck.value) {
            warningSwal(messages.modalWarning).then((response) => {
                if (response == true) {
                    store.commit('bitrixFormCheck',false)
                    emit("saveModal", false);
                    emit("closeModal", {
                        modal: 'editPatient',
                        value: false
                    });
                    Object.assign(demographics, form);
                    store.dispatch("patients");
                    store.commit("resetCounter");
                    store.state.patients.addDemographic = null
                    store.state.patients.fetchFromBitrix = null
										store.state.patients.uploadFile = null
                }
                else {
                    emit("saveModal", true);
                    emit("closeModal", {
                        modal: 'editPatient',
                        value: true
                    });
                }
            })
        }
        
    }

    function emailChange(){
        errorMsg.value.email?errorMsg.value.email[0]=null:''
    }

    function stepperClick(value){
        console.log('stepper',value)
    }

    onUnmounted(()=>{
      store.commit('errorMsg',null)
      store.commit('referralErrorMsg',null)
      store.commit('physicianErrorMsg',null)
    })

    function clearValidtion()  {
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

    function scrollToTop(event){
        console.log('scroll',event);
        customScrollTop.value.scrollIntoView({behavior: 'smooth'});
        console.log('customScrollTop',customScrollTop.value);
    }

    const handleStaffChange = (val) => {
      conditions.staff = val;
    };

    function checkChangeInput() {
      store.commit('checkChangeInput', true)
    }
    
    return {
		handleStaffChange,
		checkChangeInput,
		customScrollTop,
    setPhoneNumberEmergencyPhoneNumber,
    setPhoneNumberDemographicFamily,
    setPhoneNumberDemographics,
    scrollToTop,
    formRef,
    clearValidtion,
    changedValue,
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
      title,
      disabled,
      onKeyUp,
      bindProps: store.state.common.bindProps,
      moment,
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

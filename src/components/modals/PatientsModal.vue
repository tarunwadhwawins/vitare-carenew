<template>
<a-modal max-width="1140px" width="100%" :title="title" centered :footer="null"  :maskClosable="false" @cancel="closeModal()">
<!-- <a-modal max-width="1140px" width="100%" title="Add New Patients" centered :footer="null" :maskClosable="false"> -->
    <a-row :gutter="24">
        <div class="common-btn mb-24">
          <a-button type="primary" @click="showSearchPatient">
            Bitrix Lookup
         </a-button>
        </div>
        <a-col :span="24">
            <a-steps v-model:current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Demographics'">
                <!-- <Demographics /> -->
                <a-form :model="demographics" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" scrollToFirstError=true autocomplete="off" layout="vertical" @finish="demographic" @finishFailed="demographicsFailed">
                    <Loader />
                    <a-row :gutter="24">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: $t('global.firstName')+' '+$t('global.validation')  }]">
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
                                    <a-date-picker @change="changedValue" v-model:value="demographics.dob" format="MM/DD/YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
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
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber}]">
                                    <a-input-number v-model:value="demographics.phoneNumber" placeholder="Please enter 10 digit number" size="large"  style="width: 100%" maxlength="10"/>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.gender" style="width: 100%" size="large">
                                        <a-select-option value="" disabled>{{'Select Gender'}}</a-select-option>
                                        <a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.gender?errorMsg.gender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.language')" name="language" :rules="[{ required: false, message: $t('patient.demographics.language')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.language" style="width: 100%" size="large">
                                        <a-select-option value="" disabled>{{'Select Language'}}</a-select-option>
                                        <a-select-option v-for="language in globalCode.language.globalCode" :key="language.id" :value="language.id">{{language.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.language?errorMsg.language[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.otherLanguage')" name="otherLanguage" :rules="[{ required: false, message: $t('patient.demographics.otherLanguage')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" v-model:value="demographics.otherLanguage" mode="multiple" size="large" placeholder="Please Select Language" style="width: 100%" :options="globalCode.language.globalCode.map((item) => ({ label: item.name, value: item.id }))" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.otherLanguage?errorMsg.otherLanguage[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.weight')" name="weight" :rules="[{ required: false, message: $t('patient.demographics.weight')+' '+$t('global.validation'), pattern: regex.digitWithdecimal }]">
                                    <a-input-number style="width: 100%" v-model:value="demographics.weight" placeholder="Please enter weight in lbs" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.height')" name="height" :rules="[{ required: false, message: $t('patient.demographics.height')+' '+$t('global.validation'), pattern: regex.digitWithdecimal }]">
                                    <a-input-number style="width: 100%" v-model:value="demographics.height" placeholder="Please enter height in cm " size="large" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" v-model:value="demographics.contactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({ label: item.name,value: item.id }))" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactType?errorMsg.contactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.contactTime" style="width: 100%" size="large">
                                        <a-select-option value="" hidden>{{'Select Preferred Time'}}</a-select-option>
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="patientDetail != null ? patientDetail.contactTime : ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.contactTime?errorMsg.contactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.MRN')" name="medicalRecordNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('patient.demographics.MRN'),pattern: regex.alphaNumeric}]">
                                    <a-input @change="changedValue" v-model:value="demographics.medicalRecordNumber" placeholder="Please enter 12 alphanumeric " size="large" maxlength="12" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.medicalRecordNumber?errorMsg.medicalRecordNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.country')" name="country" :rules="[{ required: false, message: $t('global.country')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.country" style="width: 100%" size="large">
                                        <a-select-option value="" disabled>{{'Select Country'}}</a-select-option>
                                        <a-select-option v-for="country in globalCode.country.globalCode" :key="country.id" :value="country.id">{{country.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.country?errorMsg.country[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.state')" name="state" :rules="[{ required: false, message: $t('global.state')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.state" style="width: 100%" size="large">
                                        <a-select-option value="" disabled>{{'Select State'}}</a-select-option>
                                        <a-select-option v-for="state in globalCode.state.globalCode" :key="state.id" :value="state.id">{{state.name}}</a-select-option>
                                    </a-select>
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
                                    <a-input-number style="width:100%" v-model:value="demographics.zipCode" placeholder="Please enter 5 digit number" size="large" maxlength="5" />
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
                        <a-col :span="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.address')" name="address" :rules="[{ required: false, message: $t('global.address')+' '+$t('global.validation') }]">
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
                                    <!-- <ErrorMessage v-if="errorMsg" :name="errorMsg.email?errorMsg.email[0]:''" /> -->
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyEmail?errorMsg.familyEmail[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input-number v-model:value="demographics.familyPhoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyPhoneNumber?errorMsg.familyPhoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" v-model:value="demographics.familyContactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({label: item.name, value: item.id }))" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactType?errorMsg.familyContactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.familyContactTime" style="width: 100%" size="large">
                                        <a-select-option value="" disabled>{{'Select Preferred Time'}}</a-select-option>
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactTime?errorMsg.familyContactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="familyGender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.familyGender" style="width: 100%" size="large">
                                        <a-select-option value="" hidden>{{'Select Gender'}}</a-select-option>
                                        <a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyGender?errorMsg.familyGender[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.relation')" name="relation" :rules="[{ required: false, message: $t('global.relation')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.relation" style="width: 100%" size="large">
                                        <a-select-option value="" hidden>{{'Select Relation'}}</a-select-option>
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
                    <a-row>
                        <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                            <a-checkbox v-model:checked="demographics.isPrimary">
                                {{$t('patient.demographics.sameAsPrimaryFamilyMemberInfo')}}
                            </a-checkbox>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" v-if="demographics.isPrimary">
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
                                <a-form-item :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input-number v-model:value="demographics.familyPhoneNumber" placeholder="Please enter 10 digit number" size="large" disabled maxlength="10" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyPhoneNumber?errorMsg.familyPhoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" v-model:value="demographics.familyContactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({label: item.name, value: item.id }))" disabled />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactType?errorMsg.familyContactType[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.familyContactTime" style="width: 100%" size="large" disabled>
                                        <a-select-option value="" disabled>{{'Select Preferred Time'}}</a-select-option>
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactTime?errorMsg.familyContactTime[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="familyGender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.familyGender" style="width: 100%" size="large" disabled>
                                        <a-select-option value="" disabled>{{'Select Gender'}}</a-select-option>
                                        <a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
                                    </a-select>
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
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyEmail?errorMsg.emergencyEmail[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="emergencyPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input-number v-model:value="demographics.emergencyPhoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyPhoneNumber?errorMsg.emergencyPhoneNumber[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="emergencyContactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" v-model:value="demographics.emergencyContactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({ label: item.name,value: item.id }))" />
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyContactType?errorMsg.emergencyContactType[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="emergencyContactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.emergencyContactTime" style="width: 100%" size="large">
                                        <a-select-option value="" disabled>{{'Select Preferred Time'}}</a-select-option>
                                        <a-select-option v-for="ptOfDayContact in globalCode.ptOfDayContact.globalCode" :key="ptOfDayContact.id" :value="ptOfDayContact.id">{{ptOfDayContact.name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyContactTime?errorMsg.emergencyContactTime[0]:''" />
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.gender')" name="emergencyGender" :rules="[{ required: false, message: $t('global.gender')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="demographics.emergencyGender" style="width: 100%" size="large">
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
            <div  class="steps-content" v-if="steps[current].title == 'Conditions'" >
                <!-- <Conditions /> -->
                <a-form :model="conditions" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="condition" @finishFailed="conditionsFailed">
                    <Loader />
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="formHeading">
                                <h2>{{$t('patient.conditions.healthConditions')}}</h2>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" class="mb-24">
                        <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                            <a-input-search v-model:value="search" placeholder="Search..." style="width: 100%" size="large" @search="onSearch" />
                        </a-col>
                        <a-col :md="24" :sm="24" :xs="24">
                            <div class="form-group conditionsCheckboxs">
                                <a-form-item name="condition" :rules="[{ required: true, message: $t('patient.conditions.healthConditions')+' '+$t('global.validation') }]">
                                    <a-checkbox-group v-model:value="conditions.condition">
                                        <a-checkbox v-for="condition in globalCode.healthCondition.globalCode" :key="condition.id" :value="condition.id" name="condition">{{condition.name}}</a-checkbox>
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
                                <a-form-item :label="$t('global.name')" name="name" :rules="[{ required: false, message: $t('global.name')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="conditions.name" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.designation')" name="designation" :rules="[{ required: false, message: $t('global.designation')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="conditions.designation" style="width: 100%" size="large">
                                        <a-select-option value="" disabled>{{'Select Designation'}}</a-select-option>
                                        <a-select-option v-for="designation in globalCode.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.designation?errorMsg.designation[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="conditions.email" placeholder="test@test.com" size="large" @input="emailChange()" />
                
                                    <ErrorMessage v-if="errorMsg && conditions.email!=null" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input-number v-model:value="conditions.phoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.conditions.fax')" name="fax" :rules="[{ required: false, message: $t('patient.conditions.fax')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="conditions.fax" size="large" />
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
                    <a-row>
                        <a-col :md="24" :sm="24" :xs="24" class="mb-24">
                            <a-checkbox v-model:checked="conditions.checked"> {{$t('patient.conditions.sameAsabove')}} </a-checkbox>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" v-if="conditions.checked">
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.name')" name="name" :rules="[{ required: false, message: $t('global.name')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="conditions.name" size="large" disabled />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.designation')" name="designation" :rules="[{ required: false, message: $t('global.designation')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="conditions.designation" style="width: 100%" size="large" disabled>
                                        <a-select-option value="" disabled>{{'Select Designation'}}</a-select-option>
                                        <a-select-option v-for="designation in globalCode.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.designation?errorMsg.designation[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="conditions.email" placeholder="test@test.com" size="large" disabled>
                                    </a-input>
                                    <ErrorMessage v-if="errorMsg && conditions.email!=null" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input-number v-model:value="conditions.phoneNumber" placeholder="Please enter 10 digit number" size="large" disabled maxlength="10" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.conditions.fax')" name="fax" :rules="[{ required: false, message: $t('patient.conditions.fax')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="conditions.fax" size="large" disabled />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.fax?errorMsg.fax[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" v-else>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.name')" name="physicianName" :rules="[{ required: false, message: $t('global.name')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="conditions.physicianName" size="large" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.designation')" name="physicianDesignation" :rules="[{ required: false, message: $t('global.designation')+' '+$t('global.validation') }]">
                                    <a-select @change="changedValue" ref="select" v-model:value="conditions.physicianDesignation" style="width: 100%" size="large">
                                        <a-select-option value="" disabled>{{'Select Designation'}}</a-select-option>
                                        <a-select-option v-for="designation in globalCode.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
                                    </a-select>
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.designation?errorMsg.designation[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.email')" name="physicianEmail" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
                                    <a-input @change="changedValue" v-model:value="conditions.physicianEmail" placeholder="test@test.com" size="large" @input="emailChange()" />
                                    <ErrorMessage v-if="errorMsg && conditions.physicianEmail!=null" :name="errorMsg.email?errorMsg.email[0]:''" />
                                </a-form-item>

                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('global.phoneNo')" name="physicianPhoneNumber" :rules="[{ required: false, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase(),pattern: regex.phoneNumber }]">
                                    <a-input-number v-model:value="conditions.physicianPhoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :md="8" :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('patient.conditions.fax')" name="physicianFax" :rules="[{ required: false, message: $t('patient.conditions.fax')+' '+$t('global.validation') }]">
                                    <a-input @change="changedValue" v-model:value="conditions.physicianFax" size="large" />
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
                <Programs :idPatient="idPatient" />

                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                </div>
                <!-- end  -->
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Devices'">
                <Devices :idPatient="idPatient" />
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                </div>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Clinical Data'">
                <ClinicalData :idPatient="idPatient" />

                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                </div>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Insurance'">
                <!-- <Insurance /> -->
                <a-form :model="insuranceData" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="insuranceForm" @finishFailed="insuranceDataFailed">
                    <Loader />
                    <a-row :gutter="24" v-for=" insuranceName,i in globalCode.insuranceType.globalCode" :key="insuranceName.id">
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
                                    <a-select @change="changedValue" ref="select" v-model:value="insuranceData.insuranceName[i]" style="width: 100%" size="large">
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
                                    <a-date-picker @change="changedValue" v-model:value="insuranceData.expirationDate[i]" format="MM/DD/YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.expirationDate?errorMsg.expirationDate[0]:''" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">{{$t('global.next')}}</a-button>
                    </div>
                </a-form>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Documents'">
                <Documents entity="patient" :idPatient="idPatient"/>

                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary">{{$t('global.next')}}</a-button>
                    <a-button v-if="current == steps.length - 1" type="primary" @click="saveModal()">
                        {{$t('global.save')}}
                    </a-button>
                </div>
            </div>
        </a-col>
    </a-row>
    <PatientSearch v-model:visible="patientSearch" @closeSearchPatient="closeSearchPatient($event)"/>
</a-modal>

</template>

<script>
import { ref, computed, reactive, watchEffect, defineComponent, defineAsyncComponent,onUnmounted } from "vue";
// import Demographics from "@/components/modals/forms/Demographics";
// import Conditions from "@/components/modals/forms/Conditions";
import Programs from "@/components/modals/forms/Programs";
import Devices from "@/components/modals/forms/Devices";
// import Parameters from "@/components/modals/forms/Parameters";
import ClinicalData from "@/components/modals/forms/ClinicalData";
// import Insurance from "@/components/modals/forms/Insurance";
import Documents from "@/components/modals/forms/Documents";
import { useStore } from "vuex";
// import DataTable from "../patients/data-table/DataTable.vue"
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
// import serviceMethod from "../../services/serviceMethod";
import { regex } from "@/RegularExpressions/regex";
import Loader from "@/components/loader/Loader";
import {successSwal,warningSwal } from "@/commonMethods/commonMethod";
// import dayjs from 'dayjs';
// import {PlusOutlined} from "@ant-design/icons-vue";
import { messages } from "../../config/messages";
import { useRoute } from 'vue-router';
export default defineComponent( {
  components: {
    //   PlusOutlined,
    // Demographics,
    // Conditions,
    Programs,
    Devices,
    // Parameters,
    ClinicalData,
    // Insurance,
    Documents,
    // DataTable,
    ErrorMessage,
    Loader,
    PatientSearch: defineAsyncComponent(() => import("../modals/search/PatientModal")),
  },
  props: {
    isEditPatient: {
        type: Boolean
    },
    patientId: {
        type: Number
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const isValueChanged = ref(false);
    // const current = computed(() => {
    //   return store.state.patients.counter;
    // });
    const patientSearch =ref(false)

    const changedValue = () => {
        isValueChanged.value = true;
        console.log('isValueChanged', isValueChanged.value);
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
    const idPatient = props.patientId ? reactive(props.patientId) : null;
    var isEdit = props.isEditPatient == true ? true : false;

    const patients = computed(() => {
      return store.state.patients;
    });
    const patientDetail = patients.value.patientDetails;
    const title = props.isEditPatient == true ? 'Edit Patient' : 'Add New Patient'
    const disabled = props.isEditPatient == true ? true : false
    
    const current= computed({
      get: () =>
        store.state.patients.counter,
      set: (value) => {
        store.state.patients.counter = value;
      },
    })
    // computed(() => {
    //   return store.state.patients.counter;
    // });
    const demographics = reactive({
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: "",
      language: "",
      otherLanguage: ref([]),
      nickName: "",
      weight: "",
      height: "",
      email: "",
      phoneNumber: "",
      contactType: ref([]),
      contactTime: "",
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
      familyContactType: ref([]),
      familyContactTime: "",
      familyGender: "",
      relation: "",
      emergencyFullName: "",
      emergencyEmail: "",
      emergencyPhoneNumber: "",
      emergencyContactType: ref([]),
      emergencyContactTime: "",
      emergencyGender: "",
      isPrimary: false,
      familyMemberId: '',
      emergencyId: '',
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

    const insuranceData = reactive({
      insuranceNumber: [],
      insuranceName: [],
      expirationDate: [],
      insuranceType: [],
    });

    watchEffect(() => {
        // Bitrix data assign 
        if(patients.value.fetchFromBitrix){ 
            Object.assign(demographics, patients.value.fetchFromBitrix);
        }//end 

        if(idPatient) {
            Object.assign(demographics, patientDetail);
            if(isEdit && patients.value.patientConditions != null) {
                Object.assign(conditions.condition, patients.value.patientConditions)
                isEdit = false;
            }
            if(patients.value.patientInsurance != null) {
                Object.assign(insuranceData, patients.value.patientInsurance)
            }
            if(patients.value.patientReferralSource != null) {
                Object.assign(conditions, {
                    name: patients.value.patientReferralSource.name,
                    designation: patients.value.patientReferralSource.designation,
                    email: patients.value.patientReferralSource.email,
                    phoneNumber: patients.value.patientReferralSource.phoneNumber,
                    fax: patients.value.patientReferralSource.fax,
                });
            }
            if(patients.value.patientPrimaryPhysician != null) {
                Object.assign(conditions, {
                    physicianName: patients.value.patientPrimaryPhysician.name,
                    physicianDesignation: patients.value.patientPrimaryPhysician.designation,
                    physicianEmail: patients.value.patientPrimaryPhysician.email,
                    physicianPhoneNumber: patients.value.patientPrimaryPhysician.phoneNumber,
                    physicianFax: patients.value.patientPrimaryPhysician.fax,
                });
            }
        }
        /* else {
            const medicalRecordNumber = Math.random().toString(20).slice(2, 14).toUpperCase()
            Object.assign(demographics, {
                medicalRecordNumber: medicalRecordNumber
            });
        } */
    })

    const parameters = reactive([]);

    const demographic = () => {
        if(idPatient != null) {
            if(patients.value.addDemographic == null) {
                if(demographics.isPrimary == false) {
                    (demographics.emergencyId = patients.value.patientDetails.emergencyContact.data ? patients.value.patientDetails.emergencyContact.data.id : ''),
                    (demographics.familyMemberId = patients.value.patientDetails.patientFamilyMember.data ? patients.value.patientDetails.patientFamilyMember.data.id : ''),
                    store.dispatch("updateDemographic", {
                        data: demographics,
                        id: idPatient,
                    }).then(() => {
                        if(route.name == 'PatientSummary') {
                            store.dispatch('patientDetails', route.params.udid)
                        }
                    })
                }
                else if(demographics.isPrimary == true) {
                    (demographics.emergencyFullName = demographics.fullName),
                    (demographics.emergencyEmail = demographics.familyEmail),
                    (demographics.emergencyPhoneNumber = demographics.familyPhoneNumber),
                    (demographics.emergencyContactType = demographics.familyContactType),
                    (demographics.emergencyContactTime = demographics.familyContactTime),
                    (demographics.emergencyGender = demographics.familyGender),
                    (demographics.emergencyId = patients.value.patientDetails.emergencyContact.data ? patients.value.patientDetails.emergencyContact.data.id : ''),
                    (demographics.familyMemberId = patients.value.patientDetails.patientFamilyMember.data ? patients.value.patientDetails.patientFamilyMember.data.id : ''),
                    store.dispatch("updateDemographic", {
                        data: demographics,
                        id: idPatient,
                    }).then(() => {
                        if(route.name == 'PatientSummary') {
                            store.dispatch('patientDetails', route.params.udid)
                        }
                    })
                }
            }
            else if(patients.value.addDemographic != null && patients.value.addDemographic.id) {
                if(demographics.isPrimary == false) {
                    (demographics.emergencyId = patients.value.addDemographic.emergencyContact.data ? patients.value.addDemographic.emergencyContact.data.id : ''),
                    (demographics.familyMemberId = patients.value.addDemographic.patientFamilyMember.data ? patients.value.addDemographic.patientFamilyMember.data.id : ''),
                    store.dispatch("updateDemographic", {
                        data: demographics,
                        id: patients.value.addDemographic.id ? patients.value.addDemographic.id : idPatient,
                    }).then(() => {
                        if(route.name == 'PatientSummary') {
                            store.dispatch('patientDetails', route.params.udid)
                        }
                    })
                }
                else if(demographics.isPrimary == true) {
                    (demographics.emergencyFullName = demographics.fullName),
                    (demographics.emergencyEmail = demographics.familyEmail),
                    (demographics.emergencyPhoneNumber = demographics.familyPhoneNumber),
                    (demographics.emergencyContactType = demographics.familyContactType),
                    (demographics.emergencyContactTime = demographics.familyContactTime),
                    (demographics.emergencyGender = demographics.familyGender),
                    (demographics.emergencyId = patients.value.addDemographic.emergencyContact.data ? patients.value.addDemographic.emergencyContact.data.id : ''),
                    (demographics.familyMemberId = patients.value.addDemographic.patientFamilyMember.data ? patients.value.addDemographic.patientFamilyMember.data.id : ''),
                    store.dispatch("updateDemographic", {
                        data: demographics,
                        id: patients.value.addDemographic.id ? patients.value.addDemographic.id : idPatient,
                    }).then(() => {
                        if(route.name == 'PatientSummary') {
                            store.dispatch('patientDetails', route.params.udid)
                        }
                    })
                }
            }
        }
        else {
            if(patients.value.addDemographic == null) {
                if(demographics.isPrimary == false) {
                    store.dispatch("addDemographic", demographics).then(() => {
                        if(route.name == 'PatientSummary') {
                            store.dispatch('patientDetails', route.params.udid)
                        }
                    })
                }
                else if(demographics.isPrimary == true) {
                    (demographics.emergencyFullName = demographics.fullName),
                    (demographics.emergencyEmail = demographics.familyEmail),
                    (demographics.emergencyPhoneNumber = demographics.familyPhoneNumber),
                    (demographics.emergencyContactType = demographics.familyContactType),
                    (demographics.emergencyContactTime = demographics.familyContactTime),
                    (demographics.emergencyGender = demographics.familyGender),
                    store.dispatch("addDemographic", demographics).then(() => {
                        if(route.name == 'PatientSummary') {
                            store.dispatch('patientDetails', route.params.udid)
                        }
                    })
                }
            }
            else if(patients.value.addDemographic != null && patients.value.addDemographic.id) {
                if(demographics.isPrimary == false) {
                    (demographics.emergencyId = patients.value.addDemographic.emergencyContact.data ? patients.value.addDemographic.emergencyContact.data.id : ''),
                    (demographics.familyMemberId = patients.value.addDemographic.patientFamilyMember.data ? patients.value.addDemographic.patientFamilyMember.data.id : ''),
                    store.dispatch("updateDemographic", {
                        data: demographics,
                        id: patients.value.addDemographic.id,
                    }).then(() => {
                        if(route.name == 'PatientSummary') {
                            store.dispatch('patientDetails', route.params.udid)
                        }
                    })
                }
                else if(demographics.isPrimary == true) {
                    (demographics.emergencyFullName = demographics.fullName),
                    (demographics.emergencyEmail = demographics.familyEmail),
                    (demographics.emergencyPhoneNumber = demographics.familyPhoneNumber),
                    (demographics.emergencyContactType = demographics.familyContactType),
                    (demographics.emergencyContactTime = demographics.familyContactTime),
                    (demographics.emergencyGender = demographics.familyGender),
                    (demographics.emergencyId = patients.value.addDemographic.emergencyContact.data ? patients.value.addDemographic.emergencyContact.data.id : ''),
                    (demographics.familyMemberId = patients.value.addDemographic.patientFamilyMember.data ? patients.value.addDemographic.patientFamilyMember.data.id : ''),
                    store.dispatch("updateDemographic", {
                        data: demographics,
                        id: patients.value.addDemographic.id,
                    }).then(() => {
                        if(route.name == 'PatientSummary') {
                            store.dispatch('patientDetails', route.params.udid)
                        }
                    })
                }
            }
        }
    };

    const condition = () => {
        const patientConditions = patients.value.patientConditions;
        if(idPatient != null) {
            if ( patientConditions == null || patients.value.patientReferralSource == null || patients.value.patientPrimaryPhysician == null ) {
                if(conditions.checked == false) {
                    store.dispatch("addCondition", {
                        data: conditions,
                        id: idPatient,
                    });
                }
                if (conditions.checked == true) {
                    store.dispatch("addCondition", {
                        data: conditions,
                        id: idPatient,
                    });
                }
            }
            else if ((patientConditions != null || patients.value.patientReferralSource != null || patients.value.patientPrimaryPhysician != null) && patients.value.patientPrimaryPhysician.id || patients.value.patientReferralSource.id ) {
                if (conditions.checked == false) {
                    (conditions.name = conditions.physicianName),
                    (conditions.designation = conditions.physicianDesignation),
                    (conditions.email = conditions.physicianEmail),
                    (conditions.phoneNumber = conditions.physicianPhoneNumber),
                    (conditions.fax = conditions.physicianFax);
                    store.dispatch("updateCondition", {
                        data: conditions,
                        id: idPatient,
                        physicianId: patients.value.patientPrimaryPhysician.id,
                        referalID: patients.value.patientReferralSource.id,
                    }).then(() => {
                        store.dispatch('patientConditions', route.params.udid)
                    })
                }
                if (conditions.checked == true) {
                    store.dispatch("updateCondition", {
                        data: conditions,
                        id: idPatient,
                        physicianId: patients.value.patientPrimaryPhysician.id,
                        referalID: patients.value.patientReferralSource.id,
                    }).then(() => {
                        store.dispatch('patientConditions', route.params.udid)
                    })
                }
            }            
        }
        else {
            if (patients.value.addCondition == null || patients.value.addPatientReferals == null || patients.value.addPatientPhysician == null) {
                if (conditions.checked == false) {
                    (conditions.name = conditions.physicianName),
                    (conditions.designation = conditions.physicianDesignation),
                    (conditions.email = conditions.physicianEmail),
                    (conditions.phoneNumber = conditions.physicianPhoneNumber),
                    (conditions.fax = conditions.physicianFax);
                    store.dispatch("addCondition", {
                        data: conditions,
                        id: patients.value.addDemographic.id,
                    });
                }
                if (conditions.checked == true) {
                    store.dispatch("addCondition", {
                        data: conditions,
                        id: patients.value.addDemographic.id,
                    });
                }
            }
            if (patients.value.addPatientReferals.id && patients.value.addPatientPhysician.id) {
                if (conditions.checked == false) {
                    (conditions.name = conditions.physicianName),
                    (conditions.designation = conditions.physicianDesignation),
                    (conditions.email = conditions.physicianEmail),
                    (conditions.phoneNumber = conditions.physicianPhoneNumber),
                    (conditions.fax = conditions.physicianFax);
                    store.dispatch("updateCondition", {
                        data: conditions,
                        id: patients.value.addDemographic.id,
                        physicianId: patients.value.addPatientPhysician.id,
                        referalID: patients.value.addPatientReferals.id,
                    });
                }
                if (conditions.checked == true) {
                    store.dispatch("updateCondition", {
                        data: conditions,
                        id: patients.value.addDemographic.id,
                        physicianId: patients.value.addPatientPhysician.id,
                        referalID: patients.value.addPatientReferals.id,
                    });
                }
            }
        }
    };

    const parameter = () => {
      store.dispatch("parameter", {
        vital: parameters,
        id: patients.value.addDemographic.id,
      });
    };

    const insuranceForm = () => {
        if(idPatient != null) {
            store.dispatch("addInsurance", {
                data: {
                insurance: [insuranceData],
                },
                id: idPatient,
            });
        }
        else {
            store.dispatch("addInsurance", {
                data: {
                insurance: [insuranceData],
                },
                id: patients.value.addDemographic.id,
            });
        }
    };

    const next = () => {
      store.commit("counterPlus");
    };
    const prev = () => {
      store.commit("counterMinus");
    };

    const demographicsFailed = () => {
    //   scrollToTop();
     
      // errorSwal(messages.fieldsRequired)
    };

    const conditionsFailed = () => {
    //   scrollToTop();
      // errorSwal(messages.fieldsRequired)
    };

    const insuranceDataFailed = () => {
    //   scrollToTop();
      // errorSwal(messages.fieldsRequired)
    };

    const errorMsg = computed(() => {
      return store.state.patients.errorMsg;
    });

    function parameterFields(id) {
      store.dispatch("parameterFields", id);
    }

    const fields = computed(() => {
      return store.state.patients.parameterFields;
    });

    const form = reactive({
      ...demographics,
    });

    function saveModal() {
      emit("saveModal", false);
      successSwal(messages.formSuccess);
      Object.assign(demographics, form);
      store.dispatch("patients");
      store.commit("resetCounter");
      emit("closeModal");
    }

    function closeModal() {
        if(isValueChanged.value) {
            warningSwal(messages.modalWarning).then((response) => {
                if (response == true) {
                    emit("saveModal", false);
                    Object.assign(demographics, form);
                    store.dispatch("patients");
                    store.commit("resetCounter");
                    store.state.patients.addDemographic = null
                }
                else {
                    emit("saveModal", true);
                }
            })
        }
        /* if(demographics.firstName != '' || demographics.lastName != '' || demographics.email != '') {
            warningSwal(messages.modalWarning).then((response) => {
                if (response == true) {
                emit("saveModal", false);
                Object.assign(demographics, form);
                store.dispatch("patients");
                store.commit("resetCounter");
                store.state.patients.addDemographic = null
                } else {
                emit("saveModal", true);
                }
            })
        } */
    }

    function emailChange(){
        errorMsg.value.email?errorMsg.value.email[0]=null:''
    }

    function stepperClick(value){
        console.log('stepper',value)
    }

    onUnmounted(()=>{
      store.commit('errorMsg',null)
    })

    /* function formatPhoneNumber(event) {
        const phoneNumberString = event.target.value
        console.log('phoneNumberString', phoneNumberString)
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '');
            const format = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
            Object.assign(demographics, {
                phoneNumber: format
            })
        }
        return null;
    } */

    return {
    // formatPhoneNumber,
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
    //   scrollToTop,
      insuranceForm,
      insuranceData,
      parameter,
      parameters,
      fields,
      parameterFields,
      errorMsg,
      patients,
      current,
      globalCode,
      demographic,
      condition,
      steps: [
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
        // {
        //   title: "Parameters",
        //   content: "Second-content",
        // },
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
      ],
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



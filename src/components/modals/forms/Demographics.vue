<template>
  <a-row :gutter="24">
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.firstName')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.middleName')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.lastName')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.dateOfBirth')}}<span class="red-color">*</span></label>
        <a-date-picker v-model:value="value1" :size="size" style="width: 100%" format="MM/DD/YYYY" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label> {{$t('global.gender')}} <span class="red-color">*</span></label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Male</a-select-option>
          <a-select-option value="Yiminghe">Female</a-select-option>
          <a-select-option value="Yiminghe">Others</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.language')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.otherLanguage')}}</label>
        <a-select
          v-model:value="selectedItemsForTag2"
          mode="multiple"
          size="large"
          placeholder="Please Select Language"
          style="width: 100%"
          :options="filteredOptionsForTag2.map((item) => ({ value: item }))"
        />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.nickName')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.weight')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.height')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.email')}} <span class="red-color">*</span></label>
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
        </a-input>
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.phoneNo')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.preferredMethodofContact')}} <span class="red-color">*</span></label>
        <a-select
          v-model:value="selectedItemsForTag1"
          mode="multiple"
          size="large"
          style="width: 100%"
          :options="filteredOptionsForTag1.map((item) => ({ value: item }))"
        />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label> {{$t('patient.demographics.preferredTimeofDayforContact')}}<span class="red-color">*</span></label>
        <a-select
          ref="select"
          show-search
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Morning</a-select-option>
          <a-select-option value="Yiminghe">Afternoon</a-select-option>
          <a-select-option value="Yiminghe">Evening</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.MRN')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.country')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.state')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.city')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.zipcode')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.suiteorApartment')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :span="24">
      <div class="form-group">
        <label>{{$t('global.address')}} <span class="red-color">*</span></label>
        <a-textarea v-model="value2" allow-clear />
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
        <label>{{$t('patient.demographics.fullName')}}<span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.emailAddress')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.phoneNo')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.preferredMethodofContact')}} <span class="red-color">*</span></label>
        <a-select
          v-model:value="selectedItemsForTag1"
          mode="multiple"
          size="large"
          style="width: 100%"
          :options="filteredOptionsForTag1.map((item) => ({ value: item }))"
        />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.preferredTimeofDayforContact')}} <span class="red-color">*</span></label>
        <a-select
          ref="select"
          show-search
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Morning</a-select-option>
          <a-select-option value="Yiminghe">Afternoon</a-select-option>
          <a-select-option value="Yiminghe">Evening</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label> {{$t('global.gender')}}</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Male</a-select-option>
          <a-select-option value="Yiminghe">Female</a-select-option>
          <a-select-option value="Yiminghe">Others</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.relation')}}</label>
        <a-input v-model="value" size="large" />
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
      <a-checkbox v-model:checked="checked">
        {{$t('patient.demographics.sameAsPrimaryFamilyMemberInfo')}}
      </a-checkbox>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.fullName')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.emailAddress')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.phoneNo')}} <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.preferredMethodofContact')}}<span class="red-color">*</span></label>
        <a-select
          v-model:value="selectedItemsForTag1"
          mode="multiple"
          size="large"
          style="width: 100%"
          :options="filteredOptionsForTag1.map((item) => ({ value: item }))"
        />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.demographics.preferredTimeofDayforContact')}} <span class="red-color">*</span></label>
        <a-select
          ref="select"
          show-search
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Morning</a-select-option>
          <a-select-option value="Yiminghe">Afternoon</a-select-option>
          <a-select-option value="Yiminghe">Evening</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label> {{$t('global.gender')}}</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Male</a-select-option>
          <a-select-option value="Yiminghe">Female</a-select-option>
          <a-select-option value="Yiminghe">Others</a-select-option>
        </a-select>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { ref, computed } from "vue";
const OPTIONSTAG1 = ["Email", "Phone", "Text"];
const OPTIONSTAG2 = ["English", "Spanish", "German", "French", "ASL"];
export default {
  components: {},
  setup() {
    const selectedItemsForTag1 = ref(["Email"]);
    const filteredOptionsForTag1 = computed(() =>
      OPTIONSTAG1.filter((o) => !selectedItemsForTag1.value.includes(o))
    );
    const selectedItemsForTag2 = ref(["English"]);
    const filteredOptionsForTag2 = computed(() =>
      OPTIONSTAG2.filter((o) => !selectedItemsForTag2.value.includes(o))
    );
    return {
      filteredOptionsForTag1,
      selectedItemsForTag1,
      filteredOptionsForTag2,
      selectedItemsForTag2,
    };
  },
};
</script>

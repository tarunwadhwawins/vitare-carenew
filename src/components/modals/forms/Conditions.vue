<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>{{$t('patient.conditions.healthConditions')}}</h2>
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="mb-24">
    <a-col :md="24" :sm="24" :xs="24" class="mb-24">
      <a-input-search
        v-model:value="value22"
        placeholder="Search..."
        style="width: 100%"
        size="large"
        
      />
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked1"
        >{{$t('patient.conditions.A00')}}</a-checkbox
      >
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked2">{{$t('patient.conditions.C00')}}</a-checkbox>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked3"
        >{{$t('patient.conditions.E00')}}</a-checkbox
      >
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked4"
        >{{$t('patient.conditions.F01')}}
      </a-checkbox>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked5"
        >{{$t('patient.conditions.G00')}}
      </a-checkbox>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked6"
        >{{$t('patient.conditions.H00')}}
      </a-checkbox>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked7"
        >{{$t('patient.conditions.H60')}}
      </a-checkbox>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked8"
        >{{$t('patient.conditions.I00')}}
      </a-checkbox>
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
        <label>{{$t('global.name')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label> {{$t('global.designation')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.email')}}</label>
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
        <label>{{$t('global.phoneNo')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.conditions.fax')}}</label>
        <a-input v-model="value" size="large" />
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
      <a-checkbox v-model:checked="checked9"> {{$t('patient.conditions.sameAsabove')}} </a-checkbox>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.name')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label> {{$t('global.designation')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.email')}}</label>
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
        <label>{{$t('global.phoneNo')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.conditions.fax')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      checked1: ref(false),
      checked2: ref(false),
      checked3: ref(false),
      checked4: ref(false),
      checked5: ref(false),
      checked6: ref(false),
      checked7: ref(false),
      checked8: ref(false),
      checked9: ref(false),
    };
  },
});
</script>

<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>Health Conditions</h2>
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
        @search="onSearch"
      />
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked1"
        >Certain infectious and parasitic diseases (A00-B99)</a-checkbox
      >
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked2">Neoplasms (C00-D49)</a-checkbox>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked3"
        >Endocrine, nutritional and metabolic diseases (E00-E89)</a-checkbox
      >
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked4"
        >Mental, Behavioral and Neurodevelopmental disorders (F01-F99 )
      </a-checkbox>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked5"
        >Diseases of the nervous system (G00-G99)
      </a-checkbox>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked6"
        >Diseases of the eye and adnexa (H00-H59)
      </a-checkbox>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked7"
        >Diseases of the ear and mastoid process(H60-H95)
      </a-checkbox>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-checkbox v-model:checked="checked8"
        >Diseases of the circulatory system (I00-I99)
      </a-checkbox>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>Referral Source (Assisted Living, Home Health, Cardiologist)</h2>
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Name</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label> Designation</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Email</label>
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
        <label>Phone No</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Fax</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>Primary Physician</h2>
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :md="24" :sm="24" :xs="24" class="mb-24">
      <a-checkbox v-model:checked="checked9"> Same as above </a-checkbox>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Name</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label> Designation</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Email</label>
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
        <label>Phone Number</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Fax</label>
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

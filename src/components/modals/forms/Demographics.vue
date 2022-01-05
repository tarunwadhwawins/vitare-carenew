<template>
  <a-row :gutter="24">
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>First Name <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Middle Name</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Last Name <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Date of Birth <span class="red-color">*</span></label>
        <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label> Gender <span class="red-color">*</span></label>
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
        <label>Language <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Other Language</label>
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
        <label>Nick Name</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Weight</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Height</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Email <span class="red-color">*</span></label>
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
        <label>Phone Number <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Preferred Method of Contact <span class="red-color">*</span></label>
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
        <label>Preferred time of day for contact <span class="red-color">*</span></label>
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
        <label>MRN( Medical Record Number) <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Country <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>State <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>City <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Zipcode <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Suite or Apartment <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :span="24">
      <div class="form-group">
        <label>Address <span class="red-color">*</span></label>
        <a-textarea v-model="value2" allow-clear />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>Primary Family Member</h2>
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Full Name <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Email Address <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Phone Number <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Preferred Method of Contact <span class="red-color">*</span></label>
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
        <label>Preferred time of day for contact <span class="red-color">*</span></label>
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
        <label> Gender</label>
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
        <label>Relation</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>Emergency Contact</h2>
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :md="24" :sm="24" :xs="24" class="mb-24">
      <a-checkbox v-model:checked="checked">
        Same as primary family member info
      </a-checkbox>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Full Name <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Email Address <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Phone Number <span class="red-color">*</span></label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Preferred Method of Contact <span class="red-color">*</span></label>
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
        <label>Preferred time of day for contact <span class="red-color">*</span></label>
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
        <label> Gender</label>
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

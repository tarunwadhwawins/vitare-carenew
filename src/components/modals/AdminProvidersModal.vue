<template>
  <a-modal title="Add New Provider" max-width="1040px" width="100%" v-model:visible="visible">
    <a-row :gutter="24">
      <a-col :span="24">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="steps-content" v-if="steps[current].title == 'Providers'">
          <a-form :model="providerForm" layout="vertical" @finish="submitProviderForm">
            <a-row :gutter="24">
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.providerName')" name="name" :rules="[{ required: true, message: $t('providers.providerName')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerForm.name" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.providerAddress')" name="address" :rules="[{ required: true, message: $t('providers.providerAddress')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerForm.address" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.country')" name="country" :rules="[{ required: true, message: $t('providers.country')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerForm.country" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.state')" name="state" :rules="[{ required: true, message: $t('providers.state')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerForm.state" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.city')" name="city" :rules="[{ required: true, message: $t('providers.city')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerForm.city" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.zipcode')" name="zipcode" :rules="[{ required: true, message: $t('providers.zipcode')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerForm.zipcode" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.phoneNumber')" name="phoneNumber" :rules="[{ required: true, message: $t('providers.phoneNumber')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerForm.phoneNumber" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.tags')" name="selectedItemsForTag" :rules="[{ required: true, message: $t('providers.tags')+' '+$t('global.validation')  }]">
                    <a-select
                      v-model:value="providerForm.selectedItemsForTag"
                      mode="multiple"
                      size="large"
                      placeholder="Select Roles"
                      style="width: 100%"
                      :options="filteredOptionsForTag.map((item) => ({ value: item }))" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.modules')" name="selectedItemsForModules" :rules="[{ required: true, message: $t('providers.modules')+' '+$t('global.validation')  }]">
                    <a-select
                      v-model:value="providerForm.selectedItemsForModules"
                      mode="multiple"
                      size="large"
                      placeholder="Select Modules"
                      style="width: 100%"
                      :options="filteredOptionsForModules.map((item) => ({ value: item }))" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.defaultLocation')" name="defaultLocation" :rules="[{ required: true, message: $t('providers.defaultLocation')+' '+$t('global.validation')  }]">
                    <a-select
                      v-model:value="providerForm.defaultLocation"
                      style="width: 100%"
                      size="large">
                      <a-select-option value="" hidden>Choose Location</a-select-option>
                      <a-select-option value="location1">Location 1</a-select-option>
                      <a-select-option value="location2">Location 2 </a-select-option>
                      <a-select-option value="location3">Location 3</a-select-option>
                      <a-select-option value="location4">Location 4</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </a-col>
              <a-col :span="24">
                <div class="steps-action">
                  <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                  <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">{{$t('global.next')}}</a-button>
                  <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                    {{$t('global.done')}}
                  </a-button>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Locations'">
          <a-form :model="providerLocationForm" layout="vertical" @finish="submitProviderLocationForm">
            <a-row :gutter="24">
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.locationName')" name="locationName" :rules="[{ required: true, message: $t('providers.locationName')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerLocationForm.locationName" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.noOfLocations')" name="noOfLocations" :rules="[{ required: true, message: $t('providers.noOfLocations')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerLocationForm.noOfLocations" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.locationAddress')" name="locationAddress" :rules="[{ required: true, message: $t('providers.locationAddress')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerLocationForm.locationAddress" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.state')" name="state" :rules="[{ required: true, message: $t('providers.state')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerLocationForm.state" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.city')" name="city" :rules="[{ required: true, message: $t('providers.city')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerLocationForm.city" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.zipcode')" name="zipcode" :rules="[{ required: true, message: $t('providers.zipcode')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerLocationForm.zipcode" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.phoneNumber')" name="phoneNumber" :rules="[{ required: true, message: $t('providers.phoneNumber')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerLocationForm.phoneNumber" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.emailAddress')" name="email" :rules="[{ required: true, message: $t('providers.emailAddress')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerLocationForm.email" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <a-form-item :label="$t('providers.website')" name="website" :rules="[{ required: true, message: $t('providers.website')+' '+$t('global.validation')  }]">
                    <a-input v-model:value="providerLocationForm.website" size="large" />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :md="24" :sm="24" :xs="24">
                <a-table
                  :columns="columns2"
                  :data-source="data2"
                  :scroll="{ x: 900 }"
                  @change="onChange">
                  <template #actions>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>Edit</span>
                      </template>
                      <a class="icons"><EditOutlined /></a>
                    </a-tooltip>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>Delete</span>
                      </template>
                      <a class="icons"> <DeleteOutlined /></a>
                    </a-tooltip>
                  </template>
                </a-table>
              </a-col>
              <a-col :span="24">
                <div class="steps-action">
                  <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                  <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">{{$t('global.next')}}</a-button>
                  <a-button v-if="current == steps.length - 1" type="primary" html-type="submit" @click="$message.success('Processing complete!')">{{$t('global.done')}}</a-button>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { ref, computed, reactive } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
const OPTIONSTAG2 = ["TCM", "RPM", "CCMEHR", "BHI", "Wellness", "ECM"];
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
  },
  setup() {
    const current = ref(0);
    const visible = ref(true);
    
    const providerForm = reactive({
      name: '',
      address: '',
      country: '',
      state: '',
      city: '',
      zipcode: '',
      phoneNumber: '',
      selectedItemsForTag: selectedItemsForTag,
      selectedItemsForModules: selectedItemsForTag,
      defaultLocation: '',
    })
    
    const providerLocationForm = reactive({
      locationName: '',
      noOfLocations: '',
      locationAddress: '',
      state: '',
      city: '',
      zipcode: '',
      phoneNumber: '',
      email: '',
      website: '',
    })

    const submitProviderForm = () => {
      current.value++;

    }

    const submitProviderLocationForm = () => {
      alert()
    }

    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };

    const selectedItemsForTag = ref(["Tag1"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );
    const selectedItemsForModules = ref(["TCM"]);
    const filteredOptionsForModules  = computed(() =>
      OPTIONSTAG2.filter((o) => !selectedItemsForModules.value.includes(o))
    );

    return {
      current,
      visible,
      providerForm,
      providerLocationForm,
      submitProviderForm,
      submitProviderLocationForm,
      next,
      prev,
      filteredOptionsForTag,
      selectedItemsForTag,
      filteredOptionsForModules,
      selectedItemsForModules,
      steps: [
        {
          title: "Providers",
          content: "First-content",
        },
        {
          title: "Locations",
          content: "Second-content",
        },
      ],
    };
  },
};
</script>

<style scoped>
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

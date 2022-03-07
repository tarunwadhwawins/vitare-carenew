<template>
  <a-modal
    width="100%"
    title="Physician Orders for Life-Sustaining Treatment (POLST)"
    centered
    :footer="null"
  >
    <a-row>
      <a-col :span="16">
        <div class="form-group">
          <label> Search Question</label>
          <a-input
            v-model:value="value"
            placeholder="Search Question . . ."
            size="large"
          />
        </div>
      </a-col>

      <a-col :span="8">
        <div class="text-right mt-28">
          <a-button class="btn primaryBtn" @click="toggle = !toggle"
            >Search Existing</a-button
          >
          <a-button @click="showModal1" class="btn secondaryBtn ml-10"
            >Add New Question</a-button
          >
        </div>
      </a-col>

      <a-col :span="24" v-show="toggle">
        <div class="questionnaireMain checkBoxCollapse mt-28">
          <a-collapse
            v-model:activeKey="activeKey"
            expand-icon-position="right"
          >
            <a-collapse-panel
              key="1"
              header="Cardiopulmonary Resuscitation (CPR)"
            >
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked1">
                  <p>Attempt Resuscitation/CPR</p>
                  <a-tag>RPM - 4</a-tag>
                  <a-tag>TCM - 2</a-tag>
                  <a-tag>BHI - 1</a-tag>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked2">
                  <p>Do Not Attempt Resuscitation/DNR</p>
                  <a-tag>RPM - 4</a-tag>
                  <a-tag>TCM - 2</a-tag>
                </a-checkbox>
              </a-col>

              <template class="checkBox" #extra>
                <a-checkbox v-model:checked="checked3"></a-checkbox
              ></template>
            </a-collapse-panel>
            <a-collapse-panel
              key="2"
              header="Medical Interventions"
              :disabled="false"
            >
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked4">
                  <p>
                    Full Treatment - primary goal of prolonging life by all
                    medically effective means. In addition to treatment
                    described in Selective Treatment and Comfort-Focused
                    Treatment, use intubation, advanced airway interventions,
                    mechanical ventilation, and cardioversion as indicated
                  </p>
                  <a-tag>RPM - 4</a-tag>
                  <a-tag>TCM - 2</a-tag>
                  <a-tag>BHI - 1</a-tag>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked5">
                  <p>
                    Selective Treatment - goal of treating medical conditions
                    while avoiding burdensome measures. In addition to treatment
                    described in Comfort-Focused Treatment, use medical
                    treatment, IV antibiotics, and IV fluids as indicated. Do
                    not intubate. May use non-invasive positive airway pressure.
                    Generally avoid intensive care
                  </p>
                  <a-tag>RPM - 4</a-tag>
                  <a-tag>TCM - 2</a-tag>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked6">
                  <p>
                    Selective Treatment - goal of treating medical conditions
                    while avoiding burdensome measures. In addition to treatment
                    described in Comfort-Focused Treatment, use medical
                    treatment, IV antibiotics, and IV fluids as indicated. Do
                    not intubate. May use non-invasive positive airway pressure.
                    Generally avoid intensive care
                  </p>
                  <a-tag>TCM - 2</a-tag>
                  <a-tag>BHI - 1</a-tag>
                </a-checkbox>
              </a-col>
              <template class="checkBox" #extra>
                <a-checkbox v-model:checked="checked7"></a-checkbox
              ></template>
            </a-collapse-panel>
            <a-collapse-panel
              key="3"
              header="Artificially Administered Nutrition"
            >
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked8">
                  <p>Long-term artificial nutrition, including feeding tubes</p>
                  <a-tag>RPM - 4</a-tag>
                  <a-tag>TCM - 2</a-tag>
                  <a-tag>BHI - 1</a-tag>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked9">
                  <p>
                    Trial period of artificial nutrition, including feeding
                    tubes
                  </p>
                  <a-tag>RPM - 4</a-tag>
                  <a-tag>TCM - 2</a-tag>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked10">
                  <p>
                    No artificial means of nutrition, including feeding tubes
                  </p>
                  <a-tag>TCM - 2</a-tag>
                  <a-tag>BHI - 1</a-tag>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox
                  class="questionOutput last"
                  v-model:checked="checked11"
                >
                  <p>Obtain pharmacist consult</p>
                  <a-tag>RPM - 4</a-tag>
                  <a-tag>BHI - 1</a-tag>
                </a-checkbox>
              </a-col>
              <template class="checkBox" #extra>
                <a-checkbox v-model:checked="checke12"></a-checkbox
              ></template>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </a-col>
      <a-col :span="24" v-show="toggle" class="text-right">
        <router-link to="/question-template-detail">
          <a-button class="btn primaryBtn">Select Questions</a-button>
        </router-link>
      </a-col>
    </a-row>
    <AddQuestionnaire v-model:visible="visible1" />
    <EditQuestionnaire v-model:visible="visible2" />
  </a-modal>

  <!--modals-->

  <!---->
</template>
<script>
import { defineAsyncComponent, defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    AddQuestionnaire: defineAsyncComponent(() =>
      import("@/components/modals/AddQuestionnaire")
    ),
    EditQuestionnaire: defineAsyncComponent(() =>
      import("@/components/modals/EditQuestionnaire")
    ),
  },
  setup() {
    const options = ref([
      {
        value: "Steve Smith",
        label: "Steve Smith",
      },
      {
        value: "Jane Doe",
        label: "Jane Doe",
      },
      {
        value: "Henry Joseph",
        label: "Henry Joseph",
      },
      {
        value: "Carol Liam",
        label: "Carol Liam",
      },
      {
        value: "Brett William",
        label: "Brett William",
      },
    ]);
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const handleBlur = () => {
      console.log("blur");
    };

    const handleFocus = () => {
      console.log("focus");
    };

    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const visible1 = ref(false);
    const showModal1 = () => {
      visible1.value = true;
    };
    const visible2 = ref(false);
    const showModal2 = () => {
      visible2.value = true;
    };
    const toggle = ref(false);
    return {
      size: ref("large"),
      value: ref(undefined),
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      options,
      showModal1,
      visible1,
      showModal2,
      visible2,
      checked1: ref(false),
      checked2: ref(false),
      checked3: ref(false),
      checked4: ref(false),
      checked5: ref(false),
      checked6: ref(false),
      checked7: ref(false),
      checked8: ref(false),
      checked9: ref(false),
      checked10: ref(false),
      checked11: ref(false),
      checked12: ref(false),
      toggle,
    };
  },
});
</script>

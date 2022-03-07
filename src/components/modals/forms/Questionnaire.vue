<template>
  <div class="questionnaireMain">
    <a-row :gutter="24">
      <a-col :span="24">
        <h2 class="pageTittle">
          Physician Orders for Life-Sustaining Treatment (POLST)
        </h2>
      </a-col>
      <a-col :span="24">
        <a-collapse v-model:activeKey="activeKey" expand-icon-position="right">
          <a-collapse-panel
            key="1"
            header="Cardiopulmonary Resuscitation (CPR)"
          >
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked1">
                <p>Attempt Resuscitation/CPR</p>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked2">
                <p>Do Not Attempt Resuscitation/DNR</p>
              </a-checkbox>
            </a-col>
          </a-collapse-panel>
          <a-collapse-panel
            key="2"
            header="Medical Interventions"
            :disabled="false"
          >
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked5">
                <p>
                  Full Treatment - primary goal of prolonging life by all
                  medically effective means. In addition to treatment described
                  in Selective Treatment and Comfort-Focused Treatment, use
                  intubation, advanced airway interventions, mechanical
                  ventilation, and cardioversion as indicated
                </p>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked6">
                <p>
                  Selective Treatment - goal of treating medical conditions
                  while avoiding burdensome measures. In addition to treatment
                  described in Comfort-Focused Treatment, use medical treatment,
                  IV antibiotics, and IV fluids as indicated. Do not intubate.
                  May use non-invasive positive airway pressure. Generally avoid
                  intensive care
                </p>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked7">
                <p>
                  Selective Treatment - goal of treating medical conditions
                  while avoiding burdensome measures. In addition to treatment
                  described in Comfort-Focused Treatment, use medical treatment,
                  IV antibiotics, and IV fluids as indicated. Do not intubate.
                  May use non-invasive positive airway pressure. Generally avoid
                  intensive care
                </p>
              </a-checkbox>
            </a-col>
          </a-collapse-panel>
          <a-collapse-panel
            key="3"
            header="Artificially Administered Nutrition"
          >
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked9">
                <p>Long-term artificial nutrition, including feeding tubes</p>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked10">
                <p>
                  Trial period of artificial nutrition, including feeding tubes
                </p>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked11">
                <p>No artificial means of nutrition, including feeding tubes</p>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox
                class="questionOutput last"
                v-model:checked="checked12"
              >
                <p>Obtain pharmacist consult</p>
              </a-checkbox>
            </a-col>
          </a-collapse-panel>
          <a-collapse-panel key="4" header="Resources">
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked9">
                <p>Resource 1</p>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked10">
                <p>Resource 2</p>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox class="questionOutput" v-model:checked="checked11">
                <p>Resource 3</p>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox
                class="questionOutput last"
                v-model:checked="checked12"
              >
                <p>Resource 4</p>
              </a-checkbox>
            </a-col>
          </a-collapse-panel>
        </a-collapse>
      </a-col>
      <a-col :span="24" class="mt-25">
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 900 }"
          @change="onChange"
        >
          <template #date>
            <a-date-picker v-model:value="value1" />
          </template>

          <template #active="key">
            <a-switch v-model:checked="checked[key.record.key]" />
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

const columns = [
  {
    title: "Programs",
    dataIndex: "programs",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "Rank",
    dataIndex: "rank",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "Expected Start Date",
    dataIndex: "date",
    slots: {
      customRender: "date",
    },
  },
  {
    title: "F/U",
    dataIndex: "fu",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "R/P",
    dataIndex: "rp",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
];
const data = [
  {
    key: "1",
    programs: "RPM",
    rank: "6",
    date: "",
    fu: "",
    rp: "",
  },
  {
    key: "2",
    programs: "TCM",
    rank: "4",
    date: "",
    fu: "",
    rp: "",
  },
  {
    key: "3",
    programs: "CCM",
    rank: "2",
    date: "",
    fu: "",
    rp: "",
  },
];
export default defineComponent({
  setup() {
    const activeKey = ref(["1"]);
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
      checked10: ref(false),
      checked11: ref(false),
      checked12: ref(false),
      activeKey,
      columns,
      data,
      value1: ref(),
    };
  },
});
</script>

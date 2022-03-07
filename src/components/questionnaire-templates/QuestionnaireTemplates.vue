<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <div class="common-bg">
            <a-row>
              <a-col :span="24">
                <h2 class="pageTittle">
                  Questionnaire
                  
                </h2>
              </a-col>
              <a-col :span="12">
                <a-select
                  v-model:value="value2"
                  :size="size"
                  mode="tags"
                  style="width: 100%"
                  placeholder="Search . . ."
                  :options="searchoptions"
                  @change="handleChange2"
                >
                </a-select>
              </a-col>
              <a-col :span="24" class="mt-25">
                <a-table
                  :columns="columns"
                  :data-source="data"
                  :scroll="{ x: 900 }"
                  @change="onChange"
                >
                  <template #question="text">
                    <router-link to="question-template-details">{{
                      text.text
                    }}</router-link>
                  </template>
                  
                  <template #active="key">
                    <a-switch v-model:checked="checked[key.record.key]" />
                  </template>
                </a-table>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { defineComponent, ref } from "vue";
const columns = [
  {
    title: "Questionnaire",
    dataIndex: "question",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    slots: {
      customRender: "question",
    },
  },
 
];
const data = [
  {
    key: "1",
    question: "Physician Orders for Life-Sustaining Treatment (POLST)",
  },
  {
    key: "2",
    question: "Physician's Report For Community Care Facilities",
  },
  {
    key: "3",
    question: "Physician's Report For Residential Care Facilities For The Elderly (RCFE)",
  },
];
export default {
  components: {
    Header,
    Sidebar,
  },

  setup() {
    const checked = ref([false]);

    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    const handleChange2 = (value) => {
      console.log(`selected ${value}`);
    };

    const searchoptions = ref([
      {
        value: "Physician Orders for Life-Sustaining Treatment (POLST)",
        label: "Physician Orders for Life-Sustaining Treatment (POLST)",
      },
      {
        value: "Physician's Report For Community Care Facilities",
        label: "Physician's Report For Community Care Facilities",
      },
      {
        value: "Physician's Report For Residential Care Facilities For The Elderly (RCFE)",
        label: "Physician's Report For Residential Care Facilities For The Elderly (RCFE)",
      },
    ]);
    return {
      columns,
      data,
      checked,

      visible,
      showModal,
      handleOk,
      handleChange2,
      searchoptions,
      size: ref([]),
    };
  },
};
</script>

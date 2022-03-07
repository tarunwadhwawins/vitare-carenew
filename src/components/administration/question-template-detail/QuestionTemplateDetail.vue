<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <Header />
    </a-layout-header>
    <a-layout>
      <Sidebar />
      <a-layout-content>
        <div class="common-bg">
          <div class="questionnaireMain">
            <a-row :gutter="24">
              <a-col :span="24">
                <h2 class="pageTittle">
                  Physician Orders for Life-Sustaining Treatment (POLST)
                  <div class="commonBtn">
                    <a-button class="btn secondaryBtn" @click="showModal2"
                      >Search Question</a-button
                    >
                    <a-button class="btn secondaryBtn ml-10 buttonWtIcon" @click="showModal"
                      >Add Question <PlusOutlined /></a-button
                    >
                    <router-link
                      to="/questionnaire-template"
                      class="b-inline ml-10"
                    >
                      <a-button class="btn primaryBtn">Back</a-button>
                    </router-link>
                  </div>
                </h2>
              </a-col>
              <a-col :span="24">
                <a-collapse
                  v-model:activeKey="activeKey"
                  expand-icon-position="left"
                >
                  <a-collapse-panel
                    key="1"
                    header="Cardiopulmonary Resuscitation (CPR)"
                  >
                    <a-col :span="24">
                      <a-checkbox
                        class="questionOutput"
                        v-model:checked="checked1"
                      >
                        <p>Attempt Resuscitation/CPR</p>
                        <a-tag>RPM - 4</a-tag>
                        <a-tag>TCM - 2</a-tag>
                        <a-tag>BHI - 1</a-tag>
                      </a-checkbox>
                    </a-col>
                    <a-col :span="24">
                      <a-checkbox
                        class="questionOutput"
                        v-model:checked="checked2"
                      >
                        <p>Do Not Attempt Resuscitation/DNR</p>
                        <a-tag>RPM - 4</a-tag>
                        <a-tag>TCM - 2</a-tag>
                      </a-checkbox>
                    </a-col>
                    <template #extra>
                      <EditOutlined @click="showModal1" />
                      <DeleteOutlined
                    /></template>
                  </a-collapse-panel>
                  <a-collapse-panel
                    key="2"
                    header="Medical Interventions"
                    :disabled="false"
                  >
                    <a-col :span="24">
                      <a-checkbox
                        class="questionOutput"
                        v-model:checked="checked5"
                      >
                        <p>
                          Full Treatment - primary goal of prolonging life by
                          all medically effective means. In addition to
                          treatment described in Selective Treatment and
                          Comfort-Focused Treatment, use intubation, advanced
                          airway interventions, mechanical ventilation, and
                          cardioversion as indicated
                        </p>
                        <a-tag>RPM - 4</a-tag>
                        <a-tag>TCM - 2</a-tag>
                        <a-tag>BHI - 1</a-tag>
                      </a-checkbox>
                    </a-col>
                    <a-col :span="24">
                      <a-checkbox
                        class="questionOutput"
                        v-model:checked="checked6"
                      >
                        <p>
                          Selective Treatment - goal of treating medical
                          conditions while avoiding burdensome measures. In
                          addition to treatment described in Comfort-Focused
                          Treatment, use medical treatment, IV antibiotics, and
                          IV fluids as indicated. Do not intubate. May use
                          non-invasive positive airway pressure. Generally avoid
                          intensive care
                        </p>
                        <a-tag>RPM - 4</a-tag>
                        <a-tag>TCM - 2</a-tag>
                      </a-checkbox>
                    </a-col>
                    <a-col :span="24">
                      <a-checkbox
                        class="questionOutput"
                        v-model:checked="checked7"
                      >
                        <p>
                          Selective Treatment - goal of treating medical
                          conditions while avoiding burdensome measures. In
                          addition to treatment described in Comfort-Focused
                          Treatment, use medical treatment, IV antibiotics, and
                          IV fluids as indicated. Do not intubate. May use
                          non-invasive positive airway pressure. Generally avoid
                          intensive care
                        </p>
                        <a-tag>TCM - 2</a-tag>
                        <a-tag>BHI - 1</a-tag>
                      </a-checkbox>
                    </a-col>
                    <template #extra>
                      <EditOutlined @click="showModal1" />
                      <DeleteOutlined
                    /></template>
                  </a-collapse-panel>
                  <a-collapse-panel
                    key="3"
                    header="Artificially Administered Nutrition"
                  >
                    <a-col :span="24">
                      <a-checkbox
                        class="questionOutput"
                        v-model:checked="checked9"
                      >
                        <p>
                          Long-term artificial nutrition, including feeding
                          tubes
                        </p>
                        <a-tag>RPM - 4</a-tag>
                        <a-tag>TCM - 2</a-tag>
                        <a-tag>BHI - 1</a-tag>
                      </a-checkbox>
                    </a-col>
                    <a-col :span="24">
                      <a-checkbox
                        class="questionOutput"
                        v-model:checked="checked10"
                      >
                        <p>
                          Trial period of artificial nutrition, including
                          feeding tubes
                        </p>
                        <a-tag>RPM - 4</a-tag>
                        <a-tag>TCM - 2</a-tag>
                      </a-checkbox>
                    </a-col>
                    <a-col :span="24">
                      <a-checkbox
                        class="questionOutput"
                        v-model:checked="checked11"
                      >
                        <p>
                          No artificial means of nutrition, including feeding
                          tubes
                        </p>
                        <a-tag>TCM - 2</a-tag>
                        <a-tag>BHI - 1</a-tag>
                      </a-checkbox>
                    </a-col>
                    <a-col :span="24">
                      <a-checkbox
                        class="questionOutput last"
                        v-model:checked="checked12"
                      >
                        <p>Obtain pharmacist consult</p>
                        <a-tag>RPM - 4</a-tag>
                        <a-tag>BHI - 1</a-tag>
                      </a-checkbox>
                    </a-col>
                    <template #extra>
                      <EditOutlined @click="showModal1" />
                      <DeleteOutlined
                    /></template>
                  </a-collapse-panel>
                </a-collapse>
              </a-col>
            </a-row>
          </div>
          <!--modals-->
          <AddQuestionnaire v-model:visible="visible2" @ok="handleOk" />
          <EditQuestionnaire v-model:visible="visible3" @ok="handleOk" />
          <CreateTemplate v-model:visible="visible1" @ok="handleOk" />
          <!---->
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { DeleteOutlined, EditOutlined,PlusOutlined } from "@ant-design/icons-vue";
import AddQuestionnaire from "@/components/modals/AddQuestionnaire";
import EditQuestionnaire from "@/components/modals/EditQuestionnaire";
import CreateTemplate from "@/components/modals/CreateTemplate";


export default defineComponent({
  components: {
    Header,
    Sidebar,
    DeleteOutlined,
    EditOutlined,
    AddQuestionnaire,
    EditQuestionnaire,
    CreateTemplate,
    PlusOutlined
  },
  setup() {
    const activeKey = ref(["1"]);
    const visible2 = ref(false);
    const showModal = () => {
      visible2.value = true;
    };
    const visible3 = ref(false);
    const showModal1 = () => {
      visible3.value = true;
    };
    const visible1 = ref(false);
    const showModal2 = () => {
      visible1.value = true;
    };
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
      visible2,
      showModal,
      visible3,
      showModal1,
      visible1,
      showModal2
    };
  },
});
</script>
 
<template>
<div>
    <div class="common-bg">
        <div class="questionnaireMain">
            <a-row :gutter="20">
                <a-col :span="24">
                    <h2 class="pageTittle">
                        Questionnaire Bank
                        <div class="commonBtn">

                            <a-button class="btn primaryBtn" @click="showModal({show:true,id:''})">Add New Question</a-button>

                        </div>
                    </h2>
                </a-col>
                <a-col :sm="18" :xs="24">
                    <div class="form-group">
                        <a-input v-model="value" size="large" placeholder="Search Questionnaire" />
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="">
                        <a-button class="btn primaryBtn">Search</a-button>
                    </div>
                </a-col>
                <a-col :span="24">
                    {{questionnaireList}}
                    <a-collapse v-model:activeKey="activeKey" expand-icon-position="left">
                        <a-collapse-panel key="1" header="Cardiopulmonary Resuscitation (CPR)">
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

                            <template #extra>
                                <router-link to="/questionnaire">
                                    <EditOutlined />
                                </router-link>
                                <DeleteOutlined />
                            </template>
                        </a-collapse-panel>
                        <a-collapse-panel key="2" header="Medical Interventions" :disabled="false">
                            <a-col :span="24">
                                <a-checkbox class="questionOutput" v-model:checked="checked5">
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
                                <a-checkbox class="questionOutput" v-model:checked="checked6">
                                    <p>
                                        Selective Treatment - goal of treating medical
                                        conditions while avoiding burdensome measures. In
                                        addition to treatment described in Comfort-Focused
                                        Treatment, use medical treatment, IV antibiotics,
                                        and IV fluids as indicated. Do not intubate. May use
                                        non-invasive positive airway pressure. Generally
                                        avoid intensive care
                                    </p>
                                    <a-tag>RPM - 4</a-tag>
                                    <a-tag>TCM - 2</a-tag>
                                </a-checkbox>
                            </a-col>
                            <a-col :span="24">
                                <a-checkbox class="questionOutput" v-model:checked="checked7">
                                    <p>
                                        Selective Treatment - goal of treating medical
                                        conditions while avoiding burdensome measures. In
                                        addition to treatment described in Comfort-Focused
                                        Treatment, use medical treatment, IV antibiotics,
                                        and IV fluids as indicated. Do not intubate. May use
                                        non-invasive positive airway pressure. Generally
                                        avoid intensive care
                                    </p>
                                    <a-tag>TCM - 2</a-tag>
                                    <a-tag>BHI - 1</a-tag>
                                </a-checkbox>
                            </a-col>
                            <template #extra>
                                <router-link to="/questionnaire">
                                    <EditOutlined />
                                </router-link>
                                <DeleteOutlined />
                            </template>
                        </a-collapse-panel>
                        <a-collapse-panel key="3" header="Artificially Administered Nutrition">
                            <a-col :span="24">
                                <a-checkbox class="questionOutput" v-model:checked="checked9">
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
                                <a-checkbox class="questionOutput" v-model:checked="checked10">
                                    <p>
                                        Trial period of artificial nutrition, including
                                        feeding tubes
                                    </p>
                                    <a-tag>RPM - 4</a-tag>
                                    <a-tag>TCM - 2</a-tag>
                                </a-checkbox>
                            </a-col>
                            <a-col :span="24">
                                <a-checkbox class="questionOutput" v-model:checked="checked11">
                                    <p>
                                        No artificial means of nutrition, including feeding
                                        tubes
                                    </p>
                                    <a-tag>TCM - 2</a-tag>
                                    <a-tag>BHI - 1</a-tag>
                                </a-checkbox>
                            </a-col>
                            <a-col :span="24">
                                <a-checkbox class="questionOutput last" v-model:checked="checked12">
                                    <p>Obtain pharmacist consult</p>
                                    <a-tag>RPM - 4</a-tag>
                                    <a-tag>BHI - 1</a-tag>
                                </a-checkbox>
                            </a-col>
                            <template #extra>
                                <router-link to="/questionnaire">
                                    <EditOutlined />
                                </router-link>
                                <DeleteOutlined />
                            </template>
                        </a-collapse-panel>
                    </a-collapse>
                </a-col>
            </a-row>
        </div>
    </div>

</div>
<AddQuestionnaire v-model:visible="visible" @is-visible="showModal($event)" />
</template>
<script>
import { ref, defineAsyncComponent, onMounted } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex"
export default {
  components: {
    EditOutlined,
    DeleteOutlined,
    AddQuestionnaire: defineAsyncComponent(() =>import("@/components/administration/questionnaire-bank/modals/AddQuestionnaire")),
  },
  setup() {
    const activeKey = ref(["2"])
    const visible = ref(false)
    const store = useStore()
    const id = ref("");
    const showModal = (e) => {
      visible.value = e.show;
      id.value = e.id;
    }
    onMounted(()=>{
        store.dispatch("questionnaireList")
    })
    
    return {
      showModal,
      visible,
      activeKey,
      id,
      questionnaireList:store.getters.questionnaireList
    };
  },
};
</script>

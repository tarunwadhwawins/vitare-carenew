<template>
  <div class="questionnaireMain">
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
                  Questionnaire Template
                </h2>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-steps :current="current">
                  <a-step
                    v-for="item in steps"
                    :key="item.title"
                    :title="item.title"
                  />
                </a-steps>
                <div
                  class="steps-content"
                  v-if="steps[current].title == 'Template'"
                >
                  <a-row>
                    <a-col :span="24">
                      <div class="form-group">
                        <label> Template Name</label>
                        <a-input
                          v-model="value"
                          size="large"
                          placeholder="Enter Template Name"
                        />
                      </div>
                    </a-col>
                    <a-col :span="24" class="mt-25">
                      <a-table
                        :columns="columns"
                        :data-source="data"
                        :scroll="{ x: 900 }"
                        @change="onChange"
                      >
                        <template #question="text">
                          <router-link to="question-template-detail">{{
                            text.text
                          }}</router-link>
                        </template>
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
                        <template #active="key">
                          <a-switch v-model:checked="checked[key.record.key]" />
                        </template>
                      </a-table>
                    </a-col>
                  </a-row>
                </div>
                <div
                  class="steps-content"
                  v-if="steps[current].title == 'Questionnaire'"
                >
                  <a-row>
                    <a-col :span="24">
                      <div class="form-group">
                        <label> Questionnaire</label>
                        <a-select
                          ref="select"
                          v-model:value="value1"
                          style="width: 100%"
                          @focus="focus"
                          @change="handleChange"
                          mode="tags"
                          size="large"
                          placeholder="Select Questions"
                        >
                          <a-select-option value="Questionnaire1"
                            >Access to Ambulatory Care</a-select-option
                          >
                          <a-select-option value="Questionnaire2"
                            >Access to Behavioral Health Care</a-select-option
                          >
                          <a-select-option value="Questionnaire3"
                            >Functional Status</a-select-option
                          >
                          <a-select-option value="Questionnaire4"
                            >Actions to Take to Improve CCM</a-select-option
                          >
                          <a-select-option value="Questionnaire5"
                            >Interdisciplinary Care Planning and
                            Coordination</a-select-option
                          >
                          <a-select-option value="Questionnaire6"
                            >Interdisciplinary Care Planning and
                            Coordination</a-select-option
                          >
                        </a-select>
                      </div>
                    </a-col>
                    <a-col :span="24">
                      <div class="questionnaireMain">
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
                              <PlusOutlined />
                            </template>
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
                                  Full Treatment - primary goal of prolonging
                                  life by all medically effective means. In
                                  addition to treatment described in Selective
                                  Treatment and Comfort-Focused Treatment, use
                                  intubation, advanced airway interventions,
                                  mechanical ventilation, and cardioversion as
                                  indicated
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
                                  conditions while avoiding burdensome measures.
                                  In addition to treatment described in
                                  Comfort-Focused Treatment, use medical
                                  treatment, IV antibiotics, and IV fluids as
                                  indicated. Do not intubate. May use
                                  non-invasive positive airway pressure.
                                  Generally avoid intensive care
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
                                  conditions while avoiding burdensome measures.
                                  In addition to treatment described in
                                  Comfort-Focused Treatment, use medical
                                  treatment, IV antibiotics, and IV fluids as
                                  indicated. Do not intubate. May use
                                  non-invasive positive airway pressure.
                                  Generally avoid intensive care
                                </p>
                                <a-tag>TCM - 2</a-tag>
                                <a-tag>BHI - 1</a-tag>
                              </a-checkbox>
                            </a-col>
                            <template #extra>
                              <PlusOutlined />
                            </template>
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
                                  Long-term artificial nutrition, including
                                  feeding tubes
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
                                  Trial period of artificial nutrition,
                                  including feeding tubes
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
                                  No artificial means of nutrition, including
                                  feeding tubes
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
                              <PlusOutlined />
                            </template>
                          </a-collapse-panel>
                        </a-collapse>
                      </div>
                    </a-col>
                  </a-row>
                </div>
                <div
                  class="steps-content"
                  v-if="steps[current].title == 'Add Questionnaire'"
                >
                  <a-row :gutter="24">
                    <a-col :sm="12" :xs="24">
                      <div class="form-group">
                        <label>Question</label>
                        <a-input
                          v-model:value="value"
                          placeholder="Enter Question"
                          style="width: 100%"
                          size="large"
                        />
                      </div>
                    </a-col>
                    <a-col :sm="12" :xs="24">
                      <div class="form-group">
                        <label>Type</label>
                        <a-select
                          ref="select"
                          v-model="value1"
                          style="width: 100%"
                          size="large"
                          @focus="focus"
                          @change="handleChange"
                          placeholder="Select Type"
                        >
                          <a-select-option value="lucy"
                            >Single Choice</a-select-option
                          >
                          <a-select-option value="Yiminghe"
                            >Multiple Choice</a-select-option
                          >
                          <a-select-option value="Yiminghe1"
                            >Textbox</a-select-option
                          >
                        </a-select>
                      </div>
                    </a-col>
                    <a-col :sm="24" class="mt-25">
                      <a-row :gutter="16">
                        <a-col :span="1">
                          <a-checkbox
                            class="singleChoice"
                            v-model:checked="checked21"
                          >
                          </a-checkbox>
                        </a-col>
                        <a-col :span="7">
                          <a-input
                            v-model:value="value"
                            placeholder="Label"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                        <a-col :sm="5" :xs="24">
                          <a-select
                            ref="select"
                            v-model="value1"
                            style="width: 100%"
                            size="large"
                            @focus="focus"
                            @change="handleChange"
                            placeholder="Program  Type"
                            mode="multiple"
                          >
                            <a-select-option value="lucy">RPM</a-select-option>
                            <a-select-option value="Yiminghse"
                              >TCM</a-select-option
                            >
                            <a-select-option value="Yiminghe"
                              >BHI</a-select-option
                            >
                          </a-select>
                        </a-col>
                        <a-col :span="3">
                          <a-input
                            v-model:value="value"
                            placeholder="RPM Score"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                        <a-col :span="3">
                          <a-input
                            v-model:value="value"
                            placeholder="TCM Score"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                      </a-row>
                    </a-col>
                    <a-col :sm="24" class="mt-25">
                      <a-row :gutter="16">
                        <a-col :span="1">
                          <a-checkbox
                            class="singleChoice"
                            v-model:checked="checked22"
                          >
                          </a-checkbox>
                        </a-col>
                        <a-col :span="7">
                          <a-input
                            v-model:value="value"
                            placeholder="Label"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                        <a-col :sm="5" :xs="24">
                          <a-select
                            ref="select"
                            v-model="value1"
                            style="width: 100%"
                            size="large"
                            @focus="focus"
                            @change="handleChange"
                            placeholder="Program  Type"
                            mode="multiple"
                          >
                            <a-select-option value="lucy">RPM</a-select-option>
                            <a-select-option value="Yiminghse"
                              >TCM</a-select-option
                            >
                            <a-select-option value="Yiminghe"
                              >BHI</a-select-option
                            >
                          </a-select>
                        </a-col>
                        <a-col :span="3">
                          <a-input
                            v-model:value="value"
                            placeholder="RPM Score"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                        <a-col :span="3">
                          <a-input
                            v-model:value="value"
                            placeholder="TCM Score"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                        <a-col :span="3">
                          <a-input
                            v-model:value="value"
                            placeholder="BHI Score"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                      </a-row>
                    </a-col>
                    <a-col :sm="24" class="mt-25">
                      <a-row :gutter="16">
                        <a-col :span="1">
                          <a-checkbox
                            class="singleChoice"
                            v-model:checked="checked23"
                          >
                          </a-checkbox>
                        </a-col>
                        <a-col :span="7">
                          <a-input
                            v-model:value="value"
                            placeholder="Label"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                        <a-col :sm="5" :xs="24">
                          <a-select
                            ref="select"
                            v-model="value1"
                            style="width: 100%"
                            size="large"
                            @focus="focus"
                            @change="handleChange"
                            placeholder="Program  Type"
                            mode="multiple"
                          >
                            <a-select-option value="lucy">RPM</a-select-option>
                            <a-select-option value="Yiminghse"
                              >TCM</a-select-option
                            >
                            <a-select-option value="Yiminghe"
                              >BHI</a-select-option
                            >
                          </a-select>
                        </a-col>
                        <a-col :span="3">
                          <a-input
                            v-model:value="value"
                            placeholder="RPM Score"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                        <a-col :span="3">
                          <a-input
                            v-model:value="value"
                            placeholder="TCM Score"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                        <a-col :span="3">
                          <a-input
                            v-model:value="value"
                            placeholder="BHI Score"
                            style="width: 100%"
                            size="large"
                          />
                        </a-col>
                        <a-col :span="2" class="text-right">
                          <a-button type="primary" size="large">
                            <template #icon>
                              <PlusOutlined />
                            </template>
                          </a-button>
                        </a-col>
                      </a-row>
                    </a-col>

                    <a-col :sm="24" :xs="24" class="text-right mt-25">
                      <a-button class="btn blueBtn">Save</a-button>
                    </a-col>

                    <a-col :span="24" class="mt-25">
                      <a-checkbox
                        v-model:checked="checked8"
                        @click="toggle = !toggle"
                      >
                        Show Program Score
                      </a-checkbox>
                    </a-col>
                    <a-col :span="24" class="mt-25">
                      <a-collapse
                        v-model:activeKey="activeKey"
                        expand-icon-position="right"
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
                              <div v-show="toggle">
                                <a-tag>RPM - 4</a-tag>
                                <a-tag>TCM - 2</a-tag>
                                <a-tag>BHI - 1</a-tag>
                              </div>
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              class="questionOutput"
                              v-model:checked="checked2"
                            >
                              <p>Do Not Attempt Resuscitation/DNR</p>
                              <div v-show="toggle">
                                <a-tag>RPM - 4</a-tag>
                                <a-tag>TCM - 2</a-tag>
                              </div>
                            </a-checkbox>
                          </a-col>
                        </a-collapse-panel>
                        <a-collapse-panel
                          key="2"
                          header="Medical Interventions"
                          :disabled="false"
                        >
                          <a-col :span="24">
                            <a-checkbox
                              class="questionOutput"
                              v-model:checked="checked3"
                            >
                              <p>
                                Full Treatment - primary goal of prolonging life
                                by all medically effective means. In addition to
                                treatment described in Selective Treatment and
                                Comfort-Focused Treatment, use intubation,
                                advanced airway interventions, mechanical
                                ventilation, and cardioversion as indicated
                              </p>
                              <div v-show="toggle">
                                <a-tag>RPM - 4</a-tag>
                                <a-tag>TCM - 2</a-tag>
                                <a-tag>BHI - 1</a-tag>
                              </div>
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              class="questionOutput"
                              v-model:checked="checked4"
                            >
                              <p>
                                Selective Treatment - goal of treating medical
                                conditions while avoiding burdensome measures.
                                In addition to treatment described in
                                Comfort-Focused Treatment, use medical
                                treatment, IV antibiotics, and IV fluids as
                                indicated. Do not intubate. May use non-invasive
                                positive airway pressure. Generally avoid
                                intensive care
                              </p>
                              <div v-show="toggle">
                                <a-tag>RPM - 4</a-tag>
                                <a-tag>TCM - 2</a-tag>
                              </div>
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              class="questionOutput"
                              v-model:checked="checked5"
                            >
                              <p>
                                Selective Treatment - goal of treating medical
                                conditions while avoiding burdensome measures.
                                In addition to treatment described in
                                Comfort-Focused Treatment, use medical
                                treatment, IV antibiotics, and IV fluids as
                                indicated. Do not intubate. May use non-invasive
                                positive airway pressure. Generally avoid
                                intensive care
                              </p>
                              <div v-show="toggle">
                                <a-tag>TCM - 2</a-tag>
                                <a-tag>BHI - 1</a-tag>
                              </div>
                            </a-checkbox>
                          </a-col>
                        </a-collapse-panel>
                        <a-collapse-panel
                          key="3"
                          header="Artificially Administered Nutrition"
                        >
                          <a-col :span="24">
                            <a-checkbox
                              class="questionOutput"
                              v-model:checked="checked6"
                            >
                              <p>
                                Long-term artificial nutrition, including
                                feeding tubes
                              </p>
                              <div v-show="toggle">
                                <a-tag>RPM - 4</a-tag>
                                <a-tag>TCM - 2</a-tag>
                                <a-tag>BHI - 1</a-tag>
                              </div>
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              class="questionOutput"
                              v-model:checked="checked7"
                            >
                              <p>
                                Trial period of artificial nutrition, including
                                feeding tubes
                              </p>
                              <div v-show="toggle">
                                <a-tag>RPM - 4</a-tag>
                                <a-tag>TCM - 2</a-tag>
                              </div>
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              class="questionOutput"
                              v-model:checked="checked9"
                            >
                              <p>
                                No artificial means of nutrition, including
                                feeding tubes
                              </p>
                              <div v-show="toggle">
                                <a-tag>TCM - 2</a-tag>
                                <a-tag>BHI - 1</a-tag>
                              </div>
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              class="questionOutput last"
                              v-model:checked="checked10"
                            >
                              <p>Obtain pharmacist consult</p>
                              <div v-show="toggle">
                                <a-tag>RPM - 4</a-tag>
                                <a-tag>BHI - 1</a-tag>
                              </div>
                            </a-checkbox>
                          </a-col>
                        </a-collapse-panel>
                      </a-collapse>
                    </a-col>
                  </a-row>
                </div>
                <div
                  class="steps-content"
                  v-if="steps[current].title == 'Resources'"
                >
                  <a-row>
                    <a-col :span="24">
                      <div class="form-group">
                        <label> Resources</label>
                        <a-select
                          ref="select"
                          v-model:value="value3"
                          style="width: 100%"
                          @focus="focus"
                          @change="handleChange"
                          mode="tags"
                          size="large"
                          placeholder="Select Rources"
                        >
                          <a-select-option value="Rources1"
                            >Resource 1</a-select-option
                          >
                          <a-select-option value="Rources2"
                            >Resource 2</a-select-option
                          >
                          <a-select-option value="Rources3"
                            >Resource 3</a-select-option
                          >
                          <a-select-option value="Rources4"
                            >Resource 4</a-select-option
                          >
                        </a-select>
                      </div>
                    </a-col>
                  </a-row>
                </div>
                <div
                  class="steps-content"
                  v-if="steps[current].title == 'Preview'"
                >
                  <div class="questionnaireMain">
                    <a-row :gutter="24">
                      <a-col :span="24">
                        <h2 class="pageTittle">
                          Physician Orders for Life-Sustaining Treatment (POLST)
                        </h2>
                      </a-col>
                      <a-col :span="24">
                        <a-collapse
                          v-model:activeKey="activeKey"
                          expand-icon-position="right"
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
                                  Full Treatment - primary goal of prolonging
                                  life by all medically effective means. In
                                  addition to treatment described in Selective
                                  Treatment and Comfort-Focused Treatment, use
                                  intubation, advanced airway interventions,
                                  mechanical ventilation, and cardioversion as
                                  indicated
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
                                  conditions while avoiding burdensome measures.
                                  In addition to treatment described in
                                  Comfort-Focused Treatment, use medical
                                  treatment, IV antibiotics, and IV fluids as
                                  indicated. Do not intubate. May use
                                  non-invasive positive airway pressure.
                                  Generally avoid intensive care
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
                                  conditions while avoiding burdensome measures.
                                  In addition to treatment described in
                                  Comfort-Focused Treatment, use medical
                                  treatment, IV antibiotics, and IV fluids as
                                  indicated. Do not intubate. May use
                                  non-invasive positive airway pressure.
                                  Generally avoid intensive care
                                </p>
                                <a-tag>TCM - 2</a-tag>
                                <a-tag>BHI - 1</a-tag>
                              </a-checkbox>
                            </a-col>
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
                                  Long-term artificial nutrition, including
                                  feeding tubes
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
                                  Trial period of artificial nutrition,
                                  including feeding tubes
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
                                  No artificial means of nutrition, including
                                  feeding tubes
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
                          </a-collapse-panel>
                           <a-collapse-panel
                            key="4"
                            header="Resources"
                          >
                            <a-col :span="24">
                              <a-checkbox
                                class="questionOutput"
                                v-model:checked="checked9"
                              >
                                <p>
                                  Resource 1
                                </p>
                              </a-checkbox>
                            </a-col>
                            <a-col :span="24">
                              <a-checkbox
                                class="questionOutput"
                                v-model:checked="checked10"
                              >
                                <p>
                                  Resource 2
                                </p>
                             
                              </a-checkbox>
                            </a-col>
                            <a-col :span="24">
                              <a-checkbox
                                class="questionOutput"
                                v-model:checked="checked11"
                              >
                                <p>
                                 Resource 3
                                </p>
                               
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
                    </a-row>
                  </div>
                </div>
                <div class="steps-action">
                  <a-button
                    v-if="current > 0"
                    style="margin-right: 8px"
                    @click="prev"
                    >Previous</a-button
                  >
                  <a-button
                    v-if="current < steps.length - 1"
                    type="primary"
                    @click="next"
                    >Next</a-button
                  >
                  <a-button
                    v-if="current == steps.length - 1"
                    type="primary"
                    @click="$message.success('Processing complete!')"
                  >
                    Done
                  </a-button>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { defineComponent, ref } from "vue";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

const columns = [
  {
    title: "Questionnaire Template",
    dataIndex: "question",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    slots: {
      customRender: "question",
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "actions",
    },
  },
];
const data = [
  {
    key: "1",
    question: "Physician Orders for Life-Sustaining Treatment (POLST)",
    active: "",
    action: "",
  },
  {
    key: "2",
    question: "Physician's Report For Community Care Facilities",
    active: "",
    action: "",
  },
  {
    key: "3",
    question:
      "Physician's Report For Residential Care Facilities For The Elderly (RCFE)",
    active: "",
    action: "",
  },
];
export default {
  components: {
    Header,
    Sidebar,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
  },

  setup() {
    const current = ref(0);
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };
    const activeKey = ref(["1"]);
    const toggle = ref(true);
    return {
      current,
      steps: [
        {
          title: "Template",
          content: "First-content",
        },
        {
          title: "Questionnaire",
          content: "Second-content",
        },
        {
          title: "Add Questionnaire",
          content: "Second-content",
        },
        {
          title: "Resources",
          content: "Second-content",
        },

        {
          title: "Preview",
          content: "Last-content",
        },
      ],
      next,
      prev,
      columns,
      data,
      activeKey,
      value1: ref(),
      value2: ref(),
      size: ref("large"),
      checked1: ref(false),
      checked2: ref(false),
      checked3: ref(false),
      checked4: ref(false),
      checked5: ref(false),
      checked6: ref(false),
      checked7: ref(false),
      checked8: ref(true),
      checked9: ref(false),
      checked10: ref(false),
      checked21: ref(false),
      checked22: ref(false),
      checked23: ref(false),
      toggle,
      value3: ref(),
    };
  },
};
</script>

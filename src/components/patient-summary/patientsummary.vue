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
          <a-row>
            <a-col :span="24">
              <h2 class="pageTittle">Patient Summary</h2>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="mb-24">
            <a-col :sm="8" :xs="24">
              <div class="patientInfo">
                <div class="patientImg">
                  <img src="../../assets/images/profile-4.jpg" alt="image" />
                </div>
                <p class="name">Jane Doe</p>
                <div class="pat-profile">
                  <div class="pat-profile-inner">
                    <div class="thumb-head">DOB</div>
                    <div class="thumb-desc">Aug 05, 1988 (33)</div>
                  </div>
                  <div class="pat-profile-inner">
                    <div class="thumb-head">Gender</div>
                    <div class="thumb-desc">Male</div>
                  </div>
                  <div class="pat-profile-inner">
                    <div class="thumb-head">EHR ID</div>
                    <div class="thumb-desc">123THJ</div>
                  </div>
                  <div class="pat-profile-inner">
                    <div class="thumb-head">Flag</div>
                    <div class="thumb-desc">
                      <span class="box redBgColor"></span>
                      <span class="box yellowBgColor"></span>
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :sm="16" :xs="24">
              <a-alert
                description="Patient has dimentia. Talk to wife - Marry when calling. Prefers evening calling."
                type="error"
                class="mb-24"
                closable
                @close="onClose"
              />
              <div class="thumbDesc">
                <a-collapse v-model:activeKey="activeKey5" :bordered="false">
                  <a-collapse-panel key="1" header=" Patient Infomation">
                    <p><strong>Language</strong> : English</p>
                  </a-collapse-panel>
                  <a-collapse-panel key="2" header=" Contact Infomation">
                    <p><strong>Phone Number</strong> : (554) 856-5645</p>
                  </a-collapse-panel>
                  <a-collapse-panel key="3" header="Care Team">
                    <a-row :gutter="24">
                      <a-col :sm="8" :xs="24">
                        <div class="care-team">
                          <h2>
                            Health Team
                            <span class="plus-icon" @click="showModal7">
                              <PlusOutlined />
                            </span>
                          </h2>
                          <ul>
                            <li>
                              <div class="profileImg">
                                <img
                                  src="../../assets/images/profile-2.jpg"
                                  alt="image"
                                />
                              </div>
                              <div class="content">
                                <p class="name">ICC Health (Mental Health)</p>
                                <p class="role">Care Team</p>
                              </div>
                            </li>
                            <li>
                              <div class="profileImg">
                                <img
                                  src="../../assets/images/profile-3.jpg"
                                  alt="image"
                                />
                              </div>
                              <div class="content">
                                <p class="name">ICC Health (Medical)</p>
                                <p class="role">Care Team</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </a-col>
                      <a-col :sm="8" :xs="24">
                        <div class="care-team">
                          <h2>
                            Care Coordinators
                            <span class="plus-icon" @click="showModal8">
                              <PlusOutlined />
                            </span>
                          </h2>
                          <ul>
                            <li>
                              <div class="profileImg">
                                <img
                                  src="../../assets/images/profile-2.jpg"
                                  alt="image"
                                />
                              </div>
                              <div class="content">
                                <p class="name">ICC Health (Mental Health)</p>
                                <p class="role">Care Team</p>
                              </div>
                            </li>
                            <li>
                              <div class="profileImg">
                                <img
                                  src="../../assets/images/profile-3.jpg"
                                  alt="image"
                                />
                              </div>
                              <div class="content">
                                <p class="name">ICC Health (Medical)</p>
                                <p class="role">Care Team</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </a-col>
                      <a-col :sm="8" :xs="24">
                        <div class="care-team">
                          <h2>
                            Family Coordinators
                            <span class="plus-icon" @click="showModal9">
                              <PlusOutlined />
                            </span>
                          </h2>
                          <ul>
                            <li>
                              <div class="profileImg">
                                <img
                                  src="../../assets/images/profile-2.jpg"
                                  alt="image"
                                />
                              </div>
                              <div class="content">
                                <p class="name">ICC Health (Mental Health)</p>
                                <p class="role">Care Team</p>
                              </div>
                            </li>
                            <li>
                              <div class="profileImg">
                                <img
                                  src="../../assets/images/profile-3.jpg"
                                  alt="image"
                                />
                              </div>
                              <div class="content">
                                <p class="name">ICC Health (Medical)</p>
                                <p class="role">Care Team</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </a-col>
                    </a-row>
                  </a-collapse-panel>
                  <a-collapse-panel key="4" header="Insurance Infomation">
                    <p><strong>Primary Insurance</strong> : NA</p>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :sm="24" :xs="24">
              <div class="summary-tabs">
                <a-tabs v-model:activeKey="activeKey">
                  <a-tab-pane key="1" tab="Care Plan">Content of Tab Pane 1</a-tab-pane>
                  <a-tab-pane key="2" tab="Patient Vitals" force-render>
                    <a-row :gutter="24">
                      <a-col :sm="12" :xs="24">
                        <a-card title="Blood Pressure">
                          <a-tabs v-model:activeKey="activeKey1">
                            <a-tab-pane key="7" tab="Graph">
                              <apexchart
                                type="area"
                                height="350"
                                :options="chartOptions"
                                :series="series"
                              ></apexchart>
                            </a-tab-pane>
                            <a-tab-pane key="8" tab="Table" force-render>
                              <a-table
                                :columns="columns4"
                                :data-source="data4"
                                :pagination="false"
                                @change="onChange"
                              />
                            </a-tab-pane>
                          </a-tabs>
                          <template #extra
                            ><a>
                              <a-button class="btn blackBtn" @click="showModal3"
                                ><PlusOutlined
                              /></a-button> </a
                          ></template>
                        </a-card>
                      </a-col>
                      <a-col :sm="12" :xs="24">
                        <a-card title="Pulse">
                          <a-tabs v-model:activeKey="activeKey2">
                            <a-tab-pane key="9" tab="Graph" force-render>
                              <apexchart
                                type="area"
                                height="350"
                                :options="chartOptions"
                                :series="series"
                              ></apexchart>
                            </a-tab-pane>
                            <a-tab-pane key="10" tab="Table">
                              <a-table
                                :columns="columns5"
                                :data-source="data5"
                                :pagination="false"
                                @change="onChange"
                              />
                            </a-tab-pane>
                          </a-tabs>
                          <template #extra
                            ><a>
                              <a-button class="btn blackBtn" @click="showModal4"
                                ><PlusOutlined
                              /></a-button> </a
                          ></template>
                        </a-card>
                      </a-col>
                      <a-col :sm="12" :xs="24">
                        <a-card title="Blood Glucose">
                          <a-tabs v-model:activeKey="activeKey3">
                            <a-tab-pane key="11" tab="Graph">
                              <apexchart
                                type="area"
                                height="350"
                                :options="chartOptions"
                                :series="series"
                              ></apexchart>
                            </a-tab-pane>
                            <a-tab-pane key="12" tab="Table" force-render>
                              <a-table
                                :columns="columns6"
                                :data-source="data6"
                                :pagination="false"
                                @change="onChange"
                              />
                            </a-tab-pane>
                          </a-tabs>
                          <template #extra
                            ><a>
                              <a-button class="btn blackBtn" @click="showModal5"
                                ><PlusOutlined
                              /></a-button> </a
                          ></template>
                        </a-card>
                      </a-col>
                      <a-col :sm="12" :xs="24">
                        <a-card title="Blood Oxygen Saturation">
                          <a-tabs v-model:activeKey="activeKey4">
                            <a-tab-pane key="13" tab="Graph">
                              <apexchart
                                type="area"
                                height="350"
                                :options="chartOptions"
                                :series="series"
                              ></apexchart>
                            </a-tab-pane>
                            <a-tab-pane key="14" tab="Table" force-render>
                              <a-table
                                :columns="columns6"
                                :data-source="data6"
                                :pagination="false"
                                @change="onChange"
                              />
                            </a-tab-pane>
                          </a-tabs>
                          <template #extra
                            ><a>
                              <a-button class="btn blackBtn" @click="showModal6"
                                ><PlusOutlined
                              /></a-button> </a
                          ></template>
                        </a-card>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                  <a-tab-pane key="3" tab="Documents">
                    <a-row :gutter="24">
                      <a-col :sm="24" :xs="24">
                        <div class="common-btn mb-24">
                          <a-button class="btn blackBtn" @click="showModal"
                            ><PlusOutlined
                          /></a-button>
                        </div>
                      </a-col>
                      <a-col :sm="24" :xs="24">
                        <a-table
                          :columns="columns"
                          :data-source="data"
                          :scroll="{ x: 900 }"
                          :pagination="false"
                          @change="onChange"
                        >
                          <template #action>
                            <a class="icons"><EditOutlined /></a>
                            <a class="icons"><DeleteOutlined /></a>
                          </template>
                        </a-table>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                  <a-tab-pane key="4" tab="Time Logs">
                    <a-row :gutter="24">
                      <a-col :sm="24" :xs="24">
                        <div class="common-btn mb-24">
                          <a-button class="btn blackBtn" @click="showModal1"
                            ><PlusOutlined
                          /></a-button>
                        </div>
                      </a-col>
                      <a-col :sm="24" :xs="24">
                        <a-table
                          :columns="columns1"
                          :data-source="data1"
                          :scroll="{ x: 900 }"
                          :pagination="false"
                          @change="onChange"
                        >
                          <template #action>
                            <a class="icons"><EditOutlined /></a>
                            <a class="icons"><DeleteOutlined /></a>
                          </template>
                        </a-table>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                  <a-tab-pane key="5" tab="Devices">
                    <a-row :gutter="24">
                      <a-col :sm="24" :xs="24">
                        <div class="common-btn mb-24">
                          <a-button class="btn blackBtn" @click="showModal2"
                            ><PlusOutlined
                          /></a-button>
                        </div>
                      </a-col>
                      <a-col :sm="24" :xs="24">
                        <a-table
                          :columns="columns2"
                          :data-source="data2"
                          :scroll="{ x: 900 }"
                          :pagination="false"
                          @change="onChange"
                        >
                          <template #active>
                            <a-switch v-model:checked="checked" />
                          </template>
                          <template #action>
                            <a class="icons"><DeleteOutlined /></a>
                          </template>
                        </a-table>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                  <a-tab-pane key="6" tab="Notes">
                    <a-row :gutter="24">
                      <a-col :sm="24" :xs="24">
                        <div class="common-btn mb-24">
                          <a-button class="btn blackBtn" @click="showModal2"
                            ><PlusOutlined
                          /></a-button>
                        </div>
                      </a-col>
                      <a-col :sm="24" :xs="24">
                        <a-table
                          :columns="columns3"
                          :data-source="data3"
                          :pagination="false"
                          @change="onChange"
                        >
                          <template #flags="{ text }">
                            <span class="box" :class="text"></span>
                            <span
                              class="box"
                              :class="(text = text.match(/yellowBgColor/g))"
                              v-if="text.match(/yellowBgColor/g)"
                            ></span>
                          </template>
                        </a-table>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modals-->
    <a-modal
      v-model:visible="visible"
      width="1000px"
      title="Add Notes"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Name</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Document</label>
            <a-input v-model="value" size="large" />
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
            >
              <a-select-option value="lucy">Id Proof</a-select-option>
              <a-select-option value="Yiminghe">Clinical</a-select-option>
              <a-select-option value="Yiminghe">Insurance</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Tags</label>
            <a-select
              v-model:value="selectedItemsForTag"
              mode="multiple"
              size="large"
              placeholder="Please Select Roles"
              style="width: 100%"
              :options="filteredOptionsForTag.map((item) => ({ value: item }))"
            />
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
    <a-modal
      v-model:visible="visible1"
      width="1000px"
      title="Add Device "
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Category</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Daily monitoring of vitals</a-select-option>
              <a-select-option value="Yiminghe">Provider Order For Lab</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Logged By</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Performed By</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Date</label>
            <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Time Amount</label>
            <a-time-picker
              v-model:value="value"
              format="HH:mm"
              :size="size"
              style="width: 100%"
            />
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
    <a-modal
      v-model:visible="visible2"
      width="1000px"
      title="Add Device"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Device Name</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Bloop Pressure</a-select-option>
              <a-select-option value="Yiminghe">Spo2</a-select-option>
              <a-select-option value="Yiminghe">Glucose</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Status</label>
            <a-switch v-model:checked="checked" />
          </div>
        </a-col>
      </a-row>
    </a-modal>

    <!---->
    <a-modal
      v-model:visible="visible3"
      width="1000px"
      title="Add Blood Report"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <label>Date & Time</label>
            <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <label>Systolic</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <label>Diastoli</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
      </a-row>
    </a-modal>

    <!---->
    <a-modal
      v-model:visible="visible4"
      width="1000px"
      title="Add Pulse"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Date & Time</label>
            <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Value</label>
            <a-input v-model="value" size="large" placeholder="Add Heart Rate" />
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
    <a-modal
      v-model:visible="visible5"
      width="1000px"
      title="Add Blood Glucose"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <label>Date & Time</label>
            <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <label>FBS</label>
            <a-input v-model="value" size="large" placeholder="value" />
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <label>RBS</label>
            <a-input v-model="value" size="large" placeholder="value" />
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
    <a-modal
      v-model:visible="visible6"
      width="1000px"
      title="Blood Oxygen Saturation"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Date & Time</label>
            <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Value</label>
            <a-input v-model="value" size="large" placeholder="Value" />
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
    <a-modal
      v-model:visible="visible7"
      width="1000px"
      title="Add Health"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Date & Time</label>
            <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Value</label>
            <a-input v-model="value" size="large" placeholder="Value" />
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
    <a-modal
      v-model:visible="visible8"
      width="1000px"
      title="Add Care Coordinators"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
          <a-row :gutter="24" class="mb-24">
            <a-col :sm="20" :xs="24">
              <a-input v-model="value" size="large" placeholder="Enter Search Here..." />
            </a-col>
            <a-col :sm="4" :xs="24">
              <a-button class="btn primaryBtn" size="large"> Add New </a-button>
            </a-col>
          </a-row>
        </a-col>
        <a-col :sm="24" :xs="24">
          <a-table
            :columns="columns7"
            :data-source="data7"
            :pagination="false"
            @change="onChange"
          >
            <template #checkbox>
              <a-checkbox v-model:checked="checked"></a-checkbox>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
    <a-modal
      v-model:visible="visible9"
      width="1000px"
      title="Add Family Coordinators"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>First Name</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Last Name</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Email</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Phone No</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Relationship</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Brother</a-select-option>
              <a-select-option value="Yiminghe">Sister</a-select-option>
              <a-select-option value="Yiminghe">Mother</a-select-option>
              <a-select-option value="Yiminghe">Father</a-select-option>
            </a-select>
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
  </div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { defineComponent, ref, computed } from "vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
const OPTIONSTAG = ["Manger", "Billing Admin", "User Admin"];
const value = ref(dayjs("12:08", "HH:mm"));

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Document",
    dataIndex: "document",
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: {
      compare: (a, b) => a.message - b.message,
      multiple: 3,
    },
  },
  {
    title: "Tags",
    dataIndex: "tags",
    sorter: {
      compare: (a, b) => a.patient - b.patient,
      multiple: 2,
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];
const data = [
  {
    key: "1",
    name: "Program 1",
    document: "abc.pdf",
    type: "Voter ID",
    tags: "Voter ID",
    action: "",
  },
  {
    key: "2",
    name: "Program 1",
    document: "abc.pdf",
    type: "Voter ID",
    tags: "Voter ID",
    action: "",
  },
];
const columns1 = [
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Logged By",
    dataIndex: "logged",
  },
  {
    title: "Performed By",
    dataIndex: "performed",
    sorter: {
      compare: (a, b) => a.performed - b.performed,
      multiple: 3,
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: {
      compare: (a, b) => a.date - b.date,
      multiple: 2,
    },
  },
  {
    title: "Time Amount",
    dataIndex: "time",
    sorter: {
      compare: (a, b) => a.time - b.time,
      multiple: 2,
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];
const data1 = [
  {
    key: "1",
    category: "Daily monitoring of vitals",
    logged: "Jane Doe",
    performed: "Steve Smith",
    date: "Oct 25, 2021",
    time: "3:00",
    action: "",
  },
  {
    key: "2",
    category: "Provider Order For Lab",
    logged: "Jane Doe",
    performed: "Steve Smith",
    date: "Oct 28, 2021",
    time: "2:00",
    action: "",
  },
];
const columns2 = [
  {
    title: "Device",
    dataIndex: "device",
  },
  {
    title: "Active/Inactive",
    dataIndex: "active",
    slots: {
      customRender: "active",
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];
const data2 = [
  {
    key: "1",
    device: "Blood Pressure",
    active: "",
    action: "",
  },
  {
    key: "2",
    device: "Glucose",
    active: "",
    action: "",
  },
];
const columns3 = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Note",
    dataIndex: "note",
  },
  {
    title: "Flag",
    dataIndex: "flag",
    slots: {
      customRender: "flags",
    },
  },
];
const data3 = [
  {
    key: "1",
    date: "Nov 10, 2021",
    note:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptatibus dolore, vel error harum porro totam eveniet modi iusto eos, dolorum provident aliquid earum corporis veritatis? Officiis molestiae amet ullam?",
    flag: "blueBgColor",
  },
  {
    key: "2",
    date: "Nov 11, 2021",
    note:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptatibus dolore, vel error harum porro totam eveniet modi iusto eos, dolorum provident aliquid earum corporis veritatis? Officiis molestiae amet ullam?",
    flag: "redBgColor",
  },
];
const columns4 = [
  {
    title: "Date Recorded",
    dataIndex: "recorded",
  },
  {
    title: "Value",
    dataIndex: "value",
  },
];
const data4 = [
  {
    key: "1",
    recorded: "Nov 05, 2021 10:00 AM",
    value: "120/80",
  },
  {
    key: "2",
    recorded: "Nov 06, 2021 10:00 AM",
    value: "122/80",
  },
  {
    key: "3",
    recorded: "Nov 08, 2021 10:00 AM",
    value: "122/80",
  },
  {
    key: "4",
    recorded: "Nov 09, 2021 10:00 AM",
    value: "122/80",
  },
  {
    key: "5",
    recorded: "Nov 11, 2021 10:00 AM",
    value: "122/80",
  },
];
const columns5 = [
  {
    title: "Date Recorded",
    dataIndex: "recorded",
  },
  {
    title: "Value",
    dataIndex: "value",
  },
];
const data5 = [
  {
    key: "1",
    recorded: "Nov 05, 2021 10:00 AM",
    value: "68",
  },
  {
    key: "2",
    recorded: "Nov 06, 2021 10:00 AM",
    value: "70",
  },
  {
    key: "3",
    recorded: "Nov 08, 2021 10:00 AM",
    value: "75",
  },
  {
    key: "4",
    recorded: "Nov 09, 2021 10:00 AM",
    value: "80",
  },
  {
    key: "5",
    recorded: "Nov 11, 2021 10:00 AM",
    value: "60",
  },
];
const columns6 = [
  {
    title: "Date Recorded",
    dataIndex: "recorded",
  },
  {
    title: "Value",
    dataIndex: "value",
  },
];
const data6 = [
  {
    key: "1",
    recorded: "Nov 05, 2021 10:00 AM",
    value: "105",
  },
  {
    key: "2",
    recorded: "Nov 06, 2021 10:00 AM",
    value: "100",
  },
  {
    key: "3",
    recorded: "Nov 08, 2021 10:00 AM",
    value: "95",
  },
  {
    key: "4",
    recorded: "Nov 09, 2021 10:00 AM",
    value: "120",
  },
  {
    key: "5",
    recorded: "Nov 11, 2021 10:00 AM",
    value: "130",
  },
];
const columns7 = [
  {
    title: "",
    dataIndex: "checkbox",
    slots: {
      customRender: "checkbox",
    },
  },
  {
    title: "First Name",
    dataIndex: "first",
  },
  {
    title: "Last Name",
    dataIndex: "last",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
];
const data7 = [
  {
    key: "1",
    checkbox: "",
    first: "Jane",
    last: "Doe",
    role: "Physician",
  },
  {
    key: "2",
    checkbox: "",
    first: "Steve",
    last: "Smith",
    role: "Cardiologist",
  },
  {
    key: "3",
    checkbox: "",
    first: "Joseph",
    last: "William",
    role: "RN",
  },
  {
    key: "4",
    checkbox: "",
    first: "Robert",
    last: "Henry",
    role: "Physician",
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
  data: function () {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
    };
  },

  setup() {
    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
    }
    const activeKey5 = ref(["1"]);
    const checked = ref(false);

    const visible = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);
    const visible4 = ref(false);
    const visible5 = ref(false);
    const visible6 = ref(false);
    const visible7 = ref(false);
    const visible8 = ref(false);
    const visible9 = ref(false);

    const showModal = () => {
      visible.value = true;
    };
    const showModal1 = () => {
      visible1.value = true;
    };
    const showModal2 = () => {
      visible2.value = true;
    };
    const showModal3 = () => {
      visible3.value = true;
    };
    const showModal4 = () => {
      visible4.value = true;
    };
    const showModal5 = () => {
      visible5.value = true;
    };
    const showModal6 = () => {
      visible6.value = true;
    };
    const showModal7 = () => {
      visible7.value = true;
    };
    const showModal8 = () => {
      visible8.value = true;
    };
    const showModal9 = () => {
      visible9.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    const selectedItemsForTag = ref(["Manager"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );
    const onClose = (e) => {
      console.log(e, "I was closed.");
    };

    return {
      data,
      columns,
      data1,
      columns1,
      data2,
      columns2,
      data3,
      columns3,
      data4,
      columns4,
      data5,
      columns5,
      data6,
      columns6,
      data7,
      columns7,

      visible,
      visible1,
      visible2,
      visible3,
      visible4,
      visible5,
      visible6,
      visible7,
      visible8,
      visible9,

      showModal,
      showModal1,
      showModal2,
      showModal3,
      showModal4,
      showModal5,
      showModal6,
      showModal7,
      showModal8,
      showModal9,

      handleOk,

      logout,
      filteredOptionsForTag,
      selectedItemsForTag,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
      activeKey: ref("2"),
      activeKey1: ref("7"),
      activeKey2: ref("9"),
      activeKey3: ref("11"),
      activeKey4: ref("13"),
      value1: ref(),
      size: ref("large"),
      value,
      dayjs,
      checked,
      onClose,
    };
  },
};
</script>

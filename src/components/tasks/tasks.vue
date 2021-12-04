<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
        >
          <Sidebar />
        </a-layout-sider>
        <a-layout-content>
          <div class="tasks">
            <a-row>
              <a-col :span="24">
                <h2 class="pageTittle">
                  Tasks
                  <div class="commonBtn">
                    <a-button class="btn primaryBtn" @click="showModal"
                      >Add Task</a-button
                    >
                  </div>
                </h2>
              </a-col>
            </a-row>
            <a-row class="mb-24" :gutter="24">
              <a-col :lg="8" :md="12" :sm="24" :xs="24">
                <div class="task-box">
                  <div class="task-header">
                    <h2>Waiting</h2>
                    <div class="actions">
                      <a-dropdown @click="toggle = !toggle">
                        <a class="ant-dropdown-link"> <PlusOutlined /></a>
                      </a-dropdown>
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <EllipsisOutlined
                        /></a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item key="0">
                              <a href="#">Add rule to section</a>
                            </a-menu-item>
                            <a-menu-item key="1">
                              <a href="#">Rename Section</a>
                            </a-menu-item>
                            <a-menu-item key="2">
                              <a href="#">Add Section</a>
                            </a-menu-item>
                            <a-menu-item key="3">
                              <a href="#">Delete Section</a>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                  </div>
                  <div class="task-body">
                    <div class="task-card" :class="toggle ? '' : 'hide'">
                      <a-input
                        v-model="value"
                        size="large"
                        placeholder="Write a task name"
                      />
                      <div class="drop-links">
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <UserOutlined />
                          </a>
                          <template #overlay>
                            <a-row :gutter="24">
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Assigned To</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Category</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Priority</label>
                                  <a-select
                                    ref="select"
                                    v-model="value1"
                                    style="width: 100%"
                                    size="medium"
                                    @focus="focus"
                                    @change="handleChange"
                                  >
                                    <a-select-option value="lucy">Urgent</a-select-option>
                                    <a-select-option value="Yiminghe"
                                      >Medium</a-select-option
                                    >
                                    <a-select-option value="Yiminghe"
                                      >Normal</a-select-option
                                    >
                                  </a-select>
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Short Description</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                            </a-row>
                          </template>
                        </a-dropdown>
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <CalendarOutlined
                          /></a>
                          <template #overlay>
                            <a-row :gutter="24">
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Start Date</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Due Date</label>
                                  <a-input v-model="value" size="medium" />
                                </div> </a-col
                            ></a-row>
                          </template>
                        </a-dropdown>
                      </div>
                    </div>
                    <div class="task-card">
                      <div class="menu">
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <EllipsisOutlined
                          /></a>
                          <template #overlay>
                            <a-menu>
                              <a-menu-item key="0">
                                <a href="#">Edit Task Name</a>
                              </a-menu-item>
                              <a-menu-item key="1">
                                <a href="#">View Detail</a>
                              </a-menu-item>
                              <a-menu-item key="2">
                                <a href="#">Delete Task</a>
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                      </div>
                      <h3>Medical Record for P. Pan</h3>
                      <p>Request medical records from his PCP</p>
                      <div class="time-tasks">
                        <div class="time">
                          <p>2 day ago</p>
                          <div class="category bg-primary">Onboard</div>
                        </div>
                        <div class="staff">
                          <ul>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="task-card">
                      <div class="menu">
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <EllipsisOutlined
                          /></a>
                          <template #overlay>
                            <a-menu>
                              <a-menu-item key="0">
                                <a href="#">Edit Task Name</a>
                              </a-menu-item>
                              <a-menu-item key="1">
                                <a href="#">View Detail</a>
                              </a-menu-item>
                              <a-menu-item key="2">
                                <a href="#">Delete Task</a>
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                      </div>
                      <h3>Medical Record for P. Pan</h3>
                      <p>Request medical records from his PCP</p>
                      <div class="time-tasks">
                        <div class="time">
                          <p>2 day ago</p>
                          <div class="category bg-primary">Onboard</div>
                        </div>
                        <div class="staff">
                          <ul>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="add-task">
                    <a href="javascript:void(0)"><PlusOutlined />Add Task</a>
                  </div>
                </div>
              </a-col>
              <a-col :lg="8" :md="12" :sm="24" :xs="24">
                <div class="task-box">
                  <div class="task-header">
                    <h2>In Progress</h2>
                    <div class="actions">
                      <a-dropdown @click="toggle1 = !toggle1">
                        <a class="ant-dropdown-link"> <PlusOutlined /></a>
                      </a-dropdown>
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <EllipsisOutlined
                        /></a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item key="0">
                              <a href="#">Add rule to section</a>
                            </a-menu-item>
                            <a-menu-item key="1">
                              <a href="#">Rename Section</a>
                            </a-menu-item>
                            <a-menu-item key="2">
                              <a href="#">Add Section</a>
                            </a-menu-item>
                            <a-menu-item key="3">
                              <a href="#">Delete Section</a>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                  </div>
                  <div class="task-body">
                    <div class="task-card" :class="toggle1 ? '' : 'hide'">
                      <a-input
                        v-model="value"
                        size="large"
                        placeholder="Write a task name"
                      />
                      <div class="drop-links">
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <UserOutlined />
                          </a>
                          <template #overlay>
                            <a-row :gutter="24">
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Assigned To</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Category</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Priority</label>
                                  <a-select
                                    ref="select"
                                    v-model="value1"
                                    style="width: 100%"
                                    size="medium"
                                    @focus="focus"
                                    @change="handleChange"
                                  >
                                    <a-select-option value="lucy">Urgent</a-select-option>
                                    <a-select-option value="Yiminghe"
                                      >Medium</a-select-option
                                    >
                                    <a-select-option value="Yiminghe"
                                      >Normal</a-select-option
                                    >
                                  </a-select>
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Short Description</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                            </a-row>
                          </template>
                        </a-dropdown>
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <CalendarOutlined
                          /></a>
                          <template #overlay>
                            <a-row :gutter="24">
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Start Date</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Due Date</label>
                                  <a-input v-model="value" size="medium" />
                                </div> </a-col
                            ></a-row>
                          </template>
                        </a-dropdown>
                      </div>
                    </div>
                    <div class="task-card">
                      <div class="menu">
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <EllipsisOutlined
                          /></a>
                          <template #overlay>
                            <a-menu>
                              <a-menu-item key="0">
                                <a href="#">Edit Task Name</a>
                              </a-menu-item>
                              <a-menu-item key="1">
                                <a href="#">View Detail</a>
                              </a-menu-item>
                              <a-menu-item key="2">
                                <a href="#">Delete Task</a>
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                      </div>
                      <h3>Medical Record for P. Pan</h3>
                      <p>Request medical records from his PCP</p>
                      <div class="time-tasks">
                        <div class="time">
                          <p>2 day ago</p>
                          <div class="category bg-danger">Urgent</div>
                        </div>
                        <div class="staff">
                          <ul>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="task-card">
                      <div class="menu">
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <EllipsisOutlined
                          /></a>
                          <template #overlay>
                            <a-menu>
                              <a-menu-item key="0">
                                <a href="#">Edit Task Name</a>
                              </a-menu-item>
                              <a-menu-item key="1">
                                <a href="#">View Detail</a>
                              </a-menu-item>
                              <a-menu-item key="2">
                                <a href="#">Delete Task</a>
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                      </div>
                      <h3>Medical Record for P. Pan</h3>
                      <p>Request medical records from his PCP</p>
                      <div class="time-tasks">
                        <div class="time">
                          <p>2 day ago</p>
                        </div>
                        <div class="staff">
                          <ul>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="add-task">
                    <a href="javascript:void(0)"><PlusOutlined />Add Task</a>
                  </div>
                </div>
              </a-col>
              <a-col :lg="8" :md="12" :sm="24" :xs="24">
                <div class="task-box">
                  <div class="task-header">
                    <h2>Completed</h2>
                    <div class="actions">
                      <a-dropdown @click="toggle2 = !toggle2">
                        <a class="ant-dropdown-link"> <PlusOutlined /></a>
                      </a-dropdown>
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <EllipsisOutlined
                        /></a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item key="0">
                              <a href="#">Add rule to section</a>
                            </a-menu-item>
                            <a-menu-item key="1">
                              <a href="#">Rename Section</a>
                            </a-menu-item>
                            <a-menu-item key="2">
                              <a href="#">Add Section</a>
                            </a-menu-item>
                            <a-menu-item key="3">
                              <a href="#">Delete Section</a>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                  </div>
                  <div class="task-body">
                    <div class="task-card" :class="toggle2 ? '' : 'hide'">
                      <a-input
                        v-model="value"
                        size="large"
                        placeholder="Write a task name"
                      />
                      <div class="drop-links">
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <UserOutlined />
                          </a>
                          <template #overlay>
                            <a-row :gutter="24">
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Assigned To</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Category</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Priority</label>
                                  <a-select
                                    ref="select"
                                    v-model="value1"
                                    style="width: 100%"
                                    size="medium"
                                    @focus="focus"
                                    @change="handleChange"
                                  >
                                    <a-select-option value="lucy">Urgent</a-select-option>
                                    <a-select-option value="Yiminghe"
                                      >Medium</a-select-option
                                    >
                                    <a-select-option value="Yiminghe"
                                      >Normal</a-select-option
                                    >
                                  </a-select>
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Short Description</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                            </a-row>
                          </template>
                        </a-dropdown>
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <CalendarOutlined
                          /></a>
                          <template #overlay>
                            <a-row :gutter="24">
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Start Date</label>
                                  <a-input v-model="value" size="medium" />
                                </div>
                              </a-col>
                              <a-col :sm="24" :xs="24">
                                <div class="form-group">
                                  <label>Due Date</label>
                                  <a-input v-model="value" size="medium" />
                                </div> </a-col
                            ></a-row>
                          </template>
                        </a-dropdown>
                      </div>
                    </div>
                    <div class="task-card">
                      <div class="menu">
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <EllipsisOutlined
                          /></a>
                          <template #overlay>
                            <a-menu>
                              <a-menu-item key="0">
                                <a href="#">Edit Task Name</a>
                              </a-menu-item>
                              <a-menu-item key="1">
                                <a href="#">View Detail</a>
                              </a-menu-item>
                              <a-menu-item key="2">
                                <a href="#">Delete Task</a>
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                      </div>
                      <h3>Medical Record for P. Pan</h3>
                      <p>Request medical records from his PCP</p>
                      <div class="time-tasks">
                        <div class="time">
                          <p>2 day ago</p>
                          <div class="category bg-primary">Onboard</div>
                        </div>
                        <div class="staff">
                          <ul>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="task-card">
                      <div class="menu">
                        <a-dropdown :trigger="['click']">
                          <a class="ant-dropdown-link" @click.prevent>
                            <EllipsisOutlined
                          /></a>
                          <template #overlay>
                            <a-menu>
                              <a-menu-item key="0">
                                <a href="#">Edit Task Name</a>
                              </a-menu-item>
                              <a-menu-item key="1">
                                <a href="#">View Detail</a>
                              </a-menu-item>
                              <a-menu-item key="2">
                                <a href="#">Delete Task</a>
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                      </div>
                      <h3>Medical Record for P. Pan</h3>
                      <p>Request medical records from his PCP</p>
                      <div class="time-tasks">
                        <div class="time">
                          <p>2 day ago</p>
                          <div class="category bg-primary">Onboard</div>
                        </div>
                        <div class="staff">
                          <ul>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                            <li>
                              <img src="../../assets/images/profile-1.jpg" alt="image" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="add-task">
                    <a href="javascript:void(0)"><PlusOutlined />Add Task</a>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modal-->
    <a-modal
      v-model:visible="visible"
      width="1140px"
      title="Add Task"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="form-group">
            <label>Title</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <label> Short Description</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <label>Status</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Choose Status </a-select-option>
              <a-select-option value="Yiminghe">Waiting</a-select-option>
              <a-select-option value="Yiminghe">Inprogress</a-select-option>
              <a-select-option value="Yiminghe">Completed</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <label> Priority</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Urgent</a-select-option>
              <a-select-option value="Yiminghe">Medium</a-select-option>
              <a-select-option value="Yiminghe">Normal</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <label>Assigned To</label>
            <a-select
              v-model:value="selectedItems"
              mode="multiple"
              size="large"
              placeholder="Please Select Roles"
              style="width: 100%"
              :options="filteredOptions.map((item) => ({ value: item }))"
            />
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <label>Category</label>
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
        <a-col :span="12">
          <div class="form-group">
            <label>Start Date</label>
            <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <label>Due Date</label>
            <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
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
import { defineComponent, ref, computed } from "vue";
import {
  EllipsisOutlined,
  PlusOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons-vue";
const OPTIONS = ["Jane Doe", "Steve Smith", "Joseph William"];
const OPTIONSTAG = ["Admin", "Clinical", "Office", "Personal"];

export default {
  components: {
    Header,
    Sidebar,
    EllipsisOutlined,
    PlusOutlined,
    UserOutlined,
    CalendarOutlined,
  },

  setup() {
    const visible = ref(false);
    const toggle = ref(false);
    const toggle1 = ref(false);
    const toggle2 = ref(false);
    const current = ref(0);
    const showModal = () => {
      visible.value = true;
    };

    const selectedItems = ref(["Jane Doe"]);
    const filteredOptions = computed(() =>
      OPTIONS.filter((o) => !selectedItems.value.includes(o))
    );

    const selectedItemsForTag = ref(["Admin"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    return {
      visible,
      showModal,
      handleOk,
      handleChange,
      selectedItems,
      filteredOptions,
      filteredOptionsForTag,
      selectedItemsForTag,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
      current,
      size: ref("large"),
      toggle,
      toggle1,
      toggle2,
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

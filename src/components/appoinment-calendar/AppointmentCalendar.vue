<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          :style="{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }"
          ><Sidebar
        /></a-layout-sider>
        <a-layout-content>
          <a-row>
            <a-col :span="24">
              <h2 class="pageTittle">
                Appointment Calendar
                <div class="commonBtn">
                  <a-button class="btn primaryBtn" @click="toggle = !toggle">{{
                    toggle ? "Full Calendar View" : "Hide Calendar View"
                  }}</a-button>
                </div>
              </h2>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="6" :sm="24" :xs="24" v-show="toggle">
              <div class="apptBtn">
                <a-button class="btn primaryBtn" @click="showModal">
                  New Appointment</a-button
                >
              </div>
              <div class="calendar">
                <div style="width: 100%; border: 1px solid #d9d9d9; border-radius: 4px">
                  <a-calendar
                    v-model:value="value"
                    :fullscreen="false"
                    @panelChange="onPanelChange"
                  >
                    <template
                      #headerRender="{ value: current, type, onChange, onTypeChange }"
                    >
                      <div style="padding: 10px">
                        <!-- <div style="margin-bottom: 10px">Custom header</div> -->
                        <a-row type="flex" justify="space-between">
                          <a-col>
                            <a-radio-group
                              size="small"
                              :value="type"
                              @change="(e) => onTypeChange(e.target.value)"
                            >
                              <a-radio-button value="month">Month</a-radio-button>
                              <a-radio-button value="year">Year</a-radio-button>
                            </a-radio-group>
                          </a-col>
                          <a-col>
                            <a-select
                              size="small"
                              :dropdown-match-select-width="false"
                              class="my-year-select"
                              :value="String(current.year())"
                              @change="
                                (newYear) => {
                                  onChange(current.year(newYear));
                                }
                              "
                            >
                              <a-select-option
                                v-for="val in getYears(current)"
                                :key="String(val)"
                                class="year-item"
                              >
                                {{ val }}
                              </a-select-option>
                            </a-select>
                          </a-col>
                          <a-col>
                            <a-select
                              size="small"
                              :dropdown-match-select-width="false"
                              :value="String(current.month())"
                              @change="
                                (selectedMonth) => {
                                  onChange(current.month(parseInt(selectedMonth, 10)));
                                  onChange(current.month(parseInt(selectedMonth, 10)));
                                }
                              "
                            >
                              <a-select-option
                                v-for="(val, index) in getMonths(current)"
                                :key="String(index)"
                                class="month-item"
                              >
                                {{ val }}
                              </a-select-option>
                            </a-select>
                          </a-col>
                        </a-row>
                      </div>
                    </template>
                  </a-calendar>
                </div>
              </div>
              <div class="physicians">
                 <a-row :gutter="16">
                   <a-col :span="24">
                    <div class="phyInner">
                      <h2>Physicians</h2>
                    </div>
                   </a-col>
                  <a-col :span="12">
                    <div class="phyInner">
                     <a-avatar :size="80" src="http://ditstekdemo.com/ditstek-care/img/profile-1.jpg" />
                     <span class="checkIcon one"><CheckOutlined /></span>
                     <p>Steve Smith</p>
                     </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="phyInner">
                     <a-avatar :size="80" src="http://ditstekdemo.com/ditstek-care/img/profile-4.jpg" />
                     <span class="checkIcon two"><CheckOutlined /></span>
                     <p>Robert Henry</p>
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="phyInner">
                     <a-avatar :size="80" src="http://ditstekdemo.com/ditstek-care/img/profile-1.jpg" />
                     <span class="checkIcon three"><CheckOutlined /></span>
                     <p>Smith Joseph</p>
                     </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="phyInner">
                     <a-avatar :size="80" src="http://ditstekdemo.com/ditstek-care/img/profile-4.jpg" />
                     <span class="checkIcon four"><CheckOutlined /></span>
                     <p>Jane Doe</p>
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="phyInner" @click="showModal2">
                     <a-avatar :size="80" title="Add Physician">
                       <template #icon>
                        <PlusOutlined />
                      </template>
                     </a-avatar>
                    </div>
                  </a-col>
                 </a-row>
                 
              </div>
            </a-col>
            <a-col :md="toggle == false ? 24 : 18" :sm="24" :xs="24">
              <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="Day">
                  <a-row>
                    <a-col :span="24">
                      <div class="dayCalendar">
                        <table class="table table-bordered">
                          <tbody>
                            <tr>
                              <th>08:00 AM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>09:00 AM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>10:00 AM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>11:00 AM</th>
                              <td>
                                <a-dropdown
                                  :placement="topLeft"
                                  :trigger="['click']"
                                  overlayClassName="valueItem"
                                >
                                  <a class="ant-dropdown-link one" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph </span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="1">
                                        <div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div>
                                        </div>
                                      </a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                            <tr>
                              <th>12:00 PM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>01:00 PM</th>
                              <td>
                                <a-dropdown :trigger="['click']">
                                  <a class="ant-dropdown-link two" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="0">
                                        <div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div>
                                        </div>
                                      </a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                            <tr>
                              <th>02:00 PM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>03:00 PM</th>
                              <td>
                                <a-dropdown
                                  :placement="topLeft"
                                  :trigger="['click']"
                                  overlayClassName="valueItem"
                                >
                                  <a class="ant-dropdown-link three" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="1"
                                        ><div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div></div
                                      ></a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                                <a-dropdown
                                  :placement="topLeft"
                                  :trigger="['click']"
                                  overlayClassName="valueItem"
                                >
                                  <a class="ant-dropdown-link four" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="1"
                                        ><div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div></div
                                      ></a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                            <tr>
                              <th>04:00 PM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>05:00 PM</th>
                              <td>
                                <a-dropdown
                                  :placement="topLeft"
                                  :trigger="['click']"
                                  overlayClassName="valueItem"
                                >
                                  <a class="ant-dropdown-link one" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="1"
                                        ><div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div></div
                                      ></a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </a-col>
                  </a-row>
                </a-tab-pane>
                <a-tab-pane key="2" tab="Tomorrow" force-render>
                  <a-row>
                    <a-col :span="24">
                      <div class="dayCalendar">
                        <table class="table table-bordered">
                          <tbody>
                            <tr>
                              <th>08:00 AM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>09:00 AM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>10:00 AM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>11:00 AM</th>
                              <td>
                                <a-dropdown
                                  :placement="topLeft"
                                  :trigger="['click']"
                                  overlayClassName="valueItem"
                                >
                                  <a class="ant-dropdown-link one" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="1"
                                        ><div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div></div
                                      ></a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                            <tr>
                              <th>12:00 PM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>01:00 PM</th>
                              <td>
                                <a-dropdown :trigger="['click']">
                                  <a class="ant-dropdown-link two" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="0">
                                        <div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div>
                                        </div>
                                      </a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                            <tr>
                              <th>02:00 PM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>03:00 PM</th>
                              <td>
                                <a-dropdown
                                  :placement="topLeft"
                                  :trigger="['click']"
                                  overlayClassName="valueItem"
                                >
                                  <a class="ant-dropdown-link three" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="1"
                                        ><div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div></div
                                      ></a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                                <a-dropdown
                                  :placement="topLeft"
                                  :trigger="['click']"
                                  overlayClassName="valueItem"
                                >
                                  <a class="ant-dropdown-link four" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="1"
                                        ><div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div></div
                                      ></a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                            <tr>
                              <th>04:00 PM</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>05:00 PM</th>
                              <td>
                                <a-dropdown
                                  :placement="topLeft"
                                  :trigger="['click']"
                                  overlayClassName="valueItem"
                                >
                                  <a class="ant-dropdown-link one" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="1"
                                        ><div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div></div
                                      ></a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </a-col>
                  </a-row>
                </a-tab-pane>
                <a-tab-pane key="3" tab="Week">
                  <a-row>
                    <a-col :span="24">
                      <div class="dayCalendar">
                        <table class="table table-bordered">
                          <tbody>
                            <tr>
                              <th>Mon</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>Tue</th>
                              <td>
                                <a-dropdown :trigger="['click']">
                                  <a class="ant-dropdown-link one" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="0">
                                        <div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div>
                                        </div>
                                      </a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                            <tr>
                              <th>Wed</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>Thu</th>
                              <td>
                                <a-dropdown
                                  :placement="topLeft"
                                  :trigger="['click']"
                                  overlayClassName="valueItem"
                                >
                                  <a class="ant-dropdown-link two" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="1"
                                        ><div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div></div
                                      ></a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                            <tr>
                              <th>Fri</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>Sat</th>
                              <td>
                                <a-dropdown :trigger="['click']">
                                  <a class="ant-dropdown-link three" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="0">
                                        <div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div>
                                        </div>
                                      </a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                                <a-dropdown :trigger="['click']">
                                  <a class="ant-dropdown-link four" @click.prevent>
                                    <div class="dropdown">
                                      <p>
                                        <span>Smith Joseph</span>
                                        <span>10:00 AM - 11:00 AM</span>
                                      </p>
                                      <img
                                        src="../../assets/images/profile-1.jpg"
                                        alt="image"
                                      />
                                    </div>
                                  </a>
                                  <template #overlay>
                                    <a-menu>
                                      <a-menu-item key="0">
                                        <div class="calendarDropdown">
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">
                                              Appointment Type
                                            </div>
                                            <div class="rightWrapper">Clinical</div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Date Time</div>
                                            <div class="rightWrapper">
                                              December 12, 2021 12:00 PM
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Coordinator</div>
                                            <div class="rightWrapper">
                                              <router-link to="patients-summary">
                                                Steve Smith
                                              </router-link>
                                            </div>
                                          </div>
                                          <div class="itemWrapper">
                                            <div class="leftWrapper">Program</div>
                                            <div class="rightWrapper">Program 1</div>
                                          </div>
                                          <div class="notesWrapper">
                                            <span>Notes</span>
                                            <p>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Lorem ipsum dolor sit
                                              amet, consectetur adipisicing elit.
                                            </p>
                                          </div>
                                          <div class="createTask">
                                            <a-tooltip placement="left">
                                              <template #title>
                                                <span>Add Task</span>
                                              </template>
                                              <router-link to="tasks"
                                                ><FileAddOutlined
                                              /></router-link>
                                            </a-tooltip>
                                          </div>
                                        </div>
                                      </a-menu-item>
                                    </a-menu>
                                  </template>
                                </a-dropdown>
                              </td>
                            </tr>
                            <tr>
                              <th>Sun</th>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </a-col>
                  </a-row>
                </a-tab-pane>
                <a-tab-pane key="4" tab="Month">
                  <a-row>
                    <a-col :span="24">
                      <div class="table-responsive">
                        <div class="monthCalendar dayCalendar">
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                                <th>Sun</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <span class="date"></span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link one" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="0">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link two" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="0">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">2</span>
                                </td>
                                <td>
                                  <span class="date">3</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link three" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">4</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link four" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">5</span>
                                </td>
                                <td>
                                  <span class="date">6</span>
                                </td>
                                <td>
                                  <span class="date">7</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span class="date">8</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link one" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">9</span>
                                </td>
                                <td>
                                  <span class="date">10</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link three" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">11</span>
                                </td>
                                <td>
                                  <span class="date">12</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link four" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">13</span>
                                </td>
                                <td>
                                  <span class="date">14</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span class="date">15</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link four" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">16</span>
                                </td>
                                <td>
                                  <span class="date">17</span>
                                </td>
                                <td>
                                  <span class="date">18</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link three" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">19</span>
                                </td>
                                <td>
                                  <span class="date">20</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link one" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">21</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span class="date">22</span>
                                </td>
                                <td>
                                  <span class="date">23</span>
                                </td>
                                <td>
                                  <span class="date">24</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link four" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">25</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link one" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">26</span>
                                </td>
                                <td>
                                  <span class="date">27</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link three" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">28</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link one" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span class="date">29</span>
                                </td>
                                <td>
                                  <span class="date">30</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link three" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">1</span>
                                </td>
                                <td>
                                  <span class="date">2</span>
                                </td>
                                <td>
                                  <span class="date">3</span>
                                </td>
                                <td>
                                  <span class="date">4</span>
                                  <a-dropdown
                                    :trigger="['click']"
                                    overlayClassName="monthValue"
                                  >
                                    <a class="ant-dropdown-link four" @click.prevent>
                                      <div class="dropdown">
                                        <p>
                                          <span>Smith Joseph</span>
                                          <span>05:00 PM - 06:00 PM</span>
                                        </p>
                                      </div>
                                    </a>
                                    <template #overlay>
                                      <a-menu>
                                        <a-menu-item key="1">
                                          <div class="calendarDropdown">
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">
                                                Appointment Type
                                              </div>
                                              <div class="rightWrapper">Clinical</div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Date Time</div>
                                              <div class="rightWrapper">
                                                December 12, 2021 12:00 PM
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Coordinator</div>
                                              <div class="rightWrapper">
                                                <router-link to="patients-summary">
                                                  Steve Smith
                                                </router-link>
                                              </div>
                                            </div>
                                            <div class="itemWrapper">
                                              <div class="leftWrapper">Program</div>
                                              <div class="rightWrapper">Program 1</div>
                                            </div>
                                            <div class="notesWrapper">
                                              <span>Notes</span>
                                              <p>
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit. Lorem ipsum dolor sit
                                                amet, consectetur adipisicing elit.
                                              </p>
                                            </div>
                                            <div class="createTask">
                                              <a-tooltip placement="left">
                                                <template #title>
                                                  <span>Add Task</span>
                                                </template>
                                                <router-link to="tasks"
                                                  ><FileAddOutlined
                                                /></router-link>
                                              </a-tooltip>
                                            </div>
                                          </div>
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                  </a-dropdown>
                                </td>
                                <td>
                                  <span class="date">5</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </a-col>
                  </a-row>
                </a-tab-pane>
              </a-tabs>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modal-->
    <AddAppointment v-model:visible="appointmentModal" @ok="handleOk" />
    <AddPhysician v-model:visible="physicianModal" @ok="handleOk2" />
    <!---->
  </div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import AddAppointment from "@/components/modals/AddAppointment";
import AddPhysician from "@/components/modals/AddPhysician";

import { defineComponent, ref } from "vue";
import { FileAddOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    Header,
    Sidebar,
    AddAppointment,
    FileAddOutlined,
    CheckOutlined,
    PlusOutlined,
    AddPhysician
  },

  setup() {
    const toggle = ref(true);

    const value = ref();
    const onPanelChange = (value, mode) => {
      console.log(value, mode);
    };
    const getMonths = (value) => {
      const localeData = value.localeData();
      const months = [];

      for (let i = 0; i < 12; i++) {
        months.push(localeData.monthsShort(value.month(i)));
      }
      return months;
    };
    const getYears = (value) => {
      const year = value.year();
      const years = [];
      for (let i = year - 10; i < year + 10; i += 1) {
        years.push(i);
      }
      return years;
    };

    const appointmentModal = ref(false);
    const showModal = () => {
      appointmentModal.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      appointmentModal.value = false;
    };

    const physicianModal = ref(false);
    const showModal2 = () => {
      physicianModal.value = true;
    };
    const handleOk2 = (e) => {
      console.log(e);
      physicianModal.value = false;
    };

    return {
      value1: ref(),
      toggle,
      value,
      onPanelChange,
      getMonths,
      getYears,

      appointmentModal,
      handleOk,
      showModal,
      handleOk2,
      showModal2,
      physicianModal,
    };
  },
};
</script>

<style scoped>
.apptBtn {
  text-align: center;
  margin: 0 0 25px 0;
}
</style>

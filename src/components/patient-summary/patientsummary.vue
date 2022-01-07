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
            <a-col :span="5">
              <h2 class="pageTittle">Patient Summary</h2>
            </a-col>

            <a-col :span="11">
              <div class="pageTittle">
                <div class="filter">
                  <a-button
                    @click="showButton1"
                    :class="button == 1 ? 'active' : ''"
                    >Default</a-button
                  >
                  <a-button
                    @click="showButton2"
                    :class="button == 2 ? 'active' : ''"
                    >Timeline</a-button
                  >
                  <a-button
                    @click="showButton3"
                    :class="button == 3 ? 'active' : ''"
                    >Care Plan</a-button
                  >
                  <a-button
                    @click="showButton4"
                    :class="button == 4 ? 'active' : ''"
                    >Patient Vitals</a-button
                  >
                </div>
                <!-- <div class="filter">
                  <button
                    class="btn"
                    :class="toggle ? 'active' : ''"
                    @click="toggle = !toggle"
                  >
                    <span class="btn-content">Default</span>
                  </button>
                  <button
                    class="btn"
                    :class="toggle ? 'active' : ''"
                    @click="toggle = !toggle"
                  >
                    <span class="btn-content">Timeline</span>
                  </button>
                  <button
                    class="btn"
                    :class="toggle ? 'active' : ''"
                    @click="toggle = !toggle"
                  >
                    <span class="btn-content">Care Plan</span>
                  </button>
                  <button
                    class="btn"
                    :class="toggle ? '' : 'active'"
                    @click="toggle = !toggle"
                  >
                    <span class="btn-content">Patient Vitals</span>
                  </button>
                </div> -->
              </div>
            </a-col>
            <a-col :span="8">
              <div class="timer">
                <h3>Current Session : 0:00</h3>
                <a-button class="primaryBtn" @click="showStopTimerModal"
                  >Stop Timer</a-button
                >
              </div>
            </a-col>
            <a-col :sm="24" :xs="24">
              <div v-if="button == 1">
                <div>
                  <a-row :gutter="24">
                    <a-col :sm="8" :xs="24">
                      <div class="patientInfo">
                        <div class="patientImg" @click="showModalCustom">
                          <img
                            src="../../assets/images/profile-4.jpg"
                            alt="image"
                          />
                          <div class="info">
                            <p>Jane Doe</p>
                            <p>DOB : June 25, 1995</p>
                            <p>
                              <a href="mailto:jane@gmail.com"
                                ><MailOutlined /> jane@gmail.com</a
                              >
                            </p>
                            <p>
                              <a href="tel:1234567890"
                                ><PhoneOutlined :rotate="90" /> +343-3563-767</a
                              >
                            </p>
                            <p>132, My Street, Kingston, New York 12401.</p>
                          </div>
                          <EditOutlined class="editIcon" @click="addPatient" />
                        </div>

                        <!-- <p class="name">Jane Doe</p> -->
                        <div class="pat-profile">
                          <div class="pat-profile-inner">
                            <div class="thumb-head">Flag</div>
                            <div class="thumb-desc">
                              <span class="box redBgColor"></span>
                              <span class="box yellowBgColor"></span>
                            </div>
                          </div>
                          <div class="pat-profile-inner">
                            <div class="thumb-head">
                              Non Compliance
                            </div>
                            <div class="thumb-desc">
                              <WarningOutlined />
                            </div>
                          </div>
                          <div class="pat-profile-inner">
                            <div class="thumb-head">
                              Appointments
                              <PlusOutlined
                                @click="showAddAppointmentModal"
                              /><br />
                            </div>
                            <div class="thumb-desc">
                              <router-link to="appointment-calendar">
                                John Deer 20th 2021 (+1 more) </router-link
                              >
                            </div>
                          </div>
                          
                          <div class="pat-profile-inner">
                            <div class="thumb-head">
                              Task
                              <PlusOutlined
                                @click="AddTaskModal"
                              /><br />
                            </div>
                            <div class="thumb-desc">
                              <router-link to="tasks">
                                Task 1 </router-link
                              >
                            </div>
                          </div>
                          <div class="pat-profile-inner">
                            <div class="thumb-head">
                              Vital Summary <PlusOutlined @click="showModal3" />
                            </div>
                            <div class="thumb-desc">
                              <a href="javascript:void(0)"
                                ><span @click="showBloodPressureDetailModal"
                                  >BP 120 / 78 Dec 15 6 PM</span
                                ></a
                              >
                              <!-- <br /> -->
                              <!-- <PlusOutlined @click="showModal6" /> -->
                              <!-- <a href="javascript:void(0)"
                        ><span @click="showBloodOxygenDetailModal"
                          >SPO2 96 Dec 15 5 PM</span
                        ></a
                      >
                      <br /> -->
                              <!-- <PlusOutlined @click="showModal5" /> -->
                              <!-- <a href="javascript:void(0)"
                        ><span @click="showBloodGlucoseDetailModal"
                          >Gulocose 86 Dec 14 4 PM</span
                        ></a
                      > -->
                            </div>
                          </div>
                          <div class="pat-profile-inner">
                            <div class="thumb-head">
                              Notes
                              <PlusOutlined @click="showAddNoteModal" />
                            </div>
                            <div class="thumb-desc">
                              <a
                                href="javascript:void(0)"
                                @click="showNoteModal"
                                >John Clinical Dec 15 2021</a
                              >
                              <!-- <a href="javascript:void(0)" @click="showNoteModal"
                        >Devin Reminder Dec 15 2021</a
                      ><br />
                      <a href="javascript:void(0)" @click="showNoteModal"
                        >+ 6 More</a
                      > -->
                            </div>
                          </div>
                          <div class="pat-profile-inner">
                            <div class="thumb-head">
                              Documents <PlusOutlined @click="showModal" />
                            </div>
                            <div class="thumb-desc">
                              <a
                                href="javascript:void(0)"
                                @click="showDocumentModal"
                                >Program 1</a
                              >
                            </div>
                          </div>
                          <div class="pat-profile-inner">
                            <div class="thumb-head">
                              Care Team <PlusOutlined @click="showModal8" />
                            </div>
                            <div class="thumb-desc">
                              <!-- <PlusOutlined @click="showModal7" /> -->
                              <router-link to="corrdinator-summary"
                                >John Smith (P) HT </router-link
                              ><br />
                              <!-- <PlusOutlined @click="showModal8" /> -->
                              <!-- <router-link to="corrdinator-summary"
                        >Devin CC
                      </router-link>
                      <br /> -->
                              <!-- <PlusOutlined @click="showModal9" /> -->
                              <!-- <router-link to="corrdinator-summary"
                        >Badger FC</router-link
                      > -->
                            </div>
                          </div>
                          <div class="pat-profile-inner">
                            <div class="thumb-head">
                              TimeLogs <PlusOutlined @click="showModal1" />
                            </div>
                            <div class="thumb-desc">
                              <a
                                href="javascript:void(0)"
                                @click="showTimeLogDetailModal"
                                >Daily monitoring of vitals (Oct 25, 2021)</a
                              >
                              <!-- <a
                        href="javascript:void(0)"
                        @click="showTimeLogDetailModal"
                        >Provider Order For Lab ( Oct 28, 2021)</a
                      > -->
                            </div>
                          </div>
                          <div class="pat-profile-inner">
                            <div class="thumb-head">
                              Devices <PlusOutlined @click="showModal2" />
                            </div>
                            <div class="thumb-desc">
                              <a
                                href="javascript:void(0)"
                                @click="showDeviceModal"
                                >Blood Pressure(M-101)</a
                              >
                              <!-- <a href="javascript:void(0)" @click="showDeviceModal"
                        >Oxymeter(M-102)</a
                      > -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </a-col>
                    <a-col :sm="16" :xs="24">
                      <div class="thumbDesc patientTimeline">
                        <a-checkbox-group v-model:value="value10">
                          <a-checkbox value="Notifications1"
                            >Notifications</a-checkbox
                          >
                          <a-checkbox value="Visits1">Visits</a-checkbox>
                          <a-checkbox value="Notes1">Notes</a-checkbox>
                          <a-checkbox value="Appointments1"
                            >Appointments</a-checkbox
                          >
                          <a-checkbox value="Documents1">Documents</a-checkbox>
                          <a-checkbox value="Additional11"
                            >Additional 1</a-checkbox
                          >
                          <a-checkbox value="Additional21"
                            >Additional 2</a-checkbox
                          >
                        </a-checkbox-group>
                        <a-timeline>
                          <a-timeline-item color="blue">
                            <template #dot
                              ><FolderOpenOutlined class="yellowIcon"
                            /></template>
                            <div class="timelineInner">
                              <div class="timelineHeader">
                                <div class="title">
                                  <h4>Lorem Ipsum</h4>
                                  <a-typography-text mark
                                    >Read</a-typography-text
                                  >
                                  <span class="time">12:00 PM</span>
                                </div>
                                <div class="userImg">
                                  <img
                                    src="../../assets/images/profile-4.jpg"
                                    alt="image"
                                  />
                                </div>
                              </div>
                              <div class="timelineBody">
                                <div class="content">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit....
                                  <a href="#">more</a>
                                </div>
                                <MailOutlined />
                              </div>
                            </div>
                          </a-timeline-item>
                          <a-timeline-item color="red">
                            <template #dot
                              ><HeatMapOutlined class="redIcon"
                            /></template>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sit culpa assumenda quidem magnam
                          </a-timeline-item>
                          <a-timeline-item color="red">
                            <template #dot
                              ><ClockCircleOutlined class="orangeIcon"
                            /></template>
                            <div class="timelineInner">
                              <div class="timelineHeader">
                                <div class="title">
                                  <h4>Lorem Ipsum</h4>
                                  <a-typography-text mark
                                    >Read</a-typography-text
                                  >
                                  <span class="time">12:00 PM</span>
                                </div>
                                <div class="userImg">
                                  <img
                                    src="../../assets/images/profile-4.jpg"
                                    alt="image"
                                  />
                                </div>
                              </div>
                              <div class="timelineBody">
                                <div class="content">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit....
                                  <a href="#">more</a>
                                </div>
                                <MailOutlined />
                              </div>
                            </div>
                          </a-timeline-item>
                        </a-timeline>
                      </div>
                    </a-col>
                  </a-row>
                </div>
              </div>

              <div v-if="button == 2">
                <div>
                  <a-row :gutter="24">
                    <a-col :sm="24" :xs="24">
                      <div class="patientSummary">
                        <img
                          src="../../assets/images/profile-4.jpg"
                          alt="image"
                        />
                        <div class="info">
                          <h2>Jane Doe</h2>
                          <p>DOB : June 25, 1995</p>
                          <p>
                            <a href="mailto:jane@gmail.com"
                              ><MailOutlined /> jane@gmail.com</a
                            >
                          </p>
                          <p>
                            <a href="tel:1234567890"
                              ><PhoneOutlined :rotate="90" /> +343-3563-767</a
                            >
                          </p>
                          <p>132, My Street, Kingston, New York 12401.</p>
                        </div>
                        <EditOutlined @click="addPatient" />
                      </div>
                    </a-col>
                    <a-col :sm="24" :xs="24">
                      <div class="thumbDesc patientTimeline mt-28">
                        <a-checkbox-group v-model:value="value10">
                          <a-checkbox value="Notifications"
                            >Notifications</a-checkbox
                          >
                          <a-checkbox value="Visits">Visits</a-checkbox>
                          <a-checkbox value="Notes">Notes</a-checkbox>
                          <a-checkbox value="Appointments"
                            >Appointments</a-checkbox
                          >
                          <a-checkbox value="Documents">Documents</a-checkbox>
                          <a-checkbox value="Additional1"
                            >Additional 1</a-checkbox
                          >
                          <a-checkbox value="Additional2"
                            >Additional 2</a-checkbox
                          >
                        </a-checkbox-group>

                        <!-- <a-tabs v-model:activeKey="activeKey">
                          <a-tab-pane key="5" tab="Notifications"></a-tab-pane>
                          <a-tab-pane key="1" tab="Visits"></a-tab-pane>
                          <a-tab-pane key="3" tab="Notes"></a-tab-pane>
                          <a-tab-pane
                            key="2"
                            tab="Appointments"
                            force-render
                          ></a-tab-pane>

                          <a-tab-pane key="4" tab="Documents "></a-tab-pane>
                          <a-tab-pane key="6" tab="Additional 1  "></a-tab-pane>
                          <a-tab-pane key="7" tab="Additional 2 "></a-tab-pane>
                        </a-tabs> -->
                        <a-timeline>
                          <a-timeline-item color="blue">
                            <template #dot
                              ><FolderOpenOutlined class="yellowIcon"
                            /></template>
                            <div class="timelineInner">
                              <div class="timelineHeader">
                                <div class="title">
                                  <h4>Lorem Ipsum</h4>
                                  <a-typography-text mark
                                    >Read</a-typography-text
                                  >
                                  <span class="time">12:00 PM</span>
                                </div>
                                <div class="userImg">
                                  <img
                                    src="../../assets/images/profile-4.jpg"
                                    alt="image"
                                  />
                                </div>
                              </div>
                              <div class="timelineBody">
                                <div class="content">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit....
                                  <a href="#">more</a>
                                </div>
                                <MailOutlined />
                              </div>
                            </div>
                          </a-timeline-item>
                          <a-timeline-item color="red">
                            <template #dot
                              ><HeatMapOutlined class="redIcon"
                            /></template>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sit culpa assumenda quidem magnam
                          </a-timeline-item>
                          <a-timeline-item color="red">
                            <template #dot
                              ><ClockCircleOutlined class="orangeIcon"
                            /></template>
                            <div class="timelineInner">
                              <div class="timelineHeader">
                                <div class="title">
                                  <h4>Lorem Ipsum</h4>
                                  <a-typography-text mark
                                    >Read</a-typography-text
                                  >
                                  <span class="time">12:00 PM</span>
                                </div>
                                <div class="userImg">
                                  <img
                                    src="../../assets/images/profile-4.jpg"
                                    alt="image"
                                  />
                                </div>
                              </div>
                              <div class="timelineBody">
                                <div class="content">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit....
                                  <a href="#">more</a>
                                </div>
                                <MailOutlined />
                              </div>
                            </div>
                          </a-timeline-item>
                          <a-timeline-item color="red">
                            <template #dot
                              ><BellOutlined class="yellowIcon"
                            /></template>
                            <div class="timelineInner">
                              <div class="timelineHeader">
                                <div class="title">
                                  <h4>Lorem Ipsum</h4>
                                  <a-typography-text mark
                                    >Read</a-typography-text
                                  >
                                  <span class="time">12:00 PM</span>
                                </div>
                                <div class="userImg">
                                  <img
                                    src="../../assets/images/profile-4.jpg"
                                    alt="image"
                                  />
                                </div>
                              </div>
                              <div class="timelineBody">
                                <div class="content">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit....
                                  <a href="#">more</a>
                                </div>
                                <MailOutlined />
                              </div>
                            </div>
                          </a-timeline-item>
                          <a-timeline-item class="dateOuter"
                            ><template #dot
                              ><ClockCircleOutlined class="orangeIcon"
                            /></template>
                            <div class="date">
                              <span>Dec 12, 2021</span>
                            </div></a-timeline-item
                          >
                          <a-timeline-item color="blue">
                            <template #dot
                              ><FilePdfOutlined class="yellowIcon" /></template
                            >Lorem ipsum
                            <div class="timelineInner">
                              <div class="timelineHeader">
                                <div class="title">
                                  <h4>Lorem Ipsum</h4>
                                  <a-typography-text mark
                                    >Read</a-typography-text
                                  >
                                  <span class="time">12:00 PM</span>
                                </div>
                                <div class="userImg">
                                  <img
                                    src="../../assets/images/profile-4.jpg"
                                    alt="image"
                                  />
                                </div>
                              </div>
                              <div class="timelineBody">
                                <div class="content">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit....
                                  <a href="#">more</a>
                                </div>
                                <MailOutlined />
                              </div></div
                          ></a-timeline-item>
                          <a-timeline-item color="red">
                            <template #dot
                              ><HeatMapOutlined class="redIcon"
                            /></template>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sit culpa assumenda quidem magnam fuga quaerat
                            pariatur labore exercitationem voluptate iusto,
                            repellat debitis quis itaque nulla numquam, fugiat
                            quas ullam. Minus.
                          </a-timeline-item>
                          <a-timeline-item color="red">
                            <template #dot
                              ><ClockCircleOutlined class="orangeIcon"
                            /></template>
                            <div class="timelineInner">
                              <div class="timelineHeader">
                                <div class="title">
                                  <h4>Lorem Ipsum</h4>
                                  <a-typography-text mark
                                    >Read</a-typography-text
                                  >
                                  <span class="time">12:00 PM</span>
                                </div>
                                <div class="userImg">
                                  <img
                                    src="../../assets/images/profile-4.jpg"
                                    alt="image"
                                  />
                                </div>
                              </div>
                              <div class="timelineBody">
                                <div class="content">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit....
                                  <a href="#">more</a>
                                </div>
                                <MailOutlined />
                              </div>
                            </div>
                          </a-timeline-item>
                          <a-timeline-item color="red">
                            <template #dot
                              ><BellOutlined class="yellowIcon"
                            /></template>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sit culpa assumenda quidem magnam fuga quaerat
                            pariatur labore exercitationem voluptate iusto,
                            repellat debitis quis itaque nulla numquam, fugiat
                            quas ullam. Minus.
                          </a-timeline-item>
                        </a-timeline>
                      </div>
                    </a-col>
                  </a-row>
                </div>
              </div>

              <div v-if="button == 3">
                <a-row>
                  <a-col :sm="24" :xs="24">
                    <div class="patientSummary">
                      <img
                        src="../../assets/images/profile-4.jpg"
                        alt="image"
                      />
                      <div class="info">
                        <h2>Jane Doe</h2>
                        <p>DOB : June 25, 1995</p>
                        <p>
                          <a href="mailto:jane@gmail.com"
                            ><MailOutlined /> jane@gmail.com</a
                          >
                        </p>
                        <p>
                          <a href="tel:1234567890"
                            ><PhoneOutlined :rotate="90" /> +343-3563-767</a
                          >
                        </p>
                        <p>132, My Street, Kingston, New York 12401.</p>
                      </div>
                      <EditOutlined @click="addPatient" />
                    </div>
                  </a-col>
                </a-row>
                <div>Care Plan</div>
              </div>

              <div v-if="button == 4">
                <div>
                  <a-row :gutter="24">
                    <a-col :sm="24" :xs="24">
                      <div class="patientSummary">
                        <img
                          src="../../assets/images/profile-4.jpg"
                          alt="image"
                        />
                        <div class="info">
                          <h2>Jane Doe</h2>
                          <p>DOB : June 25, 1995</p>
                          <p>
                            <a href="mailto:jane@gmail.com"
                              ><MailOutlined /> jane@gmail.com</a
                            >
                          </p>
                          <p>
                            <a href="tel:1234567890"
                              ><PhoneOutlined :rotate="90" /> +343-3563-767</a
                            >
                          </p>
                          <p>132, My Street, Kingston, New York 12401.</p>
                        </div>
                        <EditOutlined @click="addPatient" />
                      </div>
                    </a-col>
                  </a-row>
                  <div class="patientsVitals">
                    <a-row :gutter="24">
                      <a-col :sm="12" :xs="24" class="mb-24">
                        <a-card title="Blood Pressure">
                          <a-tabs v-model:activeKey="activeKey1">
                            <a-tab-pane key="8" tab="Table" force-render>
                              <!-- <div class="text-right mb-24">
                                <a-button class="primaryBtn"
                                  >Export to Excel</a-button
                                >
                              </div> -->
                              <a-table
                                :columns="columns4"
                                :data-source="data4"
                                :pagination="false"
                                @change="onChange"
                                ><template #value="text">
                                  <span class="dangerValue">{{
                                    text.text
                                  }}</span>
                                </template>
                              </a-table>
                            </a-tab-pane>
                            <a-tab-pane key="7" tab="Graph">
                              <apexchart
                                type="area"
                                height="210"
                                :options="chartOptions"
                                :series="series"
                              ></apexchart>
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
                      <a-col :sm="12" :xs="24" class="mb-24">
                        <a-card title="Pulse">
                          <a-tabs v-model:activeKey="activeKey2">
                            <a-tab-pane key="10" tab="Table" force-render>
                              <!-- <div class="text-right mb-24">
                                <a-button class="primaryBtn"
                                  >Export to Excel</a-button
                                >
                              </div> -->
                              <a-table
                                :columns="columns5"
                                :data-source="data5"
                                :pagination="false"
                                @change="onChange"
                              />
                            </a-tab-pane>
                            <a-tab-pane key="9" tab="Graph">
                              <apexchart
                                type="area"
                                height="210"
                                :options="chartOptions"
                                :series="series"
                              ></apexchart>
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
                      <a-col :sm="12" :xs="24" class="mb-24">
                        <a-card title="Blood Glucose">
                          <a-tabs v-model:activeKey="activeKey3">
                            <a-tab-pane key="12" tab="Table" force-render>
                              <!-- <div class="text-right mb-24">
                                <a-button class="primaryBtn"
                                  >Export to Excel</a-button
                                >
                              </div> -->
                              <a-table
                                :columns="columns6"
                                :data-source="data6"
                                :pagination="false"
                                @change="onChange"
                              />
                            </a-tab-pane>
                            <a-tab-pane key="11" tab="Graph">
                              <apexchart
                                type="area"
                                height="210"
                                :options="chartOptions"
                                :series="series"
                              ></apexchart>
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
                      <a-col :sm="12" :xs="24" class="mb-24">
                        <a-card title="Blood Oxygen Saturation">
                          <a-tabs v-model:activeKey="activeKey4">
                            <a-tab-pane key="14" tab="Table" force-render>
                              <!-- <div class="text-right mb-24">
                                <a-button class="primaryBtn"
                                  >Export to Excel</a-button
                                >
                              </div> -->
                              <a-table
                                :columns="columns6"
                                :data-source="data6"
                                :pagination="false"
                                @change="onChange"
                              />
                            </a-tab-pane>
                            <a-tab-pane key="13" tab="Graph">
                              <apexchart
                                type="area"
                                height="210"
                                :options="chartOptions"
                                :series="series"
                              ></apexchart>
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
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modals-->
    <AddDocument v-model:visible="visible" @ok="handleOk" />
    <!---->
    <AddTimeLogs v-model:visible="visible1" @ok="handleOk" />
    <!--Add Device -->
    <AddDevice v-model:visible="visible2" @ok="handleOk" />
    <!--Add note -->
    <AddNote v-model:visible="addnotesvisible" @ok="handleOk" />
    <!--notes Detail -->
    <NotesDetail v-model:visible="notevisible" @ok="handleOk" />
    <!--Device Detail-->
    <DeviceDetail v-model:visible="devicevisible" @ok="handleOk" />
    <!--Document Detail-->
    <DocumentDetail v-model:visible="documentvisible" @ok="handleOk" />
    <!--Time Logs-->
    <TimeLogsDetail v-model:visible="timelogsvisible" @ok="handleOk" />
    <!-- Blood Pressure Detail Modal  -->
    <BloodPressureDetail
      v-model:visible="bloodpressurevisible"
      @ok="handleOk"
    />
    <!-- Blood Oxygen Saturation Detail Modal  -->
    <BloodOxygenDetail v-model:visible="bloodoxygenvisible" @ok="handleOk" />
    <!-- Blood Glucose Detail Modal  -->
    <BloodGlucoseDetail v-model:visible="bloodglucosevisible" @ok="handleOk" />
    <!---->
    <AddAppointment v-model:visible="appointmentvisible" @ok="handleOk" />
    <!---->
    <TimeTracker v-model:visible="stoptimervisible" @ok="handleOk" />
    <!--vital Summary-->
    <VitalSummary v-model:visible="visible3" @ok="handleOk" />
    <!---->
    <AddPulse v-model:visible="visible4" @ok="handleOk" />
    <!---->
    <BloodGlucose v-model:visible="visible5" @ok="handleOk" />
    <!---->
    <BloodOxygen v-model:visible="visible6" @ok="handleOk" />
    <!---->
    <AddHealth v-model:visible="visible7" @ok="handleOk" />
    <!---->
    <CareCoordinators v-model:visible="visible8" @ok="handleOk" />
    <!---->
    <FamilyCoordinators v-model:visible="visible9" @ok="handleOk" />
    <!---->
    <PatientsModal v-model:visible="PatientsModal" @ok="handleOk" />
    <!---->
    <TaskModal v-model:visible="TaskModal" @ok="handleOk" />
    <!---->
  </div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import VitalSummary from "@/components/modals/VitalSummary";
import FamilyCoordinators from "@/components/modals/FamilyCoordinators";
import CareCoordinators from "@/components/modals/CareCoordinators";
import AddHealth from "@/components/modals/AddHealth";
import BloodOxygen from "@/components/modals/BloodOxygen";
import BloodGlucose from "@/components/modals/BloodGlucose";
import AddPulse from "@/components/modals/AddPulse";
import TimeTracker from "@/components/modals/TimeTracker";
import BloodGlucoseDetail from "@/components/modals/BloodGlucoseDetail";
import BloodOxygenDetail from "@/components/modals/BloodOxygenDetail";
import BloodPressureDetail from "@/components/modals/BloodPressureDetail";
import TimeLogsDetail from "@/components/modals/TimeLogsDetail";
import DocumentDetail from "@/components/modals/DocumentDetail";
import DeviceDetail from "@/components/modals/DeviceDetail";
import NotesDetail from "@/components/modals/NotesDetail";
import AddNote from "@/components/modals/AddNote";
import AddDevice from "@/components/modals/AddDevice";
import AddDocument from "@/components/modals/AddDocument";
import AddTimeLogs from "@/components/modals/AddTimeLogs";
import AddAppointment from "@/components/modals/AddAppointment";
import PatientsModal from "@/components/modals/PatientsModal";
import TaskModal from "@/components/modals/TasksModal";

import dayjs from "dayjs";
import { ref, computed } from "vue";
import {
  EditOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  HeatMapOutlined,
  FolderOpenOutlined,
  FilePdfOutlined,
  BellOutlined,
  MailOutlined,
  PhoneOutlined,
  WarningOutlined,
} from "@ant-design/icons-vue";
const OPTIONSTAG = ["Manger", "Billing Admin", "User Admin"];
const value = ref(dayjs("12:08", "HH:mm"));
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
    title: "Category",
    dataIndex: "category",
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
    note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptatibus dolore, vel error harum porro totam eveniet modi iusto eos, dolorum provident aliquid earum corporis veritatis? Officiis molestiae amet ullam?",
    category: "Admin",
    flag: "blueBgColor",
  },
  {
    key: "2",
    date: "Nov 11, 2021",
    note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptatibus dolore, vel error harum porro totam eveniet modi iusto eos, dolorum provident aliquid earum corporis veritatis? Officiis molestiae amet ullam?",
    category: "Clinical",
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
    slots: {
      customRender: "value",
    },
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
    EditOutlined,
    PhoneOutlined,
    PlusOutlined,
    ClockCircleOutlined,
    HeatMapOutlined,
    FolderOpenOutlined,
    FilePdfOutlined,
    BellOutlined,
    MailOutlined,
    WarningOutlined,
    VitalSummary,
    FamilyCoordinators,
    CareCoordinators,
    AddHealth,
    BloodOxygen,
    BloodGlucose,
    AddPulse,
    TimeTracker,
    BloodGlucoseDetail,
    BloodOxygenDetail,
    BloodPressureDetail,
    TimeLogsDetail,
    DocumentDetail,
    DeviceDetail,
    NotesDetail,
    AddNote,
    AddDevice,
    AddDocument,
    AddTimeLogs,
    AddAppointment,
    PatientsModal,
    TaskModal,
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          height: 210,
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
    // const activeKey5 = ref(["1"]);
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
    const notevisible = ref(false);
    const devicevisible = ref(false);
    const documentvisible = ref(false);
    const addnotesvisible = ref(false);
    const timelogsvisible = ref(false);
    const bloodpressurevisible = ref(false);
    const bloodoxygenvisible = ref(false);
    const bloodglucosevisible = ref(false);
    const appointmentvisible = ref(false);
    const stoptimervisible = ref(false);

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
    const showNoteModal = () => {
      notevisible.value = true;
    };
    const showDeviceModal = () => {
      devicevisible.value = true;
    };
    const showDocumentModal = () => {
      documentvisible.value = true;
    };
    const AddTaskModal = () => {
      TaskModal.value = true;
    };
    const showAddNoteModal = () => {
      addnotesvisible.value = true;
    };
    const showTimeLogDetailModal = () => {
      timelogsvisible.value = true;
    };
    const showBloodPressureDetailModal = () => {
      bloodpressurevisible.value = true;
    };
    const showBloodOxygenDetailModal = () => {
      bloodoxygenvisible.value = true;
    };
    const showBloodGlucoseDetailModal = () => {
      bloodglucosevisible.value = true;
    };
    const showAddAppointmentModal = () => {
      appointmentvisible.value = true;
    };
    const showStopTimerModal = () => {
      stoptimervisible.value = true;
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

    const custom = ref(false);
    const current = ref(0);
    const showModalCustom = () => {
      custom.value = true;
    };

    const handleOkcustom = (e) => {
      console.log(e);
      custom.value = false;
    };
    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
    };

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const PatientsModal = ref(false);
    const TaskModal = ref(false);
    const addPatient = () => {
      PatientsModal.value = true;
    };

    const button = ref(1);

    function showButton1() {
      button.value = 1;
    }
    function showButton2() {
      button.value = 2;
    }
    function showButton3() {
      button.value = 3;
    }
    function showButton4() {
      button.value = 4;
    }

    return {
      handleOkcustom,
      showModalCustom,
      custom,
      next,
      prev,
      handleChange,
      // data,
      // columns,
      data1,
      columns1,
      // data2,
      // columns2,
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
      notevisible,
      devicevisible,
      documentvisible,
      addnotesvisible,
      timelogsvisible,
      bloodpressurevisible,
      bloodoxygenvisible,
      bloodglucosevisible,
      appointmentvisible,
      stoptimervisible,

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
      showNoteModal,
      showDeviceModal,
      showDocumentModal,
      showAddNoteModal,
      AddTaskModal,
      showTimeLogDetailModal,
      showBloodPressureDetailModal,
      showBloodOxygenDetailModal,
      showBloodGlucoseDetailModal,
      showAddAppointmentModal,
      showStopTimerModal,
      handleOk,
      logout,
      filteredOptionsForTag,
      selectedItemsForTag,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
      activeKey: ref("2"),
      activeKey1: ref("8"),
      activeKey2: ref("10"),
      activeKey3: ref("12"),
      activeKey4: ref("14"),
      value1: ref(),
      size: ref("large"),
      value3: ref([]),
      value,
      dayjs,
      checked,
      onClose,
      PatientsModal,
      addPatient,
      button,
      showButton1,
      showButton2,
      showButton3,
      showButton4,
      value10: ref([]),
      TaskModal
    };
  },
};
</script>
<style scoped lang="scss">
.timer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  h3 {
    margin: 0 10px 0 0;
  }
}
.dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
}
</style>

<template>
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
                      <span class="date">28</span>
                    </td>
                    <td>
                      <span class="date">28</span>
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
</template>

<script>
 import { ref } from "vue"

export default {
    components: {
          
        },
  setup() {
   

    return {
      
    }
  }
}
</script>
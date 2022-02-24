<template>
  <!-- <a-row>
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
                                    <router-link :to="linkTo">
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
      </a-row> -->

  <FullCalendar  :options="{
    plugins: [dayGridPlugin, interactionPlugin, TimeGridPlugin, ListPlugin],
    headerToolbar: {
      left: 'prev next',
      center: 'title',
      right: '',
    },
    initialDate: moment(seclectDate).format('YYYY-MM-DD'),
    initialView: 'dayGridMonth',
    timeZone: 'UTC',
    contentHeight: 'auto',
    dayMaxEvents:2,
    moreLinkClick:function(e){    
      handleDateClick(e.date)
    return '+'+e.num+' More items';
},
    showNonCurrentDates: true,
    events: appointmentSearch,
    eventContent: renderEventContent,
    customButtons: {
      prev: { // this overrides the prev button
        text: 'prev',
        click: () => {
nextOrPrev('prev')
        
        }
      },
      next: { // this overrides the next button
        text: 'next',
        click: () => {
          nextOrPrev('next')

          
        }
      }
    }

  }"  ref="cal">

  </FullCalendar>
  <div  @click="popupShow()"></div>
</template>

<script>
  import {  dateFormat } from "../../commonMethods/commonMethod"
  import { reactive ,ref } from 'vue'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import TimeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import ListPlugin from '@fullcalendar/list'
  import moment from 'moment'
  import { useStore } from "vuex"
  //import { dateFormat } from "../../commonMethods/commonMethod"

  export default {
    components: {
      FullCalendar,

    },
props:{
seclectDate:{
  type:String
},
appointment:{
  type:Array
}
},
    setup(props,{emit}) {
      const linkTo = "patients-summary"
      const cal = ref(null);
      const store = useStore()
      const appointmentSearch =reactive(props.appointment)
      function handleDateClick(e) {
emit("is-dateClick",e)
        //console.log('date click! ' + e)

      }
      // const events = ref();
        
        
    
      

      // const events = [
      //   { "id": 1,title: 'Event Title', date: '2022-02-01', backgroundColor: 'grey' },
      //   { "id": 2,title: 'Event Title', date: '2022-02-01', backgroundColor: 'grey'  },
      //   { title: 'Event Title', date: '2022-02-02', backgroundColor: 'grey' },
      //   { title: 'Another event', date: '2022-02-02', "id": 4 }
      // ]
     // console.log("appointmentSearch", appointmentSearch.value)
      //console.log(events)
    
      
      function renderEventContent(clickInfo) {
 
        var getData= clickInfo.event._def
        var customHtml = '';
        customHtml += `<div><a class="ant-dropdown-link one ant-dropdown-trigger custom" onclick="popupShow('monthCalendarDropDown`+ getData.extendedProps.time +`')"><div class="dropdown"><p><strong><span>`+getData.extendedProps.appointmentType+`</span></strong><span>`+getData.extendedProps.patient+`</span></p></div></a></div>`
        customHtml += `<div id="monthCalendarDropDown` + getData.extendedProps.time + `" class="monthCalendarDropDown ant-dropdown valueItem ant-dropdown-placement-bottomLeft" style="display:none"><ul class="ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light ant-dropdown-content"><li class="ant-dropdown-menu-item ant-dropdown-menu-item-only-child" role="menuitem" tabindex="-1" data-menu-id="1" aria-disabled="false"><div class="calendarDropdown"><div class="itemWrapper"><div class="leftWrapper"> Appointment Type </div>`
        customHtml += `<div class="rightWrapper">`+getData.extendedProps.appointmentType+`</div></div><div class="itemWrapper"><div class="leftWrapper">Date Time</div><div class="rightWrapper">`+dateFormat(getData.extendedProps.time)+`</div></div><div class="itemWrapper"><div class="leftWrapper">Coordinator</div><div class="rightWrapper"><a href="#/coordinator-summary/" class="">`+getData.extendedProps.staff+`</a></div></div><div class="itemWrapper"><div class="leftWrapper">Patient</div><div class="rightWrapper"><a href="#/patients-summary" class="">`+getData.extendedProps.patient+`</a></div></div>`
        customHtml += ` <div class="itemWrapper"><div class="leftWrapper">Start Time</div><div class="rightWrapper">`+ moment(dateFormat(getData.extendedProps.time)).format('hh:mm A')+`04:52 PM</div></div> <div class="itemWrapper"><div class="leftWrapper">Duration</div><div class="rightWrapper">`+getData.extendedProps.duration+`</div></div></div></li></ul></div>`
        //console.log("clickInfo", getData.clickInfo )
        return { html: customHtml }
      }

      function getDate(value) {

        store.state.appointment.searchAppointmentRecords = null
        console.log("value",value)
        store.dispatch("searchAppointment", { fromDate: value, toDate: value, tabId: 4 })
      }

      const linkToCoordinator = "coordinator-summary"


function nextOrPrev(text){
let calendarApi = cal.value.getApi();
      if(text=="next"){
calendarApi.next();
      }else{
calendarApi.prev();
      }
          emit("is-month",moment(calendarApi.currentData.currentDate))
          //getDate(moment(calendarApi.currentData.currentDate))
}
      return {
        dayGridPlugin, 
        interactionPlugin, 
        TimeGridPlugin, 
        ListPlugin,
        moment,
       // popupShow,
        //calendarOptions,
        linkToCoordinator,
        cal,
        getDate,
      
        renderEventContent,
        handleDateClick,
        nextOrPrev,
        linkTo,
        appointmentSearch,
       

      }
    }
  }
</script>
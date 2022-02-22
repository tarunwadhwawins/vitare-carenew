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

  <FullCalendar v-if="appointmentSearch" :options="calendarOptions"  ref="cal">

  </FullCalendar>
  <div hidden @click="popupShow"></div>
</template>

<script>
  function popupShow(event) {


    console.log("event", event)
    // if (toggle.style.display === "none") {
    //   toggle.style.display = "block";
    // } else {
    //   toggle.style.display = "none";
    // }
  }
  import { ref,computed } from 'vue'
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

},
    setup(props,{emit}) {
      const linkTo = "patients-summary"
      const cal = ref(null);
      const store = useStore()
      const appointmentSearch =computed(() =>{
        return store.state.appointment.searchAppointmentRecords
      })
      function handleDateClick(e) {
emit("is-dateClick",e)
        console.log('date click! ' + e)

      }
      // const events = ref();
        
        
    
      

      // const events = [
      //   { "id": 1,title: 'Event Title', date: '2022-02-01', backgroundColor: 'grey' },
      //   { "id": 2,title: 'Event Title', date: '2022-02-01', backgroundColor: 'grey'  },
      //   { title: 'Event Title', date: '2022-02-02', backgroundColor: 'grey' },
      //   { title: 'Another event', date: '2022-02-02', "id": 4 }
      // ]
      console.log("appointmentSearch", appointmentSearch.value)
      //console.log(events)
    
      
      function renderEventContent(clickInfo) {


        var id = clickInfo.event._def.publicId
        var customHtml = '';
        customHtml += `<div><a class="ant-dropdown-link one ant-dropdown-trigger custom" onclick="popupShow('monthCalendarDropDown` + id + `')"><div class="dropdown"><p><strong><span> Wellness</span></strong><span>KlarakJ Peter</span></p></div></a></div>`
        customHtml += `<div id="monthCalendarDropDown` + id + `" class="monthCalendarDropDown ant-dropdown valueItem ant-dropdown-placement-bottomLeft" style="display:none"><ul class="ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light ant-dropdown-content"><li class="ant-dropdown-menu-item ant-dropdown-menu-item-only-child" role="menuitem" tabindex="-1" data-menu-id="1" aria-disabled="false"><div class="calendarDropdown"><div class="itemWrapper"><div class="leftWrapper"> Appointment Type </div>`
        customHtml += `<div class="rightWrapper">Wellness</div></div><div class="itemWrapper"><div class="leftWrapper">Date Time</div><div class="rightWrapper">Feb 15, 2022, 04:52 PM</div></div><div class="itemWrapper"><div class="leftWrapper">Coordinator</div><div class="rightWrapper"><a href="#/coordinator-summary" class="">super admin</a></div></div><div class="itemWrapper"><div class="leftWrapper">Patient</div><div class="rightWrapper"><a href="#/patients-summary" class="">Karan Test</a></div></div>`
        customHtml += ` <div class="itemWrapper"><div class="leftWrapper">Start Time</div><div class="rightWrapper">04:52 PM</div></div> <div class="itemWrapper"><div class="leftWrapper">Duration</div><div class="rightWrapper">10 Mins</div></div></div></li></ul></div>`
        console.log("clickInfo", clickInfo)
        return { html: customHtml }
      }
const  calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin, TimeGridPlugin, ListPlugin],
        headerToolbar: {
          left: 'prev next',
          center: 'title',
          right: '',
        },
        initialView: 'dayGridMonth',
        timeZone: 'UTC',
        contentHeight: 'auto',
        dayMaxEvents:2,
        moreLinkClick:function(e){    
          handleDateClick(e.date)
        return '+'+e.num+' More items';
    },
        showNonCurrentDates: true,
        events: appointmentSearch.value,
        eventContent: renderEventContent,
        customButtons: {
          prev: { // this overrides the prev button
            text: 'prev',
            click: () => {

              let calendarApi = cal.value.getApi();
              
              calendarApi.prev();
              getDate(moment(calendarApi.currentData.currentDate))
            }
          },
          next: { // this overrides the next button
            text: 'next',
            click: () => {
let calendarApi = cal.value.getApi();

              calendarApi.next();
              getDate(moment(calendarApi.currentData.currentDate))
              
            }
          }
        }

      }
      function getDate(value) {
        //store.state.appointment.searchAppointmentRecords = null
        console.log("value",value)
        store.dispatch("searchAppointment", { fromDate: value, toDate: value, tabId: 4 })
      }

      const linkToCoordinator = "coordinator-summary"

      return {
        popupShow,
        calendarOptions,
        linkToCoordinator,
        cal,
        getDate,
        renderEventContent,
        handleDateClick,
        
        linkTo,
        appointmentSearch,
       

      }
    }
  }
</script>
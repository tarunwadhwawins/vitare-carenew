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
     
        <FullCalendar :options="calendarOptions"    ref="cal">
          
          </FullCalendar>

</template>

<script>
 import { ref   } from 'vue'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import moment from 'moment'
export default {
    components: {
      FullCalendar,
    
        },
  setup() {
    const linkTo = "patients-summary"
    const cal = ref(null);
    // function toggleWeekends () {
    //   this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
    // 
    function handleDateClick(e) {
     
        console.log('date click! ' + e.date)
      
    }
    const events = ref([
        { title: 'Event Title', date: '2022-02-01',backgroundColor:'grey',"id":1 },
        { title: 'Event Title', date: '2022-02-01',backgroundColor:'grey',"id":2 },
        { title: 'Event Title', date: '2022-02-02',backgroundColor:'grey',"id":3 },
        { title: 'Another event', date: '2022-02-02',"id":4 }
])
    const calendarOptions = {
        plugins: [ dayGridPlugin, interactionPlugin,TimeGridPlugin,ListPlugin ],
        headerToolbar:{
            left:'prev next',
            center:'title',
            right:'',
        },
        defaultDate: moment('2017/02/09'),
        timeZone: 'UTC',
        contentHeight:"auto",
        initialView: 'dayGridMonth',
        dateClick: handleDateClick,
        showNonCurrentDates: true,
        events: events.value,
         eventContent:renderEventContent,
        customButtons: { 
        prev: { // this overrides the prev button
          text: "dfs", 
          click: () => {           
            
            let calendarApi = cal.value.getApi();
            
            calendarApi.prev();
            getDate(calendarApi.currentData.currentDate)
          }
        },
        next: { // this overrides the next button
          text: "PRfdfsdEV",
          click: () => {
            
             let calendarApi = cal.value.getApi();
             calendarApi.next();
             getDate(calendarApi.currentData.currentDate)
          }
        }
      } 
         
    }
    function eventRender(info){
      console.log("info",info)
    }
    function renderEventContent(clickInfo) {
  
      
      
var customHtml = '';
            customHtml += `<a-dropdown  :trigger="['click']" overlayClassName="valueItem"><a class="ant-dropdown-link one" @click.prevent>`
              customHtml += '<div class="dropdown"><p><strong><span >appointmentType</span></strong><span>.patient </span>'
                customHtml += '</p><img src="../../assets/images/profile-1.jpg" alt="image" /></div></a><template #overlay><a-menu><a-menu-item key="1"><div class="calendarDropdown">'
                customHtml += '<div class="itemWrapper"><div class="leftWrapper">Appointment Type</div><div class="rightWrapper">appointmentType</div>'
                customHtml += ` </div><div class="itemWrapper"><div class="leftWrapper">Date Time</div><div class="rightWrapper">`
              customHtml += `dateFormat</div></div><div class="itemWrapper"><div class="leftWrapper">Coordinator</div><div class="rightWrapper"><router-link :to="linkToCoordinator">`
              customHtml += `staff</router-link></div></div><div class="itemWrapper">`
              customHtml += `<div class="leftWrapper">Patient</div>`
              customHtml += `<div class="rightWrapper">`
              customHtml += `<router-link :to="linkTo">.patient</router-link>`
              customHtml += `</div></div><div class="itemWrapper"><div class="leftWrapper">Start Time</div><div class="rightWrapper"> moment(dateFormat(cardRecords.date)).format('hh:mm A') </div>`
              customHtml += `</div><div class="itemWrapper"><div class="leftWrapper">Duration</div>`
              customHtml += `<div class="rightWrapper"> cardRecords.duration </div>`
              customHtml += `</div><div class="notesWrapper">`
                customHtml += `<span>Notes</span><p>cardRecords.notes</p></div>`
                customHtml += `<div class="createTask"><a-tooltip placement="left">`
                  customHtml += `<template #title><span>Add Task</span></template>`
                  customHtml += `<router-link to="tasks"><FileAddOutlined /></router-link></a-tooltip></div></div></a-menu-item>`
                  customHtml += `</a-menu></template></a-dropdown>`
            
                  console.log("clickInfo",clickInfo)    
return {html:customHtml}
}
   
    
function getDate(value){
console.log("date",value)
}
      const linkToCoordinator = "coordinator-summary"
    return {
      eventRender,
        linkToCoordinator,
      cal,
      getDate,
      renderEventContent,
      handleDateClick,
      calendarOptions,
      linkTo,
      
    }
  }
}
</script>
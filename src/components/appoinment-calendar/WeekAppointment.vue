<template>
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
                  <th>Sun</th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </a-col>
      </a-row>
</template>

<script>
 //import { ref } from "vue"
 import { FileAddOutlined } from "@ant-design/icons-vue";
 //import moment from 'moment';
    export default{
        components: {
    FileAddOutlined,
  },
  setup() {
//     let days = [];
//     let dates = []
//     let today = moment();
//     today.subtract(7, 'days')
// for (var i = 0; i < 7; i++){
    
//    var day = today.add(1, 'days');
   
//    dates.push(day.format('YYYY-MM-DD'));
//    days.push(day.format('dddd'))
// }
// console.log("days",days)
// console.log("date",dates)
    const linkTo = "patients-summary"
    return {
      linkTo
    }
  }
}
</script>
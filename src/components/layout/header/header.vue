<template>
  <div>
    <div class="header-wrapper">
      <div class="logo">
        <div class="logoInner">
          <img src="../../../assets/images/logo.png" alt="image" />
        </div>
      </div>
      <div class="header-control">
        <div class="header-inner">
          <div class="location">ss</div>
          <div class="search">
            <a-input v-model="value" size="large" placeholder="Enter search" />
          </div>
          <div class="profile">
            <div class="quick-actions d-flex align-items-center">
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                  <div class="name">Quick Action <DownOutlined /></div>
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0">
                      <a href="#">Add Appointment</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="">Add Patient</a>
                    </a-menu-item>
                    <a-menu-item key="3">
                      <a href="">Add Care Coordinator</a></a-menu-item
                    >
                    <a-menu-item key="4"> <a href="">Add Task</a></a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <div class="notifications">
              <a-dropdown :trigger="['click']" overlayClassName="notifications">
                <a class="ant-dropdown-link" @click.prevent>
                  <div class="icon"><NotificationOutlined /></div>
                </a>
                <template #overlay>
                  <a-menu>
                    <li class="title">Notification</li>
                    <li class="listing">
                      <a class="d-flex align-items-center" href="#">
                        <div class="flex-shrink-0 imgProfile">
                          <img
                            src="../../../assets/images/user-2.jpg"
                            alt="image"
                            width="50"
                          />
                        </div>
                        <div class="flex-grow-1 ms-3 summary">
                          <p>Just a reminder that you have appoinment</p>
                          <span class="date">40 minutes ago</span>
                        </div>
                      </a>
                    </li>
                    <li class="listing">
                      <a class="d-flex align-items-center" href="#">
                        <div class="flex-shrink-0 imgProfile">
                          <img
                            src="../../../assets/images/user-1.jpg"
                            alt="image"
                            width="50"
                          />
                        </div>
                        <div class="flex-grow-1 ms-3 summary">
                          <p>Just a reminder that you have appoinment</p>
                          <span class="date">20 minutes ago</span>
                        </div>
                      </a>
                    </li>
                    <li class="allNotication"><a href="#">Check all notifications</a></li>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <div class="profile-menu">
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                  <div class="name">Jane Doe <strong>Admin</strong></div>
                  <div class="image">
                    <img src="../../../assets/images/profile-1.jpg" alt="image" />
                  </div>
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0">
                      <a href="#">My Profile</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="">Settings</a>
                    </a-menu-item>
                    <a-menu-item key="3"> <a href="">Logout</a></a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { NotificationOutlined, DownOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    NotificationOutlined,
    DownOutlined,
  },
});
</script>

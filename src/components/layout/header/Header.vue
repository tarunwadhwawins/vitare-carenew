<template>
  <div>
    <div class="header-wrapper">
      <div class="logo">
        <div class="logoInner">
          <img src="@/assets/images/logo.png" alt="image" />
        </div>
        <div class="icon" @click="barMenu">
          <MenuOutlined />
        </div>
      </div>
      <div class="header-control">
        <div class="header-inner">
          <div class="location d-flex align-items-center">
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click.prevent>
                <div class="name">Location
                  <DownOutlined />
                </div>
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">
                    <a href="javascript:void(0)">Organisation 1</a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a href="javascript:void(0)">Organisation 2</a>
                  </a-menu-item>
                  <a-menu-item key="3">
                    <a href="javascript:void(0)">Organisation 3</a>
                  </a-menu-item>
                  <a-menu-item key="4">
                    <a href="javascript:void(0)">Organisation 4</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div class="bar-menu">
            <div class="search-icon" @click="toggle = !toggle">
              <SearchOutlined />
            </div>
            <div class="ellipse-icon" @click="ellipse = !ellipse">
              <MoreOutlined />
            </div>
          </div>
          <div class="search" :class="toggle ? 'show' : ''">
            <a-input v-model="value" size="large" placeholder="Enter search" />
          </div>
          <div class="profile" :class="ellipse ? 'show' : ''">
            <div class="quick-actions d-flex align-items-center">
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                  <div class="name">Quick Action
                    <DownOutlined />
                  </div>
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0">
                      <a href="javascript:void(0)">Add Appointment</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="javascript:void(0)">Add Patient</a>
                    </a-menu-item>
                    <a-menu-item key="3">
                      <a href="javascript:void(0)">Add Care Coordinator</a>
                    </a-menu-item>
                    <a-menu-item key="4">
                      <a href="javascript:void(0)">Add Task</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <div class="notifications">
              <a-dropdown :trigger="['click']" overlayClassName="notifications">
                <a class="ant-dropdown-link" @click.prevent>
                  <div class="icon">
                    <NotificationOutlined />
                  </div>
                </a>
                <template #overlay>
                  <a-menu>
                    <li class="title">Notification</li>
                    <li class="listing">
                      <a class="d-flex align-items-center" href="#">
                        <div class="flex-shrink-0 imgProfile">
                          <img src="@/assets/images/user-2.jpg" alt="image" width="50" />
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
                          <img src="@/assets/images/user-1.jpg" alt="image" width="50" />
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
                  <div class="name">{{ user }} <strong>{{ role }}</strong></div>
                  <div class="image">
                    <img src="@/assets/images/profile-1.jpg" alt="image" />
                  </div>
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0">
                      <a href="javascript:void(0)">My Profile</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="javascript:void(0)">Settings</a>
                    </a-menu-item>
                    <a-menu-item key="3"> <a href="javascript:void(0)" @click="logout">Logout</a></a-menu-item>
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
  import { defineComponent, ref } from "vue";
  import {
    NotificationOutlined,
    DownOutlined,
    MenuOutlined,
    SearchOutlined,
    MoreOutlined,
  } from "@ant-design/icons-vue";
  export default defineComponent({
    data() {
      return {
        user: '',
        role: '',
      }
    },
    components: {
      NotificationOutlined,
      DownOutlined,
      MenuOutlined,
      SearchOutlined,
      MoreOutlined,
    },
    setup() {
      const toggle = ref(false);
      const ellipse = ref(false);
      function barMenu() {
        document.body.classList.toggle("show");
      }
      return {
        barMenu,
        toggle,
        ellipse,
      };
    },
    created() {
      if (this.$store.state.auth.user == null) {
        this.$router.push("/");
        return;
      }
      this.user = this.$store.state.auth.user.email;
      this.role = this.$store.state.auth.user.role_id ? 'Admin' : 'Client';
    },
    watch() {
      if (this.$store.state.auth.user == null) {
        this.$router.push("/");
        return;
      }
      this.user = this.$store.state.auth.user.email;
      this.role = this.$store.state.auth.user.role_id ? 'Admin' : 'Client';
    },
    methods: {
      logout() {
        this.$store.dispatch("auth/logout")
          .then(() => {
            this.$router.push("/login");
          },
            (error) => {
              console.log(error)
              this.message = (
                error.response &&
                error.response.data &&
                error.response.data.message
              ) ||
                error.message ||
                error.toString();
            });
      }
    }
  });
</script>
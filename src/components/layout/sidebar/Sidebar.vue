<template>
  <a-layout-sider
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
  >
    <div class="menuList">
      <a-menu>
        <router-link to="/dashboard"
          ><a-menu-item
            ><HomeOutlined /><span class="menuItem">Dashboard</span></a-menu-item
          ></router-link
        >
        <router-link to="/communications"
          ><a-menu-item
            ><MailOutlined /><span class="menuItem">Communications</span></a-menu-item
          ></router-link
        >
        <router-link to="/manage-care-coordinator"
          ><a-menu-item
            ><UserOutlined /><span class="menuItem"
              >Manage Care Coordinator</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/manage-patients"
          ><a-menu-item
            ><UserOutlined /><span class="menuItem">Manage Patients</span></a-menu-item
          ></router-link
        >
        <router-link to="/appointment-calendar"
          ><a-menu-item
            ><CalendarOutlined /><span class="menuItem"
              >Appointment Calendar</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/tasks"
          ><a-menu-item
            ><CalendarOutlined /><span class="menuItem">Tasks</span></a-menu-item
          ></router-link
        >
        <router-link to="/time-tracking-report"
          ><a-menu-item
            ><FileTextOutlined /><span class="menuItem">Tracking Reports</span></a-menu-item
          ></router-link
        >
        <router-link to="/thresholds"
          ><a-menu-item
            ><FileTextOutlined /><span class="menuItem">Thresholds</span></a-menu-item
          ></router-link
        >
        <router-link to="/cpt-codes"
          ><a-menu-item
            ><CalendarOutlined /><span class="menuItem"
              >Administration
            </span></a-menu-item
          ></router-link
        >
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, onUnmounted } from "vue";
import {
  HomeOutlined,
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    HomeOutlined,
    MailOutlined,
    UserOutlined,
    CalendarOutlined,
    FileTextOutlined,
  },

  setup() {
    const state = reactive({
      selectedKeys: ["1"],
    });
    onUnmounted(() => {
      document.body.classList.remove("show");
    });
    return { ...toRefs(state) };
  },
});
</script>
<style lang="scss">
#nav {
  a {
    color: #000;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

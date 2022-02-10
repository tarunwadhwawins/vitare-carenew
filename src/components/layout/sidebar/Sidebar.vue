<template>
  <a-layout-sider
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
  >
    <div class="menuList">
      <a-menu>
        <router-link to="/dashboard"
          ><a-menu-item
            ><HomeOutlined /><span class="menuItem"
              >{{$t('global.dashboard')}}</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/communications"
          ><a-menu-item
            ><MailOutlined /><span class="menuItem"
              >{{$t('sidebar.communications')}}</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/manage-care-coordinator"
          ><a-menu-item
            ><UserOutlined /><span class="menuItem"
              >{{$t('sidebar.careCoordinator')}}</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/manage-patients"
          ><a-menu-item
            ><UserOutlined /><span class="menuItem"
              >{{$t('sidebar.patients')}}</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/appointment-calendar"
          ><a-menu-item
            ><CalendarOutlined /><span class="menuItem"
              >{{$t('sidebar.appointmentCalendar')}}</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/tasks"
          ><a-menu-item
            ><CalendarOutlined /><span class="menuItem"
              >{{$t('sidebar.tasks')}}</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/time-tracking-report"
          ><a-menu-item
            ><FileTextOutlined /><span class="menuItem"
              >{{$t('sidebar.reports')}}</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/thresholds"
          ><a-menu-item
            ><FileTextOutlined /><span class="menuItem"
              >{{$t('sidebar.generalParameters')}}</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/time-log-report"
          ><a-menu-item
            ><FileTextOutlined /><span class="menuItem"
              >{{$t('sidebar.auditTimeLog')}}</span
            ></a-menu-item
          ></router-link
        >

        <router-link to="/cpt-codes"
          v-if="roles==1"><a-menu-item
            ><CalendarOutlined /><span class="menuItem"
              >{{$t('sidebar.administration')}}
            </span></a-menu-item
          ></router-link
        >
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script>
import { defineComponent, reactive, toRefs, onUnmounted, computed } from "vue";
import {
  HomeOutlined,
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  // UnlockOutlined
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    HomeOutlined,
    MailOutlined,
    UserOutlined,
    CalendarOutlined,
    FileTextOutlined,
    // UnlockOutlined
  },

  setup() {
    const state = reactive({
      selectedKeys: ["1"],
    });
    const roles = computed(() =>{
return localStorage.getItem('roleAuth')
    })
    onUnmounted(() => {
      document.body.classList.remove("show");
    });
    return { 
      roles,
      ...toRefs(state) };
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

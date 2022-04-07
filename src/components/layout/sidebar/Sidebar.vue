
<template>
<a-layout-sider  :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
    <div class="menuList">
        <a-menu>
            <router-link to="/dashboard">
                <a-menu-item>
                    <HomeOutlined /><span class="menuItem">{{$t('global.dashboard')}}</span></a-menu-item>
            </router-link>
            <router-link to="/communications" v-if="arrayToObjact(screensPermissions, 109)">
                <a-menu-item>
                    <MailOutlined /><span class="menuItem">{{$t('sidebar.communications')}}</span></a-menu-item>
            </router-link>
            <router-link to="/manage-care-coordinator" v-if="arrayToObjact(screensPermissions, 40)">
                <a-menu-item>
                    <UserOutlined /><span class="menuItem">{{$t('sidebar.careCoordinator')}}</span></a-menu-item>
            </router-link>
            <router-link to="/manage-patients" v-if="arrayToObjact(screensPermissions, 65)">
                <a-menu-item>
                    <UserOutlined /><span class="menuItem">{{$t('sidebar.patients')}}</span></a-menu-item>
            </router-link>
            <router-link to="/appointment-calendar"  v-if="arrayToObjact(screensPermissions, 112)">
                <a-menu-item>
                    <CalendarOutlined /><span class="menuItem">{{$t('sidebar.appointmentCalendar')}}</span></a-menu-item>
            </router-link>
            <router-link to="/tasks" v-if="arrayToObjact(screensPermissions, 113)">
                <a-menu-item>
                    <CalendarOutlined /><span class="menuItem">{{$t('sidebar.tasks')}}</span></a-menu-item>
            </router-link>
            <router-link to="/thresholds" v-if="arrayToObjact(screensPermissions, 329)">
                <a-menu-item>
                    <FileTextOutlined /><span class="menuItem">{{$t('sidebar.generalParameters')}}</span></a-menu-item>
            </router-link>
            <router-link to="/time-log-report" v-if="arrayToObjact(screensPermissions, 332)">
                <a-menu-item>
                    <FileTextOutlined /><span class="menuItem">{{$t('sidebar.auditTimeLog')}}</span></a-menu-item>
            </router-link>

            <router-link to="/cpt-codes" v-if="arrayToObjact(screensPermissions, 9)">
                <a-menu-item>
                    <CalendarOutlined /><span class="menuItem">{{$t('sidebar.administration')}}
                    </span></a-menu-item>
            </router-link>
        </a-menu>
    </div>
</a-layout-sider>
</template>
<script>
import { defineComponent, computed,onUnmounted } from "vue";
import {
  HomeOutlined,
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { arrayToObjact } from "@/commonMethods/commonMethod";
export default defineComponent({
  components: {
    HomeOutlined,
    MailOutlined,
    UserOutlined,
    CalendarOutlined,
    FileTextOutlined,
  },

  setup() {
    const store = useStore();
    const roles = computed(() => {
      return localStorage.getItem("roleAuth");
    });
    onUnmounted(() => {
      document.body.classList.remove("show");
    });

    
    
    return { 
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      roles,
    };
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

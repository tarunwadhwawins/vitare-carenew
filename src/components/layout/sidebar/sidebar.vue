<template>
    <div class="menuList">
      <a-menu id="nav">
        <router-link to="/dashboard" ><a-menu-item><HomeOutlined /><span class="menuItem">Dashboard</span></a-menu-item></router-link>
        <router-link to="/communications" ><a-menu-item><MailOutlined /><span class="menuItem">Communications</span></a-menu-item></router-link>
        <router-link to="/manage-care-coordinator" ><a-menu-item><UserOutlined /><span class="menuItem">Manage Care Coordinator</span></a-menu-item></router-link>
        <router-link to="/manage-patients" ><a-menu-item><UserOutlined /><span class="menuItem">Manage Patients</span></a-menu-item></router-link>
         <router-link to="/appointment-calendar" ><a-menu-item><CalendarOutlined /><span class="menuItem">Appointment Calendar</span></a-menu-item></router-link>
        <!-- <a-menu-item><UserOutlined /><span class="menuItem">Manage Patients</span></a-menu-item> -->
        <!-- <a-menu-item><CalendarOutlined /><span class="menuItem">Appointment Calendar</span></a-menu-item> -->
        <a-menu-item><UserOutlined /><span class="menuItem">Tasks</span></a-menu-item>
      </a-menu>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { HomeOutlined , MailOutlined , UserOutlined , CalendarOutlined} from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    HomeOutlined,
    MailOutlined,
    UserOutlined,
    CalendarOutlined
  },

});
</script>
<style lang="scss">
#nav {
  a{
    color: #000;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
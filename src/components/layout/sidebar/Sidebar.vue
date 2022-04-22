
<template>
<a-layout-sider  :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
    <div class="menuList">
        <a-menu>
            <router-link to="/dashboard">
                <a-menu-item>
                    <HomeOutlined /><span class="menuItem">{{$t('global.dashboard')}}</span></a-menu-item>
            </router-link>
            <router-link :to="{ name: 'Communications', query: {view: 'dashboard'} }" v-if="arrayToObjact(screensPermissions, 109)">
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
            <router-link :to="{ name: 'Tasks', query: {view: 'dashboard'} }" v-if="arrayToObjact(screensPermissions, 113)">
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

            <router-link v-if="linkTo" :to="linkTo" >
                <a-menu-item>
                    <CalendarOutlined /><span class="menuItem">{{$t('sidebar.administration')}}
                    </span></a-menu-item>
            </router-link>
        </a-menu>
    </div>
</a-layout-sider>
</template>
<script>
import { defineComponent, computed,onUnmounted,ref, onMounted } from "vue";
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
    const linkTo = ref(null)

    const screensPermissions = computed(()=>{
      return store.state.screenPermissions.screensPermissions
    })
    const roles = computed(() => {
      return localStorage.getItem("roleAuth");
    });
    onUnmounted(() => {
      document.body.classList.remove("show");
    });


    onMounted(()=>{
      if(screensPermissions.value){

        if(arrayToObjact(screensPermissions.value, 9)){
          linkTo.value="/cpt-codes"
        }
        else if(arrayToObjact(screensPermissions.value, 15)){
          linkTo.value="/manage-programs"
        }
        else if(arrayToObjact(screensPermissions.value, 22)){
          linkTo.value="/providers"
        }
        else if(arrayToObjact(screensPermissions.value, 1)){
          linkTo.value="/roles-and-permissions"
        }
       else if(arrayToObjact(screensPermissions.value, 6)){
          linkTo.value="/global-codes"
        }
       else if(arrayToObjact(screensPermissions.value, 336)){
          linkTo.value="/inventory"
        }
      }
    })

    
    
    return { 
      linkTo,
      screensPermissions,
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

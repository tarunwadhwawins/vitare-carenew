<template>
<a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
    <div class="menuList">
        <a-menu>
            <router-link to="/cpt-codes" v-if="arrayToObjact(screensPermissions, 9)">
                <a-menu-item>
                    <CreditCardOutlined /><span class="menuItem">CPT Codes</span></a-menu-item>
            </router-link>
           
            <router-link to="/manage-programs" v-if="arrayToObjact(screensPermissions, 15)">
                <a-menu-item>
                    <MailOutlined /><span class="menuItem">Programs</span></a-menu-item>
            </router-link>
            <router-link to="/providers" v-if="arrayToObjact(screensPermissions, 22)">
                <a-menu-item>
                    <MailOutlined /><span class="menuItem">Providers</span></a-menu-item>
            </router-link>
            <router-link to="/roles-and-permissions" v-if="arrayToObjact(screensPermissions, 1)">
                <a-menu-item>
                    <SafetyOutlined /><span class="menuItem">Roles & Permissions
                    </span></a-menu-item>
            </router-link>
           
            <router-link to="/global-codes" v-if="arrayToObjact(screensPermissions, 6)">
                <a-menu-item>
                    <GlobalOutlined /><span class="menuItem">Global Codes</span></a-menu-item>
            </router-link>
            <router-link to="/inventory" v-if="arrayToObjact(screensPermissions, 336)">
                <a-menu-item>
                    <FileDoneOutlined />
                    <span class="menuItem">{{$t('sidebar.inventory')}}</span>
                </a-menu-item>
            </router-link>
            <router-link to="/work-flow" >
                <a-menu-item>
                    <ApartmentOutlined />
                    <span class="menuItem">{{'WorkFlow Setup'}}</span>
                </a-menu-item>
            </router-link>
            <router-link to="/dashboard" >
                <a-menu-item>
                    <HomeOutlined /><span class="menuItem">Home</span></a-menu-item>
            </router-link>
        </a-menu>
    </div>
</a-layout-sider>
</template>
<script>
import { defineComponent, onUnmounted } from "vue";
import {
  MailOutlined,
  CreditCardOutlined,
  FileDoneOutlined,
  HomeOutlined,
  SafetyOutlined,
  GlobalOutlined,
  ApartmentOutlined
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { arrayToObjact } from "@/commonMethods/commonMethod";
export default defineComponent({
  components: {
    MailOutlined,
    CreditCardOutlined,
    FileDoneOutlined,
    HomeOutlined,
    SafetyOutlined,
    GlobalOutlined,
    ApartmentOutlined
  },

  setup() {
    const store = useStore();
    onUnmounted(() => {
      document.body.classList.remove("show");
    });
    return {
      arrayToObjact,
      screensPermissions: store.getters.screensPermissions,
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

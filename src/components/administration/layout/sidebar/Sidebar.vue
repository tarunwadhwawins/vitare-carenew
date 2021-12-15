<template>
  <a-layout-sider
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
  >
    <div class="menuList">
      <a-menu>
        <router-link to="/admin-dashboard"
          ><a-menu-item
            ><DashboardOutlined /> <span class="menuItem">Dashboard</span></a-menu-item
          ></router-link
        >
        <router-link to="/cpt-codes"
          ><a-menu-item
            ><CreditCardOutlined /><span class="menuItem">CPT Codes</span></a-menu-item
          ></router-link
        >
        <router-link to="/manage-staff"
          ><a-menu-item
            ><TeamOutlined /><span class="menuItem">Manage Staff</span></a-menu-item
          ></router-link
        >
        <router-link to="/manage-programs"
          ><a-menu-item
            ><MailOutlined /><span class="menuItem">Manage Programs</span></a-menu-item
          ></router-link
        >
        <router-link to="/manage-providers"
          ><a-menu-item
            ><MailOutlined /><span class="menuItem">Manage Providers</span></a-menu-item
          ></router-link
        >
        <router-link to="/roles-permission"
          ><a-menu-item
            ><SafetyOutlined /><span class="menuItem"
              >Roles & Permissions
            </span></a-menu-item
          ></router-link
        >
        <router-link to="/reports"
          ><a-menu-item
            ><FileDoneOutlined /><span class="menuItem">Reports </span></a-menu-item
          ></router-link
        >
        <router-link to="/templates"
          ><a-menu-item
            ><ReconciliationOutlined /><span class="menuItem"
              >Templates</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/global-codes"
          ><a-menu-item
            ><GlobalOutlined /><span class="menuItem">Global Codes</span></a-menu-item
          ></router-link
        >
        <router-link to="/dashboard"
          ><a-menu-item
            ><HomeOutlined /><span class="menuItem">Home</span></a-menu-item
          ></router-link
        >
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, onUnmounted } from "vue";
import {
  DashboardOutlined,
  MailOutlined,
  CreditCardOutlined,
  TeamOutlined,
  FileDoneOutlined,
  HomeOutlined,
  SafetyOutlined,
  ReconciliationOutlined,
  GlobalOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    MailOutlined,
    DashboardOutlined,
    CreditCardOutlined,
    TeamOutlined,
    FileDoneOutlined,
    HomeOutlined,
    SafetyOutlined,
    ReconciliationOutlined,
    GlobalOutlined,
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

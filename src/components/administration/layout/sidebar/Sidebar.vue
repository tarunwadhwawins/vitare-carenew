<template>
  <a-layout-sider
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
  >
    <div class="menuList">
      <a-menu>
        <!-- <router-link to="#"
          ><a-menu-item
            ><DashboardOutlined /> <span class="menuItem">Dashboard</span></a-menu-item
          ></router-link
        > -->
        <router-link to="/cpt-codes"
          ><a-menu-item
            ><CreditCardOutlined /><span class="menuItem"
              >CPT Codes</span
            ></a-menu-item
          ></router-link
        >
        <!-- <router-link to="/care-coordinator"
          ><a-menu-item
            ><TeamOutlined /><span class="menuItem">Care Coordinator</span></a-menu-item
          ></router-link
        > -->
        <router-link to="/manage-programs"
          ><a-menu-item
            ><MailOutlined /><span class="menuItem">Programs</span></a-menu-item
          ></router-link
        >
        <router-link to="/manage-providers"
          ><a-menu-item
            ><MailOutlined /><span class="menuItem"
              >Providers</span
            ></a-menu-item
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
            ><FileDoneOutlined /><span class="menuItem"
              >Reports
            </span></a-menu-item
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
            ><GlobalOutlined /><span class="menuItem"
              >Global Codes</span
            ></a-menu-item
          ></router-link
        >
        <!-- <router-link to="/form-list"
          ><a-menu-item
            ><FileDoneOutlined /><span class="menuItem"
              >Form Builder</span
            ></a-menu-item
          ></router-link
        > -->
        <router-link to="/form-list"
          ><a-menu-item
            ><FileDoneOutlined /><span class="menuItem"
              >Forms</span
            ></a-menu-item
          ></router-link
        >
        <router-link to="/groups"
          ><a-menu-item
            ><TeamOutlined /><span class="menuItem"
              >Groups</span
            ></a-menu-item
          ></router-link
        >

        <div class="subMenu">
          <div class="questionnaireMenu" @click="toggle = !toggle">
            <FileTextOutlined /><span class="menuItem">Questionnaire</span>
            <DownOutlined />
          </div>
          <div class="dropDown" v-show="!toggle">
            <router-link to="/questionnaire-template"
              ><a-menu-item
                ><ReconciliationOutlined /><span class="menuItem"
                  >Template</span
                ></a-menu-item
              ></router-link
            >
            <router-link to="/questionnaire-bank"
              ><a-menu-item
                ><FileTextOutlined /><span class="menuItem"
                  >Question Bank</span
                ></a-menu-item
              ></router-link
            >
            <router-link to="/questionnaire"
              ><a-menu-item
                ><PlusOutlined /><span class="menuItem"
                  >Add Question</span
                ></a-menu-item
              ></router-link
            >
            <router-link to="/resources"
              ><a-menu-item
                ><PlusOutlined /><span class="menuItem"
                  >Resources</span
                ></a-menu-item
              ></router-link
            >
          </div>
        </div>

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
  // DashboardOutlined,
  MailOutlined,
  CreditCardOutlined,
  FileDoneOutlined,
  HomeOutlined,
  SafetyOutlined,
  ReconciliationOutlined,
  GlobalOutlined,
  FileTextOutlined,
  DownOutlined,
  PlusOutlined,
  TeamOutlined
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    MailOutlined,
    // DashboardOutlined,
    CreditCardOutlined,
    FileDoneOutlined,
    HomeOutlined,
    SafetyOutlined,
    ReconciliationOutlined,
    GlobalOutlined,
    FileTextOutlined,
    DownOutlined,
    PlusOutlined,
    TeamOutlined
  },

  setup() {
    const state = reactive({
      selectedKeys: ["1"],
    });
    onUnmounted(() => {
      document.body.classList.remove("show");
    });
    const toggle = ref(true);
    return { ...toRefs(state), toggle };
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

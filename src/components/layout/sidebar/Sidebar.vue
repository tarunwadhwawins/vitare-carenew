<template>
  <a-layout-sider
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
  >
    <div class="menuList">
      <a-menu
        id="dddddd"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        @click="handleClick"
      >
        <!-- <router-link to="/dashboard">
                <a-menu-item>
                    <HomeOutlined /><span class="menuItem">{{$t('global.dashboard')}}</span></a-menu-item>
            </router-link> -->
        <router-link
          to="/dashboard"
          v-if="
            arrayToObjact(widgetsPermissions, 13) ||
            arrayToObjact(widgetsPermissions, 5) ||
            arrayToObjact(widgetsPermissions, 1) ||
            arrayToObjact(widgetsPermissions, 2) ||
            arrayToObjact(widgetsPermissions, 14) ||
            arrayToObjact(widgetsPermissions, 6) ||
            arrayToObjact(screensPermissions, 65)
          "
        >
          <a-menu-item>
            <HomeOutlined /><span class="menuItem"
              >Clinical Dashboard</span
            ></a-menu-item
          >
        </router-link>
        <router-link
          to="/businessDashboard"
          v-if="
            arrayToObjact(widgetsPermissions, 3) ||
            arrayToObjact(widgetsPermissions, 4) ||
            arrayToObjact(widgetsPermissions, 5) ||
            arrayToObjact(widgetsPermissions, 6)
          "
        >
          <a-menu-item>
            <CreditCardOutlined /><span class="menuItem"
              >Business Dashboard</span
            ></a-menu-item
          >
        </router-link>
        <router-link
          to="/escalation"
          v-if="arrayToObjact(screensPermissions, 404)"
        >
          <a-menu-item>
            <DashboardOutlined /><span class="menuItem">{{
              "Escalations"
            }}</span>
          </a-menu-item>
        </router-link>
        <router-link
          to="/referral"
          v-if="arrayToObjact(screensPermissions, 409)"
        >
          <a-menu-item>
            <FileDoneOutlined /><span class="menuItem"
              >Referrals</span
            ></a-menu-item
          >
        </router-link>
        <router-link
          :to="{ name: 'Communications', query: { view: 'dashboard' } }"
          v-if="arrayToObjact(screensPermissions, 109)"
        >
          <a-menu-item>
            <MailOutlined /><span class="menuItem">{{
              $t("sidebar.communications")
            }}</span></a-menu-item
          >
        </router-link>
        <router-link
          to="/manage-care-coordinator"
          v-if="arrayToObjact(screensPermissions, 40)"
        >
          <a-menu-item>
            <TeamOutlined /><span class="menuItem"
              >Care Cordinators</span
            ></a-menu-item
          >
        </router-link>
        <router-link
          to="/manage-patients"
          v-if="arrayToObjact(screensPermissions, 65)"
        >
          <a-menu-item>
            <UserOutlined /><span class="menuItem">{{
              $t("sidebar.patients")
            }}</span></a-menu-item
          >
        </router-link>
        <router-link
          to="/appointment-calendar"
          v-if="arrayToObjact(screensPermissions, 112)"
        >
          <a-menu-item>
            <CalendarOutlined /><span class="menuItem"
              >Appointments</span
            ></a-menu-item
          >
        </router-link>
        <router-link
          :to="{ name: 'Tasks', query: { view: 'dashboard' } }"
          v-if="arrayToObjact(screensPermissions, 113)"
        >
          <a-menu-item>
            <BarChartOutlined /><span class="menuItem">{{
              $t("sidebar.tasks")
            }}</span></a-menu-item
          >
        </router-link>

        <router-link
          to="/thresholds"
          v-if="arrayToObjact(screensPermissions, 329)"
        >
          <a-menu-item>
            <ProjectOutlined /><span class="menuItem">{{
              $t("sidebar.generalParameters")
            }}</span></a-menu-item
          >
        </router-link>
        <router-link
          to="/time-log-report"
          v-if="arrayToObjact(screensPermissions, 332)"
        >
          <a-menu-item>
            <FieldTimeOutlined /><span class="menuItem">{{
              $t("sidebar.auditTimeLog")
            }}</span></a-menu-item
          >
        </router-link>
        <router-link
          to="/time-log-approval"
          v-if="arrayToObjact(screensPermissions, 332)"
        >
          <a-menu-item>
            <FieldTimeOutlined /><span class="menuItem">{{
              $t("sidebar.auditTimeLogApproval")
            }}</span></a-menu-item
          >
        </router-link>
        <router-link
          to="/time-tracking-report"
          v-if="arrayToObjact(screensPermissions, 411)"
        >
          <a-menu-item>
            <ReadOutlined /><span class="menuItem">{{
              $t("sidebar.reports")
            }}</span>
          </a-menu-item>
        </router-link>

        <router-link v-if="linkTo" :to="linkTo">
          <a-menu-item>
            <UserSwitchOutlined /><span class="menuItem"
              >{{ $t("sidebar.administration") }}
            </span></a-menu-item
          >
        </router-link>
        <!-- <a-sub-menu key="sub4">
          <template #icon>
            <ReadOutlined />
          </template>
          <template #title>Navigation Three</template>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu> -->
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script>
import {
  defineComponent,
  computed,
  onUnmounted,
  ref,
  onMounted,
  watch,
} from "vue";

import {
  HomeOutlined,
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  CreditCardOutlined,
  FileDoneOutlined,
  TeamOutlined,
  ProjectOutlined,
  BarChartOutlined,
  FieldTimeOutlined,
  ReadOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { arrayToObjact } from "@/commonMethods/commonMethod";
export default defineComponent({
  components: {
    HomeOutlined,
    MailOutlined,
    UserOutlined,
    CalendarOutlined,
    DashboardOutlined,
    CreditCardOutlined,
    FileDoneOutlined,
    TeamOutlined,
    ProjectOutlined,
    BarChartOutlined,
    FieldTimeOutlined,
    ReadOutlined,
    UserSwitchOutlined,
  },

  setup() {
    const store = useStore();
    const linkTo = ref(null);

    const screensPermissions = computed(() => {
      return store.state.screenPermissions.screensPermissions;
    });
    const roles = computed(() => {
      return localStorage.getItem("roleAuth");
    });

    const escalationStatus = computed(() => {
      return store.state.escalations.escalationStaus;
    });
    onUnmounted(() => {
      document.body.classList.remove("show");
    });

    onMounted(() => {
      if (screensPermissions.value) {
        if (arrayToObjact(screensPermissions.value, 9)) {
          linkTo.value = "/cpt-codes";
        } else if (arrayToObjact(screensPermissions.value, 15)) {
          linkTo.value = "/manage-programs";
        } else if (arrayToObjact(screensPermissions.value, 22)) {
          linkTo.value = "/providers";
        } else if (arrayToObjact(screensPermissions.value, 1)) {
          linkTo.value = "/roles-and-permissions";
        } else if (arrayToObjact(screensPermissions.value, 6)) {
          linkTo.value = "/global-codes";
        } else if (arrayToObjact(screensPermissions.value, 336)) {
          linkTo.value = "/inventory";
        }
      }
    });

    const selectedKeys = ref(["1"]);
    const openKeys = ref(["sub1"]);

    const handleClick = (e) => {
      console.log("click", e);
    };

    const titleClick = (e) => {
      console.log("titleClick", e);
    };

    watch(
      () => openKeys,
      (val) => {
        console.log("openKeys", val);
      }
    );

    return {
      escalationStatus,
      linkTo,
      screensPermissions,
      arrayToObjact,
      roles,
      widgetsPermissions: store.getters.widgetsPermissions,
      selectedKeys,
      openKeys,
      handleClick,
      titleClick,
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

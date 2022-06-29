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
            <router-link to="/staff-groups">
              <a-menu-item>
                <TeamOutlined />
                <span class="menuItem">{{$t('global.groups')}}</span>
              </a-menu-item>
            </router-link>
            <div class="subMenu">
                <div class="questionnaireMenu" @click="toggle = !toggle">
                    <FileTextOutlined /><span class="menuItem">Questionnaire</span>
                    <DownOutlined />
                </div>
                <div class="dropDown" v-show="!toggle">
                    <router-link to="/questionnaire-template">
                        <a-menu-item>
                            <ReconciliationOutlined /><span class="menuItem">Template</span></a-menu-item>
                    </router-link>
                    <router-link to="/template-section">
                        <a-menu-item>
                            <FileTextOutlined /><span class="menuItem">Section</span></a-menu-item>
                    </router-link>
                    <router-link to="/questionnaire-bank">
                        <a-menu-item>
                            <FileTextOutlined /><span class="menuItem">Question Bank</span></a-menu-item>
                    </router-link>
                    
                    <router-link to="/resources">
                        <a-menu-item>
                            <FileTextOutlined /><span class="menuItem">Resources</span></a-menu-item>
                    </router-link>
                </div>
            </div>
            <router-link to="/work-flow" >
                <a-menu-item>
                    <ApartmentOutlined />
                    <span class="menuItem">{{'WorkFlow Setup'}}</span>
                </a-menu-item>
            </router-link>
            <router-link to="/dashboard">
            
            <router-link to="/dashboard" >
                <a-menu-item>
                    <HomeOutlined /><span class="menuItem">Home</span></a-menu-item>
            </router-link>
        </a-menu>
    </div>
  </a-layout-sider>
</template>

<script>
import {
    defineComponent,
    onUnmounted,
    toRefs,
    ref,
    reactive
} from "vue";
import {
    MailOutlined,
    CreditCardOutlined,
    FileDoneOutlined,
  
    GlobalOutlined,
    ApartmentOutlined,
    HomeOutlined,
    SafetyOutlined,
    ReconciliationOutlined,
   
    FileTextOutlined,
    DownOutlined,
    
    TeamOutlined,
   
} from "@ant-design/icons-vue";
import {
    useStore
} from "vuex";
import {
    arrayToObjact
} from "@/commonMethods/commonMethod";
export default defineComponent({
    components: {
        
        FileDoneOutlined,
        HomeOutlined,
        ApartmentOutlined,
        ReconciliationOutlined,
       
        FileTextOutlined,
        DownOutlined,
       
        TeamOutlined,
       
        MailOutlined,
        CreditCardOutlined,
     
        
        SafetyOutlined,
        GlobalOutlined,
    },

    setup() {
        const store = useStore();
        const state = reactive({
      selectedKeys: ["1"],
    });
        onUnmounted(() => {
            document.body.classList.remove("show");
        });
        const toggle = ref(true);
        return {
          ...toRefs(state), 
          toggle,
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

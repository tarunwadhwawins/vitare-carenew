<template>
  <div>
    <!-- <div class="SelectLanguage">
      <span for="Select Language">Select Language <SelectLanguage /></span>
    </div> -->
    <!-- used for component i18n like calendar -->
    <!-- <div class="change-locale">
      <span style="margin-right: 16px">Change locale of components:</span>
      <a-radio-group v-model:value="locale">
        <a-radio-button key="en" :value="enUS.locale">English</a-radio-button>
        <a-radio-button key="es" :value="esES.locale">Spanish</a-radio-button>
      </a-radio-group>
    </div> -->
    <a-config-provider :locale="locale === 'en' ? enUS : esES">
      <div>
        <router-view />
      </div>
      <!-- <div v-else>
        <router-view />
      </div> -->
    </a-config-provider>
  </div>
</template>

<script>
import { watchEffect, ref, onMounted, computed } from "vue";
import enUS from "ant-design-vue/es/locale/en_US";
import esES from "ant-design-vue/es/locale/es_ES";
// import 'moment/dist/locale/es';
// import SelectLanguage from "./views/localization/SelectLanguage.vue";
// moment.locale("en");
import { useStore } from "vuex";


export default {
  //   components: {
  //     SelectLanguage,
  //   },
  setup() {
    const store = useStore();
    const locale = ref(enUS.locale);
    let date = new Date();
    const refreshToken = computed(() => {
      return store.state.authentication.expiresIn;
    });

    watchEffect(() => {

      if (refreshToken.value != null) {
        store.dispatch("globalCodes");
        //store.dispatch("timeLine", 122);
        store.dispatch("permissions");
        store.dispatch("escalationStaus")
        store.dispatch("appointmentConference");
        store.dispatch("notificationList");
        store.dispatch("allPatientsList")
        store.dispatch("allStaffList")
        let loginCheck = localStorage.getItem('checkLogin');
        if(!loginCheck){
          store.dispatch("logoutUser")
        }
        
        if (refreshToken.value > date.getTime()) {
          let differenceDate = refreshToken.value - date.getTime();
          setTimeout(() => {
            store.dispatch("refreshToken");
          }, differenceDate);
        } else {
          store.dispatch("logoutUser");
        }
      }
    });

    onMounted(() => {
      document.body.classList.add("test");
    });

    return {
      enUS,
      esES,
      locale,
    };
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.SelectLanguage {
  padding-top: 10px;
  text-align: center;
}
</style>

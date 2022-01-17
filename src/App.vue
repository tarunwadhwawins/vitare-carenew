<template>
  <div>
    <div class="SelectLanguage">
      <span for="Select Language">Select Language <SelectLanguage /></span>
    </div>
    <!-- used for component i18n like calendar -->
    <!-- <div class="change-locale">
      <span style="margin-right: 16px">Change locale of components:</span>
      <a-radio-group v-model:value="locale">
        <a-radio-button key="en" :value="enUS.locale">English</a-radio-button>
        <a-radio-button key="es" :value="esES.locale">Spanish</a-radio-button>
      </a-radio-group>
    </div> -->
    <a-config-provider :locale="locale === 'en' ? enUS : esES">
      <div v-if="!auth">
        <router-view />
      </div>
      <div v-else>
        <router-view />
      </div>
    </a-config-provider>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import enUS from "ant-design-vue/es/locale/en_US";
import esES from "ant-design-vue/es/locale/es_ES";
import moment from "moment";
import 'moment/dist/locale/es';
import { onMounted } from "vue";
import SelectLanguage from "./views/localization/SelectLanguage.vue";
moment.locale("en");
export default {
  components: {
    SelectLanguage,
  },
  setup() {
    const auth = localStorage.getItem("auth");
    const locale = ref(enUS.locale);
    watch(locale, (val) => {
      moment.locale(val);
    });
    onMounted(() => {
      document.body.classList.add("test");
    });
    return {
      auth,
      enUS,
      esES,
      locale,
      moment,
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
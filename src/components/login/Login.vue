<template>
  <a-form :model="loginForm" layout="vertical" @finish="loginUser">
    <div class="field">
      <a-form-item name="email" :rules="[{ required: true, message: $t('login.ePlaceholder')+' '+$t('global.validation')  }]">
        <a-input v-model:value="loginForm.email" :placeholder="$t('login.ePlaceholder')" size="large" />
      </a-form-item>
    </div>
    <div class="field">
      <a-form-item name="password" :rules="[{ required: true, message: $t('login.psdPlaceholder')+' '+$t('global.validation')  }]">
        <a-input-password v-model:value="loginForm.password" :placeholder="$t('login.psdPlaceholder')" size="large" />
      </a-form-item>
    </div>
    <div class="field">
      <span class="error">{{ loginErrorMsg }}</span>
    </div>
    <div class="buttons">
      <a-button class="btn primaryBtn" html-type="submit">{{$t("login.login")}}</a-button>
      <a class=""> {{ $t("login.forgotPassword") }}  </a>
    </div>
  </a-form>
</template>

<script>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore()
    const router = useRouter();

    const loginForm = reactive({
      email: "",
      password: "",
    })

    const loginUser = () => {
      store.dispatch('login', loginForm)
    }

    const loggedInUser = computed(() => {
      return store.state.authentication.loggedInUser
    })

    const loginErrorMsg = computed(() => {
      return store.state.authentication.loginErrorMsg
    })

    return {
      loginErrorMsg,
      loginForm,
      loginUser,
      router,
      loggedInUser,
    };
  },
};
</script>

<style scoped>
span.error {
  color: #ff0000;
}
</style>
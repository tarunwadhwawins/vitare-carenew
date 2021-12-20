<template>
  <ErrorMessages></ErrorMessages>

  <a-form ref="formRef" :rules="rules" :model="logininfomation">
    <div class="field">
      <a-input
        v-model:value="logininfomation.email"
        :placeholder="$t('login.ePlaceholder')"
        size="large"
      />
      <a-form-item ref="email" name="email" />
    </div>
    <div class="field">
      <a-input-password
        v-model:value="logininfomation.password"
        :placeholder="$t('login.psdPlaceholder')"
        size="large"
      />
      <a-form-item ref="password" name="password" />
    </div>
    <div class="buttons">
      <a-button class="btn primaryBtn" @click="handleLogin()">{{
        $t("login.login")
      }}</a-button>
      <a class=""> {{ $t("login.forgotPassword") }} </a>
    </div>
  </a-form>

  <loading
    v-model:active="isLoading"
    loader="bars"
    :lock-scroll="true"
    :is-full-page="false"
    transition="fade"
    :can-cancel="false"
  />
</template>
<script>
import { defineComponent, ref, reactive, watchEffect, computed } from "vue";
import Loading from "vue-loading-overlay";
import { useStore } from "vuex";
import ErrorMessages from "@/components/common/errorhandling/ErrorMessages";

export default defineComponent({
  name: "Login",
  components: {
    Loading,
    ErrorMessages,
  },

  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const formRef = ref();
    const rules = {
      email: [
        {
          required: true,
          message: "Please enter Email",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Please enter Password",
          trigger: "blur",
        },
      ],
    };
    const logininfomation = reactive({
      email: null,
      password: null,
      role: "Admin",
    });
    const errorMsg = watchEffect(() => {
      if (store.state.auth.errorMsg) {
        isLoading.value = false;
      }
    });

    const handleLogin = () => {
      formRef.value
        .validate()
        .then(() => {
          isLoading.value = true;
          store.dispatch("login", logininfomation);
          //isLoading.value = false;
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    return {
      formRef,
      rules,
      isLoading,
      errorMsg,
      logininfomation,
      handleLogin,
    };
  },
});
</script>

<style>
.ant-form-item-control-input {
  display: none !important;
}
</style>


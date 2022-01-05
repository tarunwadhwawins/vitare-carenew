<template>
<form>
    <div class="field">
        <a-input v-model:value="value" :placeholder="$t('login.ePlaceholder')" size="large" />
    </div>
    <div class="field">
        <a-input v-model:value="value" :placeholder="$t('login.psdPlaceholder')" size="large" />
    </div>
    <div class="buttons">
        <a-button class="btn primaryBtn" @click="login()">{{$t("login.login")}}</a-button>
        <a class=""> {{ $t("login.forgotPassword") }}  </a>
    </div>
</form>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const value = ref("");
    const router = useRouter();

    function login() {
      localStorage.setItem("auth", true);
      router.push({
        path: "/dashboard",
      });
    }
    return {
      value,
      login,
      router,
    };
  },
});
</script>

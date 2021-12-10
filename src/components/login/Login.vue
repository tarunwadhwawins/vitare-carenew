<template>
<a-form ref="formRef" :rules="rules" :model="logininfomation">
    <div class="field">
      <a-input
        v-model:value="logininfomation.email"
        placeholder="email"
        size="large"
      />
      <a-form-item ref="email" name="email" />
    </div>
    <div class="field">
      <a-input-password
        v-model:value="logininfomation.password"
        placeholder="Password"
        size="large"
      />
      <a-form-item ref="password" name="password" />
    </div>
    <div class="buttons">
      <a-button class="btn primaryBtn" @click="handleLogin()"
        >Continue</a-button
      >
      <a class=""> Forgot Password ? </a>
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
import { defineComponent } from "vue";
import Loading from "vue-loading-overlay";
import { ref, reactive } from "vue";
import { useStore } from "vuex";



export default defineComponent({
  name: "Login",
  components: {
    Loading,
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
    const handleLogin = () => {
      formRef.value
        .validate()
        .then(() => {
          isLoading.value = true;
          store.dispatch("login", logininfomation);
        
        })
        .catch((error) => {
          console.log("error", error);
        });
        
    };

    return {
      formRef,
      rules,
      isLoading,
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

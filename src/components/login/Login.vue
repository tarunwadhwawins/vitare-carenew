<template>
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
      <a-button class="btn primaryBtn" @click="handleLogin()"
        >{{$t('login.login')}}</a-button
      >
      <a class=""> {{$t('login.forgotPassword')}} </a>
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
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import router from "@/router"


export default defineComponent({
  name: "Login",
  components: {
    Loading,
  },

  setup() {
    
    const store = useStore();
    const isLoading = ref(false);
    const formRef = ref();
    const isLogin = ref(false)
        isLogin.value = computed(() => {
           if(JSON.parse(localStorage.getItem('user'))){
             return true
           }else{
            return false
           }
           
        })
        if(isLogin.value){
       router.push("/")
        }
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
      isLogin,
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

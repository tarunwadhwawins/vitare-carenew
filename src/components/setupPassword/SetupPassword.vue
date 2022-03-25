<template>
  <div v-if="isCodeValid" class="loginWrapper setupPassword">
    <div class="logIn">
      <div class="loginInner">
        <a-row>
          <a-col :md="24">
            <div class="rightWrapper">

              <div class="logo">
                <img src="@/assets/images/logo.svg" alt="image" />
              </div>
              <img class="rightImg" src="@/assets/images/curve.png" alt="image" />
              <h2>Setup Password</h2>

              <a-form ref="formRef" :model="setupPasswordForm" layout="vertical" @finish="submitForm">
                
                <a-col :sm="24" :xs="24">
                  <div class="form-group">
                    <a-form-item :label="$t('global.newPassword')" name="newPassword" :rules="[{ required: true, message: $t('global.newPassword')+' '+$t('global.validation')  }]">
                      <a-input-password v-model:value="setupPasswordForm.newPassword" placeholder="Enter New Password" size="large" />
                    </a-form-item>
                  </div>
                </a-col>

                <a-col :sm="24" :xs="24">
                  <div class="form-group">
                    <a-form-item :label="$t('global.confirmNewPassword')" name="confirmNewPassword" :rules="[{ required: true, message: $t('global.confirmNewPassword')+' '+$t('global.validation')  }]">
                      <a-input-password v-model:value="setupPasswordForm.confirmNewPassword" placeholder="Confirm Password" size="large" />
                      <ErrorMessage v-if="confirmNewPasswordError" :name="confirmNewPasswordError ? confirmNewPasswordError : ''" />
                    </a-form-item>
                  </div>
                </a-col>
                
                <a-col :sm="12" :xs="24">
                  <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.submit')}}</a-button>
                </a-col>

              </a-form>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
  <!-- <div v-else class="loginWrapper setupPassword">
    <div class="logIn">
      <h2>Invalid Code</h2>
    </div>
  </div> -->
  <Loader />
</template>

<script>
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watchEffect
} from "vue";
import {
  useRoute,
  // useRouter
} from "vue-router";
import { useStore } from "vuex";
import ErrorMessage from "@/components/common/messages/ErrorMessage"
import Loader from "../loader/Loader"
export default defineComponent({
  components: {
    ErrorMessage,
    Loader,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    // const router = useRouter()
    const code = route.query.code
    const formRef = ref()

    watchEffect(() => {
      store.dispatch('validateCode', code)
    })

    const setupPasswordForm = reactive({
      newPassword: '',
      confirmNewPassword: '',
    })
    const form = reactive({ ...setupPasswordForm })

    const confirmNewPasswordError = ref('');
    const submitForm = () => {
      confirmNewPasswordError.value = ''
      if(setupPasswordForm.newPassword != setupPasswordForm.confirmNewPassword) {
        confirmNewPasswordError.value = "Confirm Password Doesn't Match with New Password"
      }
      else {
        store.dispatch('setupPassword', {
          code: code,
          newPassword: setupPasswordForm.newPassword,
          confirmNewPassword: setupPasswordForm.confirmNewPassword,
        }).then(() => {
          // router.push("thank-you")
          formRef.value.resetFields();
          Object.assign(setupPasswordForm, form)
        })
      }
    }

    const isCodeValid = computed(() => {
      return store.state.password.validateCode
    })
    
    return {
      formRef,
      setupPasswordForm,
      submitForm,
      isCodeValid,
      confirmNewPasswordError,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.setupPassword {
  .logIn {
    max-width: 500px;
    .loginInner {
      .rightWrapper {
        .logo {
          max-width: 100px;
          margin: 0 0 20px;
        }
      }
    }
  }
}
</style>
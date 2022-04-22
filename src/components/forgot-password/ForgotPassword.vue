<template>
  <div class="loginWrapper">
    <div class="logIn">
      <div class="loginInner">
        <a-row>
          <WelcomeScreen />
          <a-col :md="12">
            <div class="rightWrapper">
              <img class="rightImg" src="@/assets/images/curve.png" alt="image" />
              <h2>Forgot Password</h2>
              <a-form ref="formRef" :model="forgotPasswordForm" layout="vertical" @finish="submitForm">
                <a-col :sm="24" :xs="24">
                  <div class="form-group">
                    <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.email')+' '+$t('global.validation')  }]">
                      <a-input v-model:value="forgotPasswordForm.email" placeholder="Email Address" size="large" />
                    </a-form-item>
                  </div>
                </a-col>
                <a-col :sm="12" :xs="24">
                  <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.send')}}</a-button>
                </a-col>
              </a-form>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref
} from "vue";
import { useStore } from "vuex";
import WelcomeScreen from "@/components/common/Welcome";
export default defineComponent({
  components: {
    WelcomeScreen
  },
  setup() {
    const store = useStore()
    const formRef = ref()

    const forgotPasswordForm = reactive({
      email: ''
    })
    
    const form = reactive({ ...forgotPasswordForm })

    const submitForm = () => {
      store.dispatch('forgotPassword', forgotPasswordForm).then(() => {
        formRef.value.resetFields();
        Object.assign(forgotPasswordForm, form)
      })
    }
    
    return {
      formRef,
      forgotPasswordForm,
      submitForm,
    };
  },
});
</script>

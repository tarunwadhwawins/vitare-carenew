<template>
  <div class="loginWrapper">
    <div class="logIn">
      <div class="loginInner">
        <a-row>
          <a-col :md="12">
            <div class="leftWrapper">
              <div>
                <div class="logo">
                  <img src="../../assets/images/logo.png" alt="image" />
                </div>
                <h2>Welcome to Virtare Healthcare</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.
                </p>
                <img
                  class="rightImg"
                  src="../../assets/images/circle.png"
                  alt="image"
                />
              </div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="rightWrapper">
              <img class="rightImg" src="../../assets/images/curve.png" alt="image" />
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
export default defineComponent({
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

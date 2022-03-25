<template>
  <div>
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <div class="common-bg">
            <a-row>
              <a-col :span="24">
                <h2 class="pageTittle">Reset Password</h2>
              </a-col>
            </a-row>
            <a-form ref="formRef" :model="resetPasswordForm" layout="vertical" @finish="submitForm">
              <a-row :gutter="24">
                <a-col :sm="24" :xs="24">
                  <div class="form-group">
                    <a-form-item :label="$t('global.currentPassword')" name="currentPassword" :rules="[{ required: true, message: $t('global.currentPassword')+' '+$t('global.validation')  }]">
                      <a-input-password v-model:value="resetPasswordForm.currentPassword" size="large" placeholder="Current Password" />
                      <ErrorMessage v-if="errorMsg" :name="errorMsg.currentPassword ? errorMsg.currentPassword[0] : ''" />
                    </a-form-item>
                  </div>
                </a-col>
                <a-col :sm="24" :xs="24">
                  <div class="form-group">
                    <a-form-item :label="$t('global.newPassword')" name="newPassword" :rules="[{ required: true, message: $t('global.newPassword')+' '+$t('global.validation')  }]">
                      <a-input-password v-model:value="resetPasswordForm.newPassword" size="large" placeholder="New Password" />
                    </a-form-item>
                  </div>
                </a-col>
                <a-col :sm="24" :xs="24">
                  <div class="form-group">
                    <a-form-item :label="$t('global.confirmPassword')" name="confirmPassword" :rules="[{ required: true, message: $t('global.confirmPassword')+' '+$t('global.validation')  }]">
                      <a-input-password v-model:value="resetPasswordForm.confirmPassword" size="large" placeholder="Confirm New Password" />
                      <ErrorMessage v-if="errorMsg" :name="errorMsg.confirmPassword ? errorMsg.confirmPassword[0] : ''" />
                      <ErrorMessage v-if="confirmPasswordError" :name="confirmPasswordError ? confirmPasswordError : ''" />
                    </a-form-item>
                  </div>
                </a-col>
                <a-col :sm="12" :xs="24">
                  <a-button class="modal-button" @click="handleClear()">{{$t('global.clear')}}</a-button>
                  <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.resetPassword')}}</a-button>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { computed, onUnmounted, reactive, ref } from "vue";
import { useStore } from 'vuex';
import ErrorMessage from "@/components/common/messages/ErrorMessage"

export default {
  components: {
    Header,
    Sidebar,
    ErrorMessage,
  },
  setup() {
    const store = useStore()
    const formRef = ref();

    const resetPasswordForm = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    const form = reactive({ ...resetPasswordForm })

    const confirmPasswordError = ref('');
    const submitForm = () => {
      if(resetPasswordForm.newPassword != resetPasswordForm.confirmPassword) {
        confirmPasswordError.value = "Confirm Password Doesn't Match with New Password"
      }
      else {
        store.dispatch('resetPassword', resetPasswordForm).then(() => {
          formRef.value.resetFields();
          Object.assign(resetPasswordForm, form)
          confirmPasswordError.value = ''
        })
      }
    }

    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(resetPasswordForm, form)
    }

    const errorMsg = computed(() => {
      return store.state.password.errorMsg
    })

    onUnmounted(() => {
      store.commit('errorMsg', null)
    })

    return {
      formRef,
      resetPasswordForm,
      submitForm,
      handleClear,
      errorMsg,
      confirmPasswordError,
    };
  },
};
</script>

<style scoped>
  .modal-button {
    margin: 5px;
    padding: 7px 15px 5px 15px;
    height: auto;
  }
</style>

<template>
  <a-modal width="50%" title="Edit Contact" centered >
    <a-form :model="editContactForm" ref="formRest" autocomplete="off" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('global.firstName')" name="firstName" :rules="[{ required: true, message: $t('global.firstName')+' '+$t('global.validation')  }]">
              <a-input v-model:value="editContactForm.firstName" size="large" name="firstName"/>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.firstName ? errorMsg.firstName[0] : ''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('global.lastName')" name="lastName" :rules="[{ required: false, message: $t('global.lastName')+' '+$t('global.validation') }]">
              <a-input v-model:value="editContactForm.lastName" size="large"/>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.lastName ? errorMsg.lastName[0] : ''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
              <a-input v-model:value="editContactForm.email" placeholder="test@test.com" size="large" @input="emailChange()"/>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.email ? errorMsg.email[0] : ''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.phoneNo').toLowerCase()}]">
              <a-input-number v-model:value.trim="editContactForm.phoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%"/>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber ? errorMsg.phoneNumber[0] : ''" />
            </a-form-item>
          </div>
        </a-col>
      <a-col :span="24">
        <a-button type="primary" html-type="submit">{{$t('global.update')}}</a-button>
      </a-col>
    </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { computed, watchEffect, reactive, ref } from 'vue-demi'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  props: {
    isContactEdit: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const paramId = route.params.udid
    const formRef = ref()
    var isEdit = reactive(props.isContactEdit)

    const contactDetails = computed(() => {
      return store.state.careCoordinator.contactDetails
    })

    const editContactForm = reactive({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    })

    
    watchEffect(() => {
      if(isEdit) {
        Object.assign(editContactForm, contactDetails.value)
      }
    })

    const form = reactive({ ...editContactForm })
    const submitForm = () => {
      isEdit = false
      store.dispatch('updateContact', {
        id: route.params.udid,
        contactId: contactDetails.value.id,
        data: editContactForm,
      }).then(() => {
        emit('closeModal')
        Object.assign(editContactForm, form)
        store.dispatch("staffContactList", route.params.udid);
      })
    }

    return {
      formRef,
      editContactForm,
      paramId,
      submitForm,
    }
  }
}
</script>
<template>
  <a-form :model="createGroupForm" layout="vertical" @finish="submitForm">
    <a-row>
      <a-col :span="24">
        <div class="form-group">
          <a-form-item :label="$t('staffGroups.groupName')" name="group" :rules="[{required: true, message:$t('staffGroups.groupName')+' '+$t('global.validation')}]">
            <a-input v-model:value="createGroupForm.group" size="large" @keyup="changeInput" />
          </a-form-item>
        </div>
      </a-col>
      <a-col :span="24">
        <div class="form-group">
          <a-form-item :label="$t('global.isActive')" name="isActive">
            <a-switch v-model:checked="createGroupForm.isActive" @change="changeInput" />
          </a-form-item>
        </div>
      </a-col>
      <ErrorMessage v-if="errorMsg != null" :name="errorMsg ? errorMsg : '' " />
      <a-col :span="24">
        <div class="form-group">
          <div class="steps-action">
            <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.next')}}</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import {
  computed,
  reactive,
  ref,
  watchEffect,
  defineAsyncComponent,
} from 'vue-demi';
import { useStore } from 'vuex';

export default {
  props: {
    isEdit: {
      type: Boolean
    },
    groupID: {
      type: Number
    }
  },
  components: {
    ErrorMessage: defineAsyncComponent(()=>import("@/components/common/messages/ErrorMessage")),
  },
  setup(props, { emit }) {
    const store = useStore()
    const groupId = ref()
    const title = props.isEdit ? 'Edit Group' : 'Create Group'

    const errorMsg = computed(() => {
      return store.state.staffGroups.errorMsg
    })

    const createGroup = computed(() => {
      return store.state.staffGroups.createGroup
    })

    const groupDetails = computed(() => {
      return store.state.staffGroups.groupDetails
    })

    const createGroupForm = reactive({
      group: "",
      isActive: true,
    })

    watchEffect(() => {
      if(groupDetails.value) {
        Object.assign(createGroupForm, groupDetails.value)
        groupId.value = props.groupID ? props.groupID : groupDetails.value.udid;
      }
    })

    const submitForm = () => {
      store.commit('errorMsg', null)
      if(props.isEdit) {
        store.dispatch('updateGroup', {
          id: groupId.value,
          data: createGroupForm,
        }).then(() => {
          store.dispatch('groupsList')
          store.dispatch('groupDetails', createGroup.value.udid)
        })
      }
      else {
        if(groupDetails.value != null) {
          store.dispatch('updateGroup', {
            id: groupDetails.value.udid,
            data: createGroupForm,
          }).then(() => {
            store.dispatch('groupsList')
            store.dispatch('groupDetails', groupDetails.value.udid)
          })
        }
        else if(createGroup.value != null) {
          store.dispatch('updateGroup', {
            id: createGroup.value.udid,
            data: createGroupForm,
          }).then(() => {
            store.dispatch('groupsList')
            store.dispatch('groupDetails', createGroup.value.udid)
          })
        }
        else {
          store.dispatch('groupsList')
          store.dispatch('createGroup', createGroupForm).then(() => {
          })
        }
      }
    }

    const closeModal = () => {
      emit('closeModal')
    }

    const changeInput = () => {
      store.commit('errorMsg', null)
    }

    return {
      title,
      closeModal,
      changeInput,
      createGroupForm,
      submitForm,
      errorMsg,
    };
  },
};
</script>
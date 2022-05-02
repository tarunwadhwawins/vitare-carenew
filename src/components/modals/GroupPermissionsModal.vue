<template>
  <a-modal width="60%" :title="$t('staffGroups.groupPermissions')">
    <a-form ref="formRef" :model="groupPermissionsForm" layout="vertical" @finish="submitForm">
      <a-row>
        <a-col :span="24" v-for="permission in rolesAndPermissions" :key="permission.id">
          <div v-if="permission.id==18"></div>
          <a-card v-else :title="permission.name">
            <div class="screens" v-for="screen in permission.screens" :key="screen.moduleId">
              <a-checkbox v-model:checked="groupPermissionsForm.screen[screen.id]" @change="checkAll(screen.actions,screen.id); checkChangeInput()"><strong>{{ screen.name }}</strong></a-checkbox>
              <a-divider class="transparent" />
              <a-checkbox class="actions" v-for="action in screen.actions" :key="action.id" v-model:checked="groupPermissionsForm.action[action.id]" @change="checkStatus(screen.id,screen.actions); checkChangeInput()">{{ action.name }}</a-checkbox>
              <a-divider class="transparent" />
            </div>
          </a-card>
          <a-divider class="transparent" />

        </a-col>
        
        <a-col :span="24">
          <div class="steps-action">
            <ModalButtons />
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { computed, onMounted, reactive } from 'vue-demi'
import { useStore } from 'vuex'
import ModalButtons from "@/components/common/button/ModalButtons";
export default {
  components: {
    ModalButtons,
  },
  setup(props, { emit }) {
    const store = useStore()
    // const rolesAndPermissions = store.getters.rolesAndPermissionsRecord.value
    const groupPermissionsForm = reactive({
      action: [],
      screen: []
    })
    const rolesAndPermissions = computed(() => {
      return store.state.rolesAndPermissions.rolesAndPermissions
    })
    console.log('rolesAndPermissions', rolesAndPermissions.value)

    onMounted(() => {
      store.dispatch('rolePermissions')
    })

    const submitForm = () => {
      emit('closeModal')
    }

    function checkAll(actions, value) {
      actions.map((item) => {
        groupPermissionsForm.screen[value] == true ? groupPermissionsForm.action[item.id] = true : groupPermissionsForm.action[item.id] = false
      })
    }

    function checkStatus(value, check) {
      let checkBox = true
      check.forEach((item) => {
        groupPermissionsForm.action[item.id] == true ? '' : checkBox = false
      })
      checkBox ? groupPermissionsForm.screen[value] = true : groupPermissionsForm.screen[value] = false
      //groupPermissionsForm.action[actions] == true ? "" : groupPermissionsForm.screen[value] = false
    }

    function checkChangeInput() {
      store.commit('checkChangeInput', true)
    }

    return {
      checkAll,
      checkStatus,
      checkChangeInput,
      submitForm,
      groupPermissionsForm,
      rolesAndPermissions,
    }
  }
}
</script>

<style>
.actions {
  margin-left: 8px;
  display: block;
}

.transparent {
  margin: 5px 0 !important;
}
</style>
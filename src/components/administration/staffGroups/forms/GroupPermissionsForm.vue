<template>
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
          <div class="form-group">
            <div class="steps-action">
              <a-button style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
              <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
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
  watchEffect
} from 'vue-demi'
// import { successSwal } from "@/commonMethods/commonMethod";
// import { messages } from "@/config/messages";
import {
  arrayToObjact,
} from "@/commonMethods/commonMethod"
import { useStore } from 'vuex'

export default {
  props: {
    isEdit: {
      type: Boolean
    },
    groupID: {
      type: Number
    },
  },
  setup(props, { emit }) {
    const formRef = ref()
    const store = useStore()
    const groupId = ref(null)
    
    const rolesAndPermissions = computed(() => {
      return store.state.rolesAndPermissions.rolesAndPermissions
    })

    const groupPermissionsModules = computed(() => {
      return store.state.staffGroups.groupPermissionsModules
    })

    const groupPermissionsForm = reactive({
      action: [],
      screen: []
    })
    // const form = reactive({ ...groupPermissionsForm })

    const createGroup = computed(() => {
      return store.state.staffGroups.createGroup
    })

    const groupDetails = computed(() => {
      return store.state.staffGroups.groupDetails
    })

    watchEffect(() => {
      if(props.isEdit) {
        copyPermission()
        groupId.value = groupDetails.value.udid
      }
      else {
        groupId.value = createGroup.value ? createGroup.value.udid : null
      }
    })

    function copyPermission() {
      if(groupPermissionsModules.value) {
        groupPermissionsModules.value.forEach((groupPermissions) => {
          groupPermissions.screens.forEach((screenElement) => {
            screenElement.actions.forEach((getData) => {
              rolesAndPermissions.value ? rolesAndPermissions.value.forEach((formModule) => {
                let screens = arrayToObjact(formModule.screens, screenElement.id)
                if(screens) {
                  screenElement.actions.length == screens.actions.length ? groupPermissionsForm.screen[screenElement.id] = true : groupPermissionsForm.screen[screenElement.id] = false
                }
              }) : ''
              groupPermissionsForm.action[getData.id] = true
            })
          })
        })
      }
    }

    const actionsIds = []
    const submitForm = () => {
      var permissionsArray = groupPermissionsForm.action
      permissionsArray.forEach(function (value, index) {
        if(value) {
          actionsIds.push(index)
        }
      });
      store.dispatch('addGroupPermissions', {
        groupId: groupId.value,
        actions: {
          action: actionsIds
        },
      }).then(() => {
        formRef.value.resetFields();
        Object.assign(groupPermissionsForm, {
          action: [],
          screen: []
        })
        store.dispatch('groupsList')
        emit('closeModal')
      })
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
    }

    function checkChangeInput() {
      store.commit('checkChangeInput', true)
    }

    return {
      formRef,
      checkAll,
      checkStatus,
      checkChangeInput,
      submitForm,
      groupPermissionsForm,
      rolesAndPermissions,
      groupPermissionsModules,
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
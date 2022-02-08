<template>
  <a-modal max-width="900px" width="90%" title="Create New Role" :footer="null">
    <a-row :gutter="24">
      <a-col :span="24">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
        </a-steps>
        <div class="steps-content" v-if="steps[current].title == 'Select Role'">
          <a-row :gutter="24">
            <a-col :sm="8" :xs="24">
              <div class="roles">
                <h4>Select a Role</h4>
                <a-radio-group v-model="role" @change="onRoleChange">
                  <template v-for="role in rolesList" :key="role.id">
                    <div class="radioInput">
                      <a-radio :value="role.id">{{ role.name }}</a-radio>
                    </div>
                  </template>
                </a-radio-group>
              </div>
            </a-col>
            <RolePermissionsList v-if="showList" :roleId="roleId"/>
          </a-row>
          <div class="steps-action">
            <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">Previous</a-button>
            <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
            <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
              Done
            </a-button>
          </div>
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Describe Role'" >
          <a-form ref="formRef" :model="addRoleForm" layout="vertical" @finish="submitForm">
            <a-row :gutter="24">
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <!-- <a-form-item :label="$t('roles.name')" name="name" :rules="[{ required: true, message: $t('roles.name')+' '+$t('global.validation')  }]"> -->
                    <a-input v-model:value="addRoleForm.name" size="large" />
                  <!-- </a-form-item> -->
                </div>
              </a-col>
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <!-- <a-form-item :label="$t('roles.description')" name="description" :rules="[{ required: true, message: $t('roles.description')+' '+$t('global.validation')  }]"> -->
                    <a-textarea v-model:value="addRoleForm.description" placeholder="Description" allow-clear/>
                  <!-- </a-form-item> -->
                </div>
              </a-col>
              <a-col :sm="24" :xs="24">
                <div class="steps-action">
                  <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">Previous</a-button>
                  <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">Next</a-button>
                  <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                    Done
                  </a-button>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Permissions'" >
          <h4><strong>Select Permissions</strong></h4>
          <a-divider class="transparent" />
          <a-form ref="formRef" :model="addPermissionsForm" @finish="addPermissions">
            <a-row>
              <a-col :span="24" v-for="module in rolePermissions.modules" :key="module.id">
                <a-card :title="module.name">
                  <div class="screens" v-for="screen in module.screens" :key="screen.id">
                    <a-checkbox v-model="addPermissionsForm.screen"><strong>{{ screen.name }}</strong></a-checkbox>
                    <a-divider class="transparent" />
                    <a-checkbox class="actions" v-for="action in screen.actions" :key="action.id" v-model="addPermissionsForm.action">{{ action.name }}</a-checkbox>
                    <a-divider class="transparent" /> 
                  </div>
                </a-card>
                <a-divider class="transparent" />
              </a-col>
            </a-row>
            <div class="steps-action">
              <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">Previous</a-button>
              <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">Next</a-button>
              <a-button v-if="current == steps.length - 1" type="primary" html-type="submit">Done</a-button>
            </div>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import {  reactive, ref, watchEffect, computed } from "vue";
import { useStore } from "vuex"
import RolePermissionsList from "@/components/administration/rolesAndPermissions/RolePermissionsList"
// import rolePermissions from "@/data/permissions.json"
// import StepperButtons from "@/components/common/button/StepperButtons"
export default {
  components: {
    RolePermissionsList,
    // StepperButtons,
  },
  setup(props, {emit}) {
    const store = useStore();
    const current = ref(0);
    const roleId = ref(null);
    const showList = ref(false);
    const checkedValue = ref(true);

    watchEffect(() => {
      store.dispatch('rolePermissions')
    })
    const rolePermissions = computed(() => {
      return store.state.rolesAndPermissions.rolePermissions
    })

    const addRoleForm = reactive({
      name: '',
      description: ''
    })

    const addPermissionsForm = reactive({
      action: '',
      screen: ''
    })
    
    const submitForm = () => {
      console.log('addRoleForm', addRoleForm)
      store.dispatch('addRole', addRoleForm).then(() => {
        store.dispatch('rolesList')
      });
      current.value++;
    }
    
    const addPermissions = () => {
      console.log('addPermissionsForm', addPermissionsForm)
      emit('on-submit')
    }

    const rolesList = computed(() => {
      return store.state.rolesAndPermissions.rolesList
    })

    const onRoleChange = (event) => {
      roleId.value = event.target.value;
      showList.value = true;
    }

    const next = () => {
      current.value++;
    }

    const prev = () => {
      current.value--;
    }

    return {
      rolePermissions,
      addRoleForm,
      addPermissionsForm,
      submitForm,
      addPermissions,
      roleId,
      rolesList,
      showList,
      onRoleChange,
      next,
      prev,
      current,
      checkedValue,
      steps: [
        {
          title: "Select Role",
          content: "First-content",
        },
        {
          title: "Describe Role",
          content: "Second-content",
        },
        {
          title: "Permissions",
          content: "Second-content",
        },
      ],
    }
  }
}
</script>

<style scoped>
  .steps-content {
    margin-top: 16px;
    border-radius: 6px;
    min-height: 200px;
    text-align: left;
    padding: 12px 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .steps-action {
    text-align: right;
  }
</style>

<style scoped>
.actions {
  margin-left: 30px;
  display: block;
}
.transparent { margin: 5px 0 !important; }
</style>
<template>
<a-form :model="roles" name="basic" scrollToFirstError=true :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addRole" @finishFailed="roleDataFailed">
    <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
            <div class="form-group">
              <a-form-item :label="$t('careCoordinator.roles.role')" name="roles" :rules="[{ required: true, message: $t('careCoordinator.roles.role')+' '+$t('global.validation') }]">
                <!-- <a-select v-if="staffs.roles!=null" v-model:value="roles.roles"  size="large" placeholder="Select Role" style="width: 100%" :options="staffs.roles.map((item) => ({ label: item.name?item.name:'', value: item.id }))" @change="checkChangeInput()" /> -->
              <!-- <a-select
                ref="select"
                v-model:value="roles.roles"
                style="width: 100%"
                :show-search="true"
                placeholder="input search text"
                :show-arrow="true"
                :filter-option="false"
                :not-found-content="loadingStatus ? undefined : null"
                :options="roleData"
                @search="handleRoleSearch"
                @change="handleRoleChange"
                size="large">
                <template  v-if="loadingStatus" #notFoundContent>
                  <a-spin size="small" />
                </template>
              </a-select> -->
              <RoleDropDown v-model:value="roles.roles" @handleRoleChange="handleRoleChange($event)"/>
              </a-form-item>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24" v-if="paramId">
        <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
        </a-col>
        <a-col :span="24" v-else>
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row>
</a-form>

<a-row :gutter="24" v-if="!paramId">
    <a-col :span="24">
        <RoleTable :Id="Id" />
        <Loader />
    </a-col>
</a-row>
</template>

<script>
import { defineComponent, reactive, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader";
import RoleTable from "../../care-coordinator/tables/RoleTable";
import RoleDropDown from "@/components/modals/search/RoleDropdownSearch.vue"
export default defineComponent({
  components: {
    Loader,
    RoleTable,
    RoleDropDown
  },
  props:{
    paramId:String,
    clearData:Boolean
  },
  setup(props,{emit}) {
    const store = useStore();
    // const roleData = ref();
    const roles = reactive({
      roles: [],
    });

    function addRole() {
      store.dispatch("addStaffRole", {
        id: props.paramId?props.paramId:staffs.value.addStaff.id,
        data: {roles:Object.values(roles)},
      });
      setTimeout(() => {
        if(staffs.value.closeModal==true){
        store.dispatch("roleList", props.paramId?props.paramId:staffs.value.addStaff.id);
          reset()
          emit("saveModal", false)
      }
      }, 2000);
    }

    const handleRoleChange = (val) => {
      roles.roles = val;
    };

    const staffs = computed(() => {
      return store.state.careCoordinator;
    });

    const form = reactive({
      ...roles,
    });
    function reset(){
      Object.assign(roles,form)
    }

    watchEffect(()=>{
    store.dispatch("roles");
    if(props.clearData==true){
      Object.assign(roles,form)
    }
    })
    
    function checkChangeInput(){
      store.commit('checkChangeInput',true)
    }
    const errorMsg = computed(() => {
      return store.state.careCoordinator.errorMsg;
    });
    const Id = staffs.value.addStaff?staffs.value.addStaff.id:''
    return {
      loadingStatus:store.getters.loadingStatus,
      handleRoleChange,
      errorMsg,
      reset,
      checkChangeInput,
      Id,
      staffs,
      addRole,
      size: ref("large"),
      roles,
    };
  },
});
</script>

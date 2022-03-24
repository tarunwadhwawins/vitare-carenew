<template>
<a-form :model="roles" name="basic" scrollToFirstError=true :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addRole" @finishFailed="roleDataFailed">
    <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
            <div class="form-group">
              <a-form-item :label="$t('careCoordinator.roles.role')" name="roles" :rules="[{ required: true, message: $t('careCoordinator.roles.role')+' '+$t('global.validation') }]">
                <!-- <a-select v-if="staffs.roles!=null" v-model:value="roles.roles"  size="large" placeholder="Select Role" style="width: 100%" :options="staffs.roles.map((item) => ({ label: item.name?item.name:'', value: item.id }))" @change="checkChangeInput()" /> -->
              <a-select
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
              </a-select>
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
        <!-- <a-table  rowKey="id" :pagination="false" :columns="staffs.roleListColms" :data-source="staffs.roleList" :scroll="{ x: 900 }">
            <template #action="text">
                <a-tooltip placement="bottom" @click="deleteRole(text.record.id)">
                    <template #title>
                        <span>{{$t('global.delete')}}</span>
                    </template>
                    <a class="icons">
                        <DeleteOutlined /></a>
                </a-tooltip>
            </template>
        </a-table> -->
        <RoleTable :Id="Id" />
        <Loader />
    </a-col>
</a-row>
</template>

<script>
import { defineComponent, reactive, ref, computed, watchEffect,onMounted } from "vue";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader";
import RoleTable from "../../care-coordinator/tables/RoleTable";
import Services from "@/services/serviceMethod"
export default defineComponent({
  components: {
    Loader,
    RoleTable,
  },
  props:{
    paramId:String,
    clearData:Boolean
  },
  setup(props,{emit}) {
    const store = useStore();
    const roleData = ref();
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

       onMounted(()=>{
       Services.singleDropdownSearch('', (d) => (roleData.value = d), 'roleList');
      })

    const handleRoleSearch = (val) => {
      store.commit('loadingStatus', true)
      roleData.value=[];
      Services.singleDropdownSearch(val, (d) => (roleData.value = d), 'roleList')
    };

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
      roleData,
      handleRoleChange,
      handleRoleSearch,
      errorMsg,
      reset,
      checkChangeInput,
      Id,
      staffs,
      // deleteRole,
      addRole,
      size: ref("large"),
      roles,
    };
  },
});
</script>

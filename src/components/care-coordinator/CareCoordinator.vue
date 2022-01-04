<template>
  <a-row class="mb-24" :gutter="24">
    <a-col :sm="12" :xs="24"> 
      <h2>Specialization</h2> 
      <a-row :gutter="24" v-if="specializationWellness && specializationBehavour">
        <LongCard customClass="two" :count="specializationWellness.total" :text="specializationWellness.specialization"></LongCard>
        <LongCard customClass="four" :count="specializationBehavour.total" :text="specializationBehavour.specialization"></LongCard>
      </a-row>
    </a-col> 
    <a-col :sm="12" :xs="24">
      <h2>Network</h2>
      <a-row :gutter="24" v-if="networksIn && networksOut">
        <LongCard customClass="six" :count="networksIn.total" :text="networksIn.network"></LongCard>
        <LongCard customClass="five" :count="networksOut.total" :text="networksOut.network"></LongCard>
      </a-row>
    </a-col> 
  </a-row>
  <!-- <p>{{permissions}}</p> -->
  <CoordinatorTable @edit-clicked="onClickEditPersonal($event)" :screenPermission="screenPermission" :pageAction="pageAction"  ></CoordinatorTable>
</template>

<script>
import { ref, watchEffect, computed,provide } from 'vue';
import LongCard from "@/components/common/cards/LongCard";
import CoordinatorTable from "@/components/common/tables/CoordinatorTable";
import { useStore } from "vuex"

export default {
  data() {
    return {
      
    }
  },
  components: {
    LongCard,
    CoordinatorTable,
  },
  setup(props, {emit}) {
    const store = useStore()
    const permissions=ref();
    const screenPermission =ref()
    const pageAction = ref()
    // const userdata = JSON.parse(localStorage.getItem("user"))
    
    // userdata.roleAndPermission.map(function (key) { 
    //   console.log('check',JSON.parse(key.Permissions))
    //   return JSON.parse(key.Permissions)
    //   })

    // const userdata = computed(()=>{
    //  console.log('==>',store.state.auth.permissions)
    //   return store.state.auth.permissions
    // })

    store.state.auth.permissions.forEach(async(element) => {
      if(element['ModuleName']=='customers-details'){
        permissions.value=element.Permissions
        JSON.parse(permissions.value).forEach(async(element) => {
      if(element['ScreenName']=='Customers-details'){
        screenPermission.value=element.Access
        pageAction.value=JSON.parse(element.Actions)
        provide('addButton',pageAction.value[0].Access)
      }
    });
      }
    });

    

    // console.log('test',permissions.value)
    // console.log(userdata.roleAndPermission)
    watchEffect( () => {
      store.dispatch("specializationsCount", 1)
      store.dispatch("specializationsCount", 2)
      store.dispatch("networksCount", 1)
      store.dispatch("networksCount", 2)
    })
    const specializationWellness = computed(() => {
      return store.state.careCoordinator.specializationWellness
    })
    const specializationBehavour = computed(() => {
      return store.state.careCoordinator.specializationBehavour
    })
    const networksIn = computed(() => {
      return store.state.careCoordinator.networksIn
    })
    const networksOut = computed(() => {
      return store.state.careCoordinator.networksOut
    })
    const onClickEditPersonal = async(rowId) => {
      await store.dispatch("getCoordinatorDetails", rowId)
      .then((res) => {
        console.log('care',res)
        // const coordinatorData = res.data.data;
        
        localStorage.setItem('is_update_coordinator', true)
        // localStorage.setItem('personalData', JSON.stringify(coordinatorData))
        emit('is-visible', true)
        emit('visible', pageAction.value[0].Access)
      },
      (error) => {
        console.log(error)
      });
    }
      
    return {
      specializationWellness,
      specializationBehavour,
      networksIn,
      networksOut,
      onClickEditPersonal,
      // userdata,
      permissions,
      // specializationTotal,
      // specializationText,
      // networkTotal,
      // networkText,
      pageAction,
      screenPermission
    }
  }
};
</script>

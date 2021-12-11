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
  
  <CoordinatorTable @edit-clicked="onClickEditPersonal($event)"></CoordinatorTable>
  <loading
    :active="isLoading" 
    loader="bars"
    lock-scroll="true"
    is-full-page="true"
    transition="fade"
    :can-cancel="false"/>
</template>

<script>
import { ref, watchEffect, computed } from 'vue';
import LongCard from "@/components/common/cards/LongCard";
import CoordinatorTable from "@/components/common/tables/CoordinatorTable";
import { useStore } from "vuex"
import Loading from 'vue-loading-overlay';

export default {
  components: {
    LongCard,
    CoordinatorTable,
    Loading,
  },
  setup(props, {emit}) {
    const isLoading = ref(true);
    const store = useStore()
    watchEffect( () => {
      store.dispatch("specializationsCount", 1).then(() => { isLoading.value = false })
      store.dispatch("specializationsCount", 2).then(() => { isLoading.value = false })
      store.dispatch("networksCount", 1).then(() => { isLoading.value = false })
      store.dispatch("networksCount", 2).then(() => { isLoading.value = false })
    })
    
    const onClickEditPersonal = (rowId) => {
      store.dispatch("getCoordinatorDetails", rowId)
      emit('is-visible', true)
    }

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
    const coordinatorData = computed(() => {
      localStorage.setItem('is_update_coordinator', true)
      localStorage.setItem('personalData', JSON.stringify(coordinatorData))
      return store.state.careCoordinator.CoordinatorDetails
    })
      
    return {
      specializationWellness,
      specializationBehavour,
      networksIn,
      networksOut,
      coordinatorData,
      onClickEditPersonal,
      isLoading,
    }
  }
};
</script>

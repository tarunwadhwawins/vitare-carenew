<template>
<a-row class="mb-24" :gutter="24">
    <a-col :sm="12" :xs="24">
        <h2>{{$t('global.specialization')}}</h2>
        <a-row :gutter="24">
            <LongCard customClass="two" :count="2" text="Wellness"></LongCard>
            <LongCard customClass="four" :count="2" text="Behavior"></LongCard>
        </a-row>
    </a-col>
    <a-col :sm="12" :xs="24">
        <h2>{{$t('global.network')}}</h2>
        <a-row :gutter="24">
            <LongCard customClass="six" :count="3" text="In"></LongCard>
            <LongCard customClass="five" :count="3" text="Out"></LongCard>
        </a-row>
    </a-col>
</a-row>

<a-row>
    <a-col :span="12">
        <a-select v-model:value="value2" :size="size" mode="tags" style="width: 100%" placeholder="Search . . ." :options="searchoptions" @change="handleChange">
        </a-select>
    </a-col>
    <a-col :span="12">
        <div class="text-right mb-24">
            <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
        </div>
    </a-col>
    <a-col :span="24">
        <CoordinatorTable @edit-clicked="onClickEditPersonal($event)"></CoordinatorTable>
    </a-col>
</a-row>
</template>

<script>
import { ref, watchEffect, computed } from "vue";
import LongCard from "@/components/common/cards/LongCard";
import CoordinatorTable from "./tables/CoordinatorTable";
import { useStore } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    LongCard,
    CoordinatorTable,
  },
  setup(props, { emit }) {
    const store = useStore();
    watchEffect(() => {
      // store.dispatch("specializationsCount", 1)
      // store.dispatch("specializationsCount", 2)
      // store.dispatch("networksCount", 1)
      // store.dispatch("networksCount", 2)
    });
    const specializationWellness = computed(() => {
      return 0; //store.state.careCoordinator.specializationWellness
    });
    const specializationBehavour = computed(() => {
      return 0; //store.state.careCoordinator.specializationBehavour
    });
    const networksIn = computed(() => {
      return 0; // store.state.careCoordinator.networksIn
    });
    const networksOut = computed(() => {
      return 0; //store.state.careCoordinator.networksOut
    });
    const onClickEditPersonal = (rowId) => {
      // store.dispatch("getCoordinatorDetails", rowId)
      // .then((res) => {
      //   const coordinatorData = res.data.data;
      //   localStorage.setItem('is_update_coordinator', true)
      //   localStorage.setItem('personalData', JSON.stringify(coordinatorData))
      //   emit('is-visible', true)
      // },
      // (error) => {
      //   console.log(error)
      // });
    };

    return {
      specializationWellness,
      specializationBehavour,
      networksIn,
      networksOut,
      onClickEditPersonal,
      // specializationTotal,
      // specializationText,
      // networkTotal,
      // networkText,
    };
  },
};
</script>

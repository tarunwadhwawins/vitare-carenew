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
        <CoordinatorTable v-if="staffs"  :columns="columns" :data-source="staffs" :scroll="{ x: 1200 }"></CoordinatorTable>
    </a-col>
</a-row>
</template>

<script>
import {
    ref,
    watchEffect,
    computed
} from "vue";
import LongCard from "@/components/common/cards/LongCard";
import CoordinatorTable from "./tables/CoordinatorTable";
import {
    useStore
} from "vuex";

export default {
    data() {
        return {};
    },
    components: {
        LongCard,
        CoordinatorTable,
    },
    setup(props, {
        emit
    }) {
        const store = useStore();
        watchEffect( () => {
            store.dispatch('staffs')
        })

        const columns  = computed(()=>{
          return store.state.careCoordinator.columns
      })
     
       const staffs = computed(()=>{ 
            return store.state.careCoordinator.staffs
        }) 

        
        

        return {
            columns,
            staffs,
            
            // specializationTotal,
            // specializationText,
            // networkTotal,
            // networkText,
        };
    },
};
</script>

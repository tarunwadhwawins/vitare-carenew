<template>
<a-row class="mb-24" :gutter="24">
    <a-col :sm="12" :xs="24">
        <h2>{{$t('global.specialization')}}</h2>
        <a-row :gutter="24">
            <a-col :xl="12"  :xs="24">
            <LongCard backgroundColor="#8e60ff" textColor="" customClass="two" :count="2" text="Wellness"></LongCard>
            </a-col>
            <a-col :xl="12"  :xs="24">
            <LongCard customClass="four" backgroundColor="#ffa800" textColor="" :count="2" text="Behavior"></LongCard>
            </a-col>
        </a-row>
    </a-col>
    <a-col :sm="12" :xs="24">
        <h2>{{$t('global.network')}}</h2>
        <a-row :gutter="24">
            <a-col :xl="12"  :xs="24">
            <LongCard customClass="six" backgroundColor="#267dff" textColor="" :count="3" text="In"></LongCard>
            </a-col>
            <a-col :xl="12"  :xs="24">
            <LongCard customClass="five" backgroundColor="#0fb5c2" textColor="" :count="3" text="Out"></LongCard>
            </a-col>
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
        <Loader />
    </a-col>
</a-row>
</template>

<script>
import {
    watchEffect,
    computed,ref
} from "vue";
import LongCard from "@/components/common/cards/LongCard";
import CoordinatorTable from "./tables/CoordinatorTable";
import Loader from "../loader/Loader"
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
        Loader
    },
    setup() {
        const store = useStore();
        const searchoptions = ref([])
        watchEffect( () => {
            store.dispatch('staffs')
        })

        const columns  = computed(()=>{
          return store.state.careCoordinator.columns
      })
       const handleChange = () => {
        };
     
       const staffs = computed(()=>{ 
            return store.state.careCoordinator.staffs
        }) 

        
        

        return {
            searchoptions,
            handleChange,
            columns,
            staffs,
            value2:ref(),
            size:ref()
            // specializationTotal,
            // specializationText,
            // networkTotal,
            // networkText,
        };
    },
};
</script>

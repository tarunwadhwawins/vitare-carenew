<template>
<a-row>
    <a-col :span="24" v-if="arrayToObjact(staffPermissions,37)">
        <ShowModalButton @isVisible="showModal($event)" :headingText="$t('careCoordinator.coordinatorsModal.careCoordinator')" :buttonText="$t('careCoordinator.coordinatorsModal.addNewCoordinator')" />
    </a-col>
</a-row>
<a-row class="mb-24" :gutter="24" >
    <a-col :sm="12" :xs="24">
        <h2>{{$t('global.specialization')}}</h2>
        <a-row :gutter="24">
            <a-col :xl="12" :xs="24" v-for="special in staffs.specializationStaff" :key="special.id">
                <LongCard  :backgroundColor="special.text=='Wellness'?'#8e60ff':'#ffa800'" textColor="" customClass="two" :count="special.total?special.total:0" :text="special.text"></LongCard>
            </a-col>
        </a-row>
    </a-col>
    <a-col :sm="12" :xs="24">
        <h2>{{$t('global.network')}}</h2>
        <a-row :gutter="24">
            <a-col :xl="12" :xs="24" v-for="network in staffs.networkStaff" :key="network.id">
                <LongCard  :backgroundColor="network.text=='In'?'#267dff':'#0fb5c2'" textColor="" :count="network.total?network.total:0" :text="network.text"></LongCard>
            </a-col>
        </a-row>
    </a-col>
</a-row>

<a-row>
    <a-col :span="12">
        <SearchField  endPoint="staff"/>
        
    </a-col>
    <a-col :span="12" v-if="arrayToObjact(staffPermissions,41)">
        <div class="text-right mb-24">
            <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
        </div>
    </a-col>
    <a-col :span="24" >
      
        <CoordinatorTable  ></CoordinatorTable>
        <Loader />
    </a-col>
    <CareCoordinatorModalForms v-model:visible="visible" @saveModal="handleOk($event)"></CareCoordinatorModalForms>
</a-row>
</template>

<script>
import {
    watchEffect,
   computed,
    ref,onUnmounted
} from "vue"
import LongCard from "@/components/common/cards/LongCard"
import CoordinatorTable from "./tables/CoordinatorTable"
import CareCoordinatorModalForms from "@/components/modals/CoordinatorsModal"
import Loader from "@/components/loader/Loader"
import {useStore} from "vuex"
import ShowModalButton from "@/components/common/show-modal-button/ShowModalButton"
import {arrayToObjact} from "@/commonMethods/commonMethod"
import SearchField from "@/components/common/input/SearchField";
export default {
    data() {
        return {};
    },
    components: {
        LongCard,
        CoordinatorTable,
        Loader,
        CareCoordinatorModalForms,
        ShowModalButton,
        SearchField
    },
    setup() {
        const store = useStore()
        const searchoptions = ref([])
        const visible = ref(false)
        watchEffect(() => {
            store.getters.staffRecord.staffs=""
            store.dispatch("staffs")
            store.dispatch('specializationStaff')
            store.dispatch('networkStaff')
        })
        const handleOk = (value) => {
            visible.value = value;
        }

        const showModal = (value) => {
            visible.value = value;
        };

        
        const staffPermissions = computed(()=>{
            return store.state.screenPermissions.staffPermissions
        })
        onUnmounted(()=>{
            store.dispatch("searchTable",'')
        })
        return {
            staffPermissions,
            arrayToObjact,
            showModal,
            visible,
            handleOk,
            searchoptions,
            
            staffs:store.getters.staffRecord.value,
            value2: ref(),
            size: ref(),
        };
    },
};
</script>

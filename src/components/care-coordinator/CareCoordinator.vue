<template>
<a-row>
    <a-col :span="24" v-if="arrayToObjact(staffs.staffPermissions,1)">
        <ShowModalButton @isVisible="showModal($event)" :headingText="$t('careCoordinator.coordinatorsModal.careCoordinator')" :buttonText="$t('careCoordinator.coordinatorsModal.addNewCoordinator')" />
    </a-col>
</a-row>
<a-row class="mb-24" :gutter="24" v-if="arrayToObjact(staffs.staffPermissions,2)">
    <a-col :sm="12" :xs="24">
        <h2>{{$t('global.specialization')}}</h2>
        <a-row :gutter="24">
            <a-col :xl="12" :xs="24" v-for="special in staffs.specializationStaff" :key="special.id">
                <LongCard :backgroundColor="special.text=='Wellness'?'#8e60ff':'#ffa800'" textColor="" customClass="two" :count="special.total" :text="special.text"></LongCard>
            </a-col>
        </a-row>
    </a-col>
    <a-col :sm="12" :xs="24">
        <h2>{{$t('global.network')}}</h2>
        <a-row :gutter="24">
            <a-col :xl="12" :xs="24" v-for="network in staffs.networkStaff" :key="network.id">
                <LongCard customClass="six" :backgroundColor="network.text=='In'?'#267dff':'#0fb5c2'" textColor="" :count="network.total" :text="network.text"></LongCard>
            </a-col>
        </a-row>
    </a-col>
</a-row>

<a-row>
    <a-col :span="12">
        <a-select v-model:value="value2" :size="size" mode="tags" style="width: 100%" placeholder="Search . . ." :options="searchoptions" @change="handleChange">
        </a-select>
    </a-col>
    <a-col :span="12" v-if="arrayToObjact(staffs.staffPermissions,3)">
        <div class="text-right mb-24">
            <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
        </div>
    </a-col>
    <a-col :span="24" v-if="arrayToObjact(staffs.staffPermissions,4)">
        <CoordinatorTable v-if="staffs.staffs" :columns="columns" :data-source="staffs.staffs" :scroll="{ x: 1200 }"></CoordinatorTable>
        <Loader />
    </a-col>
    <CareCoordinatorModalForms v-model:visible="visible" @ok="handleOk"></CareCoordinatorModalForms>
</a-row>
</template>

<script>
import {
    watchEffect,
    computed,
    ref
} from "vue"
import LongCard from "@/components/common/cards/LongCard"
import CoordinatorTable from "./tables/CoordinatorTable"
import CareCoordinatorModalForms from "@/components/modals/CoordinatorsModal"
import Loader from "../loader/Loader"
import {
    useStore
} from "vuex"
import ShowModalButton from "@/components/common/show-modal-button/ShowModalButton"
import {arrayToObjact} from "../../commonMethods/commonMethod"
export default {
    data() {
        return {};
    },
    components: {
        LongCard,
        CoordinatorTable,
        Loader,
        CareCoordinatorModalForms,
        ShowModalButton
    },
    setup() {
        const store = useStore()
        const searchoptions = ref([])
        const visible = ref(false)
        watchEffect(() => {
            store.dispatch('staffs')
            store.dispatch('specializationStaff')
            store.dispatch('networkStaff')
        })

        const columns = computed(() => {
            return store.state.careCoordinator.columns
        })
        const handleChange = () => {};

        const staffs = computed(() => {
            return store.state.careCoordinator
        })
        const handleOk = () => {
            visible.value = false;
        }

        const showModal = (value) => {
            visible.value = value;
        };

        return {
            arrayToObjact,
            showModal,
            visible,
            handleOk,
            searchoptions,
            handleChange,
            columns,
            staffs,
            value2: ref(),
            size: ref()
            // specializationTotal,
            // specializationText,
            // networkTotal,
            // networkText,
        };
    },
};
</script>

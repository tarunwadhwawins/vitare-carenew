<template>
<a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
    </a-layout-header>
    <a-layout>
        <Sidebar />
        <a-layout-content>
            <div class="common-bg">
                <a-row>
                    <a-col :span="24">
                        <h2 class="pageTittle">
                            CPT Codes
                            <div class="commonBtn">
                                <Button :name="buttonName" @click="showModal(true)" />
                            </div>
                        </h2>
                    </a-col>
                    <a-col :span="12">
                        <SearchField @change="searchData" />
                    </a-col>
                    <a-col :span="12">
                        <div class="text-right mb-24">
                            <a-button class="primaryBtn">Export to Excel</a-button>
                        </div>
                    </a-col>
                    <a-col :span="24">
                        <CptCodesTable v-if="cptCodesList.cptCodesList" :cptCodesList="cptCodesList" @is-visible="editModal($event)" />
                    </a-col>
                </a-row>
            </div>

        </a-layout-content>
    </a-layout>

</a-layout>

<!-- Add CPT Code Modal -->
<CptCodesModal v-if="editId" v-model:visible="visible" @ok="handleOk" @is-visible="showModal($event)" :cptId="editId" />
<CptCodesModal v-else v-model:visible="visible" @ok="handleOk" @is-visible="showModal($event)" />
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import CptCodesModal from "@/components/modals/CptCodesModal";
import CptCodesTable from "@/components/administration/cpt-codes/tables/CptCodesTable";
import {
    ref,
    watchEffect
} from "vue";
import SearchField from "@/components/common/input/SearchField";
import Button from "@/components/common/button/Button";
import {
    useStore
} from "vuex"

export default {
    components: {
        Header,
        Sidebar,
        CptCodesModal,
        CptCodesTable,
        SearchField,
        Button,

    },
    setup() {
        const visible = ref(false);
        const showModal = (e) => {
            editId.value = null
            visible.value = e;

        };
        const editModal = (e) => {
            //console.log(e)

            editId.value = e.id
            visible.value = e.check;

        };
        const editId = ref(null)
        const store = useStore()
        const handleOk = () => {

            visible.value = false;
        };

        const searchData = (value) => {
            console.log('searchGlobalCodes', value)
        };
        watchEffect(() => {
            store.dispatch('serviceList')
            store.dispatch('cptCodesList')

        })
        const cptCodesList = store.getters.cptRecords.value
        // const cptCodesList = [
        //   {
        //     key: 1,
        //     cpt: "90791",
        //     description: "Evaluation",
        //     billing: "$150",
        //     active: "",
        //     action: "",
        //   },
        //   {
        //     key: 2,
        //     cpt: "90832",
        //     description: "LCSW Ongoing Services",
        //     billing: "$200",
        //     active: "",
        //     action: "",
        //   },
        //   {
        //     key: 3,
        //     cpt: "96130",
        //     description: "Deep Dive",
        //     billing: "$120",
        //     active: "",
        //     action: "",
        //   },
        //   {
        //     key: 4,
        //     cpt: "96138",
        //     description: "M3 Screening - MSW",
        //     billing: "$160",
        //     active: "",
        //     action: "",
        //   },
        //   {
        //     key: 5,
        //     cpt: "99358",
        //     description: "Patient Discharge",
        //     billing: "$300",
        //     active: "",
        //     action: "",
        //   },
        //   {
        //     key: 6,
        //     cpt: "99453",
        //     description: "(ES Team) Setup and patient education for use of RPM equipment",
        //     billing: "$150",
        //     active: "",
        //     action: "",
        //   },
        // ];

        return {
            cptCodesList,
            searchData,
            visible,
            showModal,
            handleOk,
            editId,
            editModal,
            buttonName: 'Add CPT Code',
        };
    },
};
</script>

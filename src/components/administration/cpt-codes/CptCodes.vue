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
                            <div class="commonBtn" v-if="arrayToObjact(screensPermissions,9)">
                                <Button :name="buttonName" @click="showModal(true)" />
                            </div>
                        </h2>
                    </a-col>
                    <a-col :span="12" v-if="arrayToObjact(screensPermissions,14)">
                        <SearchField endPoint="cptCode"/>
                    </a-col>
                    <a-col :span="12">
                        <div class="text-right mb-24">
                            <ExportToExcel  @click="exportExcel('cptCode_report')"/>
                        </div>
                    </a-col>
                    <a-col :span="24">
                        <CptCodesTable  @is-visible="editModal($event)" />
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
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import CptCodesModal from "@/components/modals/CptCodesModal";
import CptCodesTable from "@/components/administration/cpt-codes/tables/CptCodesTable";
import { ref,watchEffect,onUnmounted} from "vue";
import SearchField from "@/components/common/input/SearchField";
import Button from "@/components/common/button/Button";
import { arrayToObjact,exportExcel } from "@/commonMethods/commonMethod";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
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
        ExportToExcel,
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
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })

        })
        
        
        onUnmounted(()=>{
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })

        })
        return {
            exportExcel,
            screensPermissions:store.getters.screensPermissions,
            arrayToObjact,
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

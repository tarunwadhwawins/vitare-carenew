<template>
<div>
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
                                {{ pageTitle }}
                                <!-- v-if="arrayToObjact(globalCodesPermissions,22)" -->
                                 <div class="commonBtn" >
                                    <Button :name="buttonName" @click="showModal(true)" />
                                </div> 
                            </h2>
                        </a-col>
                        <!-- v-if="arrayToObjact(globalCodesPermissions,21)" -->
                         <a-col :span="12" >
                            <SearchField @change="searchData" />
                        </a-col>
                        <a-col :span="12">
                            <!-- v-if="arrayToObjact(globalCodesPermissions,26)" -->
                            <div class="text-right mb-24" >
                                <Button :name="exportButtonName" />
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="list-view" v-show="!toggle">
                                <ProvidersTable @isEdit="showModal($event)" />
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>

    <!-- Modal -->
    <AdminProvidersModal v-if="visible" v-model:visible="visible" @ok="handleOk" @closeModal="showModal($event)" :isAdd="isAdd" :providerId="providerID" />

</div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import AdminProvidersModal from "@/components/modals/AdminProvidersModal";
import ProvidersTable from "@/components/administration/providers/tables/ProvidersTable";
import {useStore} from "vuex";
import SearchField from "@/components/common/input/SearchField";
import Button from "@/components/common/button/Button";
import {ref,computed , watchEffect} from "vue";
import { arrayToObjact } from "@/commonMethods/commonMethod";
export default {
    components: {
        Header,
        Sidebar,
        AdminProvidersModal,
        ProvidersTable,
        SearchField,
        Button,
    },

    setup() {
        const store = useStore()
        const isAdd = ref(false);
        const visible = ref(false);
        const providerID = ref();
        const showModal = (e) => {
            if (e.providerId) {
                providerID.value = e.providerId
            }else{
                providerID.value = null
            }
            isAdd.value = true;
            visible.value = e;

        };
        const searchData = () => {

        };
watchEffect(()=>{
    store.dispatch("providersListAll")
})
        const handleOk = () => {
            visible.value = false;
        };
        const editSingleProvider = (id) => {
            isAdd.value = false;
            store.dispatch('editSingleProvider', id).then(() => {
                visible.value = true;
            })
        }
        const checked = ref([false]);
        const providersPermissions = computed(()=>{
          return store.state.screenPermissions.providersPermissions
        })
        return {
          providersPermissions,
            arrayToObjact,
            editSingleProvider,
            searchData,
            providerID,
            size: ref([]),
            visible,
            showModal,
            handleOk,
            isAdd,
            checked,
            pageTitle: "Providers",
            buttonName: "Add New Provider",
            exportButtonName: "Export to Excel",
        };
    },
};
</script>

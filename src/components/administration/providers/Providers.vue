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
                                <!--  -->
                                 <div class="commonBtn" v-if="arrayToObjact(providersPermissions,22)">
                                    <Button :name="buttonName" @click="showModal(true)" />
                                </div> 
                            </h2>
                        </a-col>
                        <!--  -->
                         <a-col :span="12" v-if="arrayToObjact(providersPermissions,21)">
                            <SearchField endPoint="provider"/>
                        </a-col>
                        <a-col :span="12">
                            <!--  -->
                            <div class="text-right mb-24" v-if="arrayToObjact(providersPermissions,26)">
                                <Button :name="exportButtonName" />
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <div class="list-view" v-show="!toggle">
                                <ProvidersTable @isEdit="showModal($event)" />
                                <Loader />
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>

    <!-- Modal -->
    <AdminProvidersModal v-if="visible" v-model:visible="visible" @ok="handleOk" @closeModal="closeModal($event)" :isAdd="isAdd" :providerId="providerID" />

</div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import AdminProvidersModal from "@/components/modals/AdminProvidersModal";
import ProvidersTable from "@/components/administration/providers/tables/ProvidersTable";
import {useStore} from "vuex";
import SearchField from "@/components/common/input/SearchField";
import Button from "@/components/common/button/Button";
import {ref , watchEffect,onUnmounted} from "vue";
import { arrayToObjact } from "@/commonMethods/commonMethod";
import Loader from "@/components/loader/Loader"

export default {
    components: {
        Header,
        Sidebar,
        AdminProvidersModal,
        ProvidersTable,
        SearchField,
        Button,
        Loader,
    },

    setup() {
        const store = useStore()
        const isAdd = ref(false);
        const visible = ref(false);
        const providerID = ref();
        const showModal = (e) => {
            if (e.providerId) {
                providerID.value = e.providerId
                isAdd.value = true;
            }else{
                providerID.value = null
                isAdd.value = false;
                
            }
            visible.value = e;
            
        }
        const closeModal = (e) => {
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
       
        const providersPermissions = store.getters.permissionRecords.value.providersPermissions
        onUnmounted(()=>{
            store.dispatch("searchTable",'')
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
            closeModal,
            pageTitle: "Providers",
            buttonName: "Add New Provider",
            exportButtonName: "Export to Excel",
        };
    },
};
</script>

<template>
<div>
    <!---->
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
                                <div class="commonBtn" v-if="arrayToObjact(screensPermissions,1)">
                                    <Button :name="buttonName" @click="showModal(true)" />
                                </div>
                            </h2>
                        </a-col>
                        <a-col :span="12">
                            <SearchField endPoint="roleList"/>
                        </a-col>
                        <a-col :span="12">
                            <div class="text-right mb-24" v-if="arrayToObjact(screensPermissions,5)">
                                <!-- <Button :name="exportButtonName" /> -->
                                 <div class="text-right mb-24">
                                    <ExportToExcel  @click="exportExcel('roleAndPermission_report')"/>
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="24">
                            <RolesAndPermissionsTable @is-copy="showModal($event)" @is-edit="edit($event)" />
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>

    <!-- Modal -->
    <RolesAndPermissionsModal v-if="visible" v-model:visible="visible" @ok="handleOk" @on-submit="handleOk" :roleId="roleId" :editRole="editRole" @is-visible="editShow($event)" />

</div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import RolesAndPermissionsTable from "@/components/administration/rolesAndPermissions/tables/RolesAndPermissionsTable";
import SearchField from "@/components/common/input/SearchField";
import RolesAndPermissionsModal from "@/components/modals/RolesAndPermissionsModal";
import Button from "@/components/common/button/Button";
import {ref,onUnmounted} from "vue";
import {useStore } from "vuex"
import {arrayToObjact,exportExcel} from "@/commonMethods/commonMethod"
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
export default {
    components: {
        Header,
        Sidebar,
        RolesAndPermissionsTable,
        RolesAndPermissionsModal,
        SearchField,
        Button,
        ExportToExcel
    },

    setup() {
        const visible = ref(false)
        const roleId = ref(null)
        const editRole = ref(null)
        const store = useStore()
        const showModal = (e) => {
            visible.value = e;
            if (e.id) {
                roleId.value = e.id
                visible.value = e.check;
                editRole.value = null
            } else {
                editRole.value = null
                roleId.value = null
            }

        };
        const editShow = (e) => {
            visible.value = e;
        };
        const edit = (e) => {
            roleId.value = null
            visible.value = e.check;
            editRole.value = e.id
        }

        const handleOk = () => {
            visible.value = false;
        };

        const searchData = () => {};

       
        onUnmounted(()=>{
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })
        return {
            exportExcel,
            editShow,
            arrayToObjact,
           screensPermissions:store.getters.screensPermissions,
            roleId,
            visible,
            showModal,
            handleOk,
            searchData,
            edit,
            editRole,
            buttonName: "Add Role",
            pageTitle: "Roles & Permissions"
        };
    },
};
</script>

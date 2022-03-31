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
                                Inventory
                                <div class="commonBtn">
                                    <Button :name="buttonName" @click="showModal" />
                                </div>
                            </h2>
                        </a-col>
                        <a-col :span="12">
                            <SearchField endPoint="inventory" />
                        </a-col>
                        <a-col :span="12">
                            <div class="text-right mb-24">
                                <ExportToExcel @click="exportExcel('inventory_report')" />
                            </div>
                        </a-col>
                        <a-col :span="24">
                            <InventoryTable @edit-inventory="editInventory" />
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
    <!--modals-->
    <InventoryModal v-if="visible" v-model:visible="visible" @ok="handleOk" @is-visible="handleOk" :isAdd="isAdd" />
    <!---->
</div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import InventoryModal from "@/components/modals/InventoryModal";
import InventoryTable from "@/components/administration/inventory/tables/InventoryTable";
import SearchField from "@/components/common/input/SearchField";
import Button from "@/components/common/button/Button";
import {
    ref,
    onUnmounted
} from "vue";
import {
    useStore
} from "vuex";
import {
    exportExcel
} from "@/commonMethods/commonMethod";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";

export default {
    components: {
        Header,
        Sidebar,
        InventoryModal,
        InventoryTable,
        SearchField,
        Button,
        ExportToExcel,
    },
    setup() {
        const store = useStore()
        const checked = ref([false]);
        const visible = ref(false);
        const isAdd = ref(false);

        const showModal = () => {
            isAdd.value = true;
            visible.value = true;
        };
        const handleOk = () => {
            visible.value = false;
        };
        const searchData = (value) => {
            store.dispatch('searchGlobalCodes', value)
        };

        const editInventory = ({
            id,
            deviceTypeId
        }) => {
            isAdd.value = false;
            store.dispatch('inventoryDetails', id).then(() => {
                store.dispatch('deviceModalsList', deviceTypeId).then(() => {
                    visible.value = true;
                })
            })
        }
        onUnmounted(() => {
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })
        return {
            exportExcel,
            isAdd,
            buttonName: "Add Inventory",
            editInventory,
            checked,
            visible,
            showModal,
            handleOk,
            searchData,
            size: ref([]),
        };
    },
};
</script>

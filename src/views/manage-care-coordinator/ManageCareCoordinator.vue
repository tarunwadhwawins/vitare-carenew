<template>
<a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
    </a-layout-header>
    <a-layout>
        <a-layout-sider :style="{overflow: 'auto',height: '100vh',position: 'fixed',left: 0,}">
            <Sidebar />
        </a-layout-sider>
        <a-layout-content>
            <a-row>
                <a-col :span="24">
                    <h2 class="pageTittle">
                        {{ "Care Coordinator" }}
                        <div class="commonBtn">
                            <a-button class="btn primaryBtn" @click.prevent="showModal">{{"Add New Coordinator"}}</a-button>
                        </div>
                    </h2>
                </a-col>
            </a-row>
            <CareCoordinatorTable />
            <CareCoordinatorModalForms v-model:visible="visible" @ok="handleOk"></CareCoordinatorModalForms>
        </a-layout-content>
    </a-layout>
</a-layout>
</template>

<script>
import {
    ref
} from "vue";
import CareCoordinatorTable from "@/components/care-coordinator/CareCoordinator";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import CareCoordinatorModalForms from "@/components/modals/CoordinatorsModal";
export default {
    name: "ViewManageCareCoordinator",
    components: {
        CareCoordinatorTable,
        Header,
        Sidebar,
        CareCoordinatorModalForms,
    },
    setup() {
        const visible = ref(false);
        const showModal = () => {
            visible.value = true;
        };

        const handleCancel = () => {
            visible.value = false;
        };

        const handleOk = () => {
            visible.value = false;
        };
        return {
            visible,
            showModal,
            handleCancel,
            handleOk,
        };
    },
};
</script>

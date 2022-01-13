<template>
<div>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <Header />
        </a-layout-header>
        <a-layout>
            <a-layout-sider :style="{overflow: 'auto', height: '100vh',position: 'fixed',left: 0,}">
                <Sidebar />
            </a-layout-sider>
            <a-layout-content>
                <Patients />
            </a-layout-content>
        </a-layout>
    </a-layout>
</div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Patients from "@/components/patients/Patients";
export default {
    components: {
        Header,
        Sidebar,
        Patients
    },

    setup() {
        return {

        };
    },
};
</script>

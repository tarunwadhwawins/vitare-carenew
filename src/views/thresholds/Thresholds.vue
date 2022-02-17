<template>
    <div>
        <a-layout>
            <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
                <Header />
                
            </a-layout-header>
            <a-layout>
                <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
                    <Sidebar />
                </a-layout-sider>
            
            <Thresholds />
        </a-layout>
        </a-layout>
    </div>
</template>
<script>
    import Thresholds from "@/components/thresholds/Thresholds"
    import Header from "@/components/layout/header/Header";
     import Sidebar from "@/components/layout/sidebar/Sidebar";
    export default {
        name: 'ViewDashboard',
        components: {
            Thresholds,
            Header,
             Sidebar,
        }
    }
</script>
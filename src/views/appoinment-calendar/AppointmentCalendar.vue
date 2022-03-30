<template>
<div>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <Header @is-heardeVisible="appointment($event)" />
        </a-layout-header>
        <a-layout>
            <a-layout-sider :style="{overflow: 'auto', height: '100vh',position: 'fixed',left: 0,}">
                <Sidebar />
            </a-layout-sider>
            <a-layout-content>
                <Appointment :headerData="data"/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</div>
</template>

    
    
<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Appointment from "@/components/appoinment-calendar/AppointmentCalendar";
import { ref } from "vue"
export default {
    components: {
        Header,
        Sidebar,
        Appointment
    },
    props: {

    },
    setup() {
       const data = ref(false)
        const appointment = event => {
            
            data.value = event.date
        }

        return {
            appointment,
            data,
        };
    },
};
</script>

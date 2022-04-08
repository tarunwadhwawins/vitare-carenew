<template>
    <a-modal width="800px" v-if="gmailData" :title="gmailData ? 'Subject: ' :'Subject: '+ gmailData.subject" centered @cancel="closeModal()" class="chatModal" :footer="false">
        <a-typography-title :level="5">Message: {{gmailData ?  gmailData.message : ''}}</a-typography-title>
        <TableLoader />
    </a-modal>
    </template>
    
    <script>
   import {
    useStore
} from "vuex"
import TableLoader from "@/components/loader/TableLoader";
    export default {
        components: {
            TableLoader
        },
        setup() {
            const store = useStore()
           
             
            return {
                gmailData:store.getters.communicationsView
    
            };
        },
    };
    </script>
    
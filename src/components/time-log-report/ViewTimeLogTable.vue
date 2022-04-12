<template>
    <a-modal width="1100px" :maskClosable="false" centered v-model:visible="viewReport" title="Audit Time Log Change Report"  :footer="false" @cancel="closeModal()">
    
        <a-table   :columns="columns" :data-source="modalData" :pagination="true">
            
        </a-table>
        <TableLoader />
    </a-modal>
</template>
<script>
import {
    
    onMounted,
} from "vue";
import {
    useStore
} from "vuex";

import TableLoader from "@/components/loader/TableLoader";
export default {
    components: {
 
       
        TableLoader,
    
    },
    props:{
        id:{
            type:String
        }
    },

    setup(props) {
        const store = useStore();
       onMounted(()=>{
        store.dispatch("timeLogView", props.id);
       
       })
      

       // const modalData = store.getters.timeLogView
        const columns = store.getters.viuewTimeReportModal


        function closeModal() {
			store.state.timeLogReport.timeLogView = ''
		}
        
        return {       
            columns,
            closeModal,
            modalData:store.getters.timeLogView,
            
        };
    },
};
</script>
<template>
    <a-modal width="1100px" :maskClosable="false" centered v-model:visible="viewReport" title="Audit Time Log Change Report"  :footer="false" @cancel="closeModal()">
    
        <a-table   :columns="columns" :data-source="modalData" :pagination="false">
            
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
        const columns = store.getters.viuewTimeReportModal
       // const  modalData = store.getters.timeLogView.value
    //     const meta = store.getters.auditMetaLog
    //      let data = [];
    // let scroller = "";
    // onMounted(() => {
    //   var tableContent = document.querySelector(".ant-table-body");
    //   tableContent.addEventListener("scroll", (event) => {
    //     let maxScroll = event.target.scrollHeight - event.target.clientHeight;
    //     let currentScroll = event.target.scrollTop + 2;
    //     if (currentScroll >= maxScroll) {
    //       let current_page = meta.value.current_page + 1;

    //       if (current_page <= meta.value.total_pages) {
    //         scroller = maxScroll;
    //         data = modalData.value;
           

    //         store
    //           .dispatch(
    //             "timeLogView",
    //             "?page=" +
    //               current_page
    //           )
    //           .then(() => {
    //             loadMoredata();
    //           });
    //       }
    //     }
    //   });
    // });
    //     function loadMoredata() {
    //   const newData = modalData.value;

    //   newData.forEach((element) => {
    //     data.push(element);
    //   });
    //   modalData.value = data;
    //   var tableContent = document.querySelector(".ant-table-body");
    //   setTimeout(() => {
    //     tableContent.scrollTo(0, scroller);
    //   }, 50);
    // }
        function closeModal() {
			store.state.timeLogReport.timeLogView = ''
		}
        
        return {       
            columns,
            closeModal,
            modalData:store.getters.timeLogView.value,
            
        };
    },
};
</script>
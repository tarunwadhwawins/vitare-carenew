<template>
    <a-modal width="1100px" :maskClosable="false" centered v-model:visible="viewReport" title="Audit Time Log Change Report"  :footer="false" @cancel="closeModal()">
    
        <a-table   :columns="columns" :data-source="modalData" :pagination="false">
            <template #createdBy="{record}">
                <router-link :to="{ name: 'CoordinatorSummary', params: { udid:record.createdById}}" >{{record.createdBy}}</router-link>
            </template>
            <template #flag="{ record }">
            <a-tooltip placement="bottom">
               
                <a class="icons">
                    <Flags :flag="record.color" :data="record" /></a>
            </a-tooltip>
        </template>
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
import Flags from "@/components/common/flags/Flags";
export default {
    components: {
 
       
        TableLoader,
        Flags
    
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
            modalData:store.getters.timeLogView,
            
        };
    },
};
</script>

<template>

<a-table rowKey="id"  :columns="referralColumns" :data-source="record" :scroll="{ y: tableYScroller}" :pagination="false" @change="handleTableChange">
        <template #patientName="{ text, record }" >
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.patientId } }">{{ text }}</router-link>
        </template> 
    
</a-table>
<TableLoader />
</template>
<script>
import { ref, onMounted } from "vue";
//import { EditOutlined } from "@ant-design/icons-vue";

import TableLoader from "@/components/loader/TableLoader";
import { useStore } from "vuex";
import {
  
  arrayToObjact,
  tableYScroller,
} from "@/commonMethods/commonMethod";
export default {
  components: {
  
    //EditOutlined,
    TableLoader,
  },
  props: {},
  setup() {
    const store = useStore();

   
   
  

    //infinite scroll
    let data = [];
    let scroller = "";

    const meta = store.getters.referrareferralMetalList;
    const record = store.getters.referralList
    const loader = ref(false);
    let filter = store.getters.filter.value  ? store.getters.filter.value : ''
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.value.current_page + 1;

          if (current_page <= meta.value.total_pages) {
            scroller = maxScroll;
            data = record.value
            loader.value = true;
            meta.value = "";
            store.state.referral.referralList = "";

            store
              .dispatch(
                "referralList",
                store.getters.searchTable.value +
                  "&page=" +
                  current_page +
                  "&fromDate=" + store.getters.dateFilter.value.fromDate + "&toDate=" + store.getters.dateFilter.value.toDate+
                   '&filter='+filter+
                  store.getters.orderTable.value.data
              )
              .then(() => {
                loadMoredata();
              });
          }
        }
      });
    });

    function loadMoredata() {
      const newData = record.value;

      newData.forEach((element) => {
        data.push(element);
      });
      record.value = data;
      var tableContent = document.querySelector(".ant-table-body");

      setTimeout(() => {
        tableContent.scrollTo(0, scroller);
      }, 50);
      loader.value = false;
    }

    const handleTableChange = (pag, filters, sorter) => {
      if (sorter.order) {
        let order = sorter.order == "ascend" ? "ASC" : "DESC";
        let orderParam = "&orderField=" + sorter.field + "&orderBy=" + order;
        store.dispatch("orderTable", {
          data: orderParam,
          orderBy: order,
          page: pag,
          filters: filters,
        });
        store.dispatch(
          "referralList",
          '?filter='+filter+store.getters.searchTable.value + "&fromDate=" + store.getters.dateFilter.value.fromDate + "&toDate=" + store.getters.dateFilter.value.toDate+ orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "referralList",
          '?filter='+filter+store.getters.searchTable.value +"&fromDate=" + store.getters.dateFilter.value.fromDate + "&toDate=" + store.getters.dateFilter.value.toDate+  store.getters.orderTable.value.data
        );
      }
    };

    return {
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      loader,
      handleTableChange,
      referralColumns:store.getters.referralColumns,
record,
tableYScroller
    };
  },
};
</script>

<style>
</style>

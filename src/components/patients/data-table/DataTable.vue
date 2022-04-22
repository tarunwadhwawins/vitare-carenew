
<template>
  <div class="patientTable">
    <a-table
      rowKey="id"
      :columns="meta.column"
      :data-source="meta.patientList"
      :scroll="{ y: tableYScrollerCounterPage, x: 1500 }"
      :pagination="false"
      @change="handleTableChange"
    >
      <template #firstName="{ text, record }" v-if="arrayToObjact(screensPermissions, 63)">
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.id } }">{{ text }}</router-link>
        </template>
        <template #firstName="{ text }" v-else>
            <span>{{ text }}</span>
        </template>
      <template #flags="text">
        <span class="box" :style="{ 'background-color': text.text }"></span>
      </template>
      <template #patientVitals>
        <WarningOutlined />
      </template>

      <template #lastReadingDate>
        <WarningOutlined />
      </template>
    </a-table>
</div>
</template>
<script>
import { WarningOutlined } from "@ant-design/icons-vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { tableYScrollerCounterPage ,arrayToObjact} from "@/commonMethods/commonMethod";
export default {
  name: "DataTable",
  components: {
    WarningOutlined,
  },
  props: {},
  setup() {
    const store = useStore();
    const meta = store.getters.patientsRecord.value;
    let data = [];
    let scroller = "";
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.patientMeta.current_page + 1;
          if (current_page <= meta.patientMeta.total_pages) {
            scroller = maxScroll;
            meta.patientMeta = "";

            data = meta.patientList
            //store.state.patients.patientList = ""
         
            store.dispatch("patients", "?page=" +current_page +  store.getters.searchTable.value +
                  store.getters.orderTable.value.data).then(() => {
              loadMoredata();
            });
          }
        }
      });
    });

    function loadMoredata() {
      const newData = meta.patientList;
      newData.forEach((element) => {
        data.push(element);
      });
      meta.patientList = data;
      var tableContent = document.querySelector(".ant-table-body");

      setTimeout(() => {
        tableContent.scrollTo(0, scroller);
      }, 50);
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
          "patients",
          "?page=" + store.getters.searchTable.value + orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "patients",
          "?page=" +
            store.getters.searchTable.value +
            store.getters.orderTable.value.data
        );
      }
    };
    return {
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      meta,
      tableYScrollerCounterPage,
      handleTableChange
    };
  },
};
</script>

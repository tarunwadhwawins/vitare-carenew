<template>
<a-table rowKey="id" :data-source="meta.staffs" :scroll="{ y: tableYScrollerCounterPage ,x: 1020}" :pagination=false :columns="meta.columns" @change="handleTableChange">
    <template #name="{text,record}" v-if="arrayToObjact(screensPermissions,38)">
        <router-link :to="{ name: 'CoordinatorSummary', params: { udid:record.uuid?record.uuid:'eyrer8758458958495'  }}">{{ text }}</router-link>
    </template>
    <template #name="{text}" v-else>
        <span>{{ text }}</span>
    </template>

    <template #createdDate="text">
        <span>{{ dateFormat(text.text) }}</span>
    </template>
    <template #status="{record}" v-if="arrayToObjact(screensPermissions,38)">
        <a-switch v-model:checked="record.isActive" @change="updateStatus(record.id, $event)" />
    </template>
    <template #lastReadingDate>
        <WarningOutlined />
    </template>
</a-table>
</template>

<script>
import { WarningOutlined } from "@ant-design/icons-vue";
import {
  dateFormat,
  tableYScrollerCounterPage,
  arrayToObjact
} from "@/commonMethods/commonMethod";
import { onMounted } from "vue";
import { useStore } from "vuex";
//import InfiniteLoader from "@/components/loader/InfiniteLoader";
export default {
  name: "DataTable",
  components: {
    WarningOutlined,
    //  InfiniteLoader
  },
  props: {},
  setup() {
    const store = useStore();
    //const fields = reactive(props.staffRecords.columns)

    const meta = store.getters.staffRecord.value;
    let data = [];
    let scroller = "";
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.staffMeta.current_page + 1;

          if (current_page <= meta.staffMeta.total_pages) {
            scroller = maxScroll;
            meta.staffMeta = "";
            data = meta.staffs;
            store.state.careCoordinator.staffs = "";

            store
              .dispatch(
                "staffs",
                "?page=" +
                  current_page +
                  store.getters.searchTable.value +
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
      const newData = meta.staffs;

      newData.forEach((element) => {
        data.push(element);
      });
      meta.staffs = data;
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
          "staffs",
          "?page=" + store.getters.searchTable.value + orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "staffs",
          "?page=" +
            store.getters.searchTable.value +
            store.getters.orderTable.value.data
        );
      }
    };

    const updateStatus = (id, status) => {
      const data = {
        isActive: status,
      };
      store.dispatch("updateStaffStatus", {
        id,
        data,
      });
    };
    return {
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      updateStatus,
      meta,
      dateFormat,
      handleTableChange,
      tableYScrollerCounterPage,
    };
  },
};
</script>

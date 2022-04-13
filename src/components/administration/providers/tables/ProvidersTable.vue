<template>
<a-table  rowKey="id" :columns="providerListColumns" :data-source="providersListAll" :scroll="{ y: tableYScroller }" :pagination=false @change="handleTableChange">
    <template #name="{text,record}" v-if="arrayToObjact(screensPermissions,23)">
        <router-link :to="{ name: 'providerSummary', params: { id:record.id  }}">{{text}}</router-link>
    </template>
    <template #name="{text}" v-else>
        <span >{{text}}</span>
    </template>
    <template #isActive="{record}" >
        <a-switch v-model:checked="record.isActive" @change="updateStatus(record.id, $event)" :disabled="!arrayToObjact(screensPermissions,23)"/>
    </template>
    <template #action="text">
        <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,23)">
            <a class="icons">
                <EditOutlined @click="editSingleProvider(text.record.id)" /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,24)">
            <a class="icons" @click="deleteSingleProvider(text.record.id)">
                <DeleteOutlined />
            </a>
        </a-tooltip>
    </template>
</a-table>
</template>
<script>
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { computed, reactive, onMounted } from "vue";
import { messages } from "@/config/messages";
import { useStore } from "vuex";
import {
  warningSwal,
  arrayToObjact,
  tableYScroller,
} from "@/commonMethods/commonMethod";
export default {
  components: {
    EditOutlined,
    DeleteOutlined,
  },
  props: {
    id: {
      type: Number,
    },
  },

  setup(props, { emit }) {
    const store = useStore();
    const providerId = reactive(props.id);

    const providersListAll = store.getters.providersListAll;
    const meta = store.getters.providerMeta;
    let url = store.getters.searchTable;
    let data = [];
    let scroller = "";
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.current_page + 1;

          if (current_page <= meta.total_pages) {
            scroller = maxScroll;
            meta.value = "";
            data = providersListAll.value;
            store.state.provider.providersListAll = "";
            let ordring = store.getters.orderTable.value;
            store
              .dispatch(
                "providersListAll",
                url.value + "&page=" + current_page + ordring.data
              )
              .then(() => {
                loadMoredata();
              });
          }
        }
      });
    });

    function loadMoredata() {
      const newData = providersListAll.value;

      newData.forEach((element) => {
        data.push(element);
      });
      providersListAll.value = data;
      var tableContent = document.querySelector(".ant-table-body");

      setTimeout(() => {
        tableContent.scrollTo(0, scroller);
      }, 50);
    }

    const providersData = computed(() => {
      return store.state.provider;
    });

    function deleteSingleProvider(id) {
      if (id != null) {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
            store
              .dispatch("deleteSingleProvider", {
                id: id,
              })
              .then(() => {
                store.dispatch("providersListAll");
              }, 2000);
          }
        });
      } else {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
            store.dispatch("deleteSingleProvider", {
              id: providersData.value.provider.id,
            });
            setTimeout(() => {
              store.dispatch(
                "deleteSingleProvider",
                providersData.value.provider.id
              );
            }, 2000);
          }
        });
      }
    }

    const updateStatus = (id, status) => {
      const data = {
        isActive: status,
        showPopup: true,
      };
      store.dispatch("updateSingleProvider", {id,data,})
    }

    const editSingleProvider = (id) => {
      store.dispatch("editSingleProvider", id);
      emit("isEdit", {
        check: true,
        providerId: id,
      });
    };
    const providerListColumns = computed(() => {
      return store.state.provider.providerListColumns;
    });

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
        store.dispatch("providersListAll", url.value + orderParam);
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "providersListAll",
          store.getters.searchTable.value + store.getters.orderTable.value.data
        );
      }
    };
    return {
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      editSingleProvider,
      providerListColumns,
      warningSwal,
      providersListAll,
      deleteSingleProvider,
      providersData,
      emit,
      updateStatus,
      providerId,
      props,
      tableYScroller,
      text: "provider-summary",
      handleTableChange,
    };
  },
};
</script>

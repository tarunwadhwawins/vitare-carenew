<template>
<a-table rowKey="id" :columns="inventoryColumns" :data-source="inventoriesList" :scroll="{ y:'calc(100vh - 370px)'}" :pagination="false" @change="handleTableChange">
    <template #actions="{record}">
        <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,338)">
            <template #title>
                <span>Edit</span>
            </template>
            <span class="icons">
                <EditOutlined @click="editInventory(record.id, record.deviceTypeId)" /></span>
        </a-tooltip>
        <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,339)">
            <template #title v-if="record.isAvailable=='Assigned'" disabled>

                <span disabled>Assigned Inventory Can`t Delete</span>
            </template>
            <template #title v-else>

                <span>Delete</span>
            </template>
            <span class="icons" v-if="record.isAvailable=='Assigned'" disabled>
                <DeleteOutlined /></span>
            <span class="icons" v-else>
                <DeleteOutlined @click="deleteInventory(record.id)" /></span>
        </a-tooltip>
    </template>
    <template #isActive="{record}">
        <a-switch v-model:checked="record.isActive" @change="updateStatus(record.id, $event)" :disabled="!arrayToObjact(screensPermissions,338)" />
    </template>
    <template #isAvailable="{record}">
        <a-tooltip placement="bottom" v-if="record.isAvailable=='Assigned'">
            <template #title>
                <span>{{'Assigned to '+ record.fullName }}</span>
            </template>
            <!-- <router-link v-if="record.patientId" :to="{ name: 'PatientSummary', params: { udid: record.patientId } }">{{ record.isAvailable }}</router-link> -->
            <a v-if="record.patientId"  @click="showPatientModal(record.patientId )" >{{ record.isAvailable }}</a>
        </a-tooltip>
        <a-tooltip v-else>
           <span>{{ record.isAvailable }}</span>
        </a-tooltip>
    </template>
    
</a-table>
<Loader />
</template>

<script>
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { watchEffect, onMounted } from "vue";
import { useStore } from "vuex";
import { warningSwal, arrayToObjact,showPatientModal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import Loader from "@/components/loader/Loader";
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    Loader,
  },
  setup(props, { emit }) {
    const store = useStore();
    watchEffect(() => {
      store.dispatch("inventoriesList");
      store.dispatch("searchTable", "&search=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
    });

    const inventoriesList = store.getters.inventoriesList;
    const meta = store.getters.inventoryMeta;
    let data = [];

    let scroller = "";
    onMounted(() => {
      
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.value.current_page + 1;

          if (current_page <= meta.value.total_pages) {
            scroller = maxScroll;
            meta.value = "";
            data = inventoriesList.value;
           // store.state.inventory.inventoriesList = "";

            store
              .dispatch(
                "inventoriesList",
                store.getters.searchTable.value +
                  "&page=" +
                  current_page +
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
      const newData = inventoriesList.value;

      newData.forEach((element) => {
        data.push(element);
      });
      store.state.inventory.inventoriesList = data;
      var tableContent = document.querySelector(".ant-table-body");

      setTimeout(() => {
        tableContent.scrollTo(0, scroller);
      }, 50);
    }
    const editInventory = (id, deviceTypeId) => {
      store.state.inventory.deviceModalsList = null;
      // store.dispatch('inventoryDetails', id)
      emit("edit-inventory", {
        id,
        deviceTypeId,
      });
    };

    const updateStatus = (id, status) => {
      const data = {
        inventoryStatus: true,
        isActive: status,
      };
      store
        .dispatch("updateInventory", {
          id,
          data,
        })
        .then(() => {
          store.dispatch("inventoriesList");
        });
    };

    const deleteInventory = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteInventory", id).then(() => {
            store.dispatch("inventoriesList");
          });
        }
      });
    };

    const inventoryColumns = [
      {
        title: "Device Type",
        dataIndex: "deviceType",
        key: "deviceType",
        sorter: true,
      },
      {
        title: "Model Number",
        dataIndex: "modelNumber",
        sorter: true,
      },
      {
        title: "Mac Address",
        dataIndex: "macAddress",
        sorter: true,
      },
      {
        title: "Serial Number",
        dataIndex: "serialNumber",
        sorter: true,
      },
      {
        title: "Active/Inactive",
        dataIndex: "isActive",

        slots: {
          customRender: "isActive",
        },
      },
      {
        title: "Availability",
        dataIndex: "isAvailable",
        slots: {
          customRender: "isAvailable",
        },
      },
      {
        title: "Actions",
        dataIndex: "actions",

        slots: {
          customRender: "actions",
        },
      },
    ];
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
          "inventoriesList",
          store.getters.searchTable.value + orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "inventoriesList",
          store.getters.searchTable.value + store.getters.orderTable.value.data
        );
      }
    };
    return {
      showPatientModal,
      arrayToObjact,
      screensPermissions: store.getters.screensPermissions,
      deleteInventory,
      editInventory,
      updateStatus,
      inventoryColumns,
      inventoriesList,

      handleTableChange,
    };
  },
};
</script>

<style>
th.codeActions {
  width: 120px;
}

th.codeStatus,
th.usedCount {
  width: 150px;
}
</style>

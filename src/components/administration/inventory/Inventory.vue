<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <div class="common-bg">
            <a-row>
              <a-col :span="24">
                <h2 class="pageTittle">
                  Inventory
                  <div class="commonBtn">
                    <Button :name="buttonName" @click="showModal" />
                  </div>
                </h2>
              </a-col>
              <a-col :span="12">
                <SearchField @change="searchData"/>
              </a-col>
              <a-col :span="12">
                <div class="text-right mb-24">
                  <a-button class="primaryBtn">Export to Excel</a-button>
                </div>
              </a-col>
              <a-col :span="24">
                <InventoryTable @edit-inventory="editInventory($event)"/>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modals-->
    <InventoryModal v-if="visible" v-model:visible="visible" @ok="handleOk" @is-visible="handleOk" :isAdd="isAdd" />
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import InventoryModal from "@/components/modals/InventoryModal";
import InventoryTable from "@/components/administration/inventory/tables/InventoryTable";
import SearchField from "@/components/common/input/SearchField";
import Button from "@/components/common/button/Button";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Header,
    Sidebar,
    InventoryModal,
    InventoryTable,
    SearchField,
    Button,
  },
  setup() {
    const store = useStore()
    const checked = ref([false]);
    const visible = ref(false);
    const isAdd = ref(false);

    const showModal = () => {
      isAdd.value = true;
      visible.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    const searchData = (value) => {
      store.dispatch('searchGlobalCodes', value)
    };

    const editInventory = (id) => {
      isAdd.value = false;
      store.dispatch('inventoryDetails', id).then(() => {
        visible.value = true;
      })
    }
    
    return {
      isAdd,
      buttonName: "Add Inventory",
      editInventory,
      checked,
      visible,
      showModal,
      handleOk,
      searchData,
      size: ref([]),
    };
  },
};
</script>

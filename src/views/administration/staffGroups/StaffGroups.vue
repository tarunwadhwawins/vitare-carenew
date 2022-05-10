<template>
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
                {{ $t('staffGroups.groups') }}
                <div class="commonBtn">
                  <Button :name="$t('staffGroups.createGroup')" @click="showGroupModal"/>
                </div>
              </h2>
            </a-col>
            <a-col :span="12" >
              <a-input class="searchField" placeholder="Search..." style="width: 100%" size="large" />
              <!-- <SearchField endPoint="staffGroup" /> -->
            </a-col>
            <a-col :span="12" >
              <div class="text-right mb-24">
                <!-- <ExportToExcel /> -->
                <!-- <ExportToExcel @click="exportExcel('staffGroup','?fromDate=&toDate='+search)" /> -->
              </div>
            </a-col>
            <a-col :span="24">
              <StaffGroupTable />
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>

  <!-- Modal -->
  <StaffGroupModal v-if="visibleGroupModal" v-model:visible="visibleGroupModal" @closeModal="closeModal" :isEdit="false" />
  
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { defineAsyncComponent,ref } from "vue";
import { useStore } from 'vuex';
// import { exportExcel } from "@/commonMethods/commonMethod";

export default {
  components: {
    Header,
    Sidebar,
    StaffGroupTable: defineAsyncComponent(()=>import("@/components/administration/staffGroups/tables/StaffGroupsTable")),
    StaffGroupModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/StaffGroupsModal")),
    // SearchField: defineAsyncComponent(()=>import("@/components/common/input/SearchField")),
    Button: defineAsyncComponent(()=>import("@/components/common/button/Button")),
    // ExportToExcel: defineAsyncComponent(()=>import("@/components/common/export-excel/ExportExcel")),
  },

  setup() {
    const store = useStore()
    const visibleGroupModal = ref(false);

    const showGroupModal = () => {
      store.dispatch('rolePermissions').then(() => {
        visibleGroupModal.value = true;
      })
    };
    
    const closeModal = () => {
      visibleGroupModal.value = false;
    };

    return {
      visibleGroupModal,
      showGroupModal,
      closeModal,
      // exportExcel,
    };
  },
};
</script>

<style scoped>
.searchField { margin-bottom: 20px;}
</style>
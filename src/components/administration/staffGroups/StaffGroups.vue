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
                  {{ $t('staffGroups.groups') }}
                  <div class="commonBtn">
                    <a-button @click="showCreateGroupModal" class="btn primaryBtn">{{ $t('staffGroups.createGroup') }}</a-button>
                  </div>
                </h2>
              </a-col>
              <a-col :span="12">
                <a-select v-model:value="value2" size="large" mode="tags" style="width: 100%" :placeholder="$t('staffGroups.search')" >
                </a-select>
              </a-col>
              <a-col :span="24" class="mt-25">
                <StaffGroupTable />
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <!-- Modal -->
    <CreateGroupModal v-model:visible="visibleCreateGroupModal" @closeModal="closeModal" />
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import CreateGroupModal from "@/components/modals/CreateGroupModal";
import StaffGroupTable from "@/components/administration/staffGroups/staffGroupsTable";
import { ref } from "vue";

export default {
  components: {
    Header,
    Sidebar,
    CreateGroupModal,
    StaffGroupTable
  },

  setup() {

    const visibleCreateGroupModal = ref(false);
    
    const showCreateGroupModal = () => {
      visibleCreateGroupModal.value = true;
    };
    
    const closeModal = () => {
      visibleCreateGroupModal.value = false;
    };

    return {
      visibleCreateGroupModal,
      showCreateGroupModal,
      closeModal,
    };
  },
};
</script>
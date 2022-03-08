<template>
  <div>
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
                  {{ pageTitle }}
                  <div class="commonBtn" v-if="arrayToObjact(providersPermissions,22)">
                    <Button :name="buttonName" @click="showModal" />
                  </div>
                </h2>
              </a-col>
              <a-col :span="12" v-if="arrayToObjact(providersPermissions,21)">
                <SearchField @change="searchData"/>
              </a-col>
              <a-col :span="12" v-if="arrayToObjact(providersPermissions,26)">
                <div class="text-right mb-24">
                  <Button :name="exportButtonName" />
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <ProvidersTable/>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <!-- Modal -->
    <AdminProvidersModal v-if="visible" v-model:visible="visible" @ok="handleOk" />
    
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import AdminProvidersModal from "@/components/modals/AdminProvidersModal";
import ProvidersTable from "@/components/administration/providers/tables/ProvidersTable";
import SearchField from "@/components/common/input/SearchField";
import Button from "@/components/common/button/Button";
import { ref,computed } from "vue";
import { arrayToObjact } from "@/commonMethods/commonMethod";
import { useStore } from "vuex";
export default {
  components: {
    Header,
    Sidebar,
    AdminProvidersModal,
    ProvidersTable,
    SearchField,
    Button,
  },

  setup() {
    const visible = ref(false)
    const store = useStore()
    const showModal = () => {
      visible.value = true;
    };
    const searchData = () => {
      
    };

    const handleOk = () => {
      visible.value = false;
    };
    const checked = ref([false]);

    const providersPermissions = computed(()=>{
      return store.state.screenPermissions.providersPermissions
    })
    return {
      providersPermissions,
      arrayToObjact,
      searchData,
      // searchoptions,
      size: ref([]),
      visible,
      showModal,
      handleOk,
      checked,
      pageTitle: "Providers",
      buttonName: "Add New Provider",
      exportButtonName: "Export to Excel",
    };
  },
};
</script>

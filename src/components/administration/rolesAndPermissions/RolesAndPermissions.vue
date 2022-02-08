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
                  {{ pageTitle }}
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
                  <Button :name="exportButtonName" />
                </div>
              </a-col>
              <a-col :span="24">
                <RolesAndPermissionsTable/>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <!-- Modal -->
    <RolesAndPermissionsModal v-if="visible" v-model:visible="visible" @ok="handleOk" @on-submit="handleOk"/>

  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import RolesAndPermissionsTable from "@/components/administration/rolesAndPermissions/tables/RolesAndPermissionsTable";
import SearchField from "@/components/common/input/SearchField";
import RolesAndPermissionsModal from "@/components/modals/RolesAndPermissionsModal";
import Button from "@/components/common/button/Button";
import { ref } from "vue";

export default {
  components: {
    Header,
    Sidebar,
    RolesAndPermissionsTable,
    RolesAndPermissionsModal,
    SearchField,
    Button,
  },

  setup() {
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      visible.value = false;
    };

    const searchData = () => {
    };

    return {
      visible,
      showModal,
      handleOk,
      searchData,
      exportButtonName: "Export to Excel",
      buttonName: "Add Role",
      pageTitle: "Roles & Permissions"
    };
  },
};
</script>

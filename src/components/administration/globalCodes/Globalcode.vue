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
                  Global Codes
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
                <GlobalCodesTable @edit-global-code="editGlobalCode($event)"/>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modals-->
    <AdminGlobalCodes v-if="visible" v-model:visible="visible" @ok="handleOk" @is-visible="handleOk" :isAdd="isAdd" />
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import AdminGlobalCodes from "@/components/modals/AdminGlobalCodes";
import GlobalCodesTable from "@/components/administration/globalCodes/tables/GlobalCodesTable";
import SearchField from "@/components/common/input/SearchField";
import Button from "@/components/common/button/Button";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Header,
    Sidebar,
    AdminGlobalCodes,
    GlobalCodesTable,
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
    const handleOk = () => {
      visible.value = false;
    };
    const searchData = (value) => {
      store.dispatch('searchGlobalCodes', value)
    };

    const editGlobalCode = (id) => {
      isAdd.value = false;
      store.dispatch('globalCodeDetails', id).then(() => {
        visible.value = true;
      })
    }
    
    return {
      isAdd,
      buttonName: "Add Global Code",
      editGlobalCode,
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

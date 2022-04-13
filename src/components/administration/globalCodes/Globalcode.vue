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
                                Global Codes
                                <div class="commonBtn" >
                                    <Button :name="buttonName" @click="showModal" v-if="arrayToObjact(screensPermissions,6)" />
                                </div>
                            </h2>
                        </a-col>
                        <a-col :span="12">
                            <SearchField endPoint="globalCodes" />
                        </a-col>
                        <a-col :span="12" >
                            <div class="text-right mb-24">
                                <ExportToExcel @click="exportExcel('globalCode_report')" v-if="arrayToObjact(screensPermissions,327)"/>
                            </div>
                        </a-col>
                        <a-col :span="24">
                            <TableLoader />
                            <GlobalCodesTable @edit-global-code="editGlobalCode($event)" />
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
    <!--modals-->
    <AdminGlobalCodes v-model:visible="visible" @close-modal="handleClose($event)" :isAdd="isAdd" />
</div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import GlobalCodesTable from "@/components/administration/globalCodes/tables/GlobalCodesTable";
import SearchField from "@/components/common/input/SearchField";
import Button from "@/components/common/button/Button";
import { defineComponent, defineAsyncComponent, ref, onUnmounted } from "vue";
import { useStore } from "vuex";
import { arrayToObjact, exportExcel } from "@/commonMethods/commonMethod";
import TableLoader from "@/components/loader/TableLoader";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
export default defineComponent({
  components: {
    Header,
    Sidebar,
    AdminGlobalCodes: defineAsyncComponent(() =>
      import("@/components/modals/AdminGlobalCodes")
    ),
    GlobalCodesTable,
    SearchField,
    Button,
    TableLoader,
    ExportToExcel,
  },
  setup() {
    const store = useStore();
    const checked = ref([false]);
    const visible = ref(false);
    const isAdd = ref(null);

    const showModal = () => {
      isAdd.value = null;
      visible.value = true;
    };
    const handleClose = (e) => {
      visible.value = e;
    };
    const searchData = () => {
      // store.dispatch('searchGlobalCodes', value)
    };

    const editGlobalCode = (id) => {
      isAdd.value = id;
      store.dispatch("globalCodeDetails", id).then(() => {
        visible.value = true;
      });
    };

    onUnmounted(() => {
      store.dispatch("searchTable", "&search=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
    });
    return {
      exportExcel,
      arrayToObjact,
      screensPermissions: store.getters.screensPermissions,
      isAdd,
      buttonName: "Add Global Code",
      editGlobalCode,
      checked,
      visible,
      showModal,
      handleClose,
      searchData,
      size: ref([]),
    };
  },
});
</script>

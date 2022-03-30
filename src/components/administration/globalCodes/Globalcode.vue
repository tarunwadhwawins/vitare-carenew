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
                  
                  <div class="commonBtn" v-if="arrayToObjact(globalCodesPermissions,6)">
                    <Button :name="buttonName" @click="showModal" />
                  </div>
                </h2>
              </a-col>
              <a-col :span="12" >
                <SearchField endPoint="globalCodeCategory"/>
              </a-col>
              <a-col :span="12" v-if="arrayToObjact(globalCodesPermissions,265)">
                <ExportToExcel custumClass="text-right mb-24" @click="exportExcel('globalCode_report')"/>
              </a-col>
              <a-col :span="24">
                <Loader/>
                <GlobalCodesTable @edit-global-code="editGlobalCode($event)"/>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modals-->
    <AdminGlobalCodes  v-model:visible="visible" @close-modal="handleClose($event)" :isAdd="isAdd" />
    
    <!---->
  </div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
//import AdminGlobalCodes from "@/components/modals/AdminGlobalCodes";
import GlobalCodesTable from "@/components/administration/globalCodes/tables/GlobalCodesTable";
import SearchField from "@/components/common/input/SearchField";
import Button from "@/components/common/button/Button";
import { defineComponent,defineAsyncComponent, computed, ref,onUnmounted } from "vue";
import { useStore } from "vuex";
import { arrayToObjact,exportExcel } from "@/commonMethods/commonMethod";
import Loader from "@/components/loader/Loader"
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
export default defineComponent({
  components: {
    Header,
    Sidebar,
    AdminGlobalCodes:defineAsyncComponent(()=>import("@/components/modals/AdminGlobalCodes")),
    GlobalCodesTable,
    SearchField,
    Button,
    Loader,
    ExportToExcel
  },
  setup() {
    const store = useStore()
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
      store.dispatch('globalCodeDetails', id).then(() => {
        visible.value = true;
      })
    }

    const globalCodesPermissions = computed(()=>{
      return store.state.screenPermissions.globalCodesPermissions
    })
    onUnmounted(()=>{
            store.dispatch("searchTable",'')
        })
    return {
      exportExcel,
      arrayToObjact,
      globalCodesPermissions,
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

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
                  Programs
                  <div
                    class="commonBtn"
                    v-if="arrayToObjact(programsPermissions, 15)"
                  >
                    <a-button class="btn primaryBtn" @click="showModal(true)"
                      >Add New Program</a-button
                    >
                  </div>
                </h2>
              </a-col>
              <a-col :span="12" v-if="arrayToObjact(programsPermissions, 20)">
                <SearchField endPoint="program" />
              </a-col>
              <a-col :span="12" v-if="arrayToObjact(programsPermissions, 19)">
                <ExportToExcel
                  custumClass="text-right mb-24"
                  @click="exportExcel('program_report')"
                />
              </a-col>

              <ProgramTable @is-edit="showEdit($event)"> </ProgramTable>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modals-->
    <AdminPrograms
      v-if="programId"
      v-model:visible="visible"
      @ok="handleOk"
      @is-visible="showEdit($event)"
      :idProgram="programId"
    />
    <AdminPrograms
      v-else
      v-model:visible="visible"
      @ok="handleOk"
      @is-visible="showModal($event)"
    />
    <!---->
  </div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import AdminPrograms from "@/components/modals/AdminPrograms";
import { ref, onUnmounted, computed } from "vue";
import ProgramTable from "./ProgramTable";
import { useStore } from "vuex";
import SearchField from "@/components/common/input/SearchField";
import {arrayToObjact,exportExcel} from "@/commonMethods/commonMethod"
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
export default {
  components: {
    Header,
    Sidebar,
    ExportToExcel,
    AdminPrograms,
    ProgramTable,
    SearchField,
  },

  setup() {
    const store = useStore();
    const visible = ref(false);
    const showModal = (e) => {
      visible.value = e;
      programId.value = null;
    };
    const programId = ref(null);
    const handleOk = () => {
      visible.value = false;
    };
    const handleChange2 = (value) => {
      console.log(`selected ${value}`);
    };
    onUnmounted(() => {
      store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
    });
    const searchoptions = ref([
      {
        value: "RPM - Remote Patient Monitor",
        label: "RPM - Remote Patient Monitor",
      },
      {
        value: "BHI - Behaviour Health Integration",
        label: "BHI - Behaviour Health Integration",
      },
      {
        value: "CCM - Chronic Care Management",
        label: "CCM - Chronic Care Management",
      },
    ]);

    const showEdit = (e) => {
      if (e.check) {
        programId.value = e.id;
        visible.value = e.check;
      } else {
        visible.value = e;
      }

      //console.log("check",programId.value)
    };
    const programsPermissions = computed(() => {
      return store.state.screenPermissions.programsPermissions;
    });
    return {
      exportExcel,
      arrayToObjact,
      programsPermissions,
      programId,
      showEdit,
      handleChange2,
      searchoptions,
      size: ref([]),
      visible,
      showModal,
      handleOk,
    };
  },
};
</script>

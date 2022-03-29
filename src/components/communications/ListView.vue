<template>
  <a-row>
    <a-col :span="12">
      <SearchField  endPoint="communication"/>
    </a-col>
    <a-col :span="12" v-if="arrayToObjact(communicationPermissions,110)">
      <!-- <div class="text-right mb-24">
        <a-button class="primaryBtn">{{ $t('global.exportToExcel') }}</a-button>
      </div> -->
      <ExportToExcel custumClass="text-right mb-24" @click="exportExcel('communication_report')"/>
    </a-col>
    <a-col :span="24">

      <ListViewTable  />
    </a-col>
  </a-row>
</template>

<script>
import { watchEffect,computed ,onUnmounted} from 'vue';
import { useStore } from "vuex"
import SearchField from "@/components/common/input/SearchField";
import ListViewTable from "@/components/communications/tables/ListViewTable";
import {arrayToObjact,exportExcel} from "@/commonMethods/commonMethod"
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";

export default {
  components: {
    SearchField,
    ListViewTable,
    ExportToExcel
  },
  setup() {
    const store = useStore()
    const linkTo = "patients-summary"

    watchEffect(() => {
      store.dispatch('communicationsList')
    })
   
    const searchData = (value) => {
      store.getters.communicationRecord.communicationsList=""
      store.dispatch('searchCommunications', value)
    };

    const communicationPermissions = computed(()=>{
      return store.state.screenPermissions.communicationPermissions
    })
    onUnmounted(()=>{
            store.dispatch("searchTable",'')
        })
    return {
      communicationPermissions,
      arrayToObjact,
      exportExcel,
      searchData,
      linkTo,
      onChange: () => {
        // console.log("params", );
      },
    };
  },
};
</script>

<style lang="scss">
@media (max-width: 1199px) {
  .communications {
    padding: 0px 0 60px;
    .addtaskButton {
      left: 0;
      right: auto;
      top: 50px;
    }
  }
}
</style>
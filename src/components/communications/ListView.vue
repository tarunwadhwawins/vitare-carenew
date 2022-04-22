<template>
  <a-row>
    <a-col :span="12" >
      <SearchField  endPoint="communication"/>
    </a-col>
    <a-col :span="12" >
      <div class="text-right mb-24">
        <ExportToExcel  @click="exportExcel('communication_report')" v-if="arrayToObjact(screensPermissions,110)"/>
      </div>
    </a-col>
    <a-col :span="24">
      <ListViewTable  /> 
    </a-col>
  </a-row>
</template>

<script>
import { watchEffect ,onUnmounted} from 'vue';
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
    

    watchEffect(() => {
      store.dispatch('communicationsList')
      store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
    })
   
    const searchData = (value) => {
      store.getters.communicationRecord.communicationsList=""
      store.dispatch('searchCommunications', value)
    };

    
    onUnmounted(()=>{
      store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })
    return {
     screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      exportExcel,
      searchData,
      
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
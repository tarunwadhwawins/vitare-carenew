<template>
  <a-row>
    <a-col :span="12">
      <SearchField @change="searchData"/>
    </a-col>
    <a-col :span="12">
      <div class="text-right mb-24">
        <a-button class="primaryBtn">{{ $t('global.exportToExcel') }}</a-button>
      </div>
    </a-col>
    <a-col :span="24">

      <ListViewTable v-if="communicationsList.communicationsList" :communicationsList="communicationsList.communicationsList" />
    </a-col>
  </a-row>
</template>

<script>
import { watchEffect } from 'vue';
import { useStore } from "vuex"
import SearchField from "@/components/common/input/SearchField";
import ListViewTable from "@/components/communications/tables/ListViewTable";
export default {
  components: {
    SearchField,
    ListViewTable,
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

    return {
      communicationsList:store.getters.communicationRecord,
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
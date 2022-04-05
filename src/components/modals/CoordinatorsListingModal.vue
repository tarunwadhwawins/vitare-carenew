<template>
  <a-modal width="60%" :title="title">
    <CoordinatorsListingTable :staffType="staffType" />
  </a-modal>
</template>

<script>

import { defineComponent } from "vue";
import CoordinatorsListingTable from "@/components/modals/CoordinatorsListingTable"

  export default defineComponent({
    components: {
      CoordinatorsListingTable,
    },
    props: {
      title: {
        type: String
      },
      staffType: {
        type: Number
      },
    },
    setup() {

      return {
        
      };
    },
  });
</script>

<style>
  th.staffCol {
    width: 70% !important;
  }
  th.actions,
  td.actions {
    text-align: center !important;
  }
</style>
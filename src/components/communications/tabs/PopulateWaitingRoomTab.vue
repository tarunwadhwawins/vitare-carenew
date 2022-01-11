<template>
  <a-tab-pane :key="key" :tab="tab">
    <PopulateWaitingRoomTable :linkTo="linkTo" :columns="columns" :dataSource="dataSource" :pagination="pagination" />
  </a-tab-pane>
</template>

<script>
import { useRouter } from "vue-router";
import PopulateWaitingRoomTable from "@/components/communications/tables/PopulateWaitingRoomTable";
export default {
  props: {
    linkTo: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    },
    tab: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      required: true
    },
    pagination: {
      type: Boolean,
      required: true
    },
  },
  components: {
    PopulateWaitingRoomTable,
  },

  setup() {
    const router = useRouter();
    function clickHandler() {
      router.push({ path: "corrdinator-summary" });
    }

    return {
      clickHandler,
    }
  },
}
</script>
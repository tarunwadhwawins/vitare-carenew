<template>
  <a-tab-pane :key="key" :tab="tab">
    <PopulateWaitingRoomTable :linkTo="link" :colomnsRecord="columns" :dataRecord="dataSource" :pagination="pagination" />
  </a-tab-pane>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive } from "vue"
import PopulateWaitingRoomTable from "@/components/communications/tables/PopulateWaitingRoomTable";
export default {
  props: {
    linkTo: {
      type: String,
      required: true
    },
    key: {
      type: Number,
      required: true
    },
    tab: {
      type: String,
      required: true
    },
    column: {
      type: Array,
      required: true
    },
    data: {
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

  setup(props) {
    const link=reactive(props.linkTo)
    const columns=reactive(props.column)
    const dataSource= reactive(props.data)
    const router = useRouter();
    function clickHandler() {
      router.push({ path: "corrdinator-summary" });
    }

    return {
      clickHandler,
      columns,
      link,
      dataSource,

    }
  },
}
</script>
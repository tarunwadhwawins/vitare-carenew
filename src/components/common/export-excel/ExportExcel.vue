<template>
  <div :class="custumClass">
    <a-button class="primaryBtn">{{ $t("global.exportToExcel") }}</a-button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    custumClass: String,
  },
  setup() {
    return {

    };
  },
});
</script>

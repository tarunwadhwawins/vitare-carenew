<template>
    <a-table >
    <template #name="text">
        <router-link to="patients-summary">{{ text.text }}</router-link>
    </template>
    <template #action="text">
        <router-link to="patients-summary">{{ text.text }}</router-link>
    </template>
    <!-- <template #compliance>
        <a class="icons">
            <WarningOutlined /></a>
    </template> -->

    <template #lastReadingDate>
        <WarningOutlined /> 
    </template>
</a-table>
</template>
<script>
import { WarningOutlined } from "@ant-design/icons-vue";
export default {
  name: "DataTable",
  components: {
    WarningOutlined,
  },
  setup() {
    return {
    };
  },
};
</script>

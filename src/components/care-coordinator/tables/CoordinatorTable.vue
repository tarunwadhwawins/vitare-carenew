<template>
    <a-table >
    <template #name="text">
        <router-link :to="linkTo">{{ text.text }}</router-link>
    </template>

    <template #createdDate="text">
        <span>{{ dateFormat(text.text) }}</span>
    </template>
    <template #action="text">
        <router-link :to="linkTo">{{ text.text }}</router-link>
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
import {dateFormat} from "../../../commonMethods/commonMethod"
export default {
  name: "DataTable",
  components: {
    WarningOutlined,
  },
  setup() {
    const linkTo = "coordinator-summary"
    return {
      linkTo,
      dateFormat
    }
  },
};
</script>

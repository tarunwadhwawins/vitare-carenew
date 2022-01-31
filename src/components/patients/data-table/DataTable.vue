<template>
    <a-table >
    <template #firstName="text">
        <router-link to="patients-summary">{{ text.text }}</router-link>
    </template>
    <template #flags="text">
        <span class="box" :style="{'background-color':text.text}" ></span>
        <!-- <span class="box" :class="(text = text.match(/yellowBgColor/g))" v-if="text.match(/yellowBgColor/g)"></span> -->
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

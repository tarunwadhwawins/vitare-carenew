<template>
  <a-col :xl="6"  :xs="24">
    <div v-bind:style="{ backgroundColor: backgroundColor, color: textColor }" class="colorBox">
      <UserOutlined />
      <h3>{{ count }}</h3>
      <p>{{ text }}</p>
    </div>
  </a-col>
</template>

<script>
import { UserOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    UserOutlined
  },
  props: {
    backgroundColor: {
      type: String,
      required: true
    },
    textColor: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    },
  },
}
</script>
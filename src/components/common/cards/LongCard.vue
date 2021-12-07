<template>
  <a-col :sm="12" :xs="24">
    <div class="colorBox" :class="customClass">
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
    count: {
      type: Number,
      required: true
    },
    text: {
      type: Number,
      required: true
    },
    customClass: {
      type: String,
      required: true
    },
  },
}
</script>
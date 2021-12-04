<template>
  <a-col flex="1 0 0%">
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

<style>
.colorBox {
  padding: 15px;
  border-radius: 10px;
}
.colorBox p {
  font-size: 16px;
  display: block;
  color: #fff;
}
.anticon svg {
  display: inline-block;
  color: #ffffff;
}
.colorBox .anticon svg {
  fill: #ffffff !important;
}
.colorBox .anticon {
  font-size: 40px;
  margin: 0 0 8px 0;
}
.colorBox h3 {
  position: absolute;
  right: 15px;
  top: 50%;
  margin: 0;
  font-size: 50px;
  transform: translatey(-50%);
  color: #fff;
}
</style>
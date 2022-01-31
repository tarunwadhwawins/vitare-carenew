<template>
  <div class="commonBtn">
    <a-button class="btn primaryBtn" @click="show">{{ name }}</a-button>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  props: {
    name: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const show = () => {
      emit("click");
    };

    return {
      show,
    };
  },
};
</script>

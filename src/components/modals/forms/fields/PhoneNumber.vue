<template>
<div>
   <a-input v-model="value"  @input="onInput"/>
</div>
</template>
<script>
import { ref } from 'vue';

export default {

  setup(props, context) {
    const onInput = (event) => {
      console.log('object',event);
      context.emit("update:modelValue", event.target.value);
      // context.emit("setPhoneNumber", event.target.value);
    };

    return {
      value:ref,
      onInput,
    };
  },
};
</script>

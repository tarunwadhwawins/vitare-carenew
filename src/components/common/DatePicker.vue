<template>
  <a-space direction="vertical" :size="12">
    <a-range-picker @change="handleChange($event)" v-if="datePickerType == 'range'" v-model:value="value1" :format="globalDateFormat" value-format="YYYY-MM-DD" size="large" style="width: 100%" />
    <a-date-picker @change="handleChange($event)" v-if="datePickerType == 'single'" v-model:value="value1" :format="globalDateFormat" value-format="YYYY-MM-DD" size="large" style="width: 100%" />
  </a-space>
</template>
<script>

import { defineComponent, ref, watchEffect } from 'vue';
import {
  globalDateFormat
} from "@/commonMethods/commonMethod";

export default defineComponent({
  props: {
    datePickerType: {
      type: String
    },
    dateRange: {
      type: Array
    },
  },
  setup(props, { emit }) {
    const value1 = ref()
    const handleChange = (value) => {
      emit('onChange', {
        value: value,
        type: null,
      })
    }

    watchEffect(() => {
      if(props.dateRange) {
        value1.value = props.dateRange
      }
    })

    return {
      globalDateFormat,
      handleChange,
      value1,
    };
  },

});
</script>
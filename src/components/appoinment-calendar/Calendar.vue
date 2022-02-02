<template>
  <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
    <a-calendar v-model:value="value" :fullscreen="false" @select="onSelect" @panelChange="onPanelChange" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
export default defineComponent({
  setup() {
    const value = ref();
    const date = ref(dayjs('2017-01-25'));
    const selectedValue = ref(dayjs('2017-01-25'));

    const onSelect = value => {
      date.value = value;
      selectedValue.value = value;
      
    };
    const onPanelChange = (value, mode) => {
      console.log(value, mode);
    };

    return {
      date,
      selectedValue,
      onSelect,
      value,
      onPanelChange,
    };
  },

});
</script>
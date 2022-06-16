<template>
  <a-select
  class="globalDropList"
  :getPopupContainer="triggerNode => triggerNode.parentNode"
    :value="value"
    show-search
    :mode="mode"
    placeholder="Please Select"
    style="width: 100%"
    size="large"
    :options="globalCode.map((item) => ({label: item.modelNumber+' ('+item.macAddress+')', value: item.id?item.id:item.udid }))"
    :filter-option="filterOption"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
  ></a-select>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props:{
    globalCode:Array,
    mode:String
  },
  setup() {
    const handleChange = value => {
      console.log(`selected ${value}`);
    };

    const handleBlur = () => {
      console.log('blur');
    };

    const handleFocus = () => {
      console.log('focus');
    };

    const filterOption = (input, globalCode) => {
      return globalCode.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return {
      value: ref(undefined),
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
    };
  },

});
</script>
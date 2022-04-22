<template>
  <a-select v-if="globalCode"
    :value="value"
    show-search
    :mode="mode"
    placeholder="Please Select"
    style="width: 100%"
    size="large"
    :options="globalCode.map((item) => ({label: item.name, value: item.id?item.id:item.udid }))"
    :filter-option="filterOption"
  ></a-select>
  <a-select v-else>
     <a-select-option value="" hidden>{{'Please Select'}}</a-select-option>
  </a-select>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props:{
    globalCode:Array,
    mode:String
  },
  setup() {
 
    const filterOption = (input, globalCode) => {
      return globalCode.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return {
      value: ref(undefined),
      filterOption,
    };
  },

});
</script>
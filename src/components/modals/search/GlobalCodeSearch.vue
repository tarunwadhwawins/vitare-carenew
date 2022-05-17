<template>
<!-- 
    :options="globalCode.map((item) => ({label: isColor ? item.color+' '+item.name : item.name, value: item.id ? item.id : item.udid }))"
     -->
  <a-select v-if="globalCode"
    :value="value"
    show-search
    :mode="mode"
    placeholder="Please Select"
    style="width: 100%"
    size="large"
    :filter-option="filterOption">
    <a-select-option class="priority" v-for="item in globalCode" :key="item.id">
      <span class="circleBox" :style="item.style">
        <span class="circleBoxName">{{ item.name }}</span>
      </span>
    </a-select-option>
  </a-select>
  <a-select v-else>
     <a-select-option value="" hidden>{{'Please Select'}}</a-select-option>
  </a-select>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props:{
    globalCode:Array,
    mode:String,
    isColor:Boolean,
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

<style scoped>
  /* .ant-select-selection-item {
    padding-left: 35px !important;
    position: relative !important;
    top: -7px !important;
  }
  .ant-select-selection-item .circleBox {
    position: relative;
    top: 6px;
  } */
  .ant-select-selection-item .circleBox { 
    position: relative;
    top: 6px;
  }
  .ant-select-selection-item .circleBoxName { 
    position: relative;
    top: -6px;
    left: 35px;
  }
  .ant-select-item-option-content .circleBoxName { 
    padding-left: 35px;
    position: relative;
    top: 2px;
  }
</style>
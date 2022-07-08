<template>{{id}}
  <a-select
  :getPopupContainer="triggerNode => triggerNode.parentNode"
    ref="select"
    class=""
    :listHeight="listHeight?listHeight:150"
    :mode="mode"
    :value="value"
    @input="updateValue"
    style="width: 100%"
    :show-search="true"
    :placeholder="placeholder?placeholder:'input search text'"
    :show-arrow="true"
    :filter-option="false"
    :not-found-content="loadingStatus ? undefined : null"
    :options="globalData"
    @search="handleGlobalSearch"
    @change="handleGlobalChange"
    size="large"
  >
    <template v-if="loadingStatus" #notFoundContent>
      <a-spin size="small" />
      <p>Data not found!</p>
    </template>
  </a-select>
</template>

<script>
import { defineComponent, watchEffect, onMounted,ref } from "vue";
import { useStore } from "vuex";
import Services from "@/services/serviceMethod";
export default defineComponent({
  components: {},
  props: {
    value: String,
    mode: String,
    close: Boolean,
    editDataGlobal:Array,
    placeholder:String,
    listHeight:Number,
    dataId:Number
  },

  setup(props, context) {
    const store = useStore();
    const globalData = ref()
    
   

    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    watchEffect(() => {
      if (props.close) {
        Services.singleDropdownSearch(
          "",
          (d) => (globalData.value = d),
          `globalCode?orderField=priority&globalCodeCategoryId=${props.dataId}`
        );
        store.commit("checkChangeInput", false);
      }
       props.editDataGlobal?globalData.value = props.editDataGlobal:globalData.value
    });
    onMounted(() => {
      Services.singleDropdownSearch(
        "",
        (d) => (globalData.value = d),
        `globalCode?orderField=priority&globalCodeCategoryId=${props.dataId}`
      );
    });

    const handleGlobalSearch = (val) => {
      store.commit("dropdownLoadingStatus", true);
      globalData.value = [];
      Services.singleDropdownSearch(
        val,
        (d) => (globalData.value = d),
        `globalCode?orderField=priority&globalCodeCategoryId=${props.dataId}`
      );
    };

    const handleGlobalChange = (val) => {
      context.emit("handleGlobalChange", val);
    };

    return {
      loadingStatus: store.getters.dropdownLoadingStatus,
      handleGlobalChange,
      handleGlobalSearch,
      globalData,
      updateValue,
    };
  },
});
</script>

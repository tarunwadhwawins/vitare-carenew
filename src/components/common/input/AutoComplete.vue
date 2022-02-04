<template>
  <a-auto-complete
    :options="categories"
    :filter-option="filterOption"
    :onSelect="onSelectOption"
    ref="select"
    style="width: 100%"
    size="large">
  </a-auto-complete>
</template>

<script>
  export default {
    props: {
      categories: {
        type: Array
      },
    },
    setup(props, {emit}) {
      const filterOption = (option) => {
        return option.value
      };
      const onSelectOption = (selected) => {
        emit('on-select', selected);
      }

      return {
        filterOption,
        onSelectOption,
      }
    }
  }
</script>
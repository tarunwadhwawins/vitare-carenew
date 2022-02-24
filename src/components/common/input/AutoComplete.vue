<template>
  <a-auto-complete
    :options="options"
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
      options: {
        type: Array
      },
    },
    setup(props, {emit}) {
      const filterOption = (input, option) => {
        return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
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
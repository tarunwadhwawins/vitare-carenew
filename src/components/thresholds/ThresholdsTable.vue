<template>

  <a-col :sm="24" :xs="24">
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 900 }" @change="onChange">
      <template #actions>
        <a-tooltip placement="bottom">
          <template #title>
            <span>{{$t('global.edit')}}</span>
          </template>
          <a class="icons">
            <EditOutlined />
          </a>
        </a-tooltip>
        <a-tooltip placement="bottom">
          <template #title>
            <span>{{$t('global.delete')}}</span>
          </template>
          <a class="icons">
            <DeleteOutlined />
          </a>
        </a-tooltip>
      </template>
      <template #active="key">
        <a-switch v-model:checked="checked[key.record.key]" />
      </template>
    </a-table>
  </a-col>
</template>

<script>
  import { reactive } from "vue"
  import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
  export default {
    components: {
      DeleteOutlined,
      EditOutlined,
    },
    props: {
      thresholdsData: {
        type: Array,
      },
      columns: {
        type: Array,
      },
      title: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const data = reactive(props.thresholdsData)
      const column = reactive(props.columns)



      return {
        data,
        column,

      }
    }
  }
</script>
<style>
  .common-card {
    min-height: 335px !important;
  }
</style>
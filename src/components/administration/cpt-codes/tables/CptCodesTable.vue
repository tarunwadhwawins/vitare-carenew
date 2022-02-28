<template>
  <a-table
    :columns="cptCodesColumns"
    :data-source="cptCodesList"
    :scroll="{ x: 900 }"
    @change="onChange">
    <template #actions>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Edit</span>
        </template>
        <a class="icons"><EditOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Delete</span>
        </template>
        <a class="icons"> <DeleteOutlined /></a>
      </a-tooltip>
    </template>
    <template #active="{record}">
      <a-switch v-model:checked="record.status" />
    </template>
  </a-table>
</template>

<script>
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
  },
  props: {
    cptCodesList: {
      type: Array
    }
  },
  setup() {
    const cptCodesColumns = [
      {
        title: "Cpt Code",
        dataIndex: "cpt",
        sorter: {
          compare: (a, b) => a.cpt - b.cpt,
          multiple: 3,
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        sorter: {
          compare: (a, b) => a.description - b.description,
          multiple: 3,
        },
      },
      {
        title: "Billing Amount",
        dataIndex: "billing",
        sorter: {
          compare: (a, b) => a.billing - b.billing,
          multiple: 2,
        },
      },
      {
        title: "Active/Inactive",
        dataIndex: "active",
        slots: {
          customRender: "active",
        },
      },
      {
        title: "Actions",
        dataIndex: "actions",
        slots: {
          customRender: "actions",
        },
      },
    ];

    return {
      cptCodesColumns,
    }
  }
}
</script>
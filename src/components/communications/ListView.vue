<template>
  <a-row>
    <a-col :span="12">
      <SearchField @change="searchData"/>
    </a-col>
    <a-col :span="12">
      <div class="text-right mb-24">
        <a-button class="primaryBtn">{{ $t('global.exportToExcel') }}</a-button>
      </div>
    </a-col>
    <a-col :span="24">
      <ListViewTable :columns="communicationColumns" :data="communicationsList" />
    </a-col>
  </a-row>
</template>

<script>
import { watchEffect, computed } from 'vue';
import { useStore } from "vuex"
import SearchField from "@/components/common/input/SearchField";
import ListViewTable from "@/components/communications/tables/ListViewTable";
import {
  EyeOutlined,
  MessageOutlined,
  CommentOutlined,
  PhoneOutlined,
  MailOutlined,
  AlertOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    EyeOutlined,
    MessageOutlined,
    CommentOutlined,
    PhoneOutlined,
    MailOutlined,
    AlertOutlined,
    SearchField,
    ListViewTable,
  },
  setup() {
    const store = useStore()
    const linkTo = "patients-summary"

    watchEffect(() => {
      store.dispatch('communicationsList', 1)
    })
    const communicationsList = computed(() => {
      return store.state.communications.communicationsList
    })

    const searchData = (value) => {
      store.dispatch('searchCommunications', value)
    };

    const communicationColumns = [
      {
        title: "From",
        dataIndex: "from",
        key: "from",
        sorter: {
          compare: (a, b) => a.from - b.from,
          multiple: 2,
        },
      },
      {
        title: "To",
        dataIndex: "to",
        key: "to",
        sorter: {
          compare: (a, b) => a.to - b.to,
          multiple: 2,
        },
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        slots: {
          customRender: "type",
        },
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        slots: {
          customRender: "priority",
        },
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        sorter: {
          compare: (a, b) => a.category - b.category,
          multiple: 2,
        },
      },
      {
        title: "Date Sent",
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: {
          compare: (a, b) => a.createdAt - b.createdAt,
          multiple: 2,
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        slots: {
          customRender: "action",
        },
      },
    ];

    return {
      communicationsList,
      communicationColumns,
      searchData,
      linkTo,
      onChange: () => {
        // console.log("params", );
      },
    };
  },
};
</script>

<style lang="scss">
@media (max-width: 1199px) {
  .communications {
    padding: 0px 0 60px;
    .addtaskButton {
      left: 0;
      right: auto;
      top: 50px;
    }
  }
}
</style>
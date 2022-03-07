<template>
  <a-table
    rowKey="id"
    :columns="communicationColumns"
    :data-source="data"
    :scroll="{ x: 900, y: 300 }"
    :pagination="false"
  >
    <template #resend>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t("communications.message") }}</span>
        </template>
        <a class="icons"><EyeOutlined /></a>
      </a-tooltip>
    </template>
    <template #patient="text">
      <router-link :to="linkTo">
        {{ text.text }}
      </router-link>
    </template>
    <template #staff="{ record }">
      <router-link
        v-for="staff in record.staff.data"
        :key="staff.id"
        to="coordinator-summary"
      >
        {{ staff.staff }}
      </router-link>
    </template>

    <template #priority="{ record }">
      <a-tooltip placement="right">
        <template #title>{{ $t("common.urgent") }}</template>
        <span
          class="circleBox"
          style="background-color: #ff6061"
          v-if="record.priority == 'Urgent'"
        ></span>
      </a-tooltip>
      <a-tooltip placement="right">
        <template #title>{{ $t("common.medium") }}</template>
        <span
          class="circleBox"
          style="background-color: #ffa800"
          v-if="record.priority == 'Medium'"
        ></span>
      </a-tooltip>
      <a-tooltip placement="right">
        <template #title>{{ $t("common.normal") }}</template>
        <span
          class="circleBox"
          style="background-color: #008000"
          v-if="record.priority == 'Normal'"
        ></span>
      </a-tooltip>
    </template>

    <template #type="{ record }">
      <a-tooltip placement="right">
        <template #title>
          <span>{{ $t("communications.communicationsModal.sms") }}</span>
        </template>
        <a class="icons" v-if="record.type == 'SMS'">
          <CommentOutlined />
        </a>
      </a-tooltip>
      <a-tooltip placement="right">
        <template #title>
          <span>{{ $t("communications.communicationsModal.call") }}</span>
        </template>
        <a class="icons" v-if="record.type == 'Call'">
          <PhoneOutlined />
        </a>
      </a-tooltip>
      <a-tooltip placement="right">
        <template #title>
          <span>{{ $t("communications.communicationsModal.email") }}</span>
        </template>
        <a class="icons" v-if="record.type == 'Email'">
          <MailOutlined />
        </a>
      </a-tooltip>
      <a-tooltip placement="right">
        <template #title>
          <span>{{ $t("communications.communicationsModal.reminder") }}</span>
        </template>
        <a class="icons" v-if="record.type == 'Reminder'">
          <AlertOutlined />
        </a>
      </a-tooltip>
    </template>

    <template #action="{record}">
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t("common.view") }}</span>
        </template>
        <a class="icons">
          <EyeOutlined />
        </a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t("common.reply") }}</span>
        </template>
        <a class="icons" @click="showModal(record.id)">
          <MessageOutlined />
        </a>
      </a-tooltip>
    </template>
  </a-table>
  <InfiniteLoader v-if="loader" />
  <Chat v-model:visible="visible" @ok="handleOk" @is-visible="handleOk" />
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import InfiniteLoader from "@/components/loader/InfiniteLoader";
import Chat from "@/components/modals/Chat";

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
    InfiniteLoader,
    Chat,
  },
  props: {
    communicationsList: {
      type: Array,
    },
  },
  setup(props) {
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
    const store = useStore();

    const data = reactive(props.communicationsList);

    const meta = store.getters.communicationRecord;
    const loader = ref(false);
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");

      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        console.log(currentScroll);
        if (currentScroll >= maxScroll) {
          let current_page = meta.value.communicationMeta.current_page + 1;

          if (current_page <= meta.value.communicationMeta.total_pages) {
            loader.value = true;
            meta.value.communicationMeta = "";
            store.state.communications.communicationsList = "";
            store
              .dispatch("communicationsList", "?page=" + current_page)
              .then(() => {
                //console.log('response',response)
                loadMoredata();
              });
          }
        }
      });
    });

    function loadMoredata() {
      const newData = meta.value.communicationsList;

      newData.forEach((element) => {
        data.push(element);
      });
      loader.value = false;
    }

    const visible = ref(false);
    const showModal = (e) => {
      console.log("check",e)
      visible.value = true;
    };

    const handleOk = () => {
      visible.value = false;
    };

    return {
      communicationColumns,
      data,
      loader,
      visible,
      showModal,
      handleOk,
    };
  },
};
</script>
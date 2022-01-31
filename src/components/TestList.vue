<template>
  <div>
    <div class='scrolling-component' ref='scrollComponent'>
      <a-table
        v-if="communicationsList"
        :columns="communicationsColumns"
        :data-source="communicationsList"
        :pagination="false">
        
        <template #expandedRowRender="{ record }">
          <p style="margin: 0">
            {{ record.description }}
          </p>
        </template>
        <template #resend>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('communications.message')}}</span>
            </template>
            <a class="icons"><EyeOutlined /></a>
          </a-tooltip>
        </template>
        <template #patient="text">
          <router-link to="patients-summary">
            {{ text.text }}
          </router-link>
        </template>
        <template #staff="{ record }">
          <router-link v-for="staff in record.staff.data" :key="staff.id" to="corrdinator-summary">
            {{ staff.staff }}
          </router-link>
        </template>

        <template #priority="{ record }">
          <a-tooltip placement="right">
            <template #title>{{ $t('common.urgent') }}</template>
            <span class="circleBox" style="background-color: #ff6061" v-if="record.priority=='Urgent'" ></span>
          </a-tooltip>
          <a-tooltip placement="right">
            <template #title>{{ $t('common.medium') }}</template>
            <span class="circleBox" style="background-color: #ffa800" v-if="record.priority=='Medium'" ></span>
          </a-tooltip>
          <a-tooltip placement="right">
            <template #title>{{ $t('common.normal') }}</template>
            <span class="circleBox" style="background-color: #008000" v-if="record.priority=='Normal'" ></span>
          </a-tooltip>
        </template>

        <template #type="{ record }">
          <a-tooltip placement="right">
            <template #title>
              <span>{{ $t('communications.communicationsModal.sms') }}</span>
            </template>
            <a class="icons" v-if="record.type == 'SMS'">
              <CommentOutlined />
            </a>
          </a-tooltip>
          <a-tooltip placement="right">
            <template #title>
              <span>{{ $t('communications.communicationsModal.call') }}</span>
            </template>
            <a class="icons" v-if="record.type == 'Call'">
              <PhoneOutlined/>
            </a>
          </a-tooltip>
          <a-tooltip placement="right">
            <template #title>
              <span>{{ $t('communications.communicationsModal.email') }}</span>
            </template>
            <a class="icons" v-if="record.type == 'Email'">
              <MailOutlined/>
            </a>
          </a-tooltip>
          <a-tooltip placement="right">
            <template #title>
              <span>{{ $t('communications.communicationsModal.reminder') }}</span>
            </template>
            <a class="icons" v-if="record.type == 'Reminder'">
              <AlertOutlined/>
            </a>
          </a-tooltip>
        </template>

        <template #action>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('common.view') }}</span>
            </template>
            <a class="icons">
              <EyeOutlined />
            </a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('common.reply') }}</span>
            </template>
            <a class="icons">
              <MessageOutlined />
            </a>
          </a-tooltip>
        </template>
      </a-table>
      <div ref="intersectionTrigger"></div>
    </div>
  </div>
</template>

<script>
const communicationsColumns = [
  {
    title: "From",
    dataIndex: "from",
    sorter: {
      compare: (a, b) => a.from - b.from,
      multiple: 2,
    },
  },
  {
    title: "To",
    dataIndex: "to",
    sorter: {
      compare: (a, b) => a.to - b.to,
      multiple: 2,
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    slots: {
      customRender: "type",
    },
  },
  {
    title: "Priority",
    dataIndex: "priority",
    slots: {
      customRender: "priority",
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: {
      compare: (a, b) => a.category - b.category,
      multiple: 2,
    },
  },
  {
    title: "Date Sent",
    dataIndex: "createdAt",
    sorter: {
      compare: (a, b) => a.createdAt - b.createdAt,
      multiple: 2,
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];

import { ref, watchEffect, onMounted, computed } from "vue";
import { useStore } from "vuex"
// import { makeUseInfiniteScroll } from 'vue-use-infinite-scroll'
  export default {
    setup () {
      const store = useStore()
      // const useInfiniteScroll = makeUseInfiniteScroll({})
      var intersectionTrigger = ref(null)
      // var pageRef = useInfiniteScroll(intersectionTrigger)
      var scrollComponent = ref(null)
      var page = 1

      watchEffect(() => {
        store.dispatch('communicationsList', page)
      })

      onMounted(() => {
        window.addEventListener("scroll", () => {
          // pageRef,
          // (page) => {
            let element = scrollComponent.value;
            if (element.getBoundingClientRect().bottom < window.innerHeight) {
              loadMoreData(page++);
            }
          // }
        })
      })
      
      async function loadMoreData(page) {
        store.dispatch('communicationsList', page)
      }

      const communicationsList = computed(() => {
        return store.state.communications.communicationsList
      })
      
      return {
        intersectionTrigger,
        scrollComponent,
        communicationsList,
        communicationsColumns,
      }
    }
  }
</script>
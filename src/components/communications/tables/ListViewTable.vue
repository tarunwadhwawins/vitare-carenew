<template>
  <a-table
    :columns="communicationColumns"
    :data-source="communicationsList"
    :scroll="{ x: 900 }"
    rowKey="id"
    :pagination="true"
    @change="onChange">
    
    <template #resend>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{$t('communications.message')}}</span>
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
      <router-link v-for="staff in record.staff.data" :key="staff.id" to="coordinator-summary">
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
</template>

<script>
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
  },
  props: {
    communicationColumns: {
      type: Array
    },
    communicationsList: {
      type: Array
    },
  }
}
</script>
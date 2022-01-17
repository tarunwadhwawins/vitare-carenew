<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>{{ boxTitle }}</span>
    </template>
    <a-button type="primary" :size="small" @click="clickTooltip('bottomRight', boxName)">
      <template #icon>
        <MailOutlined v-if="boxName == 'email'" />
        <MessageOutlined v-if="boxName == 'sms'" />
        <AlertOutlined v-if="boxName == 'reminder'" />
        <PhoneOutlined v-if="boxName == 'call'" />
      </template>
    </a-button>
  </a-tooltip>
</template>

<script>
import { MailOutlined, MessageOutlined, AlertOutlined, PhoneOutlined } from "@ant-design/icons-vue";
import { notification, Button } from "ant-design-vue";
import { h } from "vue";
export default {
  components: {
    MailOutlined,
    MessageOutlined,
    AlertOutlined,
    PhoneOutlined
  },
  props: {
    boxTitle: {
      type: String,
      required: true
    },
    boxName: {
      type: String,
      required: true
    },
  },
  
  setup(props, {emit}) {
    const clickTooltip = (placement, boxname) => {
      emit('open', {placement, boxname})
    };
    const small= "small"
    return {
      clickTooltip,
      small
    }
  }
}
</script>
<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>{{ boxTitle }}</span>
    </template>
    <a-button type="primary" :size="small" @click="openNotification('bottomRight')">
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
import { MailOutlined } from "@ant-design/icons-vue";
import { notification, Button } from "ant-design-vue";
import { h } from "vue";
export default {
  components: {
    MailOutlined
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
  
  setup() {
    const openNotification = (placement) => {
      const key = `open${Date.now()}`;
      notification.open({
        message: <h2>Email</h2>,
        description: (
          <div class="notificationBody">
            <p>
              Date Time : <span>December 20, 2021 12:00 PM</span>
            </p>
            <p>
              Patient Name : <span>Jane Doe</span>
            </p>
            <p class="summary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              at incidunt !
            </p>
          </div>
        ),
        btn: h(
          Button,
          {
            type: "primary",
            onClick: () => notification.close(key),
          },
          "Reply"
        ),
        key,
        onClose: close,
        placement,
      });
    };
    return {
      openNotification,
    }
  }
}
</script>
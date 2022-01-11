<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>{{ $t('communications.reminder') }}</span>
    </template>
    <a-button type="primary" :size="small" @click="openNotification('bottomRight')">
      <template #icon>
        <AlertOutlined />
      </template>
    </a-button>
  </a-tooltip>
</template>

<script>
import { AlertOutlined } from "@ant-design/icons-vue";
import { notification, Button } from "ant-design-vue";
import { h } from "vue";
export default {
  components: {
    AlertOutlined
  },
  
  setup() {

    const openNotification = (placement) => {
      const key = `open${Date.now()}`;
      notification.open({
        message: <h2>Reminder</h2>,
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
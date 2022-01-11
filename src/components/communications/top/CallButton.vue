<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>{{ $t('communications.call') }}</span>
    </template>
    <a-button type="primary" :size="small" @click="openNotification('bottomRight')">
      <template #icon>
        <PhoneOutlined />
      </template>
    </a-button>
  </a-tooltip>
</template>

<script>
import { PhoneOutlined } from "@ant-design/icons-vue";
import { notification, Button } from "ant-design-vue";
import { h } from "vue";
export default {
  components: {
    PhoneOutlined
  },
  
  setup() {

    const openNotification = (placement) => {
      const key = `open${Date.now()}`;
      notification.open({
        message: <h2>Call</h2>,
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
        btn: [
          h(
            Button,
            {
              onClick: () => notification.close(key),
            },
            "Cancel "
          ),
          h(
            Button,
            {
              type: "primary",
              onClick: () => notification.close(key),
            },
            "Accept"
          ),
        ],
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
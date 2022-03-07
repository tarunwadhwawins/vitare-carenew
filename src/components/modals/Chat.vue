<template>
  <a-modal width="800px" title="Reply" centered>
    <a-row :gutter="24">
      <a-col :span="24">
        <div class="chatBox">
          <a-list item-layout="horizontal">
            <a-list-item>
              <a-list-item-meta>
                <template #avatar>
                  <a-avatar>
                    <img
                      src="../../assets/images/video-call-thumb-3.png"
                      alt=""
                  /></a-avatar>
                </template>
                <template #title>
                  <a href="#">Jane Doe</a>
                </template>
                <template #description>
                  <span>Active</span>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <div class="chatBoxInner">
            <div class="chatWrapper left">
              <div class="message">
                Lorem ipsum dolor sit ametpa
              </div>
              <div class="time">Mar 1, 2022</div>
            </div>
            <div class="chatWrapper right">
              <div class="message">
                Lorem ipsum dolor
              </div>
              <div class="time">Mar 1, 2022</div>
            </div>
            <div class="chatWrapper left">
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                sunt sequi sit animi molestias magnam culpa
              </div>
              <div class="time">Mar 1, 2022</div>
            </div>
            <div class="chatWrapper right">
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                sunt sequi sit animi molestias magnam culpa
              </div>
              <div class="time">Mar 1, 2022</div>
            </div>
            <div class="chatWrapper left">
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                sunt sequi sit animi molestias magnam culpa
              </div>
              <div class="time">Mar 1, 2022</div>
            </div>
          </div>
          <div class="sendMessage">
            <a-input v-model:value="value5" size="large" placeholder="Type Message">
              <template #addonAfter>
                <SendOutlined />
              </template>
            </a-input>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { SendOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    SendOutlined,
  },
  setup() {
    return {};
  },
};
</script>

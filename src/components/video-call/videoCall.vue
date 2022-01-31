<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <div class="common-bg">
            <a-row>
              <a-col :span="24">
                <div class="videoCallHeading">
                <h2 class="pageTittle">Video Call </h2> <span>- Steve Smith (64 - Male)</span><img width="30" src="../../assets/images/flag-orange.svg"></div>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :xl="16" :lg="14">
                <div class="videoCall">
                  <img  class="largeImg" src="../../assets/images/patient.png" />
                  <!-- <div class="participant">
                    <div class="participantBox">
                      <img src="../../assets/images/video-call-thumb-1.png" />
                      <p>Julie</p>
                    </div>
                    <div class="participantBox">
                      <img src="../../assets/images/video-call-thumb-2.png" />
                      <p>Jane Doe</p>
                    </div>
                    <div class="participantBox">
                      <img src="../../assets/images/video-call-thumb-3.png" />
                      <p>Steve Smith</p>
                    </div>
                  </div> -->
                </div>
                <!-- <div class="videoCallActions">
                  <div class="actionBox">
                    <div class="actionBoxImg">
                      <img src="../../assets/images/video.svg" />
                    </div>
                    <p>Cam</p>
                  </div>
                  <div class="actionBox">
                    <div class="actionBoxImg">
                      <img src="../../assets/images/mic.svg" />
                    </div>
                    <p>Mic</p>
                  </div>
                  <div class="actionBox">
                    <div class="actionBoxImg">
                      <img src="../../assets/images/screenshare.svg" />
                    </div>
                    <p>Share</p>
                  </div>
                  <div class="actionBox">
                    <div class="actionBoxImg">
                      <img src="../../assets/images/chat.svg" />
                    </div>
                    <p>Chat</p>
                  </div>
                  <div class="actionBox">
                    <div class="actionBoxImg">
                      <img src="../../assets/images/Stop.svg" />
                    </div>
                    <p>Leave</p>
                  </div>
                </div> -->
              </a-col>
              <a-col :xl="8" :lg="10">
                <div class="callRightWrapper">
                  <div class="header">
                    <img src="../../assets/images/user-2.jpg" />
                    <div class="name">
                      <h4>Jane Doe</h4>
                      <p>View Profile</p>
                    </div>
                    <span class="callTime">7:20</span>
                  </div>
                  <div class="body">
                    <a-row>
                      <a-col :span="6">
                        <div class="moreAction">
                          <div class="moreActionImg three">
                            <img src="../../assets/images/user.svg" />
                          </div>
                          <p>Profile</p>
                        </div>
                      </a-col>
                      <a-col :span="6">
                        <div class="moreAction">
                          <div class="moreActionImg four">
                            <img src="../../assets/images/edit.svg" />
                          </div>
                          <p>Notes</p>
                        </div>
                      </a-col>
                      <a-col :span="6">
                        <div class="moreAction">
                          <div class="moreActionImg five">
                            <img src="../../assets/images/chat-2.svg" />
                          </div>
                          <p>Chat</p>
                        </div>
                      </a-col>
                      <a-col :span="6">
                        <div class="moreAction">
                          <div class="moreActionImg green">
                            <img src="../../assets/images/report.svg" />
                          </div>
                          <p>Document</p>
                        </div>
                      </a-col>
                      <a-col :span="6">
                        <div class="moreAction">
                          <div class="moreActionImg yellowBgColor">
                            <img src="../../assets/images/schedule.svg" />
                          </div>
                          <p>Appointment</p>
                        </div>
                      </a-col>
                      <a-col :span="6">
                        <div class="moreAction">
                          <div class="moreActionImg redBgColor">
                            <img src="../../assets/images/wave.svg" />
                          </div>
                          <p>Vital</p>
                        </div>
                      </a-col>
                      <a-col :span="6">
                        <div class="moreAction">
                          <div class="moreActionImg purpleBgColor">
                            <img src="../../assets/images/watch.svg" />
                          </div>
                          <p>Reminder</p>
                        </div>
                      </a-col>
                    </a-row>
                  </div>
                  <div class="footer">
                    <a-button class="endCall" :size="size" block
                      >End Call</a-button
                    >
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sidebar from "../layout/sidebar/Sidebar";
import Header from "../layout/header/Header";
import { ref } from "vue";

export default {
  components: {
    Header,
    Sidebar,
  },

  setup() {
    return {
      size: ref("large"),
    };
  },
};
</script>
<style lang="scss">
</style>
<template>
  <div>
    <a-layout>

      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>

      <a-layout>
        <a-layout-sider
          :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
          ><Sidebar
        /></a-layout-sider>

        <a-layout-content>
          <a-row>
            <a-col :span="24">
              <h2 class="pageTittle">
                {{ $t('communications.communications') }}
                <div class="addtaskButton">
                  <StartCall></StartCall>
                  <SendMessage></SendMessage>
                  <!-- <ToolTip :boxTitle="$t('communications.email')" boxName="email"></ToolTip> -->
                  <EmailButton></EmailButton>
                  <SMSButton></SMSButton>
                  <ReminderButton></ReminderButton>
                  <CallButton></CallButton>
                </div>
                
                <div class="filter">
                  <button class="btn" :class="toggle ? 'active' : ''" @click="toggle = !toggle">
                    <span class="btn-content">{{ $t('communications.dashboardView') }}</span>
                  </button>
                  <button
                    class="btn"
                    :class="toggle ? '' : 'active'"
                    @click="toggle = !toggle"
                  >
                    <span class="btn-content">{{ $t('global.listView') }}</span>
                  </button>
                </div>

              </h2>
            </a-col>
            
            <a-col :span="24">
              <!-- Dashboard View -->
              <div class="dashboard-view" v-show="toggle">
                <DashboardView/>
              </div>
              <!-- List View -->
              <div class="list-view" v-show="!toggle">
                <ListView/>
              </div>
            </a-col>

            <a-col :span="24"> </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>

    </a-layout>

  </div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { ref } from "vue";
import DashboardView from "@/components/communications/DashboardView";
import ListView from "@/components/communications/ListView";
import StartCall from "@/components/communications/top/StartCall";
import SendMessage from "@/components/communications/top/SendMessage";
import EmailButton from "@/components/communications/top/EmailButton";
import SMSButton from "@/components/communications/top/SMSButton";
import ReminderButton from "@/components/communications/top/ReminderButton";
import CallButton from "@/components/communications/top/CallButton";
const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

export default {
  components: {
    Header,
    Sidebar,
    DashboardView,
    ListView,
    StartCall,
    SendMessage,
    EmailButton,
    SMSButton,
    ReminderButton,
    CallButton,
  },
  
  setup() {
    const toggle = ref(true);
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    return {
      toggle,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
      handleChange,
      size: ref([]),
    };
  },
};
</script>


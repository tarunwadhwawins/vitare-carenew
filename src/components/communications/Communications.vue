<template>
<div>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <Header />
        </a-layout-header>
        <a-layout>
            <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
                <Sidebar />
            </a-layout-sider>
            <a-layout-content>
                <a-row>
                    <a-col :span="24">
                        <h2 class="pageTittle">
                            {{ $t('communications.communications') }}
                            <div class="addtaskButton">
                                <StartCall @click="showStartCallModal" v-if="arrayToObjact(communicationPermissions,107)"></StartCall>
                                <SendMessage v-if="arrayToObjact(communicationPermissions,109)"></SendMessage>
                                <ToolTip :boxTitle="$t('communications.communicationsModal.email')" boxName="email" @open="openNotification($event)"></ToolTip>
                                <ToolTip :boxTitle="$t('communications.communicationsModal.sms')" boxName="sms" @open="openNotification($event)"></ToolTip>
                                <ToolTip :boxTitle="$t('communications.communicationsModal.reminder')" boxName="reminder" @open="openNotification($event)"></ToolTip>
                                <ToolTip :boxTitle="$t('communications.communicationsModal.call')" boxName="call" @open="openNotification($event)"></ToolTip>
                            </div>
                            <div class="filter">
                                <button class="btn" :class="toggle ? 'active' : ''" @click="toggle = !toggle">
                                    <span class="btn-content">{{ $t('communications.dashboardView') }}</span>
                                </button>
                                <button class="btn" :class="toggle ? '' : 'active'" @click="toggle = !toggle">
                                    <span class="btn-content">{{ $t('global.listView') }}</span>
                                </button>
                            </div>
                        </h2>
                    </a-col>
                    <a-col :span="24">
                        <!-- Dashboard View -->
                        <div class="dashboard-view" v-show="toggle">
                            <DashboardView />
                        </div>
                        <!-- List View -->
                        <div class="list-view" v-show="!toggle">
                            <ListView />
                        </div>
                    </a-col>
                    <a-col :span="24"> </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>

    </a-layout>
    <AddStartCall v-model:visible="AddStartCall" @ok="startOk" />
</div>
</template>
<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { ref, h,computed, defineComponent,defineAsyncComponent} from "vue";
import DashboardView from "@/components/communications/DashboardView";
import ListView from "@/components/communications/ListView";
import StartCall from "@/components/communications/top/StartCall";
import SendMessage from "@/components/communications/top/SendMessage";
import ToolTip from "@/components/communications/toolTip/ToolTip";
import { notification, Button } from "ant-design-vue";
// import AddStartCall from "@/components/modals/AddStartCall";
import { useStore } from "vuex";
import {arrayToObjact} from "@/commonMethods/commonMethod"
const close = () => {
  // console.log(
  //   "Notification was closed. Either the close button was clicked or duration time elapsed."
  // );
};

export default defineComponent({
  components: {
    Header,
    Sidebar,
    DashboardView,
    ListView,
    StartCall,
    SendMessage,
    ToolTip,
    AddStartCall:defineAsyncComponent(() => import("@/components/modals/AddStartCall"))
  },
  
  setup() {
    const toggle = ref(true);
    const AddStartCall = ref(false)
    const handleChange = () => {
    };
    const store = useStore()
    const openNotification = (data) => {
      var key = `open${Date.now()}`;
      var message = "";
      var description = (
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
      );
      var button = "";
      
      const boxname = data.boxname;
      const placement = data.placement;
      if(boxname == 'email') {
        message = <h2>Email</h2>;
        button = h(
          Button,
          {
            type: "primary",
            onClick: () => notification.close(key),
          },
          "Reply"
        );
      }
      else if(boxname == 'sms') {
        // key = key;
        message = <h2>SMS</h2>;
        button = h(
          Button,
          {
            type: "primary",
            onClick: () => notification.close(key),
          },
          "Reply"
        );
      }
      else if(boxname == 'reminder') {
        // key = key;
        message = <h2>Reminder</h2>;
      }
      else if(boxname == 'call') {
        // key = key;
        message = <h2>Call</h2>;
        button = [
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
        ];
      }

      notification.open({
        message: message,
        description: description,
        btn: button,
        key: key,
        onClose: close,
        placement,
       // listLoad:store.getters.communicationRecord.communicationsList
      });
    };

    function showStartCallModal(){
      AddStartCall.value =true
    }
    function closeStartCallModal(){
      AddStartCall.value =false
    }

    const communicationPermissions = computed(()=>{
      return store.state.screenPermissions.communicationPermissions
    })

    return {
      communicationPermissions,
      arrayToObjact,
      closeStartCallModal,
      showStartCallModal,
      AddStartCall,
      toggle,
      openNotification,
      onChange: () => {
        // console.log("params", );
      },
      handleChange,

    };
  },
});
</script>

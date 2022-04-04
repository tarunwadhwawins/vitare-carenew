<template>
  <div class="notications">
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
                <h2 class="pageTittle">Notifications</h2>
              </a-col>
              <a-col :span="24">
                <ul>
                  <div v-for="(notification, index) in notifications" :key="index" style="margin: 0 0 15px;">
                  <li class="listing " :class="notf.Isread?'read':'unread'" v-for="(notf, index) in notification.value" :key="index">
                      <router-link  class="d-flex align-items-center" :to="notf.type == 'Appointment' ? 'appointment-calendar': '/communications' " @click=" isReadNotification(notification.id, notification.type)">
                      <div class="flex-grow-1 ms-3 summary">
                            <h3>{{ notf.title }}</h3>
                            <p>{{ notf.body }}</p>
                            <br />
                            <strong class="" v-if="notf.time">{{
                              dateOnlyFormat(date) === dateOnlyFormat(notf.time)
                                ? ""
                                : dateOnlyFormat(notf.time)
                            }}</strong
                            >&nbsp;
                            <strong class="" v-if="notf.time">{{
                              meridiemFormatFromTimestamp(notf.time)
                            }} </strong>
                          </div>
                    </router-link>
                  </li>
                  </div>
                  <!-- <li class="listing unread">
                    <a class="d-flex align-items-center" href="#">
                      <div class="flex-grow-1 ms-3 summary">
                        <p>Just a reminder that you have appoinment</p>
                        <span class="date">20 minutes ago</span>
                      </div>
                    </a>
                  </li>
                  <li class="listing read">
                    <a class="d-flex align-items-center" href="#">
                      <div class="flex-grow-1 ms-3 summary">
                        <p>Just a reminder that you have appoinment</p>
                        <span class="date">20 minutes ago</span>
                      </div>
                    </a>
                  </li> -->
                </ul>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { onMounted,computed } from 'vue';
import { useStore } from "vuex";
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import {
  meridiemFormatFromTimestamp,
  dateOnlyFormat,
} from "@/commonMethods/commonMethod";
export default {
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const store = useStore()
    const date = Math.round(+new Date() / 1000);
    onMounted(()=>{
      store.dispatch("getNotifications")
    })
     const notifications = computed(() => {
      return store.state.common.getNotifications;
    });
    return{
      notifications,
      meridiemFormatFromTimestamp,
      dateOnlyFormat,
      date
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

.notications {
  ul {
    list-style: none;
    padding: 0;
    max-height: calc(100vh - 185px);
    overflow: auto;
    .listing {
      background-color: $gray-color-100;
      border-radius: 8px;
      margin: 0 0 15px;
      &:last-child {
        margin: 0;
      }
      &.read {
        a {
          p {
            font-family: $font-family-semi-bold;
          }
        }
      }
      &.unread {
        background-color: $secondary-color;
      }
      a {
        text-decoration: none;
        padding: 10px 15px;
        color: #444;
        .summary {
          p {
            font-size: 14px;
            line-height: 18px;
          }
          .date {
            font-size: 12px;
            color: #aaa;
          }
        }
      }
    }
  }
}
</style>

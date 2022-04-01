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
                  <li class="listing read">
                    <a class="d-flex align-items-center" href="#">
                      <div class="flex-grow-1 ms-3 summary">
                        <p>Just a reminder that you have appoinment</p>
                        <span class="date">20 minutes ago</span>
                      </div>
                    </a>
                  </li>
                  <li class="listing unread">
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
                  </li>
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
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";

export default {
  components: {
    Header,
    Sidebar,
  },
  setup() {},
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

<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <PatientInfo/>
      </a-col>
      <a-col :sm="24" :xs="24">
        <div class="thumbDesc patientTimeline mt-28">
          <a-checkbox-group v-model:value="value10">
            <a-checkbox value="Notifications">Notifications</a-checkbox>
            <a-checkbox value="Visits">Visits</a-checkbox>
            <a-checkbox value="Notes">Notes</a-checkbox>
            <a-checkbox value="Appointments">Appointments</a-checkbox>
            <a-checkbox value="Documents">Documents</a-checkbox>
            <a-checkbox value="Additional1">Additional 1</a-checkbox>
            <a-checkbox value="Additional2">Additional 2</a-checkbox>
          </a-checkbox-group>

          <a-timeline class="fullTimeline">
            <a-timeline-item color="blue">
              <template #dot><FolderOpenOutlined class="yellowIcon"/></template>
              <div class="timelineInner">
                <div class="timelineHeader">
                  <div class="title">
                    <h4>Lorem Ipsum</h4>
                    <a-typography-text mark>Read</a-typography-text>
                    <span class="time">12:00 PM</span>
                  </div>
                  <div class="userImg">
                    <img src="@/assets//images/profile-4.jpg" alt="image" />
                  </div>
                </div>
                <div class="timelineBody">
                  <div class="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit....
                    <a href="#">more</a>
                  </div>
                  <MailOutlined />
                </div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot><HeatMapOutlined class="redIcon"/></template>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit culpa assumenda quidem magnam
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot><ClockCircleOutlined class="orangeIcon"/></template>
              <div class="timelineInner">
                <div class="timelineHeader">
                  <div class="title">
                    <h4>Lorem Ipsum</h4>
                    <a-typography-text mark>Read</a-typography-text>
                    <span class="time">12:00 PM</span>
                  </div>
                  <div class="userImg">
                    <img src="@/assets//images/profile-4.jpg" alt="image"/>
                  </div>
                </div>
                <div class="timelineBody">
                  <div class="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit....
                    <a href="#">more</a>
                  </div>
                  <MailOutlined />
                </div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot><BellOutlined class="yellowIcon"/></template>
              <div class="timelineInner">
                <div class="timelineHeader">
                  <div class="title">
                    <h4>Lorem Ipsum</h4>
                    <a-typography-text mark>Read</a-typography-text>
                    <span class="time">12:00 PM</span>
                  </div>
                  <div class="userImg">
                    <img src="@/assets//images/profile-4.jpg" alt="image"/>
                  </div>
                </div>
                <div class="timelineBody">
                  <div class="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit....
                    <a href="#">more</a>
                  </div>
                  <MailOutlined />
                </div>
              </div>
            </a-timeline-item>
            <a-timeline-item class="dateOuter">
              <template #dot>
                <ClockCircleOutlined class="orangeIcon"/>
              </template>
              <div class="date">
                <span>Dec 12, 2021</span>
              </div>
            </a-timeline-item>
            <a-timeline-item color="blue">
              <template #dot><FilePdfOutlined class="yellowIcon" /></template>Lorem ipsum
              <div class="timelineInner">
                <div class="timelineHeader">
                  <div class="title">
                    <h4>Lorem Ipsum</h4>
                    <a-typography-text mark>Read</a-typography-text>
                    <span class="time">12:00 PM</span>
                  </div>
                  <div class="userImg">
                    <img src="@/assets//images/profile-4.jpg" alt="image"/>
                  </div>
                </div>
                <div class="timelineBody">
                  <div class="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit....
                    <a href="#">more</a>
                  </div>
                  <MailOutlined />
                </div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot><HeatMapOutlined class="redIcon"/></template>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit culpa assumenda quidem magnam fuga quaerat pariatur labore exercitationem voluptate iusto, repellat debitis quis itaque nulla numquam, fugiat quas ullam. Minus.
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot><ClockCircleOutlined class="orangeIcon"/></template>
              <div class="timelineInner">
                <div class="timelineHeader">
                  <div class="title">
                    <h4>Lorem Ipsum</h4>
                    <a-typography-text mark>Read</a-typography-text>
                    <span class="time">12:00 PM</span>
                  </div>
                  <div class="userImg">
                    <img src="@/assets//images/profile-4.jpg" alt="image"/>
                  </div>
                </div>
                <div class="timelineBody">
                  <div class="content">
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit....
                    <a href="#">more</a>
                  </div>
                  <MailOutlined />
                </div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot>
                <BellOutlined class="yellowIcon"/>
              </template>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit culpa assumenda quidem magnam fuga quaerat pariatur labore exercitationem voluptate iusto, repellat debitis quis itaque nulla numquam, fugiat quas ullam. Minus.
            </a-timeline-item>
          </a-timeline>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {
  ClockCircleOutlined,
  HeatMapOutlined,
  FolderOpenOutlined,
  FilePdfOutlined,
  BellOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { ref } from 'vue-demi';
import PatientInfo from "@/components/patients/patientSummary/PatientInfo";
export default {
  components: {
    ClockCircleOutlined,
    HeatMapOutlined,
    FolderOpenOutlined,
    FilePdfOutlined,
    BellOutlined,
    MailOutlined,
    PatientInfo,
  },
  setup() {
    return {
      value10: ref([]),
    }
  }
}
</script>

<style lang="scss">
.timer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 1199px) {
    margin: 0 0 20px;
  }
  h3 {
    margin: 0 10px 0 0;
  }
}
.dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
}
.ant-alert-error {
  background-color: #f8d7da;
  border-color: #f5c2c7;
  .ant-alert-message {
    color: #842029;
  }
}
.patientSummary img {
  height: 160px;
  width: 150px;
  -o-object-fit: cover;
  object-fit: cover;
}
</style>
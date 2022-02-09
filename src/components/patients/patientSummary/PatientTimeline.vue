<template>
  <div :class="className">
    <a-checkbox-group v-model:value="value10">
      <a-checkbox value="Notifications1">Notifications</a-checkbox>
      <a-checkbox value="Visits1">Visits</a-checkbox>
      <a-checkbox value="Notes1">Notes</a-checkbox>
      <a-checkbox value="Appointments1">Appointments</a-checkbox>
      <a-checkbox value="Documents1">Documents</a-checkbox>
      <a-checkbox value="Additional11">Additional 1</a-checkbox>
      <a-checkbox value="Additional21">Additional 2</a-checkbox>
    </a-checkbox-group>
    <a-timeline class="defaultTimeline">
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
        <template #dot ><BellOutlined class="yellowIcon" /></template>
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
      <a-timeline-item class="dateOuter">
        <template #dot>
          <ClockCircleOutlined class="orangeIcon"/>
        </template>
        <div class="date">
          <span>Dec 12, 2021</span>
        </div>
      </a-timeline-item>
      <a-timeline-item color="blue">
        <template #dot>
          <FilePdfOutlined class="yellowIcon" />
        </template>Lorem ipsum
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
        <template #dot>
          <HeatMapOutlined class="redIcon"/>
        </template>
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
        <template #dot><BellOutlined class="yellowIcon"/></template>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit culpa assumenda quidem magnam fuga quaerat pariatur labore exercitationem voluptate iusto, repellat debitis quis itaque nulla numquam, fugiat quas ullam. Minus.
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script>
import {
  FolderOpenOutlined,
  FilePdfOutlined,
  BellOutlined,
  HeatMapOutlined,
  ClockCircleOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { ref } from 'vue-demi';
export default {
  components: {
    FolderOpenOutlined,
    FilePdfOutlined,
    BellOutlined,
    HeatMapOutlined,
    ClockCircleOutlined,
    MailOutlined,
  },
  props: {
    className: {
      type: String
    }
  },
  setup() {
    const custom = ref(false);
    
    const showModalCustom = () => {
      custom.value = true;
    };

    return {
      showModalCustom,
      custom,
      value10: ref([]),
    }
  }
}
</script>
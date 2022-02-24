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
      <template v-for="timeline in patientTimeline" :key="timeline.id">
        <a-timeline-item color="blue" v-if="timeline.type==1">
          <template #dot>
            <BellOutlined class="yellowIcon"/>
          </template>
          <div class="timelineInner">
            <div class="timelineHeader">
              <div class="title">
                <h4>{{ timeline.heading }}</h4>
                <span class="time">{{ timeline.createdAt }}</span>
              </div>
              <div class="userImg">
                <img v-if="timeline.profileImage" :src="timeline.profileImage" alt="image"/>
                <img v-else src="@/assets/images/userAvatar.png" alt="image"/>
              </div>
            </div>
            <div class="timelineBody">
              <div class="content">
                <p class="timeline-float timeline-title">{{ timeline.title }}</p>
                <a class="timeline-float more-link" href="javascript:void(0)">more</a>
              </div>
              <MailOutlined />
            </div>
          </div>
        </a-timeline-item>
        <a-timeline-item color="red" v-if="timeline.type==2">
          <template #dot><HeatMapOutlined class="redIcon"/></template>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit culpa assumenda quidem magnam
        </a-timeline-item>
        <a-timeline-item color="red" v-if="timeline.type==3">
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
        <a-timeline-item color="blue" v-if="timeline.type==4">
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
        <a-timeline-item color="red" v-if="timeline.type==5">
          <template #dot>
            <FolderOpenOutlined class="yellowIcon"/>
          </template>
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
      </template>
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
import { computed, ref, watchEffect } from 'vue-demi';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
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
    const store = useStore();
    const route = useRoute();

    watchEffect(() => {
      if(route.name == 'PatientSummary') {
        store.dispatch('patientTimeline', route.params.udid);
      }
    })
    const patientTimeline = computed(() => {
      return store.state.patients.patientTimeline;
    })
    
    const showModalCustom = () => {
      custom.value = true;
    };

    return {
      showModalCustom,
      custom,
      value10: 'Notifications1',
      // value10: ref([]),
      patientTimeline,
    }
  }
}
</script>

<style scoped>
p.timeline-float {
  display: inline-block;
}
.timelineBody .content {
  width: 100%;
}
p.timeline-float.timeline-title {
  width: 90%;
}
</style>
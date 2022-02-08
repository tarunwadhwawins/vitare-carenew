<template>
<div v-if="count <=3">
  <a-dropdown :placement="topLeft" :trigger="['click']" overlayClassName="valueItem">
    <a class="ant-dropdown-link one" @click.prevent>
      <div class="dropdown">
        <p>
          <strong><span >{{cardRecords.appointmentType}}</span></strong>
          <span>{{cardRecords.patient}} </span>
         <!-- <span>{{ moment(dateFormat(cardRecords.date)).format('hh:mm A') +' '+ moment(dateFormat(cardRecords.date)).add(2,'hours').format('hh:mm A')}}</span>  -->
        
        </p>
        <img src="../../assets/images/profile-1.jpg" alt="image" />
      </div>
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">
          <div class="calendarDropdown">
            <div class="itemWrapper">
              <div class="leftWrapper">
                Appointment Type
              </div>
              <div class="rightWrapper">{{cardRecords.appointmentType}}</div>
            </div>
            <div class="itemWrapper">
              <div class="leftWrapper">Date Time</div>
              <div class="rightWrapper">
                {{ dateFormat(cardRecords.date)}}

              </div>
            </div>
            <div class="itemWrapper">
              <div class="leftWrapper">Coordinator</div>
              <div class="rightWrapper">
                <router-link :to="linkToCoordinator">
                  {{cardRecords.staff}}
                </router-link>
              </div>
            </div>
            <div class="itemWrapper">
              <div class="leftWrapper">Patient</div>
              <div class="rightWrapper">
                <router-link :to="linkTo">
                  {{cardRecords.patient}}
                </router-link>
              </div>
            </div>
            <div class="itemWrapper">
              <div class="leftWrapper">Start Time</div>
              <div class="rightWrapper">{{ moment(dateFormat(cardRecords.date)).format('hh:mm A') }}</div>
            </div>
            <div class="itemWrapper">
              <div class="leftWrapper">Duration</div>
              <div class="rightWrapper">{{ cardRecords.duration }}</div>
            </div>
            <div class="notesWrapper">
              <span>Notes</span>
              <p>
                {{cardRecords.notes}}
              </p>
            </div>
            <div class="createTask">
              <a-tooltip placement="left">
                <template #title>
                  <span>Add Task</span>
                </template>
                <router-link to="tasks">
                  <FileAddOutlined />
                </router-link>
              </a-tooltip>
            </div>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</div>
<div v-else-if="count==4">Load More</div>
<div v-else></div>
</template>
<script>
  import { reactive } from "vue"
  import { FileAddOutlined } from "@ant-design/icons-vue";
  import { timeStamp, dateFormat, timeStampToTime } from "../../commonMethods/commonMethod"
  import moment from "moment"
   export default {
    components: {
      FileAddOutlined
    },
    props: {
      cardData: {
        type: Object
      },
      count: {
        type: Number
      },
    },
    setup(props) {
      const linkTo = "patients-summary"
      const linkToCoordinator = "coordinator-summary"
      const cardRecords = reactive(props.cardData)
      return {
        linkTo,
        linkToCoordinator,
        cardRecords,
        timeStamp,
        dateFormat,
        timeStampToTime,
        moment
      
      }
    }
  }
</script>
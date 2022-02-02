<template>
   
        <a-dropdown
        :placement="topLeft"
        :trigger="['click']"
        overlayClassName="valueItem"
      >
        <a class="ant-dropdown-link one" @click.prevent>
          <div class="dropdown">
            <p>
              <span>{{cardRecords.staff}} </span>
              <span>10:00 AM - 11:00 AM</span>
            </p>
            <img
              src="../../assets/images/profile-1.jpg"
              alt="image"
            />
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
                  <div class="rightWrapper">Clinical</div>
                </div>
                <div class="itemWrapper">
                  <div class="leftWrapper">Date Time</div>
                  <div class="rightWrapper">
                    December 12, 2021 12:00 PM
                  </div>
                </div>
                <div class="itemWrapper">
                  <div class="leftWrapper">Coordinator</div>
                  <div class="rightWrapper">
                    <router-link :to="linkTo">
                      {{cardRecords.staff}}
                    </router-link>
                  </div>
                </div>
                <div class="itemWrapper">
                  <div class="leftWrapper">Program</div>
                  <div class="rightWrapper">Program 1</div>
                </div>
                <div class="notesWrapper">
                  <span>Notes</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit.
                  </p>
                </div>
                <div class="createTask">
                  <a-tooltip placement="left">
                    <template #title>
                      <span>Add Task</span>
                    </template>
                    <router-link to="tasks"
                      ><FileAddOutlined
                    /></router-link>
                  </a-tooltip>
                </div>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
  
</template>
<script>
    import {  reactive } from "vue"
    import { FileAddOutlined } from "@ant-design/icons-vue";
export default{
    components:{
        FileAddOutlined  
    },
    props:["cardData"],
    setup(props) {
        const linkTo = "patients-summary"
        const cardRecords = reactive(props.cardData)
        return{
            linkTo,
            cardRecords 
        }
    }
}
</script>
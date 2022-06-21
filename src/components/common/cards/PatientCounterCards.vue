<template>

  <Card v-for="item in totalPatients" :key="item.count" :count="item.total" :text='item.text' link="PatientsWithFilter" :xl="grid.xlGrid" :color="item.color" :sm="grid.smGrid" :textColor="item.textColor" :patientsFiltter="isPatient"></Card>
</template>

<script>
import { onMounted } from 'vue-demi'
import { useStore } from 'vuex'
import Card from "@/components/common/cards/Card"
// import {
//   startimeAdd,
//   endTimeAdd,
//   timeStamp,
// } from '@/commonMethods/commonMethod'
// import moment from "moment"
export default {
  props: {
    isPatient:Boolean
  },
  components: {
    Card,
  },
  setup(props) {
    const store = useStore()
    // let from = moment()
    // let to = moment()
    // let dateFormat = {
    //   fromDate: from ? timeStamp(startimeAdd(from)) : '',
    //   toDate: to ? timeStamp(endTimeAdd(to)) : ''
    // }
    onMounted(() => {
      // if(props.isPatient) {
      //   store.dispatch("patientFlags", dateFormat)
      //   store.commit("dateFilter", dateFormat)
      // }
      // else {
      //   console.log("check",dateFormat)
      //   store.dispatch("counterCard", dateFormat)
      // }
    })
    const totalPatients = props.isPatient && props.isPatient == true ? store.getters.patientFlags : store.getters.totalPatientcount
    const grid = props.isPatient && props.isPatient == true ? store.getters.grids : store.getters.grid
    
    return {
      totalPatients,
      grid,
    }
  }
}
</script>
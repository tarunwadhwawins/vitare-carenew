<template>
  <a-table  
    :rowKey="dataRecord.key"
    :columns="colomnsRecord"
    :data-source="dataRecord"
    :pagination="pagination">
    <template #patient="{record}">
      
      <router-link :to="{ name: 'PatientSummary', params: { udid: record.patientUdid } }">
        {{ record.patient }}
      </router-link>
    </template>
    <template #action="{record}">
      <!-- <router-link :to="{ name: 'videoCall', params: { id: enCodeString(record.conferenceId) } }" class="btn blueBtn">{{$t('communications.start')}}</router-link> -->
      <a-button @click="videoCall(record.conferenceId)" class="btn blueBtn">{{$t('communications.start')}}</a-button>
    </template>
  </a-table>
</template>

<script>
import {enCodeString} from "@/commonMethods/commonMethod";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
props:["colomnsRecord","dataRecord","linkTo","rowKey","pagination"],
  setup() {
    const store =useStore()
    const router = useRouter();
    function videoCall(conferenceId) {
      // console.log('object',enCodeString(startCall.conferenceId));
      store.commit("conferenceId", conferenceId);
      store.dispatch("getVideoDetails",conferenceId)
      if (conferenceId) {
        router.push({ name: 'videoCall', params: { id: enCodeString(conferenceId) } })
      }
    }
    return {
      videoCall,
     enCodeString
    }
  }
}
</script>
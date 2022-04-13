<template>
  <a-table  
    rowKey="id"
    :columns="colomnsRecord"
    :data-source="dataRecord"
    :pagination="pagination">
    <template #patient="{record}" v-if="arrayToObjact(screensPermissions,63)">
      <router-link :to="{ name: 'PatientSummary', params: { udid: record.patientUdid } }">
        {{ record.patient }}
      </router-link>
    </template>
    <template #patient="{record}" v-else>
      <span>
        {{ record.patient }}
      </span>
    </template>
    <template #action="{record}" v-if="arrayToObjact(screensPermissions,107)">
      <a-button @click="videoCall(record.conferenceId)" class="btn blueBtn">{{$t('communications.start')}}</a-button>
    </template>
  </a-table>
</template>

<script>
import {enCodeString,arrayToObjact} from "@/commonMethods/commonMethod";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
props:["colomnsRecord","dataRecord","pagination"],
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
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      videoCall,
     enCodeString
    }
  }
}
</script>
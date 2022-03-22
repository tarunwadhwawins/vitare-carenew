<template>
  <a-table  
    :rowKey="dataRecord.key"
    :columns="colomnsRecord"
    :data-source="dataRecord"
    :pagination="pagination">
    <template #patientName="text">
      <router-link :to="linkTo">
        {{ text.text }}
      </router-link>
    </template>
    <template #action="{record}">
      <router-link :to="{ name: 'videoCall', params: { id: enCodeString(record.conferenceId) } }" class="btn blueBtn">{{$t('communications.start')}}</router-link>
    </template>
  </a-table>
</template>

<script>
import {
  enCodeString
} from "@/commonMethods/commonMethod";
export default {

props:["colomnsRecord","dataRecord","linkTo","rowKey","pagination"],
  setup() {
    
  //     const column = reactive(props.dataRecord)
    return {
     // column,
     // data
     enCodeString
    }
  }
}
</script>
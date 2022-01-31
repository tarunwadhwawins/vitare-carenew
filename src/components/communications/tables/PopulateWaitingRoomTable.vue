<template>
  <a-table
  :key="1"
    :columns="colomnsRecord"
    :data-source="dataRecord"
    :pagination="false">
    <template #patientName="text">
      <router-link :to="linkTo">
        {{ text.text }}
      </router-link>
    </template>
    <template #action>
      <a-button class="btn blueBtn">{{$t('communications.start')}}</a-button>
    </template>
  </a-table>
</template>

<script>
export default {
props:["colomnsRecord","dataRecord","linkTo"],
  setup() {
    
  //     const column = reactive(props.dataRecord)
    return {
     // column,
     // data
    }
  }
}
</script>
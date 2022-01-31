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
    <template #action>
      <a-button class="btn blueBtn">{{$t('communications.start')}}</a-button>
    </template>
  </a-table>
</template>

<script>
export default {
props:["colomnsRecord","dataRecord","linkTo","rowKey","pagination"],
  setup() {
    
  //     const column = reactive(props.dataRecord)
    return {
     // column,
     // data
    }
  }
}
</script>
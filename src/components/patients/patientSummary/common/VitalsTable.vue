<template>
  <a-table rowKey="id" :columns="columns" :data-source="data" :pagination="false" >
    <template #blood_pressure_systolic="{record}">
      <span v-if="record.blood_pressure_systolic" :class="className">{{ record.blood_pressure_systolic }}</span>
    </template>
    <template #blood_pressure_diastolic="{record}">
      <span v-if="record.blood_pressure_diastolic" :class="className">{{ record.blood_pressure_diastolic }}</span>
    </template>
    <template #blood_pressure_bpm="{record}">
      <span v-if="record.blood_pressure_bpm" :class="className">{{ record.blood_pressure_bpm }}</span>
    </template>
    
    <template #glucose_random_blood_sugar="{record}">
      <span v-if="record.glucose_random_blood_sugar" :class="className">{{ record.glucose_random_blood_sugar }}</span>
    </template>
    <template #glucose_fasting_blood_sugar="{record}">
      <span v-if="record.glucose_fasting_blood_sugar" :class="className">{{ record.glucose_fasting_blood_sugar }}</span>
    </template>
    
    <template #oximeter_spo2="{record}">
      <span v-if="record.oximeter_spo2" :class="className">{{ record.oximeter_spo2 }}</span>
    </template>
    <template #oximeter_bpm="{record}">
      <span v-if="record.oximeter_bpm" :class="className">{{ record.oximeter_bpm }}</span>
    </template>

  </a-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array
    },
    data: {
      type: Array
    },
    className: {
      type: String
    },
  }
}
</script>

<style scoped>
  .dangerValue { margin: 0px 3px; }
  th, td { text-align: center; }
</style>
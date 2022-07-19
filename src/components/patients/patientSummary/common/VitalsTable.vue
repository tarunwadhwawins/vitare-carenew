<template>

  <a-table rowKey="id" :columns="columns" :data-source="data" :pagination="false" class="vitalTable">
    <template #takeTime="{record}">
      {{ record.takeTime }}<span v-if="record.addType == 'Manual'" class="brightRedColor" style="font-size: 16px;"> *</span>
      </template>
    <template #blood_pressure_systolic="{record}">
      <span v-if="record.blood_pressure_systolic" class="vitalValue" :style="{ 'border-color': record.blood_pressure_systolic_color }">{{ record.blood_pressure_systolic }}</span>
    </template>
    <template #blood_pressure_diastolic="{record}">
      <span v-if="record.blood_pressure_diastolic" class="vitalValue" :style="{ 'border-color': record.blood_pressure_diastolic_color }">{{ record.blood_pressure_diastolic }}</span>
    </template>
    <template #blood_pressure_bpm="{record}">
      <span v-if="record.blood_pressure_bpm" class="vitalValue" :style="{ 'border-color': record.blood_pressure_bpm_color }">{{ record.blood_pressure_bpm }}</span>
    </template>
    
    <template #glucose_random_blood_sugar="{record}">
      <span v-if="record.glucose_random_blood_sugar" class="vitalValue" :style="{ 'border-color': record.glucose_random_blood_sugar_color }">{{ record.glucose_random_blood_sugar }}</span>
    </template>
    <template #glucose_fasting_blood_sugar="{record}">
      <span v-if="record.glucose_fasting_blood_sugar" class="vitalValue" :style="{ 'border-color': record.glucose_fasting_blood_sugar_color }">{{ record.glucose_fasting_blood_sugar }}</span>
    </template>
    <template #glucose_fasting="{record}">
      <span v-if="record.glucose_fasting" class="vitalValue" :style="{ 'border-color': record.glucose_fasting_color }">{{ record.glucose_fasting }}</span>
    </template>
    <template #glucose_pre_meal="{record}">
      <span v-if="record.glucose_pre_meal" class="vitalValue" :style="{ 'border-color': record.glucose_pre_meal_color }">{{ record.glucose_pre_meal }}</span>
    </template>
    <template #glucose_post_meal="{record}">
      <span v-if="record.glucose_post_meal" class="vitalValue" :style="{ 'border-color': record.glucose_post_meal_color }">{{ record.glucose_post_meal }}</span>
    </template>
    <template #glucose_before_sleep="{record}">
      <span v-if="record.glucose_before_sleep" class="vitalValue" :style="{ 'border-color': record.glucose_before_sleep_color }">{{ record.glucose_before_sleep }}</span>
    </template>
    <template #glucose_general="{record}">
      <span v-if="record.glucose_general" class="vitalValue" :style="{ 'border-color': record.glucose_general_color }">{{ record.glucose_general }}</span>
    </template>
    
    <template #oximeter_spo2="{record}">
      <span v-if="record.oximeter_spo2" class="vitalValue" :style="{ 'border-color': record.oximeter_spo2_color }">{{ record.oximeter_spo2 }}</span>
    </template>
    <template #oximeter_bpm="{record}">
      <span v-if="record.oximeter_bpm" class="vitalValue" :style="{ 'border-color': record.oximeter_bpm_color }">{{ record.oximeter_bpm }}</span>
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
  }
}
</script>


<style lang="scss" scoped>
  /* .dangerValue { margin: 0px 3px; } */
  th, td { text-align: center; }
  .chatBoxRight .ant-table-fixed {
    width: 800px !important
  }
  .ant-table-fixed {
    width: 1350px !important
  }
  
</style>
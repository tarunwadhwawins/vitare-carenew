<template>
  <a-col :span="8" :class="isBold == true ? 'bold' : ''">
    <div class="moreAction" @click="showData">
      <div class="moreActionImg redBgColor">
        <img src="@/assets/images/wave.svg" />
      </div>
      <p>Vitals</p>
    </div>
  </a-col>
</template>

<script>
import { reactive } from 'vue-demi';
import { useStore } from 'vuex';
export default {
  props: {
    isBold: {
      type: Boolean
    },
    patientId: {
      type: Number
    },
  },
  setup(props, { emit }) {
    const store = useStore()
    var patientUdid = reactive(props.patientId)
    const showData = () => {
      store.dispatch("patientVitals", {
        patientId: patientUdid,
        deviceType: 99,
      });
      store.dispatch("patientVitals", {
        patientId: patientUdid,
        deviceType: 100,
      });
      store.dispatch("patientVitals", {
        patientId: patientUdid,
        deviceType: 101,
      });
      emit('onClick')
    };

    return {
      showData,
    }
  }
}
</script>

<style scoped>
.anticon-calendar, .anticon-pushpin, .anticon-phone {
  color: #ffffff;
  font-size: 16px !important;
  position: relative !important;
  top: -2px !important;
}
</style>
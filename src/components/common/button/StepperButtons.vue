<template>
  <div class="steps-action">
    <a-button v-if="currentStep > 0" style="margin-right: 8px" @click="prev">Previous</a-button>
    <a-button v-if="currentStep < steps.length - 1" type="primary" html-type="submit">Next</a-button>
    <a-button v-if="currentStep == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
      Done
    </a-button>
  </div>
</template>

<script>
import { ref } from 'vue-demi';
export default {
  props: {
    steps: {
      type: Number
    },
    current: {
      type: Number
    }
  },
  setup(props) {
    const currentStep = ref(props.current ? props.current : 0)
    const prev = () => {
      currentStep.value--;
    };
    const next = () => {
      currentStep.value++;
    };
    return {
      next,
      prev,
      currentStep,
    }
  }
}
</script>
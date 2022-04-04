<template>
  <div>
    <vue-tel-input
      v-model="phone"
      @input="onInput"
      @validate="onValid"
      v-bind="bindProps"
      :disabled="false"
    />
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { VueTelInput } from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";
import { useStore } from "vuex";
export default {
  components: {
    VueTelInput,
  },

  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      phone: null,
    });

    const onInput = (number, phoneObject) => {
      if (phoneObject?.formatted) {
        emit("setPhoneNumber", phoneObject.nationalNumber);
      }
    };

    const onValid = () => {
      // console.log("number", number);
    };
    return {
      onValid,
      onInput,
      ...toRefs(state),
      bindProps: store.state.common.bindProps,
    };
  },
};
</script>

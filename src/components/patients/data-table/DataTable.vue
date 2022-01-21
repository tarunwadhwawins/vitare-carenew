<template>
    <a-table >
    <template #firstName="text">
        <router-link to="patients-summary">{{ text.text }}</router-link>
    </template>
    <template #flags="text">
        <span class="box" :style="{'background-color':text.text}" ></span>
        <!-- <span class="box" :class="(text = text.match(/yellowBgColor/g))" v-if="text.match(/yellowBgColor/g)"></span> -->
    </template>
    <!-- <template #compliance>
        <a class="icons">
            <WarningOutlined /></a>
    </template> -->

    <template #lastReadingDate>
        <WarningOutlined /> 
    </template>
</a-table>
</template>

<script>
import { WarningOutlined } from "@ant-design/icons-vue";
import {useStore} from "vuex"
import { computed } from "vue"
export default {
  name: "DataTable",
  components: {
    WarningOutlined,
  },
//   props: {
//     headingText: {
//       type: String,
//       required: true,
//     },
//     buttonText: {
//       type: String,
//       required: true,
//     },
//     span: {
//       type: Number,
//       required: true,
//     },
//   },
  setup() {
      const store = useStore();
    //   const columns  = computed(()=>{
    //       return store.state.patients.column
    //   })
     
    // const patients = computed(()=>{
    //         return store.state.patients.patientList
    //     }) 
    return {
    //   columns,
    //   patients
    };
  },
};
</script>

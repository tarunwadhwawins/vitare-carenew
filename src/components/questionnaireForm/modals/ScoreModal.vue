<template>
  <a-modal width="80%" :title="title" centered :footer="false">
     <a-table v-if="scoreData" rowKey="id" :columns="column" :data-source="scoreData" :scroll="{ x: 900 }" @change="handleTableChange"  :pagination=false>
   </a-table>
    <CommonLoader v-else/>
  </a-modal>
</template>
<script>
import { defineComponent } from "vue";
import CommonLoader from "@/components/loader/CommonLoader";
import { useStore } from "vuex";
 const column = [{
        title: "Programs",
        dataIndex: "program",

    },
    {
        title: "Score",
        dataIndex: "score",
    },
    
];
export default defineComponent({
  components: {
    CommonLoader
   
  },
  props:{
    data:Array
  },
 
  setup() {
   
 const store = useStore()
   

    

    
 

    return {
      scoreData: store.getters.scoreCount,
     column,
    };
  },
});
</script>
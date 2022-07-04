<template>

                <a-collapse v-model:activeKey="activeKey" expand-icon-position="left">
                    <a-collapse v-model:activeKey="activeKey" expand-icon-position="right" v-if="question">

                        <a-collapse-panel v-for="questionList in question" :key="questionList.questionId" :header="questionList.question">
                            <Option :optionList="questionList" />
                            <template #extra>
                                 <EditOutlined @click="showModal1" v-if="edit"/> 
                                <DeleteOutlined /></template>
                        </a-collapse-panel>

                    </a-collapse>

                </a-collapse>
         <EditQuestionnaire v-model:visible="visible3" />  
</template>

<script>
  import { defineComponent, ref,onMounted,onUnmounted } from "vue"
  import { DeleteOutlined,EditOutlined } from "@ant-design/icons-vue"
  import { useStore } from "vuex"
  import EditQuestionnaire from "@/components/modals/EditQuestionnaire"
  import Option from "@/components/administration/questionnaire-bank/common/Options"
export default defineComponent({
    name: "Question Template Details",
    components: {
EditQuestionnaire,
        DeleteOutlined,
        EditOutlined,
        Option,
        
    },
    props:{
        question:Array,
        edit:Boolean,
    },
    setup() {
        const store = useStore()
        const visible3 = ref(false)
         const activeKey = ref(["1"])
        const showModal1 = () => {
            visible3.value = true
        }
       

        onMounted(() => {
        
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })

        onUnmounted(() => {
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })
        return {
            activeKey,
            visible3,
            showModal1,
            value: ref(1),
            value2: ref(1)
        };
    },
});
</script>

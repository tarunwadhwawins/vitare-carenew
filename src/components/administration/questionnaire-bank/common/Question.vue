<template>
    
<draggable v-model="item" @clone="change($event)" v-if="type!='single'">
    
    <template v-slot:item="{item}" >
        
                <a-collapse v-model:activeKey="item.questionId" expand-icon-position="left" >
                    <a-collapse v-model:activeKey="item.questionId" expand-icon-position="right" >

                        <a-collapse-panel  :header="temOrSection=='section' ? item.question.question:item.question" >
                           
                            <Option :optionList="item.question" v-if="temOrSection=='section'"/>
                            <Option :optionList="item" v-else/>
                            <template #extra>
                                 <EditOutlined @click="showModal1" v-if="edit"/> 
                                <DeleteOutlined /></template>
                        </a-collapse-panel>

                    </a-collapse>

                </a-collapse>
    </template>
</draggable>
<a-collapse v-model:activeKey="activeKey" expand-icon-position="left" v-else-if="type=='single'">

                    <a-collapse v-model:activeKey="activeKey" expand-icon-position="right" >

                        <a-collapse-panel  :header="temOrSection=='section' ? question.question.question:question.question" >
                           
                            <Option :optionList="question.question" v-if="temOrSection=='section'"/>
                            <Option :optionList="question" v-else/>
                            <template #extra>
                                 <EditOutlined @click="showModal1" v-if="edit"/> 
                                <DeleteOutlined /></template>
                        </a-collapse-panel>

                    </a-collapse>

                </a-collapse>
         <EditQuestionnaire v-model:visible="visible3" />  
</template>

<script>
  import { defineComponent, ref,onMounted,onUnmounted,reactive } from "vue"
  import { DeleteOutlined,EditOutlined } from "@ant-design/icons-vue"
  import { useStore } from "vuex"
  import EditQuestionnaire from "@/components/modals/EditQuestionnaire"
  import Option from "@/components/administration/questionnaire-bank/common/Options"
  import Draggable from "vue3-draggable";
export default defineComponent({
    name: "Question Template Details",
    components: {
EditQuestionnaire,
        DeleteOutlined,
        EditOutlined,
        Option,
        Draggable
        
    },
    props:
        ['question','type','edit','temOrSection'],
    setup(props) {
        const store = useStore()
        const visible3 = ref(false)
         const activeKey = ref(["1"])
        const showModal1 = () => {
            visible3.value = true
        }
       
const item = props.question ? reactive(props.question) : ''

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
        const change = (val) =>{
            console.log("test",val)
            console.log("check",item)
        }
        return {
            activeKey,
            visible3,
            showModal1,
            value: ref(1),
            value2: ref(1),
            item,
            change
        };
    },
});
</script>

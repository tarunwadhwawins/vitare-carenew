<template>
<div>
    <div class="common-bg">
        <div class="questionnaireMain">
            <a-row :gutter="20">
                <a-col :span="24">
                    <h2 class="pageTittle">
                        Questionnaire Bank
                        <div class="commonBtn">

                            <a-button class="btn primaryBtn" @click="showModal({show:true,id:''})">Add New Question</a-button>

                        </div>
                    </h2>
                </a-col>
                <a-col :sm="18" :xs="24">
                    <SearchField endPoint="question" />
                </a-col>

                <a-col :span="24">

                    <a-collapse v-model:activeKey="activeKey" expand-icon-position="left">
                        <a-collapse-panel v-for="questionList in questionnaireList" :key="questionList.questionId" :header="questionList.question">
                            <div v-if="questionList.dataTypeId==244 || questionList.dataTypeId==243">
                                <a-col :span="24" v-for="(options,index) in questionList.options" :key="index">
                                    <div class="questionOutput">
                                        <a-checkbox v-model:checked="options.defaultOption" disabled>
                                            Default
                                        </a-checkbox>
                                        <a-checkbox v-model:checked="options.correct" disabled>
                                            Correct
                                        </a-checkbox>
                                        <div class="ml-10 ">
                                            <p>{{ options.option }}</p>
                                            <p v-if="options.score">Score - {{options.score}}</p>
                                            <div v-if="options.program.length>0">
                                                <a-tag v-for="(program,i) in options.program" :key="i">{{program.program}} - {{program.score? program.score : 0}}</a-tag>
                                            </div>
                                        </div>

                                    </div>
                                </a-col>
                            </div>
                            <a-col :span="24" v-else>
                                <div class="questionOutput">

                                    <p>Score : {{questionList.score?questionList.score : 0}}</p>

                                </div>
                            </a-col>

                            <template #extra>
                                <EditOutlined @click="showModal2" />
                                <DeleteOutlined />
                            </template>
                        </a-collapse-panel>

                    </a-collapse>
                </a-col>
            </a-row>
        </div>
    </div>
    <Loader />
</div>
<AddQuestionnaire v-model:visible="visible" @is-visible="showModal($event)" />
<EditQuestionnaire v-model:visible="visible2" />
</template>

<script>
import { ref, defineAsyncComponent, onMounted,onUnmounted } from "vue"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue"
import { useStore } from "vuex"
import Loader from "@/components/loader/Loader"
import SearchField from "@/components/common/input/SearchField"
export default {
  components: {
    EditOutlined,
    DeleteOutlined,
    AddQuestionnaire: defineAsyncComponent(() =>import("@/components/administration/questionnaire-bank/modals/AddQuestionnaire")),
    EditQuestionnaire: defineAsyncComponent(() =>import("@/components/modals/EditQuestionnaire")),
    Loader,
    SearchField
  },
setup() {
    const activeKey = ref(["2"])
    const visible = ref(false)
    const store = useStore()
    const id = ref("");
    const showModal = (e) => {
        visible.value = e.show;
        id.value = e.id;
    }
    const visible2 = ref(false);
    const showModal2 = () => {
        visible2.value = true;
    };
    onMounted(() => {
        store.dispatch("questionnaireList")
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
        showModal,
        visible,
        activeKey,
        id,
        questionnaireList: store.getters.questionnaireList,
        visible2,
        showModal2
    };
},
};
</script>

<template>
<div>
    <div class="common-bg">
        <div class="questionnaireMain">
            <a-row :gutter="20">
                <a-col :span="24">
                    <h2 class="pageTittle">
                        {{$t('questionnaire.questionnaireBank')}}
                        <div class="commonBtn">

                            <a-button class="btn primaryBtn" @click="showModal({show:true,id:''})">Add New Question</a-button>

                        </div>
                    </h2>
                </a-col>
                <a-col :sm="18" :xs="24" class="mb-24">
                    <SearchField endPoint="question" />
                </a-col>

                <a-col :span="24">

                    <Question :question="questionnaireList" v-if="questionnaireList.length>0" :edit="true" />
                </a-col>
            </a-row>
        </div>
    </div>
    <Loader />
</div>
<AddQuestionnaire v-model:visible="visible" @is-visible="showModal($event)" v-if="visible" />
<EditQuestionnaire v-model:visible="visible2" />
</template>

<script>
import { ref, defineAsyncComponent, onMounted,onUnmounted } from "vue"
import { useStore } from "vuex"
import Loader from "@/components/loader/Loader"
import SearchField from "@/components/common/input/SearchField"
import Question from "@/components/administration/questionnaire-bank/common/Question"
export default {
    components: {
        AddQuestionnaire: defineAsyncComponent(() => import("@/components/administration/questionnaire-bank/modals/AddQuestionnaire")),
        EditQuestionnaire: defineAsyncComponent(() => import("@/components/modals/EditQuestionnaire")),
        Loader,
        SearchField,
        Question,
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

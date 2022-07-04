<template>
<div>
    <div class="common-bg">
        <a-row>
            <a-col :span="24">
                <h2 class="pageTittle">
                    Questionnaire Template
                    <div class="commonBtn">
                        <a-button class="btn primaryBtn" @click="showModal({show:true,id:''})">Create New Template</a-button>
                    </div>
                </h2>
            </a-col>
            <a-col :span="12">
                <SearchField endPoint="questionnaire" class="mb-24" />
            </a-col>
            <a-col :span="24">
                <QuestionnaireTemplateTable @edit="showModal($event)" />

            </a-col>
        </a-row>
    </div>
</div>
<!--modals-->
<CreateTemplate v-model:visible="visible2" :update="update" @is-visible="showModal($event)" />
<!---->
</template>
<script>
import CreateTemplate from "@/components/administration/questionnaire-template/modals/CreateTemplate";
import QuestionnaireTemplateTable from "@/components/administration/questionnaire-template/QuestionnaireTemplateTable";
import { ref, onUnmounted, onMounted } from "vue";
import { useStore } from "vuex";
import SearchField from "@/components/common/input/SearchField";
export default {
  components: {
    CreateTemplate,
    QuestionnaireTemplateTable,
    SearchField,
  },
  setup() {
    const store = useStore();
    const checked = ref([false]);
    const visible2 = ref(false);
    const update = ref('');
    const showModal = (e) => {
      update.value = e.id;
      visible2.value = e.show;
    };
    const templatEdit = (e) => {
      update.value = e.id;
      visible2.value = e.show;
    };

    const handleChange2 = (value) => {
      console.log(`selected ${value}`);
    };
    onMounted(() => {
      store.dispatch("searchTable", "&search=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
      store.dispatch("questionnaireTemplateList");
    });

    onUnmounted(() => {
      store.dispatch("searchTable", "&search=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
      store.state.patients.errorMsg = "";
      store.state.common.successMsg = "";
    });

    return {
      checked,
      visible2,
      showModal,
      templatEdit,
      handleChange2,
      update,
    };
  },
};
</script>



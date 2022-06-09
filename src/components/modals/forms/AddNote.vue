<template>
<a-form layout="vertical" ref="formRef" autocomplete="off" :model="addNoteForm" @finish="submitForm">
    <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('notes.date')" name="date" :rules="[
                  {
                    required: true,
                    message: $t('notes.date') + ' ' + $t('global.validation'),
                  },
                ]">
                    <a-date-picker @change="changedValue" v-model:value="addNoteForm.date" :size="size" style="width: 100%" :format="globalDateFormat" disabled />
                </a-form-item>
            </div>
        </a-col>

        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('notes.category')" name="category" :rules="[
                  {
                    required: true,
                    message:
                      $t('notes.category') + ' ' + $t('global.validation'),
                  },
                ]">
                    <GlobalCodeDropDown @change="changedValue" v-model:value="addNoteForm.category" :globalCode="noteCategories" />
                </a-form-item>
            </div>
        </a-col>

        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('notes.type')" name="type" :rules="[
                  {
                    required: true,
                    message: $t('notes.type') + ' ' + $t('global.validation'),
                  },
                ]">
                    <GlobalCodeDropDown @change="changedValue" v-model:value="addNoteForm.type" :globalCode="noteTypes" />
                </a-form-item>
            </div>
        </a-col>

        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('common.flag')" name="flag" :rules="[
                  {
                    required: true,
                    message: $t('common.flag') + ' ' + $t('global.validation'),
                  },
                ]">
                    <GlobalCodeDropDown v-model:value="addNoteForm.flag" :globalCode="flagsList" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.flag ? errorMsg.flag[0] : ''" />
                </a-form-item>
            </div>
        </a-col>

        <a-col :sm="24" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('notes.note')" name="note" :rules="[
                  {
                    required: true,
                    message: $t('notes.note') + ' ' + $t('global.validation'),
                  },
                ]">
                <a-textarea v-model:value="addNoteForm.note" @change="changedValue" size="large" allow-clear />
                    <!-- <a-input @change="changedValue" v-model:value="addNoteForm.note" size="large" /> -->
                </a-form-item>
            </div>
        </a-col>

        <a-col :sm="24" :span="24">
            <ModalButtons @is_click="handleClear" />
        </a-col>
    </a-row>
</a-form>
</template>

<script>
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import ModalButtons from "@/components/common/button/ModalButtons";
import { useStore } from "vuex";
import { timeStampLocal } from "@/commonMethods/commonMethod";
import { useRoute } from "vue-router";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
import { globalDateFormat } from "@/commonMethods/commonMethod";
import moment from "moment";
// import Loader from "@/components/loader/Loader";
// import { CloseOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    ModalButtons,
    // Loader,
    GlobalCodeDropDown,
    // CloseOutlined,
  },
  props: {
    pId: String,
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const formRef = ref();
    const isValueChanged = ref(false);

    watchEffect(() => {
      if (props.pId) {
        store.dispatch("notesList", props.pId);
      }
      store.dispatch("globalCodes");
    });

    const flagsList = computed(() => {
      return store.state.flags.flagsList;
    });

    const noteTypes = computed(() => {
      return store.state.common.noteTypes;
    });
    const noteCategories = computed(() => {
      return store.state.common.noteCategories;
    });

    const addNoteForm = reactive({
      date: moment().format(globalDateFormat),
      category: "",
      type: "",
      flag: "",
      note: "",
      entityType: "patient",
    });
    const form = reactive({
      ...addNoteForm,
    });

    const changedValue = () => {
      isValueChanged.value = true;
      emit("valueChanged", isValueChanged.value);
    };

    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(addNoteForm, form);
    };

    const submitForm = () => {
      const data = {
        date: timeStampLocal(addNoteForm.date),
        category: addNoteForm.category,
        type: addNoteForm.type,
        flag: addNoteForm.flag,
        note: addNoteForm.note,
        entityType: addNoteForm.entityType,
      };
      const patientId = route.params.udid ? route.params.udid : props.pId;
      store
        .dispatch("addNote", {
          id: patientId,
          data: data,
        })
        .then(() => {
          store.dispatch("latestNotes", patientId);
          store.dispatch("patientTimeline", {
            id: route.params.udid ? route.params.udid : props.pId,
            type: "",
          });
          formRef.value.resetFields();
          Object.assign(addNoteForm, form);
           emit("closeModal", false);
          if (props.pId) {
            store.dispatch("notesList", props.pId);
          }
        });
    };

    return {
      size: ref("large"),
      handleClear,
      formRef,
      submitForm,
      addNoteForm,
      noteTypes,
      noteCategories,
      isValueChanged,
      changedValue,
      flagsList,
      globalDateFormat,
    };
  },
});
</script>

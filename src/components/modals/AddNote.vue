<template>
  <a-modal width="1000px" title="Add Note" centered @cancel="onCloseModal()">
    <a-form layout="vertical" ref="formRef" :model="addNoteForm" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('notes.date')" name="date" :rules="[{ required: true, message: $t('notes.date')+' '+$t('global.validation')  }]">
              <a-date-picker @change="changedValue" v-model:value="addNoteForm.date" :size="size" style="width: 100%" format="MM/DD/YYYY" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('notes.category')" name="category" :rules="[{ required: true, message: $t('notes.category')+' '+$t('global.validation')  }]">
              <GlobalCodeDropDown @change="changedValue"  v-model:value="addNoteForm.category" :globalCode="noteCategories"/>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('notes.type')" name="type" :rules="[{ required: true, message: $t('notes.type')+' '+$t('global.validation')  }]">
              <GlobalCodeDropDown @change="changedValue"  v-model:value="addNoteForm.type" :globalCode="noteTypes"/>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('notes.note')" name="note" :rules="[{ required: true, message: $t('notes.note')+' '+$t('global.validation')  }]">
              <a-input @change="changedValue" v-model:value="addNoteForm.note" size="large" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="24" :span="24">
          <ModalButtons @is_click="handleClear"/>
        </a-col>

      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import ModalButtons from "@/components/common/button/ModalButtons";
import { useStore } from "vuex";
import { timeStamp } from '@/commonMethods/commonMethod';
import { useRoute } from "vue-router";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";

export default defineComponent({
  components: {
    ModalButtons,
    GlobalCodeDropDown
  },
  setup(props, {emit}) {
    const store = useStore();
    const route = useRoute()
    const formRef = ref();
    const isValueChanged = ref(false);

    watchEffect(() => {
      store.dispatch('globalCodes')
    })

    const noteTypes = computed(() => {
      return store.state.common.noteTypes;
    })
    const noteCategories = computed(() => {
      return store.state.common.noteCategories;
    })

    const addNoteForm = reactive({
      date: "",
      category: "",
      type: "",
      note: "",
      entityType: "patient",
    })
    const form = reactive({ ...addNoteForm });

    const changedValue = () => {
      isValueChanged.value = true;
    }

    function onCloseModal() {
			if(isValueChanged.value) {
				warningSwal(messages.modalWarning).then((response) => {
					if (response == true) {
						emit("closeModal", {
							modal: 'addNote',
							value: false
						});
						Object.assign(addNoteForm, form);
						isValueChanged.value = false;
					}
					else {
						emit("closeModal", {
							modal: 'addNote',
							value: true
						});
					}
				})
			}
    }

    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(addNoteForm, form)
    }

    const submitForm = () => {
      const data = {
        date: timeStamp(addNoteForm.date),
        category: addNoteForm.category,
        type: addNoteForm.type,
        note: addNoteForm.note,
        entityType: addNoteForm.entityType,
      }
      const patientId = route.params.udid;
      store.dispatch('addNote', {id: patientId, data: data}).then(() => {
        store.dispatch('latestNotes', patientId)
        emit('closeModal');
      });
    }

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
      onCloseModal,
    };
  },
});
</script>

<template>
  <a-modal width="1000px" title="Add Note" centered>
    <a-form layout="vertical" ref="formRef" :model="addNoteForm" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('notes.date')" name="date" :rules="[{ required: true, message: $t('notes.date')+' '+$t('global.validation')  }]">
              <a-date-picker v-model:value="addNoteForm.date" :size="size" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('notes.category')" name="category" :rules="[{ required: true, message: $t('notes.category')+' '+$t('global.validation')  }]">
              <a-select ref="select" v-model:value="addNoteForm.category" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                <a-select-option value="" hidden>Select Category</a-select-option>
                <a-select-option v-for="category in noteCategories.globalCode" :key="category.id">{{ category.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('notes.type')" name="type" :rules="[{ required: true, message: $t('notes.type')+' '+$t('global.validation')  }]">
              <a-select ref="select" v-model:value="addNoteForm.type" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                <a-select-option value="" hidden>Select Type</a-select-option>
                <a-select-option v-for="type in noteTypes.globalCode" :key="type.id">{{ type.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('notes.note')" name="note" :rules="[{ required: true, message: $t('notes.note')+' '+$t('global.validation')  }]">
              <a-input v-model:value="addNoteForm.note" size="large" />
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
export default defineComponent({
  components: {
    ModalButtons,
  },
  setup(props, {emit}) {
    const store = useStore();
    const route = useRoute()
    const formRef = ref();
    const form = reactive({ ...addNoteForm });

    watchEffect(() => {
      store.dispatch('globalCodes')
    })

    const noteTypes = computed(() => {
      return store.state.common.noteTypes;
    })
    const noteCategories = computed(() => {
      return store.state.common.noteCategories;
    })
    console.log('noteTypes', noteTypes.value)
    console.log('noteCategories', noteCategories.value)

    const addNoteForm = reactive({
      date: "",
      category: "",
      type: "",
      note: "",
      entityType: "patient",
    })

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
      noteCategories
    };
  },
});
</script>

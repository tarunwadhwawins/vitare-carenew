<template>
  <a-modal width="60%" :title="$t('staffGroups.managePrograms')">
    <a-form :model="searchProgramForm" layout="vertical" @finish="searchProgram">
      <a-row :gutter="24">

        <a-col :span="21">
          <div class="form-group">
            <a-form-item :label="$t('global.program')" name="program" :rules="[{required: true, message:$t('staffGroups.program')+' '+$t('global.validation')}]">
              <a-input v-model:value="searchProgramForm.program" size="large" :placeholder="$t('staffGroups.searchProgramPlaceholder')" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :span="3">
          <div class="form-group">
            <div class="text-right mt-28">
              <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.search')}}</a-button>
            </div>
          </div>
        </a-col>
        
      </a-row>
    </a-form>

    <a-form :model="addProgramToGroupForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">

        <a-col :span="24" class="mt-25">
          <a-table :columns="columns" :data-source="searchGroupPrograms" >
            <template #actions="{record}">
              <a-checkbox v-model:checked="checked[record.id]" @change="changeStatus($event, record.id)"></a-checkbox>
            </template>
          </a-table>
        </a-col>
        
        <a-col :span="24" v-if="searchGroupPrograms && searchGroupPrograms.length > 0">
          <div class="steps-action">
            <ModalButtons />
          </div>
        </a-col>

      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { computed, reactive, ref } from "vue";
import ModalButtons from "@/components/common/button/ModalButtons";
import { useStore } from 'vuex';
export default {
  components: {
    ModalButtons
  },
  props: {
    groupId: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    const columns = [
      {
        title: "Select",
        dataIndex: "actions",
        slots: {
          customRender: "actions",
        },
      },
      {
        title: "Name",
        dataIndex: "name",
      },
    ];

    const searchProgramForm = reactive({
      program: "",
    })

    const addProgramToGroupForm = reactive({
      program: [],
    })

    const searchGroupPrograms = computed(() => {
      return store.state.staffGroups.searchProgram
    })

    const groupProgramsList = computed(() => {
      return store.state.staffGroups.groupProgramsList
    })

    const createGroup = computed(() => {
      return store.state.staffGroups.createGroup
    })

    const searchProgram = () => {
      store.dispatch('searchProgram', searchProgramForm.program)
    }

    var programIds = []
    const changeStatus = (event, value) => {
      if(event.target.checked) {
        programIds.push(value);
      }
      else {
        var index = programIds.indexOf(value);
        if (index !== -1) {
          programIds.splice(index, 1);
        }
      }
    }

    const submitForm = () => {
      const data = {
        id: props.groupId ? props.groupId : createGroup.value.id,
        data: {
          program: programIds
        }
      }
      store.dispatch('addProgramToGroup', data).then(() => {
        store.dispatch('groupsList')
        emit('closeModal')
      })
    }

    return {
      value: ref([]),
      checked: ref([]),
      columns,
      submitForm,
      searchProgramForm,
      addProgramToGroupForm,
      searchGroupPrograms,
      searchProgram,
      groupProgramsList,
      changeStatus,
    };
  },
};
</script>
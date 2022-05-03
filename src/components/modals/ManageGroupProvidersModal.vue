<template>
  <a-modal width="60%" :title="$t('staffGroups.manageProviders')">
    <a-form :model="searchProviderForm" layout="vertical" @finish="searchProvider">
      <a-row :gutter="24">

        <a-col :span="21">
          <div class="form-group">
            <a-form-item :label="$t('global.provider')" name="provider" :rules="[{required: true, message:$t('global.provider')+' '+$t('global.validation')}]">
              <a-input v-model:value="searchProviderForm.provider" size="large" :placeholder="$t('staffGroups.searchProvidersPlaceholder')" />
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

    <a-form :model="addProviderToGroupForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">

        <a-col :span="24" class="mt-25">
          <a-table :columns="columns" :data-source="searchGroupProviders" >
            <template #actions="{record}">
              <a-checkbox v-model:checked="checked[record.id]" @change="changeStatus($event, record.id)"></a-checkbox>
            </template>
          </a-table>
        </a-col>
        
        <a-col :span="24" v-if="searchGroupProviders && searchGroupProviders.length > 0">
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

    const searchProviderForm = reactive({
      provider: "",
    })

    const addProviderToGroupForm = reactive({
      provider: [],
    })

    const searchGroupProviders = computed(() => {
      return store.state.staffGroups.searchProvider
    })

    const groupProvidersList = computed(() => {
      return store.state.staffGroups.groupProvidersList
    })

    const createGroup = computed(() => {
      return store.state.staffGroups.createGroup
    })

    const searchProvider = () => {
      store.dispatch('searchProvider', searchProviderForm.provider)
    }

    var providerIds = []
    const changeStatus = (event, value) => {
      if(event.target.checked) {
        providerIds.push(value);
      }
      else {
        var index = providerIds.indexOf(value);
        if (index !== -1) {
          providerIds.splice(index, 1);
        }
      }
    }

    const submitForm = () => {
      const data = {
        id: props.groupId ? props.groupId : createGroup.value.id,
        data: {
          provider: providerIds
        }
      }
      store.dispatch('addProviderToGroup', data).then(() => {
        store.dispatch('groupsList')
        emit('closeModal')
      })
    }

    return {
      value: ref([]),
      checked: ref([]),
      columns,
      submitForm,
      searchProviderForm,
      addProviderToGroupForm,
      searchGroupProviders,
      searchProvider,
      groupProvidersList,
      changeStatus,
    };
  },
};
</script>
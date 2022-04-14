<template>
<a-table  rowKey="id" :columns="documentColumns" :data-source="documentsData" :pagination="false" >
    <template #tags="text">
        <span v-for="tag,i in text.text.data" :key="tag.id">{{i==0?' ':','}}{{ tag.tag}}</span>
    </template>
    <template #document="text">
          <a :href="text.text" target="_blank" >
            <FileOutlined />
          </a>
    </template>
    <template #action="text">
        <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,61)">
            <template #title>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons" @click="deleteDocument(text.record.id)">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template>
</a-table>
</template>

<script>
import { computed } from "vue";
import { DeleteOutlined, FileOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { warningSwal,arrayToObjact } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
export default {
  components: {
    DeleteOutlined,
    FileOutlined,
  },
  props: {
    Id: String,
  },
  setup(props) {
    const store = useStore();
    const router = useRoute();

    function deleteDocument(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteStaffDocument", {
            id: props.Id ? props.Id : router.params.udid,
            documentId: id,
          });
          setTimeout(() => {
            store.dispatch(
              "staffDocuments",
              props.Id ? props.Id : router.params.udid
            );
          }, 2000);
        }
      });
    }
    const documentsData = computed(() => {
      return store.state.careCoordinator.staffDocuments;
    });

    const documentColumns = computed(() => {
      return store.state.careCoordinator.documentColumns;
    });
    
    return {
      arrayToObjact,
      screensPermissions:store.getters.screensPermissions,
      documentColumns,
      documentsData,
      deleteDocument,
    };
  },
};
</script>

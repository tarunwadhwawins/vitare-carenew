<template>
<a-table rowKey="id" :columns="cptCodesColumns" :data-source="data" :scroll="{ y: 400 }" :pagination="false" @change="onChange">
    <template #actions="{record}" >
        <a-tooltip placement="bottom" @click="editCpt(record.udid)" v-if="arrayToObjact(cptCodePermissions,10)">
            <template #title>
                <span>{{$t('global.edit')}}</span>
            </template>
            <a class="icons">
                <EditOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" @click="deleteCpt(record.udid)" v-if="arrayToObjact(cptCodePermissions,11)">
            <template #title>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template>
    <template #status="{record}" v-if="arrayToObjact(cptCodePermissions,12)">
        <a-switch v-model:checked="record.status" @change="UpdateCptStatus(record.udid, $event)" />
    </template>
</a-table>
<InfiniteLoader v-if="loader" />
</template>

<script>
import { ref, reactive, onMounted,computed } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { messages } from "@/config/messages";
import InfiniteLoader from "@/components/loader/InfiniteLoader";
import { useStore } from "vuex";
import { warningSwal,arrayToObjact } from "@/commonMethods/commonMethod";
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    InfiniteLoader,
  },
  props: {
    cptCodesList: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const cptCodesColumns = reactive(props.cptCodesList.cptCodesColumns);
    const data = reactive(props.cptCodesList.cptCodesList);
    const store = useStore();

    function deleteCpt(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteCptCode", id).then(() => {
            store.state.cptCodes.cptCodesList = "";
            store.dispatch("cptCodesList");
          });
        }
      });
    }
    const UpdateCptStatus = (id, status) => {
      const data = {
        status: status,
      };

      store
        .dispatch("updateCptCode", {
          id,
          data,
        })
        .then(() => {});
    };

    function editCpt(id) {
      store.dispatch("cptCodeDetails", id);
      emit("is-visible", {
        check: true,
        id: id,
      });
    }

    //infinite scroll
    const meta = store.getters.timeLogReports;
    const loader = ref(false);
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.cptMeta.current_page + 1;

          if (current_page <= meta.cptMeta.total_pages) {
            loader.value = true;
            meta.cptMeta = "";
            store.state.cptCodes.cptCodesList = "";
            store.dispatch("cptCodesList", "?page=" + current_page).then(() => {
              loadMoredata();
            });
          }
        }
      });
    });

    function loadMoredata() {
      const newData = meta.cptCodesList;

      newData.forEach((element) => {
        data.push(element);
      });
      loader.value = false;
    }

    const cptCodePermissions = computed(()=>{
            return store.state.screenPermissions.cptCodePermissions
        })

    return {
    cptCodePermissions,
      arrayToObjact,
      cptCodesColumns,
      data,
      loader,
      deleteCpt,
      editCpt,
      UpdateCptStatus,
    };
  },
};
</script>

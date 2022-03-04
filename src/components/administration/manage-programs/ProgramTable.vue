<template>
    <a-col :span="24">
        <a-table  rowKey="id"
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 900 ,y : 430 }"
          @change="onChange"
          :pagination=false
        >
        <template #actions="text">
            <a-tooltip placement="bottom">
                <template #title>
                    <span>{{$t('global.edit')}}</span>
                </template>
                <a class="icons" @click="editProgram(text.record)">
                    <EditOutlined />
                </a>
            </a-tooltip>
            <a-tooltip placement="bottom">
                <template #title>
                    <span>{{$t('global.delete')}}</span>
                </template>
                <a class="icons" @click="deleteProgram(text.record)">
                    <DeleteOutlined />
                </a>
            </a-tooltip>
        </template>
        <template #status="{record}">
            <a-switch v-model:checked="record.status" @change="UpdateProgramStatus(record.udid, $event)" />
        </template>
    </a-table>
</a-col>
<InfiniteLoader v-if="loader" />
</template>

<script>
import { ref, reactive, onMounted} from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import { useStore } from "vuex";
import InfiniteLoader from "@/components/loader/InfiniteLoader";
export default {
    components: {

        DeleteOutlined,
        EditOutlined,
        InfiniteLoader
    },
    props: {
        programData: {
            type: Array
        }
    },

    setup(props, {
        emit
    }) {
        const store = useStore();
        const data = reactive(props.programData.programList)
        const columns = reactive(props.programData.programColumns)
        const checked = ref([false]);

        function editProgram(getRecord) {
            store.dispatch('editProgram', getRecord.udid)
            emit('is-edit', {
                check: true,
                id: getRecord.udid
            })
        }

        function deleteProgram(id) {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {
                    store.dispatch('deleteProgram', id.udid)
                    store.state.programs.programList = ''
                    setTimeout(() => {

                        store.dispatch("programList");
                    }, 2000);
                }
            });
        }
        const UpdateProgramStatus = (id, status) => {
            const data = {
                "isActive": status
            };

            store.dispatch('updateProgram', {
                id,
                data
            }).then(() => {})
        }
        //ifinitescroller
        const meta = store.getters.programsRecord
        const loader = ref(false)
        onMounted(() => {
            var tableContent = document.querySelector('.ant-table-body')
            tableContent.addEventListener('scroll', (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight
                let currentScroll = event.target.scrollTop + 2
                //console.log("data",currentScroll)
                if (currentScroll >= maxScroll) {

                    let current_page = meta.value.programMeta.current_page + 1

                    if (current_page <= meta.value.programMeta.total_pages) {
                        loader.value = true
                        store.state.program.programMeta = ""
                        store.state.programs.programList = ""
                        store.dispatch("programList", "?page=" + current_page).then(()=>{
                          loadMoredata()
                        })
                        

                    }
                }
            })
        })

        function loadMoredata() {
            const newData = meta.value.programList
            newData.forEach(element => {
                data.push(element)
            });
            loader.value = false
        }
        return {
            loader,
            checked,
            columns,
            data,
            deleteProgram,
            editProgram,
            UpdateProgramStatus
        };
    },
};
</script>

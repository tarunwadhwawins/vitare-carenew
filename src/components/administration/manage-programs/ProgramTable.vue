<template>
<a-col :span="24">
    
    <a-table rowKey="id" :columns="meta.programColumns" :data-source="meta.manageProgramList" :scroll="{ x: 900 ,y : tableYScroller }" @change="onChange" :pagination=false>
        <template #actions="text">
            <a-tooltip placement="bottom" v-if="arrayToObjact(programsPermissions,16)">
                <template #title>
                    <span>{{$t('global.edit')}}</span>
                </template>
                <a class="icons" @click="editProgram(text.record)">
                    <EditOutlined />
                </a>
            </a-tooltip>
            <a-tooltip placement="bottom" v-if="arrayToObjact(programsPermissions,17)">
                <template #title>
                    <span>{{$t('global.delete')}}</span>
                </template>
                <a class="icons" @click="deleteProgram(text.record)">
                    <DeleteOutlined />
                </a>
            </a-tooltip>
        </template>
        <template #status="{record}" v-if="arrayToObjact(programsPermissions,18)">
            <a-switch v-model:checked="record.status" @change="UpdateProgramStatus(record.udid, $event)" />
        </template>
    </a-table>
    <Loader />
</a-col>

</template>

<script>
import {
    ref,
    onMounted,
    computed,
    watchEffect
} from "vue";
import {
    DeleteOutlined,
    EditOutlined
} from "@ant-design/icons-vue";
import {
    warningSwal,
    arrayToObjact,tableYScroller
} from "@/commonMethods/commonMethod";
import {
    messages
} from "@/config/messages";
import {
    useStore
} from "vuex";

import Loader from "@/components/loader/Loader"
export default {
    components: {
        Loader,
        DeleteOutlined,
        EditOutlined,

    },
    props: {

    },

    setup(props, {
        emit
    }) {
        const store = useStore();

        const checked = ref([false]);
        watchEffect(() => {
            store.dispatch('manageProgramList')
        })
        function editProgram(getRecord) {
            store.dispatch('editManageProgram', getRecord.udid)
            emit('is-edit', {
                check: true,
                id: getRecord.udid
            })
        }

        function deleteProgram(id) {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {
                    store.dispatch('deleteManageProgram', id.udid)
                    store.state.programs.programList = ""
                    store.dispatch("manageProgramList");
                }
            });
        }
        const UpdateProgramStatus = (id, status) => {
            const data = {
                "status": status
            };

            store.dispatch('updateManageProgram', {
                id,
                data
            }).then(() => {})
        }
        //ifinitescroller
        const meta = store.getters.programsRecord.value
        const loader = ref(false)
        let scroller = ''
        let data = ''
        onMounted(() => {
            var tableContent = document.querySelector('.ant-table-body')
            tableContent.addEventListener('scroll', (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight
                let currentScroll = event.target.scrollTop + 2
                //console.log("data",currentScroll)
                if (currentScroll >= maxScroll) {

                    let current_page = meta.programMeta.current_page + 1

                    if (current_page <= meta.programMeta.total_pages) {
                        scroller = maxScroll
                        data = meta.manageProgramList
                        loader.value = true
                        store.state.program.programMeta = ""
                        store.state.programs.manageProgramList = ""
                        let url=store.getters.searchTable.value ? store.getters.searchTable.value :''
                        store.dispatch("manageProgramList", "&search="+url+"&page=" + current_page).then(() => {
                            loadMoredata()
                        })
                    }
                }
            })
        })

        function loadMoredata() {
            const newData = meta.manageProgramList
            newData.forEach(element => {
                data.push(element)
            });
            meta.manageProgramList = data
            var tableContent = document.querySelector('.ant-table-body')

            setTimeout(() => {
                tableContent.scrollTo(0, scroller)
            }, 5000)
            loader.value = false
        }
        const programsPermissions = computed(() => {
            return store.state.screenPermissions.programsPermissions
        })
        return {
            meta,
            programsPermissions,
            arrayToObjact,
            loader,
            checked,

            deleteProgram,
            editProgram,
            UpdateProgramStatus,
            tableYScroller
        };
    },
};
</script>

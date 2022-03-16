<template>
<a-table rowKey="id" :columns="rolesColumns" :data-source="meta.rolesList" :scroll="{ x: 900 ,y : 430 }" :pagination=false>
    <template #actions="{record}" v-if="arrayToObjact(roleAndPermissions,2)">
        <a-tooltip placement="bottom" v-if="record.id ===1" disabled>
            <template #title disabled>
                <span>Edit</span>
            </template>
            <a class="icons" disabled>
                <EditOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" v-else>
            <template #title>
                <span>Edit</span>
            </template>
            <a class="icons" @click="editRole(record.udid)">
                <EditOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" v-if="arrayToObjact(roleAndPermissions,3)">
            <template #title v-if="record.id ===1" disabled>
                <span>Delete</span>
            </template>
            <template #title v-else>
                <span>Delete</span>
            </template>
            <a class="icons" v-if="record.id ===1" disabled>
                <DeleteOutlined /></a>
            <a class="icons" v-else @click="deleteRole(record.udid)">
                <DeleteOutlined /></a>
        </a-tooltip>

        <a-tooltip placement="bottom">
            <template #title>
                <span>Copy</span>
            </template>
            <a class="icons" @click="copyRole(record.udid)">
                <CopyOutlined /></a>
        </a-tooltip>
    </template>
    <template #status="{record}" v-if="arrayToObjact(roleAndPermissions,4)" >
        <a-switch v-if="record.id ===1" v-model:checked="record.status"  disabled/>
        <a-switch v-else v-model:checked="record.status"  @change="UpdateRoleStatus(record.udid, $event)"/>
    </template>
</a-table>
<Loader />
</template>

<script>
import {
    DeleteOutlined,
    EditOutlined,
    CopyOutlined
} from "@ant-design/icons-vue";
import {
    useStore
} from "vuex";
import {
    watchEffect,
    computed,
    onMounted,
    ref
} from 'vue';
import {
    warningSwal,
    arrayToObjact
} from "@/commonMethods/commonMethod";
import {
    messages
} from '../../../../config/messages';
import Loader from "@/components/loader/Loader"
export default {
    components: {
        DeleteOutlined,
        EditOutlined,
        CopyOutlined,
        Loader,
    },
    props: {},
    setup(props, {
        emit
    }) {
        const store = useStore()

        watchEffect(() => {
            store.dispatch('rolesList')
        })

        const editRole = (id) => {

            store.dispatch('roleDetails', id)
            store.dispatch('editPermissions', id)
            store.dispatch('editdWidget', id)
            emit("is-edit", {
                check: true,
                id: id
            })
        }

        const deleteRole = (id) => {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {
                    store.dispatch('deleteRole', id).then(() => {
                        store.dispatch('rolesList')
                    })
                }
            })
        }

        const copyRole = (id) => {
            store.dispatch('roleDetails', id)
            emit("is-copy", {
                check: true,
                id: id
            })
        }

        const UpdateRoleStatus = (id, status) => {
            //console.log("id",id)
            const data = {
                "status": status
            };
            store.dispatch('UpdateRole', {
                id,
                data,
                show: true
            }).then(() => {
                //store.dispatch('rolesList')
            })
        }

        const rolesColumns = [{
                title: "Role Name",
                dataIndex: "name",
                sorter: {
                    compare: (a, b) => a.name - b.name,
                    multiple: 3,
                },
            },
            {
                title: "Type of Role ",
                dataIndex: "roleType",
                sorter: {
                    compare: (a, b) => a.roleType - b.roleType,
                    multiple: 3,
                },
            },
            {
                title: "Description",
                dataIndex: "description",
                sorter: {
                    compare: (a, b) => a.description - b.description,
                    multiple: 3,
                },
            },
            {
                title: "Active/Inactive",
                dataIndex: "status",
                slots: {
                    customRender: "status",
                },
            },
            {
                title: "Actions",
                dataIndex: "actions",
                slots: {
                    customRender: "actions",
                },
            },
        ];
        //ifinitescroller
        let scroller
        const meta = store.getters.rolesAndPermissionsRecord.value
        let data = ''
        const loader = ref(false)
        onMounted(() => {
            var tableContent = document.querySelector('.ant-table-body')
            tableContent.addEventListener('scroll', (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight
                let currentScroll = event.target.scrollTop + 2
                //console.log("data",currentScroll)
                if (currentScroll >= maxScroll) {

                    let current_page = meta.rolesMeta.current_page + 1

                    if (current_page <= meta.rolesMeta.total_pages) {
                        scroller = maxScroll
                        data = meta.rolesList
                        loader.value = true
                        store.state.rolesAndPermissions.rolesMeta = ""
                        store.state.rolesAndPermissions.rolesList = ""
                        store.dispatch("rolesList", "?page=" + current_page).then(() => {
                            loadMoredata()
                        })
                    }
                }
            })
        })

        function loadMoredata() {
            const newData = meta.rolesList
            newData.forEach(element => {
                data.push(element)
            });
            meta.rolesList = data
            var tableContent = document.querySelector('.ant-table-body')

            setTimeout(() => {
                tableContent.scrollTo(0, scroller)
            }, 50)
            loader.value = false
        }
        const roleAndPermissions = computed(() => {
            return store.state.screenPermissions.roleAndPermissions
        })
        return {
            loader,
            arrayToObjact,
            roleAndPermissions,
            rolesColumns,
            data,
            editRole,
            deleteRole,
            copyRole,
            UpdateRoleStatus,
            meta,
        }
    }
}
</script>
